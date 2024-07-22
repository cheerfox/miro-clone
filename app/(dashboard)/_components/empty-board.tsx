"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";

import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export const EmptyBoard = () => {
  const router = useRouter();
  const { mutate, pending } = useApiMutation(api.board.create);
  const { organization } = useOrganization();

  const onClick = () => {
    if (!organization) return;

    mutate({
      orgId: organization?.id,
      title: "Untitled"
    })
      .then((id) => {
        toast.success("Board Created");
        router.push(`/board/${id}`)

      })
      .catch(() => {
        toast.error("Something went wrong!");
      });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/empty-board.svg" height={110} width={110} alt="Empty" />
      <h2 className="text-2xl font-semibold mt-6">Create your first board!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a board for your organization
      </p>
      <div className="mt-6">
        <Button onClick={onClick} size="lg" disabled={pending}>
          Create Board
        </Button>
      </div>
    </div>
  );
};
