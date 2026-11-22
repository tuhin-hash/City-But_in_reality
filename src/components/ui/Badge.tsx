import React from 'react';

type BadgeVariant = 'default' | 'lime' | 'orange' | 'coral' | 'blue' | 'muted' | 'done' | 'blocked' | 'review' | 'progress';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-[#202420] text-[#969B92] border-[#2A2E2A]',
  lime: 'bg-[#C6FF54]/10 text-[#C6FF54] border-[#C6FF54]/30',
  orange: 'bg-[#FF8B45]/10 text-[#FF8B45] border-[#FF8B45]/30',
  coral: 'bg-[#FF5E5E]/10 text-[#FF5E5E] border-[#FF5E5E]/30',
  blue: 'bg-[#79B8FF]/10 text-[#79B8FF] border-[#79B8FF]/30',
  muted: 'bg-[#181B18] text-[#969B92] border-[#2A2E2A]',
  done: 'bg-[#C6FF54]/10 text-[#C6FF54] border-[#C6FF54]/30',
  blocked: 'bg-[#FF5E5E]/10 text-[#FF5E5E] border-[#FF5E5E]/30',
  review: 'bg-[#FF8B45]/10 text-[#FF8B45] border-[#FF8B45]/30',
  progress: 'bg-[#79B8FF]/10 text-[#79B8FF] border-[#79B8FF]/30',
};

export function Badge({ children, variant = 'default', size = 'sm', dot }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 border font-mono uppercase tracking-wider ${variantStyles[variant]} ${size === 'sm' ? 'px-1.5 py-0.5 text-[9px]' : 'px-2 py-1 text-[10px]'}`}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, BadgeVariant> = {
    done: 'done', completed: 'done', baselined: 'done', approved: 'done', implemented: 'done', resolved: 'done', sent: 'done',
    'in-progress': 'progress', active: 'progress', mitigating: 'progress', investigating: 'progress', assessment: 'progress',
    blocked: 'blocked', rejected: 'blocked', escalated: 'blocked', 'at-risk': 'orange', delayed: 'coral',
    review: 'review', 'in-review': 'review', submitted: 'blue',
    planned: 'default', todo: 'default', backlog: 'muted', draft: 'muted', open: 'orange', 'on-track': 'lime',
  };
  const variant = map[status] || 'default';
  return <Badge variant={variant} dot>{status.replace(/-/g, ' ')}</Badge>;
}
