import { signIn } from "next-auth/react";

export const SignedOut = () => {
  return (
    <div className="dropdown-end dropdown">
      <label tabIndex={0} className="btn-default avatar btn">
        Sign In
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-200 p-2 shadow"
      >
        <li>
          <a onClick={() => void signIn("discord")}>Using Discord</a>
        </li>
        <li>
          <a onClick={() => void signIn("github")}>Using GitHub</a>
        </li>
      </ul>
    </div>
  );
};
