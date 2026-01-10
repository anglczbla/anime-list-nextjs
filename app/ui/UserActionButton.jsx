import Link from "next/link";
import { authUserSession } from "../libs/auth";

const UserActionButton = async () => {
  const user = await authUserSession();
  const actionLabel = user ? "Sign Out" : "Sign In";
  const actionURL = user ? "/api/auth/signout?callbackUrl=/" : "/api/auth/signin";

  return (
    <div>
      <Link href={actionURL} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-md transition-colors text-sm font-semibold border border-slate-200 dark:border-slate-700">
        {actionLabel}
      </Link>
    </div>
  );
};

export default UserActionButton;
