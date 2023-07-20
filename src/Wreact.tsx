import morphdom from "morphdom";

export const Wreact = (function () {
  let _el: any = null;
  let _Component: any = null;
  let idx = 0;
  let oldHooks: any[] | null = null;
  let hooks: any[] = [];
  function workLoop() {
    idx = 0;
    render();
    requestIdleCallback(workLoop, {
      timeout: 25,
    });
  }
  requestIdleCallback(workLoop);

  function render(Component: any = _Component, el: HTMLElement = _el) {
    _el = el;
    _Component = Component;

    //Memoize the hooks to detect changes between renders
    let shouldRender = oldHooks
      ? hooks.some((hook, i) => {
          console.log(hook);

          return !Object.is(hook, oldHooks?.[i]);
        })
      : true;

    if (!shouldRender) {
      return;
    }

    const dom = Component();

    morphdom(el, dom);
  }

  function useState<T>(initialState: T): [T, (newState: T) => void] {
    if (!hooks.hasOwnProperty(idx)) {
      hooks[idx] = initialState;
    }

    let state = hooks[idx];
    let _idx = idx;

    let setState = (newVal: T) => {
      hooks[_idx] = newVal;
    };

    idx++;
    return [state, setState];
  }

  function useEffect(cb: () => void, depArray: any[]) {
    const oldDeps = hooks[idx];
    let hasChanged = true;
    if (oldDeps) {
      hasChanged = depArray.some((dep, i) => !Object.is(dep, oldDeps[i]));
    }
    if (hasChanged) cb();
    hooks[idx] = depArray;
    idx++;
  }

  function useRef<T>(initialValue: T | null = null) {
    return useState<{ current: T | null }>({ current: initialValue })[0];
  }

  return {
    render,
    useState,
    useEffect,
    useRef,
  };
})();
