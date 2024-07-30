import { auth, currentUser } from "@clerk/nextjs/server";

import { Liveblocks } from "@liveblocks/node";

import { api } from "@/convex/_generated/api";
import { ConvexClient } from "convex/browser";

const convex = new ConvexClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!
});

export async function POST(request: Request) {
  const authoriztion = await auth();
  const user = await currentUser();

  if (!authoriztion || !user) {
    return new Response("Unauthorized", { status: 403 });
  }

  const { room } = await request.json();
  // 從傳入的 roomId(boardId) 去 db 拿 board 的資料
  const board = await convex.query(api.board.get, { id: room });

  console.log("auth info", {
    room,
    board,
    boardOrgId: board?.orgId,
    userOrgId: authoriztion.orgId
  });

  // 比對目前登入的 user 的 orgId 是否跟要進入的 board 的 orgId 相同
  // 同一個 organization 的 user 才能編輯此 org 下的 board
  if (board?.orgId !== authoriztion.orgId) {
    return new Response("Unauthorized", { status: 403 });
  }

  const userInfo = {
    name: user.firstName || "Teammate",
    picture: user.imageUrl
  };

  const session = liveblocks.prepareSession(user.id, { userInfo });

  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }  

  const { status, body } = await session.authorize();

  return new Response(body, { status });
}
