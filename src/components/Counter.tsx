import { h } from "../pragma";
import { Wreact } from "../Wreact";
export function Counter() {
  const [count, setCount] = Wreact.useState(0);
  const [count2, setCount2] = Wreact.useState(0);
  const ref = Wreact.useRef(null);

  Wreact.useEffect(() => {
    console.log("count 2 changed");
    ref.current = count2;
  }, [count2]);

  return (
    <div>
      <div>{`${ref.current}`}</div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        {count}
      </button>
      <button
        onClick={() => {
          setCount2(count2 + 1);
        }}
      >
        {count2}
      </button>
      <NestedComponent />
    </div>
  );
}

function NestedComponent() {
  const [count, setCount] = Wreact.useState(0);
  const [count2, setCount2] = Wreact.useState(0);

  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        nested component {count}
      </button>

      <button
        onClick={() => {
          setCount2(count2 + 1);
        }}
      >
        nested component {count2}
      </button>
    </div>
  );
}
