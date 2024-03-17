/**
 * Clean specific element
 * @param {HTMLElement} el
 * @return {HTMLElement}
 */
export function emptyElement(el) {
  el.innerHTML = '';

  return el;
}

/** @type {WeakMap<{}, {}>} */
const scopeCallbackWeakMap = new WeakMap();

/**
 * Help a callback to have a fixed scope.
 *
 * if the return of a callback is a function or object, than it can use `newScope` to create a new scope.
 *
 * @template C
 * @param {(scope: {}) => C} callback
 *
 * @return {C}
 */
export function useScope(callback) {
  const context = callback.apply(this);

  if (typeof context === 'function' || typeof context === 'object') {
    scopeCallbackWeakMap.set(context, callback);
  }

  return context;
}

/**
 * Use context to general a new scope.
 *
 * @template T
 * @param {T} context
 *
 * @return {T}
 */
export function newScope(context) {
  if (scopeCallbackWeakMap.has(context)) {
    const callback = scopeCallbackWeakMap.get(context);

    return useScope(callback);
  } else {
    throw new Error('Scope is only working on object or function return.');
  }
}
