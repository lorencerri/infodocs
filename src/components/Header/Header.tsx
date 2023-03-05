import { useSession } from "next-auth/react";
import { SignedOut } from "./SignedOut";
import { SignedIn } from "./SignedIn";
import Link from "next/link";

export const Header = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="navbar mt-5 rounded-lg bg-base-200">
      <div className="flex-1">
        <Link href="/" className="btn-ghost btn text-xl normal-case">
          Info<span className="text-cyan-500">Docs</span>
        </Link>
      </div>
      <div className="flex-none">
        {sessionData?.user ? <SignedIn data={sessionData} /> : <SignedOut />}
      </div>
    </div>
  );
};
