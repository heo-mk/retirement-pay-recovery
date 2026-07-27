import { useMemo } from 'react';
import { useProgressStore } from '../../stores/progressStore';

export interface RecommendedAction {
  id: string;
  text: string;
  isUrgent?: boolean;
}

// 파생 로직은 스토어가 아닌 훅에서 useMemo로 계산한다.
// 이유: persist 미들웨어가 JSON 직렬화 시 함수를 제거하기 때문.
export function useRecommendedActions(): RecommendedAction[] {
  const currentStage = useProgressStore((s) => s.currentStage);
  const caseDetails = useProgressStore((s) => s.caseDetails);

  return useMemo(() => {
    const actions: RecommendedAction[] = [];
    const { monthsElapsed, hasCorrectionOrderIgnored, agreementStatus } = caseDetails;

    // 소멸시효 경고: 33개월(약 3년)을 넘으면 최우선 경고
    if (monthsElapsed !== null && monthsElapsed >= 33) {
      actions.push({
        id: 'statute-warning',
        text: `소멸시효가 얼마 남지 않았습니다 (현재 ${monthsElapsed}개월 경과). 즉시 법원 지급명령 또는 소 제기를 통해 시효를 중단시키세요.`,
        isUrgent: true,
      });
    }

    // 퇴직 전 합의 작성 ➡️ 법적 무효 긴급 고지
    if (agreementStatus === 'pre_retirement') {
      actions.push({
        id: 'pre-agreement-invalid',
        text: '퇴직 전(재직 중) 작성한 지급연기 각서는 법적으로 무효입니다. 퇴직 후 14일 경과 시 즉시 고용노동부에 진정을 제기할 수 있습니다.',
        isUrgent: true,
      });
    } else if (agreementStatus === 'post_retirement_within_14d') {
      actions.push({
        id: 'post-agreement-valid',
        text: '퇴직 후 14일 이내에 한 합의는 법적 효력이 발생하므로 약정 기한까지 대기 후 진정하세요. (신뢰할 수 없다면 추가 연장 합의는 절대 금지)',
      });
    } else if (agreementStatus === 'post_retirement_no_agreement') {
      actions.push({
        id: 'post-no-agreement',
        text: '사용자를 신뢰할 수 없다면 퇴직 후 14일 이내 지급연기 합의를 하지 마세요. 14일 경과 직후 즉시 노동청 진정을 제기하세요.',
      });
    }

    // 시정명령 무시 → 형사 고소 병행 권고
    if (hasCorrectionOrderIgnored === true) {
      actions.push({
        id: 'criminal-charge',
        text: '사업주가 시정명령을 어겼다면 형사 고소도 함께 검토하세요. 근로기준법 위반으로 처벌이 가능합니다.',
      });
    }

    // 단계별 핵심 추천 행동
    switch (currentStage) {
      case 'received_check':
      case 'time_elapsed':
      case 'agreement_check':
        actions.push(
          { id: 'file-complaint', text: '퇴직 후 14일 경과 시 즉시 고용노동부 고객상담센터(☎1350) 또는 노동청에 진정을 접수하세요.' }
        );
        break;
      case 'complaint_filed':
        actions.push({ id: 'wait-correction', text: '근로감독관의 시정명령 결과를 기다리세요. 진행 상황은 고용노동부 민원마당에서 조회할 수 있습니다.' });
        break;
      case 'execution_title':
        actions.push({ id: 'get-title', text: '법원에 지급명령(독촉절차)을 신청하거나 소액사건심판을 청구해 집행권원을 확보하세요.' });
        break;
      case 'forced_execution':
        actions.push({ id: 'try-execution', text: '확보한 집행권원으로 법원에 강제집행(재산 압류·추심 명령)을 신청하세요.' });
        break;
      case 'opponent_resisting':
        actions.push({ id: 'keep-execution', text: '강제집행 신청서를 제출하고 집행관 사무소에 협조를 요청하세요.' });
        break;
      case 'advanced_tactics':
        actions.push(
          { id: 'seizure', text: '은행 예금·급여에 대한 채권 압류·추심 명령을 신청하세요.' },
          { id: 'certified-mail', text: '내용증명을 발송해 사업주에게 법적 대응 의지를 명확히 전달하세요.' },
          { id: 'daeji', text: '간이대지급금 제도를 통해 근로복지공단에서 미지급 퇴직금 일부를 먼저 수령할 수 있습니다.' }
        );
        break;
      case 'resolved':
        actions.push({ id: 'done', text: '퇴직금 회수가 완료되었습니다. 수령 내역을 꼼꼼히 확인하고 보관하세요.' });
        break;
    }

    return actions;
  }, [currentStage, caseDetails]);
}
