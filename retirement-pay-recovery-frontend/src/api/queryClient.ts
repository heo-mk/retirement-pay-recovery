import { QueryClient } from '@tanstack/react-query';

// refetchOnWindowFocus: false — 법령·판례 데이터는 실시간성이 낮아
// 창을 다시 포커스할 때마다 재요청할 필요가 없다. UX 불필요한 네트워크 비용 절감.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
