import type { Session } from "next-auth/core/types";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export const SignedIn = ({ data }: { data: Session }) => {
  if (!data.user) return <></>;

  return (
    <div className="dropdown-end dropdown">
      <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
        <div className="w-10 rounded-full">
          <Image
            src={data?.user?.image || ""}
            alt={data?.user?.name || ""}
            width={60}
            height={60}
          />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-200 p-2 shadow"
      >
        <span className="m-2 mx-auto text-sm italic">
          Hello, {data?.user?.name}
        </span>

        <li>
          <Link href="/documents">Documents</Link>
        </li>
        <li>
          <a onClick={() => void signOut()} className="">
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};
