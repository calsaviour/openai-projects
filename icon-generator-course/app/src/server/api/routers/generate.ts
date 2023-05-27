import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import { Configuration, OpenAIApi } from "openai";
import { env } from "~/env.mjs";
import { b64Image } from "~/data/b64Image";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: env.ACCESS_KEY_ID,
    secretAccessKey: env.SECRET_ACCESS_KEY
  },
  region: "us-east-1"
});

const BUCKET_NAME = 'icon-generator-course-2';

const configuration = new Configuration({
  apiKey: env.DALLE_API_KEY
});

const openai = new OpenAIApi(configuration);

async function generateIcon(prompt: string, numberOfIcons = 1 ) {
  if(env.MOCK_DALLE === 'true') {
    return new Array<string>(numberOfIcons).fill(b64Image)
  } else {
    const response = await openai.createImage({
      prompt,
      n: numberOfIcons,
      size: "512x512",
      response_format: "b64_json"
    });
    console.log("----");
    console.log(response.data.data[0]?.b64_json)
    console.log("----");
    return response.data.data.map((result) => result.b64_json || "");
  }
}


export const generateRouter = createTRPCRouter({
  generateIcon: protectedProcedure
    .input(
      z.object({
        prompt: z.string(),
        color: z.string(),
        numberOfIcons: z.number().min(1).max(10),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log("we are here", input.prompt);

      const { count } = await ctx.prisma.user.updateMany({
        where: {
          id: ctx.session.user.id,
          credits: {
            gte: input.numberOfIcons,
          },
        },
        data: {
          credits: {
            decrement: input.numberOfIcons,
          },
        },
      });

      if (count <= 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "you do not have enough credits",
        });
      }

      const finalPrompt = `a modern icon in ${input.color} of a ${input.prompt}`
      // TODO: make a fetch request to DALLE api
      const base64EncodedImages = await generateIcon(finalPrompt, input.numberOfIcons);
      
      // TODO: save images to S3 bucket
      const createdIcons = await Promise.all(base64EncodedImages.map(async (image) => {
        const icon = await ctx.prisma.icon.create({
          data: {
            prompt: input.prompt,
            userId: ctx.session.user.id
          },
        });

        await s3.putObject({
          Bucket: BUCKET_NAME,
          Body: Buffer.from(image, "base64"),
          Key: icon.id,
          ContentEncoding: "base64",
          ContentType: "image/gif"
        })
        .promise();
        return icon;
      }));

      return createdIcons.map((icon) => {
        return {
          imageUrl: `https://${BUCKET_NAME}.s3.amazonaws.com/${icon.id}`,
        }
      });
    }),
});
