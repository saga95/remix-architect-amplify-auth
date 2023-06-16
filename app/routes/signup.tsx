import type { ActionArgs, LinksFunction } from "@remix-run/node";
import { Form, Link, useSearchParams, useSubmit } from "@remix-run/react";
import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';

import stylesUrl from "~/styles/login.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];

export async function action({ request }: ActionArgs) {
  const form = await request.formData();
  console.log("form: ", form);

  console.log("request: ", request);
  return null
}
export default function SignUpRoute() {

  return (
    <div className="container">
      <div className="content" data-light="">
        <h1>Sign Up</h1>
        <Form method="post" action="/signup">
          <div>
            <label htmlFor="username-input">Username</label>
            <input
              type="text"
              id="username-input"
              name="username"
            />
          </div>
          <div>
            <label htmlFor="password-input">Password</label>
            <input
              id="password-input"
              name="password"
              type="password"
            />
          </div>
          <button type="submit" className="button">
            Submit
          </button>
        </Form>
      </div>
      <div className="links">
        <ul>
          <li>
            <Link to="/">Sign In</Link>
          </li>
          <li>
            <button onClick={() => Auth.federatedSignIn({
              provider: CognitoHostedUIIdentityProvider.Facebook
            })}>Sign In with Facebook</button>
          </li>
          <li>
            <button onClick={() => Auth.federatedSignIn({
              provider: CognitoHostedUIIdentityProvider.Google
            })}>Sign In with Google</button>
          </li>
          <li>
            <button onClick={() => Auth.federatedSignIn({
              provider: CognitoHostedUIIdentityProvider.Apple
            })}>Sign In with Apple</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
