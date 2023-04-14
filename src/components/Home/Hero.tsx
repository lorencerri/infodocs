export const Hero = () => {
  return (
    <div className="alert mb-4 mt-3 bg-base-200 shadow-lg lg:mt-5">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-10 flex-shrink-0 stroke-cyan-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
          />
        </svg>

        <div>
          <h3 className="text-lg font-bold">Knowledgebase</h3>
          <div className="text-md">
            Welcome to Techgenix&apos;s knowledgebase! Here, you can find
            information on our various indiviual projects and more.
          </div>
        </div>
      </div>
    </div>
  );
};
