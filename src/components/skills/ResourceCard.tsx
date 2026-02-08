import { LearningResource } from '@/data/skillResources';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Video, 
  FileText, 
  Code, 
  Layers,
  Clock,
  Target,
  Zap,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResourceCardProps {
  resource: LearningResource;
  skillName: string;
}

export default function ResourceCard({ resource, skillName }: ResourceCardProps) {
  const typeIcons = {
    course: BookOpen,
    video: Video,
    documentation: FileText,
    practice: Code,
    project: Layers
  };
  
  const TypeIcon = typeIcons[resource.type];
  
  const levelColors = {
    beginner: 'bg-success/20 text-success border-success/30',
    intermediate: 'bg-warning/20 text-warning border-warning/30',
    advanced: 'bg-destructive/20 text-destructive border-destructive/30'
  };
  
  const effortColors = {
    low: 'text-success',
    medium: 'text-warning',
    high: 'text-destructive'
  };
  
  return (
    <Card variant="glass" className="group hover:border-primary/30 transition-all">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <TypeIcon className="w-5 h-5 text-primary" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium text-sm truncate">{resource.title}</h4>
              <span className={cn(
                'px-2 py-0.5 rounded-full text-[10px] font-medium border',
                levelColors[resource.level]
              )}>
                {resource.level}
              </span>
            </div>
            
            <p className="text-xs text-muted-foreground mb-2">{resource.provider}</p>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {resource.duration}
              </span>
              <span className={cn('flex items-center gap-1', effortColors[resource.effort])}>
                <Zap className="w-3 h-3" />
                {resource.effort} effort
              </span>
            </div>
            
            <div className="flex items-start gap-2 p-2 rounded-lg bg-secondary/30">
              <Target className="w-3 h-3 text-primary shrink-0 mt-0.5" />
              <span className="text-xs">{resource.outcome}</span>
            </div>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          Start Learning
          <ArrowRight className="w-3 h-3 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
}
