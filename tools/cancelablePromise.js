/**
 * TEAM: frontend_infra
 * WATCHERS: zgotsch
 *
 * @flow strict
 */
// from https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
// TODO(zgotsch): write tests

export type CancelablePromise<T> = {
  promise: Promise<T>,
  cancel: () => void,
};

// eslint-disable-next-line import/prefer-default-export
export function makeCancelable<T>(promise: Promise<T>): CancelablePromise<T> {
  let hasCanceled_ = false;

  const wrappedPromise: Promise<T> = new Promise((resolve, reject) => {
    promise.then(
      // eslint-disable-next-line prefer-promise-reject-errors
      val => (hasCanceled_ ? reject({isCanceled: true}) : resolve(val)),
      // eslint-disable-next-line prefer-promise-reject-errors
      error => (hasCanceled_ ? reject({isCanceled: true}) : reject(error))
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
}
