import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm py-4 px-6 flex items-center justify-between fixed top-0 left-0 z-10">
      <Link
        href="/"
        className="text-purple-700 font-semibold text-lg hover:underline flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
        Volver al inicio
      </Link>
    </header>
  );
};
export default Header;
