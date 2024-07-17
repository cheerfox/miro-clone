"use client";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface NewBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}

export const NewBoardButton = ({
  orgId,
  disabled
}: NewBoardButtonProps) => {
  const { mutate, pending } = useApiMutation(api.board.create)
  const onClick = () => {
    mutate({
      orgId: orgId,
      title: "Untitled"
    })
    .then((id) => {
      toast.success("Board created");
    })
    .catch((error) => {
      toast.error("Failed to create board") 
    })
  }
  return (
    <button
      disabled={pending || disabled}
      onClick={onClick}
      className={cn(
        "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",
        (pending || disabled) && "opacity-75 hover:bg-blue-600 cursor-not-allowed"
      )}
    >
      <Plus className="h-12 w-12 text-white stroke-1" />
      <p className="text-xs text-white font-light">
        New Board
      </p>
    </button>
  );
};