/**
 * TEAM: frontend_infra
 * @flow strict
 */

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments to provide
 * information about what broke and what you were expecting.
 *
 * This is a customized version of Facebook's invariant assertion helper[1].
 *
 * TODO(dmnd): Once this is used in a lot of places implement error codes so
 * that the messages are stripped from production builds.
 *
 * [1]: https://github.com/facebook/fbjs/blob/master/packages/fbjs/src/__forks__/invariant.js
 */

export default function invariant(
  condition: boolean,
  format: string,
  ...args: Array<string>
) {
  if (!condition) {
    // We use sprintf instead of template strings because we only want to do the
    // (sometimes nontrivial) work of building the final message when the
    // invariant is violated.
    let i = 0;
    const message = format
      ? format.replace(/%s/g, () => {
          const a = args[i];
          i += 1;
          return a;
        })
      : "Invariant violated without message.";
    throw new Error(message);
  }
}
