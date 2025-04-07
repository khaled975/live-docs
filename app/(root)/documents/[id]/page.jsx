import Room from "@/components/shared/Room";
import { getDocument } from "@/lib/actions/room.actions";
import { getClerkUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function Document({ params }) {
  const { id } = await params;
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");

  const room = await getDocument({
    roomId: id,
    userId: clerkUser?.emailAddresses[0]?.emailAddress,
  });
  if (!room) redirect("/");

  // GET USER PERMISSIONS FOR THE ROOM "DOCUMENT"
  const userIds = Object.keys(room.usersAccesses);
  const users = await getClerkUsers({ userIds });
  const usersData = users?.map((user) => ({
    ...user,
    userType: room.usersAccesses[user.email]?.includes("room:write")
      ? "editor"
      : "viewer",
  }));
  const currentUserType = room.usersAccesses[
    clerkUser?.emailAddresses[0]?.emailAddress
  ]?.includes("room:write")
    ? "editor"
    : "viewer";
  return (
    <main className="flex items-center flex-col w-full">
      <Room
        roomId={id}
        roomMetadata={room.metadata}
        users={usersData}
        currentUserType={currentUserType}
      />
    </main>
  );
}

export default Document;
