import { isStatuteExpired, statuteExpiredText, statuteWarningText } from './statuteWarning';

interface Props {
  months: number;
}

export default function StatuteWarningBanner({ months }: Props) {
  const text = isStatuteExpired(months) ? statuteExpiredText(months) : statuteWarningText(months);

  return (
    <div role="alert" className="action-item action-item--urgent mb-4">
      <span className="urgent-badge">긴급</span>
      <div>{text}</div>
    </div>
  );
}
