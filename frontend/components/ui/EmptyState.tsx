import React from 'react';
import { Button } from './Button';
import { Sparkles } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  actionHref,
  onAction,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-luxe-border bg-luxe-cream/30 my-8">
      <div className="w-12 h-12 rounded-full bg-luxe-sand flex items-center justify-center text-luxe-gold-dark mb-4">
        {icon || <Sparkles className="w-5 h-5" />}
      </div>
      <h3 className="font-serif text-xl sm:text-2xl text-luxe-charcoal">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-luxe-muted mt-2 max-w-md font-light leading-relaxed">
        {description}
      </p>
      {actionText && (actionHref || onAction) && (
        <div className="mt-6">
          <Button
            href={actionHref}
            onClick={onAction}
            variant="outline"
            size="sm"
          >
            {actionText}
          </Button>
        </div>
      )}
    </div>
  );
};
