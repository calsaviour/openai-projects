import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import { Configuration, OpenAIApi } from "openai";
import { env } from "~/env.mjs";
import { b64Image } from "~/data/b64Image";

const configuration = new Configuration({
  apiKey: env.DALLE_API_KEY
});

const openai = new OpenAIApi(configuration);

async function generateIcon(prompt: string): Promise<string | undefined> {
  if(env.MOCK_DALLE === 'true') {
    return b64Image
  } else {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "512x512",
      response_format: "b64_json"
    });
    console.log("----");
    console.log(response.data.data[0]?.b64_json)
    console.log("----");
    return response.data.data[0]?.b64_json;
  }
}


export const generateRouter = createTRPCRouter({
  generateIcon: protectedProcedure
    .input(
      z.object({
        prompt: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log("we are here", input.prompt);

      const { count } = await ctx.prisma.user.updateMany({
        where: {
          id: ctx.session.user.id,
          credits: {
            gte: 1,
          },
        },
        data: {
          credits: {
            decrement: 1,
          },
        },
      });

      if (count <= 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "you do not have enough credits",
        });
      }

      // TODO: make a fetch request to DALLE api
      const base64encoded = await generateIcon(input.prompt);
      
      // TODO: save images to S3 bucket


      return {
        imageUrl: base64encoded,
      };
    }),
});
