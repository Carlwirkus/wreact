import { h } from "../pragma";
import { Wreact } from "../Wreact";
export function Counter() {
  const [count, setCount] = Wreact.useState(0);
  const [count2, setCount2] = Wreact.useState(0);

  Wreact.useEffect(() => {
    console.log("count 2 changed");
  }, [count2]);

  return (
    <div>
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
    </div>
  );
}
