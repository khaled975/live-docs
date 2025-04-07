"use client";
import Loader from "@/components/shared/Loader";
import { getClerkUsers, getDocumentUsers } from "@/lib/actions/user.actions";
import { useUser } from "@clerk/nextjs";
import {
  ClientSideSuspense,
  LiveblocksProvider,
} from "@liveblocks/react/suspense";

function Provider({ children }) {
  const { user: clerkUser } = useUser();
  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ usersIds }) => {
        const users = await getClerkUsers({ usersIds });
        return users;
      }}
      resolveMentionSuggestions={async ({ roomId, text }) => {
        const usersInRoom = await getDocumentUsers({
          roomId,
          currentUser: clerkUser.emailAddresses[0]?.emailAddress,
          text,
        });
        return usersInRoom;
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
}

export default Provider;
