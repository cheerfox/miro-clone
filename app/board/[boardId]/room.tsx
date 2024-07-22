"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

interface RoomProps {
  children: React.ReactNode,
  roomId: string,
  fallback: React.ReactNode
}

export function Room({ children, roomId, fallback }: RoomProps) {
  return (
    <LiveblocksProvider publicApiKey={"pk_dev_MpEhL_XVeBVdmrhhSJNek-PG669zPfhHZKDkJG2DUs6dV3wzgrA4yS-0vv9OvGBv"}>
      <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={fallback}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}