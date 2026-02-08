import { cn } from '@/lib/utils';

interface SkillConfidenceRingProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showLabel?: boolean;
}

export default function SkillConfidenceRing({ 
  score, 
  size = 'md',
  className,
  showLabel = true
}: SkillConfidenceRingProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-28 h-28'
  };
  
  const strokeWidth = size === 'sm' ? 4 : size === 'md' ? 6 : 8;
  const textSize = size === 'sm' ? 'text-xs' : size === 'md' ? 'text-lg' : 'text-2xl';
  
  const getColorClass = (score: number) => {
    if (score >= 70) return 'text-success';
    if (score >= 50) return 'text-warning';
    if (score >= 30) return 'text-info';
    return 'text-destructive';
  };
  
  const radius = size === 'sm' ? 20 : size === 'md' ? 36 : 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = (score / 100) * circumference;
  
  return (
    <div className={cn('relative', sizeClasses[size], className)}>
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-muted"
        />
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${strokeDasharray} ${circumference}`}
          strokeLinecap="round"
          className={cn(getColorClass(score), 'transition-all duration-1000')}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn('font-bold', textSize)}>{score}</span>
        </div>
      )}
    </div>
  );
}
