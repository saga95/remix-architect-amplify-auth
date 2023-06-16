import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Amplify } from "aws-amplify";

// export const links: LinksFunction = () => [
//   ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
// ];

import globalLargeStylesUrl from "~/styles/global-large.css";
import globalMediumStylesUrl from "~/styles/global-medium.css";
import globalStylesUrl from "~/styles/global.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: globalStylesUrl },
  {
    rel: "stylesheet",
    href: globalMediumStylesUrl,
    media: "print, (min-width: 640px)",
  },
  {
    rel: "stylesheet",
    href: globalLargeStylesUrl,
    media: "screen and (min-width: 1024px)",
  },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {/* <Meta /> */}
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

Amplify.configure({
  Auth: {
    // (required) only for Federated Authentication - Amazon Cognito Identity Pool ID
    // identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',

    // (required)- Amazon Cognito Region
    region: 'us-west-2',

    // (optional) - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    // identityPoolRegion: 'XX-XXXX-X',

    // (optional) - Amazon Cognito User Pool ID
    userPoolId: '<user pool id>',

    // (optional) - Amazon Cognito Web Client ID (26-char alphanumeric string, App client secret needs to be disabled)
    userPoolWebClientId: '<client id>',

    // (optional) - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: true,

    // (optional) - Configuration for cookie storage
    // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
    // cookieStorage: {
      // - Cookie domain (only required if cookieStorage is provided)
      // domain: '.yourdomain.com',
      // (optional) - Cookie path
      // path: '/',
      // (optional) - Cookie expiration in days
      // expires: 365,
      // (optional) - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
      // sameSite: 'strict' | 'lax',
      // (optional) - Cookie secure flag
      // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
      // secure: true
    // },

    // (optional) - customized storage object
    // storage: MyStorage,

    // (optional) - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    // authenticationFlowType: 'USER_PASSWORD_AUTH',

    // (optional) - Manually set key value pairs that can be passed to Cognito Lambda Triggers
    // clientMetadata: { myCustomKey: 'myCustomValue' },

    // (optional) - Hosted UI configuration
    oauth: {
      domain: 'scenario-one-domain.auth.us-west-2.amazoncognito.com',
      scope: [
        'phone',
        'email',
        'profile',
        'openid',
        'aws.cognito.signin.user.admin'
      ],
      redirectSignIn: 'https://localhost:3333/',
      redirectSignOut: 'https://localhost:3333/',
      clientId: '<client id>',
      responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
    }
  }
});