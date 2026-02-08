import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { extractSkillsFromText, analyzeResumeForRole, ResumeAnalysis } from '@/lib/resumeParser';
import { roles } from '@/data/roles';
import { getResourcesForSkills } from '@/data/skillResources';
import ResourceCard from '@/components/skills/ResourceCard';
import { 
  FileText, 
  Upload,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Lightbulb,
  Target,
  BarChart3,
  Trash2,
  BookOpen,
  ArrowRight,
  Brain
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function ResumePage() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [extractedSkills, setExtractedSkills] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState('software-engineer');
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      if (uploadedFile.type !== 'application/pdf') {
        toast({
          title: 'Invalid file type',
          description: 'Please upload a PDF file',
          variant: 'destructive',
        });
        return;
      }
      setFile(uploadedFile);
      processFile(uploadedFile);
    }
  }, []);

  const processFile = async (uploadedFile: File) => {
    setIsProcessing(true);
    
    // Simulate PDF text extraction with demo content
    // In production, this would use a proper PDF parser
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Demo extracted text - simulating what would be extracted from a resume
    const demoText = `
      John Doe - Software Engineer
      
      Experience:
      - Senior Software Developer at Tech Corp (2020-2023)
      - Built scalable REST APIs using Node.js and Express
      - Developed React applications with TypeScript
      - Managed deployments on AWS using Docker and Kubernetes
      - Implemented CI/CD pipelines with GitHub Actions
      
      Skills:
      - Programming: JavaScript, TypeScript, Python, SQL
      - Frameworks: React, Node.js, Express
      - Cloud: AWS, Docker, Kubernetes
      - Tools: Git, GitHub, Jira, Agile methodologies
      - Database: PostgreSQL, MongoDB, Redis
      
      Education:
      - B.S. Computer Science, State University
    `;
    
    setExtractedText(demoText);
    const skills = extractSkillsFromText(demoText);
    setExtractedSkills(skills);
    
    if (user) {
      updateUser({ skills, resumeUploaded: true });
    }
    
    const roleAnalysis = analyzeResumeForRole(skills, selectedRole);
    setAnalysis(roleAnalysis);
    
    setIsProcessing(false);
    
    toast({
      title: 'Resume processed!',
      description: `Found ${skills.length} skills in your resume.`,
    });
  };

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      if (droppedFile.type !== 'application/pdf') {
        toast({
          title: 'Invalid file type',
          description: 'Please upload a PDF file',
          variant: 'destructive',
        });
        return;
      }
      setFile(droppedFile);
      processFile(droppedFile);
    }
  }, []);

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleRoleChange = (roleId: string) => {
    setSelectedRole(roleId);
    if (extractedSkills.length > 0) {
      const roleAnalysis = analyzeResumeForRole(extractedSkills, roleId);
      setAnalysis(roleAnalysis);
    }
  };

  const clearResume = () => {
    setFile(null);
    setExtractedText('');
    setExtractedSkills([]);
    setAnalysis(null);
    if (user) {
      updateUser({ skills: [], resumeUploaded: false });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-primary/20">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-display">Resume Intelligence</h1>
              <p className="text-muted-foreground">Upload your resume for skill extraction and gap analysis</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upload Section */}
          <div className="lg:col-span-1 space-y-6">
            <Card variant="glass" className="animate-fade-in-delay-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Resume
                </CardTitle>
                <CardDescription>PDF format supported</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                    file ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                  }`}
                >
                  {isProcessing ? (
                    <div className="space-y-3">
                      <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
                      <p className="text-sm text-muted-foreground">Processing resume...</p>
                    </div>
                  ) : file ? (
                    <div className="space-y-3">
                      <CheckCircle2 className="w-12 h-12 text-success mx-auto" />
                      <p className="text-sm font-medium">{file.name}</p>
                      <Button variant="outline" size="sm" onClick={clearResume}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                      <p className="text-sm text-muted-foreground">
                        Drag and drop your PDF resume here, or
                      </p>
                      <label>
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <Button variant="outline" size="sm" asChild>
                          <span className="cursor-pointer">Browse Files</span>
                        </Button>
                      </label>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Role Selection */}
            <Card variant="glass" className="animate-fade-in-delay-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Target Role
                </CardTitle>
                <CardDescription>Select role for gap analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {roles.map(role => (
                    <button
                      key={role.id}
                      onClick={() => handleRoleChange(role.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedRole === role.id
                          ? 'bg-primary/20 border border-primary/30 text-primary'
                          : 'bg-secondary/30 border border-transparent hover:border-border'
                      }`}
                    >
                      <div className="font-medium text-sm">{role.title}</div>
                      <div className="text-xs text-muted-foreground">{role.category}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Section */}
          <div className="lg:col-span-2 space-y-6">
            {analysis ? (
              <>
                {/* Coverage Score */}
                <Card variant="glass" className="animate-fade-in">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                      <div className="relative w-24 h-24">
                        <svg className="w-24 h-24 transform -rotate-90">
                          <circle
                            cx="48"
                            cy="48"
                            r="40"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            className="text-muted"
                          />
                          <circle
                            cx="48"
                            cy="48"
                            r="40"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={`${analysis.coverageScore * 2.51} 251`}
                            className="text-primary transition-all duration-1000"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold">{analysis.coverageScore}%</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-1">Skill Coverage Score</h3>
                        <p className="text-muted-foreground text-sm">
                          {analysis.coverageScore >= 70 
                            ? 'Great match for the selected role!' 
                            : analysis.coverageScore >= 50 
                            ? 'Good foundation, some gaps to address' 
                            : 'Focus on building core skills for this role'}
                        </p>
                      </div>
                      <BarChart3 className={`w-10 h-10 ${
                        analysis.coverageScore >= 70 ? 'text-success' : 
                        analysis.coverageScore >= 50 ? 'text-warning' : 'text-destructive'
                      }`} />
                    </div>
                  </CardContent>
                </Card>

                {/* Extracted Skills */}
                <Card variant="glass" className="animate-fade-in-delay-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                      Extracted Skills ({extractedSkills.length})
                    </CardTitle>
                    <CardDescription>Skills found in your resume</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {extractedSkills.map(skill => (
                        <span 
                          key={skill}
                          className="px-3 py-1.5 rounded-full text-sm font-medium bg-success/20 text-success border border-success/30"
                        >
                          {skill}
                        </span>
                      ))}
                      {extractedSkills.length === 0 && (
                        <p className="text-muted-foreground">No skills detected yet. Upload a resume to begin.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Missing Skills */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card variant="glass" className="animate-fade-in-delay-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-destructive">
                        <XCircle className="w-5 h-5" />
                        Missing Core Skills
                      </CardTitle>
                      <CardDescription>Essential skills you need</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {analysis.missingCoreSkills.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {analysis.missingCoreSkills.map(skill => (
                            <span 
                              key={skill}
                              className="px-3 py-1.5 rounded-full text-sm font-medium bg-destructive/20 text-destructive border border-destructive/30"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-success">
                          <CheckCircle2 className="w-4 h-4" />
                          All core skills covered!
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card variant="glass" className="animate-fade-in-delay-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-warning">
                        <AlertTriangle className="w-5 h-5" />
                        Missing Preferred Skills
                      </CardTitle>
                      <CardDescription>Would boost your profile</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {analysis.missingPreferredSkills.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {analysis.missingPreferredSkills.map(skill => (
                            <span 
                              key={skill}
                              className="px-3 py-1.5 rounded-full text-sm font-medium bg-warning/20 text-warning border border-warning/30"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-success">
                          <CheckCircle2 className="w-4 h-4" />
                          All preferred skills covered!
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Suggestions */}
                <Card variant="glass" className="animate-fade-in-delay-3">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-warning" />
                      Resume Improvement Suggestions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {analysis.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-warning/5 to-transparent border border-warning/20">
                          <TrendingUp className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                          <span className="text-sm">{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* CTA to Skills Intelligence */}
                    <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
                      <div className="flex items-center gap-3 mb-3">
                        <Brain className="w-5 h-5 text-primary" />
                        <span className="font-medium">Want deeper analysis?</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Get skill confidence scores, effort-to-reward rankings, and curated learning resources.
                      </p>
                      <Button variant="outline" size="sm" onClick={() => navigate('/skill-insights')}>
                        View Skill Intelligence
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Learning Resources for Missing Skills */}
                {analysis.missingCoreSkills.length > 0 && (
                  <Card variant="glass" className="animate-fade-in-delay-3">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-primary" />
                        Start Skill Path
                      </CardTitle>
                      <CardDescription>
                        Recommended resources for your missing core skills
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {(() => {
                        const resources = getResourcesForSkills(analysis.missingCoreSkills);
                        if (resources.length === 0) {
                          return (
                            <p className="text-muted-foreground text-sm">
                              No specific resources available for these skills yet.
                            </p>
                          );
                        }
                        return (
                          <div className="space-y-4">
                            {resources.slice(0, 2).map(sr => (
                              <div key={sr.skill}>
                                <h4 className="text-sm font-medium mb-2 text-primary flex items-center gap-2">
                                  <Target className="w-4 h-4" />
                                  {sr.skill}
                                </h4>
                                <div className="grid gap-3">
                                  {sr.resources.slice(0, 2).map(resource => (
                                    <ResourceCard 
                                      key={resource.id} 
                                      resource={resource} 
                                      skillName={sr.skill} 
                                    />
                                  ))}
                                </div>
                              </div>
                            ))}
                            <Button 
                              variant="outline" 
                              className="w-full mt-2"
                              onClick={() => navigate('/skill-insights')}
                            >
                              View All Learning Resources
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        );
                      })()}
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <Card variant="glass" className="animate-fade-in">
                <CardContent className="p-12 text-center">
                  <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Resume Uploaded</h3>
                  <p className="text-muted-foreground mb-6">
                    Upload your resume to see skill extraction and gap analysis
                  </p>
                  <label>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button variant="glow" asChild>
                      <span className="cursor-pointer">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Resume
                      </span>
                    </Button>
                  </label>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
