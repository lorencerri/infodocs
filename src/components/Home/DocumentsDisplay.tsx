import Link from "next/link";
import { api } from "~/utils/api";

export const DocumentsDisplay = () => {
  const { data } = api.document.getAll.useQuery();

  return (
    <div className="hero mt-3 bg-base-200 p-5 lg:mt-5 xl:rounded-lg">
      <div className="hero-content">
        <div className="max-w-md">
          <h1 className="text-center text-3xl font-bold lg:text-5xl">
            Documents
          </h1>
          <p className="pt-6">
            {data?.map((doc) => (
              <Link
                href="/document/[id]"
                as={`/document/${doc.id}`}
                key={doc.id}
              >
                <div className="alert mb-4 bg-base-100 shadow-lg">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 flex-shrink-0 stroke-info"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>

                    <div>
                      <h3 className="font-bold">{doc.title}</h3>
                      <div className="text-xs">{doc.description}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};
