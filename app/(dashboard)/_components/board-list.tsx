"use client";

import { EmptyBoard } from "./empty-board";
import { EmptyFavorite } from "./empty-favorite";
import { EmptySearch } from "./empty-search";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
};

export const BoardList = ({
  orgId,
  query
}: BoardListProps) => {
  const data = []; // TODO: From API Call

  if (!data?.length && query.search) {
    return (
      <EmptySearch />
    );
  };

  if (!data?.length && query.favorites) {
    return (
      <EmptyFavorite />
    );
  };

  if (!data?.length) {
    return (
      <EmptyBoard />
    );
  };

  return (
    <div>
      <p>{orgId}</p>
      <p>{JSON.stringify(query)}</p>
    </div>
  );
};