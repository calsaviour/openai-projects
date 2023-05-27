import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const iconsRouter = createTRPCRouter({
  getIcons: protectedProcedure.query(async ({ ctx }) => {
    const icons = await ctx.prisma.icon.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
    return icons;
  }),
  getCommunityIcons: publicProcedure.query(async ({ ctx }) => {
    const icons = await ctx.prisma.icon.findMany({
        take: 50,
        orderBy: {
            createdAt: 'desc'
        }
    })
    return icons;
  })
});