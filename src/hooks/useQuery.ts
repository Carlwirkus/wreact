import { QueryClient, QueryObserver } from "@tanstack/query-core";
import { Wreact } from "../Wreact";
import { QueryObserverOptions } from "@tanstack/query-core/src/types";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

export function useQuery(options: QueryObserverOptions<any, any, any, any>) {
  const [_, forceUpdate] = Wreact.useState<any>("idle");

  // @ts-ignore
  const defaultedOptions = queryClient.defaultQueryOptions(options);

  const [observer] = Wreact.useState<QueryObserver>(
    new QueryObserver(queryClient, defaultedOptions),
  );

  const result = observer.getOptimisticResult(defaultedOptions);

  Wreact.useEffect(() => {
    observer.setOptions(defaultedOptions);
  }, [options]);

  observer.subscribe((props) => {
    forceUpdate(props.status);
  });

  return observer.trackResult(result);
}
