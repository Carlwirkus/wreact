import { QueryClient, QueryObserver, QueryOptions } from "@tanstack/query-core";
import { Wreact } from "../Wreact";

const queryClient = new QueryClient();

export function useQuery(options: QueryOptions) {
  const defaultedOptions = queryClient.defaultQueryOptions(options);

  const [observer] = Wreact.useState<QueryObserver>(
    new QueryObserver(queryClient, defaultedOptions),
  );

  const result = observer.getOptimisticResult(defaultedOptions);

  const hash = defaultedOptions.queryHash;

  Wreact.useEffect(() => {
    console.log("query changed");
    observer.fetchOptimistic(defaultedOptions);
  }, [hash]);

  Wreact.useEffect(() => {
    observer.setOptions(defaultedOptions);
  }, [options]);

  return observer.trackResult(result);
}
