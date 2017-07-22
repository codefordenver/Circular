export default function apiMiddleware() {
  return () => next => (action) => {
    const {
      type,
      promise,
      ...rest
    } = action;

    if (!promise) return next(action);

    const REQUEST = `${type}_REQUEST`;
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;

    next({
      ...rest,
      type: REQUEST
    });

    return promise
      .then(
        response => next({ ...rest, response, type: SUCCESS }),
        error => next({ ...rest, error, type: FAILURE })
      );
  };
}

