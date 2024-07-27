"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense
} from "@liveblocks/react/suspense";

interface RoomProps {
  children: React.ReactNode;
  roomId: string;
  fallback: React.ReactNode;
}

export function Room({ children, roomId, fallback }: RoomProps) {
  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      throttle={16}
    >
      <RoomProvider id={roomId} initialPresence={{cursor: null}}>
        <ClientSideSuspense fallback={fallback}>{children}</ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}