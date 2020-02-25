Contributing
============

Latitude is currently designed only for internal use at Flexport. If you're not
at Flexport, feel free to poke around, but we don't recommend using Latitude.
(At least, not yet.)

Flexport engineers: we believe that our design system is strongest when everyone
contributes. This page contains guidelines and workflow tips that should make
it easy to contribute.

## Versioning philosophy
Latitude is versionless. It's also not published as an npm module. Instead,
in the monorepo:

* `package.json` file points at the Latitude master branch on GitHub
* `yarn.lock` pins Latitude to a particular SHA

This setup aims to reduce friction for internal Latitude contributors.

## Pull request guidelines

Before you submit a pull request, check that it meets these guidelines:

1. If your pull request fixes a bug, it should include tests that fail without
   the change, and passes with them.
2. If your pull request adds functionality, update all relevant documentation
   (component doc blocks, prop doc blocks, etc). Don't forget tests.
3. Pull requests that introduce breaking changes should be accompanied by a
   monorepo pull request that updates all call-sites.
