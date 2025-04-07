"use client";
import { createDocument } from "@/lib/actions/room.actions";
import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

function AddDocBtn({ userId, email }) {
  const router = useRouter();
  const handleAddDocument = async () => {
    try {
      const room = await createDocument({ userId, email });
      if (room) router.push(`/documents/${room.id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      type="submit"
      className="gradient-blue flex gap-1 shadow-md cursor-pointer"
      onClick={handleAddDocument}
    >
      <Image src="/assets/icons/add.svg" alt="add-doc" width={24} height={24} />
      <p className="hidden sm:block">Add a blank document</p>
    </Button>
  );
}

export default AddDocBtn;
