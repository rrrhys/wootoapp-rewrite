## What is this

Wootoapp is a native app builder for eCommerce stores.

The original version was a learning tool and proof of concept.

The app builder is being rewritten using better practices and better tooling.

## Where to from here

The original data layer (data/woo.ts, data/api.ts) are clean and concise and are not being changed.

The original server stack, Cloudflare webworkers in front of a small laravel app, is not being changed (yet).

The original react-native front-end had an example store and was hot swappable to other stores on the fly. This will not be supported in the new version -- I'm lucky it was ever approved by Apple in the first place.

The new version will be viewable and modifiable over web, and the user will ultimately request an iOS/Android build to download. The request will be queued and will trigger a worker to pull the code base, inject a new environment (env.ts) and run a build.

## Secrets

The only secrets in the app are in env.ts.
Since the client app should be considered vulnerable from the outsets, these secrets should only be as 'secret' as the underlying store.
Any POST/PUTs that take place against a store require an authenticated user, and the mobile app is only a facilitator. Any GETs against the test store are not considered secret.

## Technology

The base app is an **ejected expo app** running RN 0.59, which is currently being run as a react-native-web interface.

**Typescript** is used for strong typing, especially useful for API responses and working with the redux store.

**Redux, redux-thunk and redux-persist** are used for state management and persistence. The app should be able to be used completely offline to browse all aspects of the site.
A connection will be required to begin the checkout process (where product objects are checked against the server etc)

**react-navigation** is used for routing/navigating.

**code-push** is used for over the air code updates.

**react-native-elements** is used for basic UI components.

## Using the project

`yarn`

`yarn web`

visit localhost:19006 _Be aware of issues below_

## Issues

The server implementation does not allow browsers through via CORS. To test on WEB currently, use a chrome browser with --disable-web-security flag.
