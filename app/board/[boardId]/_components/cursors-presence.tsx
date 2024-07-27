"use client";

import { memo } from "react";

import { useOthersConnectionIds } from "@liveblocks/react/suspense";
import { Cursor } from "./cursor";

const Cursors = () => {
  const ids = useOthersConnectionIds();

  return (
    <>
      {ids.map((connectionId) => (
        <Cursor key={connectionId} connectionId={connectionId}></Cursor>
      ))}
    </>
  );
};

export const CursorsPresence = memo(() => {
  return (
    <>
      {/* TODO: Draft pencal */}
      <Cursors />
    </>
  );
});

CursorsPresence.displayName = "CursorsPresence";
