"use client";

import { memo } from "react";

import {
  shallow,
  useOthersConnectionIds,
  useOthersMapped
} from "@liveblocks/react/suspense";
import { Cursor } from "./cursor";
import { Path } from "./path";
import { colorToCSS } from "@/lib/utils";

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

const Drafts = () => {
  const others = useOthersMapped(
    (other) => ({
      pencelDraft: other.presence.pencilDraft,
      penColor: other.presence.penColor
    }),
    shallow
  );

  return (
    <>
      {others.map(([key, other]) => {
        if (other.pencelDraft) {
          return (
            <Path
              key={key}
              x={0}
              y={0}
              points={other.pencelDraft}
              fill={other.penColor ? colorToCSS(other.penColor) : "#000"}
            />
          );
        }

        return null;
      })}
    </>
  );
};

export const CursorsPresence = memo(() => {
  return (
    <>
      {/* TODO: Draft pencal */}
      <Drafts />
      <Cursors />
    </>
  );
});

CursorsPresence.displayName = "CursorsPresence";
