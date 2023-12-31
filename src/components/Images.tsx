import { h } from "../pragma";
import { Wreact } from "../Wreact";
import { useQuery } from "../hooks/useQuery";
import { ChatBot } from "./ChatBot";

export function Images() {
  const [count, setCount] = Wreact.useState(1);
  const ref = Wreact.useRef<HTMLDivElement>(null);
  const { data, isFetching } = useQuery({
    queryKey: [
      "images",
      {
        page: count,
      },
    ],
    queryFn: async () => {
      const res = await fetch(
        `https://picsum.photos/v2/list?page=${count}&limit=5`,
      );
      return res.json();
    },
    keepPreviousData: true,
  });

  return (
    <div ref={ref} className="bg-blue-100 p-10">
      <h1 className="text-2xl font-bold text-blue-900">
        Wreact - A Worse React
      </h1>
      <h2 className="text-blue-700">This is a demo of a React-like library</h2>

      {isFetching ? <div>Loading...</div> : null}
      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
        }}
      >
        {((data as undefined | any[]) ?? []).map((item: any) => {
          return (
            <div className="col-span-1">
              <img className="object-cover" src={item.download_url} alt="asd" />
            </div>
          );
        })}
      </div>

      <div>Page: {count}</div>
      <div className="space-x-3">
        <button
          className="bg-blue-500 text-white px-3 py-2 rounded"
          onClick={() => {
            setCount((old) => old - 1);
          }}
        >
          {"<"}
        </button>

        <button
          className="bg-blue-500 text-white px-3 py-2 rounded"
          onClick={() => {
            setCount((old) => old + 1);
          }}
        >
          {">"}
        </button>
      </div>

      <ChatBot />
    </div>
  );
}
