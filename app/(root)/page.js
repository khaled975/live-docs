import AddDocBtn from "@/components/shared/AddDocBtn";
import DeleteModal from "@/components/shared/DeleteModal";
import Header from "@/components/shared/Header";
import { getAllDocuments } from "@/lib/actions/room.actions";
import { dateConverter } from "@/lib/utils";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const clerkUser = await currentUser();
  // const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");
  const documents = await getAllDocuments(
    clerkUser.emailAddresses[0].emailAddress
  );
  return (
    <main className="home-container">
      <Header className="sticky left-0 top-0">
        <div className="flex items-center gap-2 lg:gap-4">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>
      {documents.data.length > 0 ? (
        <div className="document-list-container">
          <div className="document-list-title">
            <h3 className="text-28-semibold">All Documents</h3>
            <AddDocBtn
              userId={clerkUser.id}
              email={clerkUser.emailAddresses[0]?.emailAddress}
            />
          </div>
          <ul className="document-ul">
            {documents.data.map((document) => (
              <li key={document.id} className="document-list-item">
                <Link
                  href={`/documents/${document.id}`}
                  className="flex flex-1 gap-4 items-center"
                >
                  <div className="hidden sm:block rounded-md p-2 bg-dark-500">
                    <Image
                      src="/assets/icons/doc.svg"
                      alt="doc"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="line-clamp-1 text-lg">
                      {document.metadata.title}
                    </p>
                    <p className="text-sm font-light text-blue-100">
                      Created About:{dateConverter(document.createdAt)}
                    </p>
                  </div>
                </Link>
                <DeleteModal roomId={document.id} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="document-list-empty">
          <Image
            src="/assets/icons/doc.svg"
            alt="empty-docs"
            width={40}
            height={40}
            className="mx-auto"
          />
          <AddDocBtn
            userId={clerkUser?.id}
            email={clerkUser?.emailAddresses[0].emailAddress}
          />
        </div>
      )}
    </main>
  );
}
