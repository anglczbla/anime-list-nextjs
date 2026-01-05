import Link from "next/link";
const Header = ({ title, linkHref, linkTitle }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      {linkHref && linkTitle ? (
        <Link
          href={linkHref}
          className="text-xl underline hover:text-indigo-500 transition-all"
        >
          {linkTitle}
        </Link>
      ) : null}
    </div>
  );
};

export default Header;
