export interface MentorPost {
  id: string;
  author: {
    name: string;
    title: string;
    company: string;
    avatar: string;
  };
  content: string;
  tags: string[];
  date: string;
  likes: number;
}

export const mentorPosts: MentorPost[] = [
  {
    id: '1',
    author: {
      name: 'Sarah Chen',
      title: 'Senior Software Engineer',
      company: 'Google',
      avatar: '👩‍💻'
    },
    content: 'When preparing for coding interviews, focus on understanding patterns rather than memorizing solutions. I categorize problems into about 15-20 patterns (sliding window, two pointers, BFS/DFS, etc.). Once you recognize the pattern, the solution becomes much clearer. Spend at least 3 months with consistent daily practice.',
    tags: ['Software Engineering', 'Interviews', 'DSA'],
    date: '2 days ago',
    likes: 234
  },
  {
    id: '2',
    author: {
      name: 'Michael Park',
      title: 'Product Manager',
      company: 'Meta',
      avatar: '👨‍💼'
    },
    content: 'Breaking into PM without an MBA: Build products. I started with side projects, contributed to open source, and documented everything. Your portfolio matters more than credentials. Practice frameworks like RICE and CIRCLES, but remember that real-world PM work is messier than frameworks suggest.',
    tags: ['Product Management', 'Career Switch'],
    date: '3 days ago',
    likes: 189
  },
  {
    id: '3',
    author: {
      name: 'Priya Sharma',
      title: 'Data Science Lead',
      company: 'Netflix',
      avatar: '👩‍🔬'
    },
    content: 'The biggest gap I see in aspiring data scientists: communication skills. You can build the best model, but if you can\'t explain insights to stakeholders, your impact is limited. Practice presenting findings to non-technical audiences. Learn to tell stories with data.',
    tags: ['Data Science', 'Communication', 'Career Growth'],
    date: '1 week ago',
    likes: 312
  },
  {
    id: '4',
    author: {
      name: 'James Liu',
      title: 'Engineering Manager',
      company: 'Amazon',
      avatar: '👨‍💻'
    },
    content: 'For those targeting senior roles: technical skills get you in the door, but leadership and influence get you promoted. Document your impact, mentor others, and proactively solve team-level problems. The jump from IC to senior requires demonstrating ownership beyond your immediate tasks.',
    tags: ['Engineering', 'Leadership', 'Career Growth'],
    date: '1 week ago',
    likes: 278
  },
  {
    id: '5',
    author: {
      name: 'Emily Watson',
      title: 'UX Design Director',
      company: 'Airbnb',
      avatar: '👩‍🎨'
    },
    content: 'Portfolio tip: Quality over quantity. 3-4 deep case studies beat 10 superficial ones. Show your process: research, iterations, failures, and learnings. Include metrics when possible. And please, make your portfolio accessible and responsive — it\'s part of demonstrating UX skills.',
    tags: ['UX Design', 'Portfolio', 'Career Advice'],
    date: '2 weeks ago',
    likes: 245
  },
  {
    id: '6',
    author: {
      name: 'David Rodriguez',
      title: 'DevOps Architect',
      company: 'Stripe',
      avatar: '🧑‍💻'
    },
    content: 'Automation mindset is everything in DevOps. If you do something twice, automate it. Start with CI/CD basics, then move to infrastructure as code. Kubernetes is powerful but complex — learn Docker well first. Also, security shouldn\'t be an afterthought; integrate it from day one.',
    tags: ['DevOps', 'Cloud', 'Automation'],
    date: '2 weeks ago',
    likes: 198
  }
];
