"use client";

import Image from "next/image";
import Link from "next/link";
import { Overlay } from "./orverlay";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { Footer } from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Actions } from "@/components/actions";
import { MoreHorizontalIcon } from "lucide-react";

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";

interface BoardBardProps {
  id: string;
  title: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  imageUrl: string;
  orgId: string;
  isFavorite: boolean;
}

export const BoardCard = ({
  id,
  title,
  authorId,
  authorName,
  createdAt,
  imageUrl,
  orgId,
  isFavorite
}: BoardBardProps) => {
  const { userId } = useAuth();
  const authorLabel = userId === authorId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true
  });

  // 解構的 alias 方法
  const { mutate: onFavorite, pending: pendingFavorite } = useApiMutation(
    api.board.favorite
  );
  const { mutate: onUnfavorite, pending: pendingUnFavorite } = useApiMutation(
    api.board.unFavorite
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      onUnfavorite({ id }).catch(() => {
        toast.error("Failed to unfavorite");
      });
    } else {
      onFavorite({ id, orgId }).catch(() => {
        toast.error("Failed to favorite");
      });
    }
  };

  return (
    <Link href={`/boards/${id}`}>
      <div
        className="group aspect-[100/127] border rounded-lg
      flex flex-col justify-center overflow-hidden"
      >
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageUrl} alt={title} fill className="object-fill" />
          <Overlay />
          <Actions id={id} title={title} side="right">
            <button
              className="absolute top-1 right-1 opacity-0
            group-hover:opacity-100 transition-opacity px-3 py-2 outline-none"
            >
              <MoreHorizontalIcon className="text-white opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </Actions>
        </div>
        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={toggleFavorite}
          disabled={pendingFavorite || pendingUnFavorite}
        />
      </div>
    </Link>
  );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
