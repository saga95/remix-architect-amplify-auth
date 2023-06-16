import type { V2_MetaFunction } from "@remix-run/node";
import type { LinksFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import stylesUrl from "~/styles/index.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="container">
      <div className="content">
        <h1>
          GUD <span>PPL!</span>
        </h1>
        <nav>
          <ul>
            <li>
              <Link to="signup">Sign Up</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
