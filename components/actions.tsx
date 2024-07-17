"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";

import { toast } from "sonner";
import { Link2, Trash2 } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";

import { ConfirmDialogModal } from "./confirm-modal";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

interface ActionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}

export const Actions = ({
  children,
  side,
  sideOffset,
  id,
  title
}: ActionsProps) => {
  const { mutate, pending } = useApiMutation(api.board.remove);

  const onCopyLink = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/board/${id}`
    )
      .then(() => toast.success("Link copied"))
      .catch(() => toast.error("Failed to copy link"))
  }

  const onDelete = () => {
    mutate({ id })
      .then(() => toast.success("Board deleted"))
      .catch(() => toast.error("Failed to delete board"))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => { e.stopPropagation() }}
        side={side}
        sideOffset={sideOffset}
        className="w-60"
      >
        <DropdownMenuItem
          onClick={onCopyLink}
          className="p-3 cursor-pointer">
          <Link2 className="h-4 w-4 mr-2" />
          Copy board link
        </DropdownMenuItem>
        <ConfirmDialogModal
          header="Delete Board?"
          description="This will delete the board and all of its contnets."
          disabled={pending}
          onConfirm={onDelete} 
        >
          {/* 這邊如果用 <DropdownMenuItem /> 會有問題，modal 打開後就自己關掉了 */}
          <Button
            variant="ghost"
            className="p-3 cursor-pointer text-sm w-full justify-start font-normal">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete board
          </Button>
        </ConfirmDialogModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};