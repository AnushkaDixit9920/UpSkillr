import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard,
  Target,
  FileText,
  Briefcase,
  Trophy,
  GraduationCap,
  TrendingUp,
  CheckCircle2,
  Circle,
  ArrowRight,
  Building2,
  Compass,
  Upload,
  Calendar,
  Clock
} from 'lucide-react';

// Mock tracking data
const trackingItems = {
  jobs: [
    { id: 1, title: 'Software Engineer', company: 'Google', status: 'Applied', date: '2024-01-15' },
    { id: 2, title: 'Full Stack Developer', company: 'Meta', status: 'Interviewing', date: '2024-01-12' },
    { id: 3, title: 'Backend Engineer', company: 'Stripe', status: 'Wishlist', date: '2024-01-10' },
  ],
  internships: [
    { id: 1, title: 'SWE Intern', company: 'Microsoft', status: 'Applied', date: '2024-01-14' },
  ],
  hackathons: [
    { id: 1, name: 'HackMIT 2024', status: 'Registered', date: '2024-03-15' },
    { id: 2, name: 'TreeHacks', status: 'Interested', date: '2024-02-20' },
  ],
  scholarships: [
    { id: 1, name: 'Google Generation Scholarship', status: 'Applied', deadline: '2024-02-28' },
  ],
};

const statusColors: Record<string, string> = {
  'Applied': 'bg-info/20 text-info',
  'Interviewing': 'bg-warning/20 text-warning',
  'Wishlist': 'bg-muted text-muted-foreground',
  'Registered': 'bg-success/20 text-success',
  'Interested': 'bg-accent/20 text-accent',
  'Offer': 'bg-success/20 text-success',
  'Rejected': 'bg-destructive/20 text-destructive',
};

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  if (!user) return null;

  const overallProgress = user.resumeUploaded 
    ? (user.skills.length > 5 ? 75 : 50) 
    : 25;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-primary/20">
              <LayoutDashboard className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-display">Welcome back, {user.name}!</h1>
              <p className="text-muted-foreground">Here's your career progress overview</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-delay-1">
          <Card variant="glass">
            <CardContent className="p-4 text-center">
              <Target className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{user.targetRole || 'Not Set'}</div>
              <div className="text-xs text-muted-foreground">Target Role</div>
            </CardContent>
          </Card>
          <Card variant="glass">
            <CardContent className="p-4 text-center">
              <FileText className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{user.resumeUploaded ? '✓' : '—'}</div>
              <div className="text-xs text-muted-foreground">Resume Status</div>
            </CardContent>
          </Card>
          <Card variant="glass">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{user.skills.length}</div>
              <div className="text-xs text-muted-foreground">Skills Tracked</div>
            </CardContent>
          </Card>
          <Card variant="glass" className={overallProgress >= 70 ? 'border-success/30' : overallProgress >= 50 ? 'border-warning/30' : 'border-destructive/30'}>
            <CardContent className="p-4 text-center">
              <Trophy className={`w-6 h-6 mx-auto mb-2 ${
                overallProgress >= 70 ? 'text-success' : overallProgress >= 50 ? 'text-warning' : 'text-destructive'
              }`} />
              <div className="text-2xl font-bold">{overallProgress}%</div>
              <div className="text-xs text-muted-foreground">Readiness</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Progress Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Employability Readiness */}
            <Card variant="glass" className="animate-fade-in-delay-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Employability Readiness
                </CardTitle>
                <CardDescription>Complete these steps to boost your profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    {user.resumeUploaded ? (
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground" />
                    )}
                    <span className={user.resumeUploaded ? 'text-foreground' : 'text-muted-foreground'}>
                      Upload your resume
                    </span>
                    {!user.resumeUploaded && (
                      <Button variant="outline" size="sm" className="ml-auto" onClick={() => navigate('/resume')}>
                        <Upload className="w-3 h-3 mr-1" />
                        Upload
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {user.skills.length > 0 ? (
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground" />
                    )}
                    <span className={user.skills.length > 0 ? 'text-foreground' : 'text-muted-foreground'}>
                      Complete skill analysis
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {user.targetRole ? (
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground" />
                    )}
                    <span className={user.targetRole ? 'text-foreground' : 'text-muted-foreground'}>
                      Set target role
                    </span>
                    {!user.targetRole && (
                      <Button variant="outline" size="sm" className="ml-auto" onClick={() => navigate('/exploration')}>
                        <Compass className="w-3 h-3 mr-1" />
                        Explore
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Circle className="w-5 h-5 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Complete company-specific prep
                    </span>
                    <Button variant="outline" size="sm" className="ml-auto" onClick={() => navigate('/companies')}>
                      <Building2 className="w-3 h-3 mr-1" />
                      Start
                    </Button>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Overall Progress</span>
                    <span className="font-medium">{overallProgress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${overallProgress}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skill Progress */}
            {user.skills.length > 0 && (
              <Card variant="glass" className="animate-fade-in-delay-3">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    Your Skills
                  </CardTitle>
                  <CardDescription>{user.skills.length} skills extracted from your resume</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 rounded-full text-sm font-medium bg-success/20 text-success border border-success/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <Button variant="outline" className="mt-4" onClick={() => navigate('/resume')}>
                    View Full Analysis
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Tracking Sidebar */}
          <div className="space-y-6">
            {/* Job Applications */}
            <Card variant="glass" className="animate-fade-in-delay-2">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Briefcase className="w-4 h-4 text-primary" />
                  Job Applications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {trackingItems.jobs.map(job => (
                  <div key={job.id} className="p-2 rounded-lg bg-secondary/30 flex items-center gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{job.title}</p>
                      <p className="text-xs text-muted-foreground">{job.company}</p>
                    </div>
                    <span className={`pill-tag text-[10px] ${statusColors[job.status]}`}>
                      {job.status}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Hackathons */}
            <Card variant="glass" className="animate-fade-in-delay-3">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Trophy className="w-4 h-4 text-primary" />
                  Hackathons
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {trackingItems.hackathons.map(hackathon => (
                  <div key={hackathon.id} className="p-2 rounded-lg bg-secondary/30 flex items-center gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{hackathon.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {hackathon.date}
                      </p>
                    </div>
                    <span className={`pill-tag text-[10px] ${statusColors[hackathon.status]}`}>
                      {hackathon.status}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Scholarships */}
            <Card variant="glass" className="animate-fade-in-delay-3">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  Scholarships
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {trackingItems.scholarships.map(scholarship => (
                  <div key={scholarship.id} className="p-2 rounded-lg bg-secondary/30 flex items-center gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{scholarship.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Due: {scholarship.deadline}
                      </p>
                    </div>
                    <span className={`pill-tag text-[10px] ${statusColors[scholarship.status]}`}>
                      {scholarship.status}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
