export default function ErrorComponent({
  message = "An error occurred",
}: {
  message?: any;
}) {
  return (
    <div className="flex items-center justify-center h-full py-10 min-h-screen">
      <p className="text-red-600">Error: {message}</p>
    </div>
  );
}
