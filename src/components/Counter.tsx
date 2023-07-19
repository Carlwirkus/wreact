import { h } from "../pragma";
import { Wreact } from "../Wreact";
import { useQuery } from "../hooks/useQuery";

export function Counter() {
  const [count, setCount] = Wreact.useState(1);
  const ref = Wreact.useRef<HTMLDivElement>(null);
  const { data } = useQuery({
    queryKey: [
      "images",
      {
        page: count,
      },
    ],
    queryFn: async () => {
      const res = await fetch(
        `https://picsum.photos/v2/list?page=${count}&limit=10`,
      );
      return res.json();
    },
  });

  return (
    <div ref={ref}>
      {((data as undefined | any[]) ?? []).map((item: any) => {
        return <img width={200} src={item.download_url} alt="asd" />;
      })}

      <div>Page: {count}</div>
      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        {"<"}
      </button>

      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        {">"}
      </button>
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
