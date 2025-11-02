import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="h-screen flex flex-col items-center justify-center text-center bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200">
      <h1 className="text-6xl font-bold text-green-700 mb-4">404</h1>
      <p className="text-lg mb-6">Oops! The page you’re looking for doesn’t exist.</p>
      <Link
        to="/"
        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
      >
        Back to Home
      </Link>
    </main>
  );
}
