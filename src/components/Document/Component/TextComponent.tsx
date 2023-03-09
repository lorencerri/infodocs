export const TextComponent = ({
  header,
  content,
}: {
  header: string | null;
  content: string | null;
}) => {
  return (
    <div className="min-h-16 mb-5 w-full rounded-lg bg-base-200 p-5 text-center">
      <h1 className="text-2xl">{header}</h1>
      <p>{content}</p>
    </div>
  );
};
