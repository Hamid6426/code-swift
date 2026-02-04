export default function Loader({ size = 5 }: { size?: number }) {
  return (
    <div
      className={`w-${size} h-${size} border-4 border-t-blue-600 border-gray-200 rounded-full animate-spin`}
      role="status"
      aria-label="loading"
    />
  );
}
