import Link from "next/link";
const Header = ({ title, linkHref, linkTitle }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-indigo-900 dark:text-indigo-300">{title}</h1>
      {linkHref && linkTitle ? (
        <Link
          href={linkHref}
          className="text-xl underline text-indigo-700 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-all"
        >
          {linkTitle}
        </Link>
      ) : null}
    </div>
  );
};

export default Header;
