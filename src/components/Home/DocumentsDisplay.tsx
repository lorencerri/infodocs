import Link from "next/link";
import { api } from "~/utils/api";

export const DocumentsDisplay = () => {
  const { data, refetch } = api.document.getAll.useQuery();

  return (
    <div className="hero mt-3 bg-base-200 p-5 lg:mt-5 xl:rounded-lg">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold lg:text-5xl">Documents</h1>
          <p className="pt-6">
            {data?.map((doc) => (
              <Link
                href="/document/[id]"
                as={`/document/${doc.id}`}
                key={doc.id}
              >
                {doc.title} by {doc.userId}
              </Link>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};
