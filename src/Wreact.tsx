export const Wreact = (function () {
  let _el: any = null;
  let _Component: any = null;
  let idx = 0;
  let oldHooks: any[] | null = null;
  let hooks: any[] = [];
  function workLoop() {
    idx = 0;
    render();
    setTimeout(workLoop, 300);
  }
  setTimeout(workLoop, 300);

  function render(Component: any = _Component, el: HTMLElement = _el) {
    _el = el;
    _Component = Component;

    //Memoize the hooks to detect changes between renders
    let shouldRender = oldHooks
      ? hooks.some((hook, i) => {
          return !Object.is(hook, oldHooks?.[i]);
        })
      : true;

    if (!shouldRender) {
      return;
    }

    // nuke the existing rendered elements
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }

    const dom = Component();

    // mount the new ones
    el.appendChild(dom);
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
