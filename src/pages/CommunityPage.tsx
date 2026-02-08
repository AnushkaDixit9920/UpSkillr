import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mentorPosts } from '@/data/mentorPosts';
import { 
  Users, 
  Heart,
  MessageCircle,
  BookmarkPlus,
  Filter,
  Sparkles
} from 'lucide-react';

const allTags = Array.from(new Set(mentorPosts.flatMap(post => post.tags)));

export default function CommunityPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const filteredPosts = selectedTag 
    ? mentorPosts.filter(post => post.tags.includes(selectedTag))
    : mentorPosts;

  const toggleLike = (postId: string) => {
    setLikedPosts(prev => {
      const next = new Set(prev);
      if (next.has(postId)) {
        next.delete(postId);
      } else {
        next.add(postId);
      }
      return next;
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-primary/20">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-display">Community & Mentorship</h1>
              <p className="text-muted-foreground">Learn from industry experts and professionals</p>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <Card variant="glass" className="border-accent/30 animate-fade-in-delay-1">
          <CardContent className="p-6 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-accent/20 shrink-0">
              <Sparkles className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Expert Insights</h3>
              <p className="text-sm text-muted-foreground">
                This section features advice from industry professionals working at top companies. 
                Unlike AI-generated content, these insights come from real career experiences.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tag Filter */}
        <Card variant="glass" className="animate-fade-in-delay-2">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="w-4 h-4" />
                Filter:
              </div>
              <Button
                variant={selectedTag === null ? "default" : "outline"}
                size="pill-sm"
                onClick={() => setSelectedTag(null)}
              >
                All
              </Button>
              {allTags.map(tag => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="pill-sm"
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Posts */}
        <div className="space-y-6">
          {filteredPosts.map((post, index) => (
            <Card 
              key={post.id} 
              variant="glass-hover"
              className="animate-fade-in"
              style={{ animationDelay: `${(index + 3) * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{post.author.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                      <div>
                        <h3 className="font-semibold">{post.author.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {post.author.title} at {post.author.company}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground sm:ml-auto">
                        {post.date}
                      </span>
                    </div>
                    
                    <p className="text-foreground leading-relaxed mb-4">
                      {post.content}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => (
                        <span 
                          key={tag}
                          className="pill-tag bg-secondary text-muted-foreground cursor-pointer hover:bg-primary/20 hover:text-primary transition-colors"
                          onClick={() => setSelectedTag(tag)}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                      <button 
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center gap-2 text-sm transition-colors ${
                          likedPosts.has(post.id) ? 'text-destructive' : 'text-muted-foreground hover:text-destructive'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                        {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                      </button>
                      <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        Reply
                      </button>
                      <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors ml-auto">
                        <BookmarkPlus className="w-4 h-4" />
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <Card variant="glass">
            <CardContent className="p-12 text-center">
              <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No posts found</h3>
              <p className="text-muted-foreground">Try selecting a different filter</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
