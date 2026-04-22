// frontend/src/components/ui/MetricBadge.tsx

interface MetricBadgeProps {
  label: string;
  value: string | number;
}

export const MetricBadge = ({ label, value }: MetricBadgeProps) => {
  return (
    <div className="flex flex-col gap-1 p-4 rounded-lg border border-neutral-800 bg-transparent">
      <span className="text-secondary text-xs uppercase">{label}</span>
      <span className="text-primary text-xl font-medium">{value}</span>
    </div>
  );
};
