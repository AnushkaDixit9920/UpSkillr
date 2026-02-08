import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getRoleById } from '@/data/roles';
import { 
  ArrowLeft, 
  Target, 
  Layers, 
  Heart,
  GraduationCap,
  Users,
  Clock,
  DollarSign,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';

export default function RoleDetailPage() {
  const { roleId } = useParams();
  const role = getRoleById(roleId || '');

  if (!role) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Role not found</h2>
          <Button asChild>
            <Link to="/exploration">Back to Exploration</Link>
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const demandColors: Record<string, string> = {
    'High': 'bg-success/20 text-success border-success/30',
    'Medium': 'bg-warning/20 text-warning border-warning/30',
    'Growing': 'bg-info/20 text-info border-info/30',
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Back Button */}
        <Link 
          to="/exploration" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Exploration
        </Link>

        {/* Header */}
        <div className="animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex-1">
              <div className="text-sm text-primary font-medium mb-2">{role.category}</div>
              <h1 className="text-4xl font-bold font-display mb-4">{role.title}</h1>
              <p className="text-lg text-muted-foreground">{role.description}</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-delay-1">
          <Card variant="glass">
            <CardContent className="p-4 text-center">
              <DollarSign className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-lg font-bold">{role.salaryRange}</div>
              <div className="text-xs text-muted-foreground">Salary Range</div>
            </CardContent>
          </Card>
          <Card variant="glass" className={demandColors[role.demandLevel]}>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-6 h-6 mx-auto mb-2" />
              <div className="text-lg font-bold">{role.demandLevel}</div>
              <div className="text-xs opacity-80">Market Demand</div>
            </CardContent>
          </Card>
          <Card variant="glass">
            <CardContent className="p-4 text-center">
              <GraduationCap className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-lg font-bold">{role.preferredBackground}</div>
              <div className="text-xs text-muted-foreground">Background</div>
            </CardContent>
          </Card>
          <Card variant="glass">
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-lg font-bold">{role.timeline.length}</div>
              <div className="text-xs text-muted-foreground">Learning Phases</div>
            </CardContent>
          </Card>
        </div>

        {/* Degree Requirement */}
        <Card variant="glass" className="animate-fade-in-delay-1">
          <CardContent className="p-4 flex items-start gap-3">
            <GraduationCap className="w-5 h-5 text-info shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-info font-medium">Degree Requirement</p>
              <p className="text-sm text-muted-foreground">{role.degreeRequirement}</p>
            </div>
          </CardContent>
        </Card>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Core Skills */}
          <Card variant="glass" className="animate-fade-in-delay-2">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">Core Technical Skills</CardTitle>
              </div>
              <CardDescription>Essential skills you must have</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {role.coreSkills.map((skill, index) => (
                  <li key={index} className="flex items-start gap-2 p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{skill}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Supporting Skills */}
          <Card variant="glass" className="animate-fade-in-delay-2">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-info" />
                <CardTitle className="text-lg">Supporting Skills</CardTitle>
              </div>
              <CardDescription>Skills that enhance your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {role.supportingSkills.map((skill, index) => (
                  <li key={index} className="flex items-start gap-2 p-2 rounded-lg bg-info/10 border border-info/20">
                    <CheckCircle2 className="w-4 h-4 text-info shrink-0 mt-0.5" />
                    <span className="text-sm">{skill}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Behavioral Skills */}
          <Card variant="glass" className="animate-fade-in-delay-2">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-accent" />
                <CardTitle className="text-lg">Behavioral Skills</CardTitle>
              </div>
              <CardDescription>Soft skills for success</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {role.behavioralSkills.map((skill, index) => (
                  <li key={index} className="flex items-start gap-2 p-2 rounded-lg bg-accent/10 border border-accent/20">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">{skill}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Preparation Timeline */}
        <Card variant="glass" className="animate-fade-in-delay-3">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <CardTitle>Preparation Timeline</CardTitle>
            </div>
            <CardDescription>Your roadmap to becoming a {role.title}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary via-info to-accent" />
              
              <div className="space-y-6">
                {role.timeline.map((phase, index) => {
                  const colors = ['primary', 'info', 'accent'];
                  const color = colors[index % colors.length];
                  return (
                    <div key={index} className="relative pl-12">
                      {/* Timeline dot */}
                      <div className={`absolute left-2 top-2 w-5 h-5 rounded-full bg-${color}/20 border-2 border-${color} flex items-center justify-center`}>
                        <div className={`w-2 h-2 rounded-full bg-${color}`} />
                      </div>
                      
                      <Card variant="glass" className="border-l-2" style={{ borderLeftColor: `hsl(var(--${color}))` }}>
                        <CardContent className="p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                            <h4 className="font-semibold">{phase.phase}</h4>
                            <span className="pill-tag bg-secondary text-muted-foreground">
                              {phase.duration}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {phase.focus.map((item, i) => (
                              <span key={i} className="text-xs px-2 py-1 rounded-lg bg-secondary/50 text-foreground">
                                {item}
                              </span>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
