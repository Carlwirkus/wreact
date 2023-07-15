export const Wreact = (function () {
  let _el: any = null;
  let _Component: any = null;
  let idx = 0;
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

    const dom = Component();
    el.childNodes.forEach((node) => {
      el.removeChild(node);
    });

    el.append(dom);
  }

  function useState<T>(initialState: T): [T, (newState: T) => void] {
    let state = hooks[idx] || initialState;
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

  return {
    render,
    useState,
    useEffect,
  };
})();
