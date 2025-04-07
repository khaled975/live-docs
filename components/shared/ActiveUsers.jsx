import { useOthers, useSelf } from "@liveblocks/react/suspense";
import Image from "next/image";

function ActiveUsers() {
  const self = useSelf();
  const others = useOthers();
  const activeUsers = others?.map((others) => others?.info);
  //   console.log("others", others, "active", activeUsers, "self", self);

  return (
    <ul className="collaborators-list">
      {activeUsers?.map(({ id, name, avatar, color }) => (
        <li key={id}>
          <Image
            src={avatar}
            alt={name}
            width={100}
            height={100}
            className="rounded-full size-8 ring-2 ring-dark-200 inline-block"
            style={{ border: `3px solid ${color}` }}
          />
        </li>
      ))}
    </ul>
  );
}

export default ActiveUsers;
