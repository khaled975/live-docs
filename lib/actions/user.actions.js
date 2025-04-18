"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { parseStringify } from "../utils";
import { liveblocks } from "../liveblocks";

export const getClerkUsers = async ({ userIds }) => {
  try {
    const client = await clerkClient();
    const { data } = await client.users.getUserList({
      emailAddress: userIds,
    });

    // console.log(data);

    const users = data.map((user) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0].emailAddress,
      avatar: user.imageUrl,
    }));

    const sortedUsers = userIds.map((email) =>
      users.find((user) => user.email === email)
    );
    return parseStringify(sortedUsers);
  } catch (error) {
    console.log(`Error fetching users ${error}`);
  }
};

export const getDocumentUsers = async ({ roomId, currentUser, text }) => {
  try {
    const room = await liveblocks.getRoom(roomId);
    const users = Object.keys(room.usersAccesses).filter(
      (email) => email !== currentUser
    );
    if (text.length) {
      const lowerCaseText = text.toLowerCase();
      const filteredUsers = users.filter((email) =>
        email.toLowerCase().includes(lowerCaseText)
      );
      return parseStringify(filteredUsers);
    }
    return parseStringify(users);
  } catch (error) {
    console.log(`Error happened while getting the users in the room ${error}`);
  }
};
