import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

// ── axios 인스턴스 ────────────────────────────────────────────────────────────
// VITE_API_BASE_URL을 baseURL로 설정한다.
// 이 인스턴스를 통해 모든 법령·판례 요청을 보내면, 나중에 baseURL이 바뀌어도
// 이 파일 한 곳만 수정하면 된다.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  timeout: 10_000,
});

// ── 응답 타입 정의 ────────────────────────────────────────────────────────────

export interface StatuteItem {
  id: string | null;
  title: string | null;
  department: string | null;
  effectiveDate: string | null;
}

export interface PrecedentItem {
  id: string | null;
  caseName: string | null;
  caseNumber: string | null;
  court: string | null;
  judgmentDate: string | null;
  summary: string | null;
}

// ── fetch 함수 ────────────────────────────────────────────────────────────────

async function fetchStatutes(keyword: string): Promise<StatuteItem[]> {
  const { data } = await apiClient.get<StatuteItem[]>('/api/legal/statutes', {
    params: { keyword },
  });
  return data;
}

async function fetchPrecedents(keyword: string): Promise<PrecedentItem[]> {
  const { data } = await apiClient.get<PrecedentItem[]>('/api/legal/precedents', {
    params: { keyword },
  });
  return data;
}

// ── TanStack Query 훅 ─────────────────────────────────────────────────────────

/**
 * 단계별 키워드로 법령 목록을 가져온다.
 *
 * staleTime을 1시간으로 설정한 이유:
 *   법령은 수시로 바뀌는 데이터가 아니다. 국회 심의·공포·시행의
 *   절차를 거치므로 하루에 여러 번 바뀔 일이 없다. 따라서 같은
 *   키워드로 1시간 안에 다시 요청이 들어왔을 때는 캐시를 바로 쓰고
 *   외부 API(법제처)를 재호출하지 않는다 → 불필요한 네트워크 비용 절감.
 *   면접 질문: "왜 1시간?" → 법령 업데이트 최소 주기(수 개월)보다는 짧고,
 *   브라우저 세션 내에서 중복 요청을 충분히 막을 수 있는 값이기 때문.
 */
export function useStatutesQuery(keyword: string) {
  return useQuery({
    queryKey: ['statutes', keyword],
    queryFn: () => fetchStatutes(keyword),
    enabled: keyword.length > 0,
    staleTime: 1000 * 60 * 60, // 1시간: 법령은 자주 안 바뀌므로
  });
}

/**
 * 단계별 키워드로 판례 목록을 가져온다.
 *
 * staleTime을 1시간으로 설정한 이유:
 *   확정된 판례는 변경되지 않는다. 선고 후 판례는 사실상 불변이므로
 *   세션 안에서 같은 키워드로 반복 요청할 이유가 없다. 1시간은
 *   불필요한 재호출을 방지하면서도 만약 캐시가 invalidate되더라도
 *   최신 상태를 크게 벗어나지 않는 균형 잡힌 값이다.
 */
export function usePrecedentsQuery(keyword: string) {
  return useQuery({
    queryKey: ['precedents', keyword],
    queryFn: () => fetchPrecedents(keyword),
    enabled: keyword.length > 0,
    staleTime: 1000 * 60 * 60, // 1시간: 법령은 자주 안 바뀌므로
  });
}
