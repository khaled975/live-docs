"use client";

import Image from "next/image";
import { useState } from "react";
import UserTypeSelector from "./UserTypeSelector";
import { Button } from "../ui/button";
import {
  removeUserFromDocument,
  updateDocumentAccess,
} from "@/lib/actions/room.actions";

function Collaborator({ user, roomId, email, creatorId, collaborator }) {
  const [userType, setUserType] = useState(collaborator.userType || "viewer");
  const [loading, setLoading] = useState(false);

  const shareDocumentHandler = async (type) => {
    setLoading(true);
    await updateDocumentAccess({ roomId, email, userType, updatedBy: user });
    setLoading(false);
  };
  const removeUserAccessHandler = async (email) => {
    setLoading(true);
    await removeUserFromDocument({ roomId, email });
    setLoading(false);
  };
  return (
    <li className="flex items-center gap-2 py-3 justify-between">
      <div className="flex gap-2">
        <Image
          src={collaborator.avatar}
          alt={collaborator.name}
          width={36}
          height={36}
          className="size-9 rounded-full"
        />
        <div>
          <p className="line-clamp-1 text-sm font-semibold leading-4 text-white">
            {collaborator.name}
            <span className="text-10-regular pl-w text-blue-100">
              {" "}
              {loading && "Updating..."}
            </span>
          </p>
          <p className="text-sm font-light text-blue-100">
            {collaborator.email}
          </p>
        </div>
      </div>
      {creatorId === collaborator.id ? (
        <p className="text-sm text-blue-100">owner</p>
      ) : (
        <div className="flex items-center">
          <UserTypeSelector
            userType={userType}
            setUserType={setUserType}
            onClickHandler={shareDocumentHandler}
          />
          <Button
            type="button"
            onClick={() => removeUserAccessHandler(collaborator.email)}
          >
            Remove
          </Button>
        </div>
      )}
    </li>
  );
}

export default Collaborator;
