import { cn } from "@/lib/utils";
import { useIsThreadActive } from "@liveblocks/react-lexical";
import { Composer, Thread } from "@liveblocks/react-ui";
import { useThreads } from "@liveblocks/react/suspense";

const SingleThread = ({ thread }) => {
  const isActive = useIsThreadActive(thread.id);
  return (
    <Thread
      thread={thread}
      data-state={isActive ? "active" : null}
      className={cn(
        "comment-thread border",
        isActive && "border-blue-500 shadow-md",
        thread.resolved && "opacity-40"
      )}
    />
  );
};
function Comments() {
  const { threads } = useThreads();
  return (
    <div className="comments-container">
      <Composer className="comment-composer" />

      {threads.map((thread) => (
        <SingleThread key={thread.id} thread={thread} />
      ))}
    </div>
  );
}

export default Comments;
