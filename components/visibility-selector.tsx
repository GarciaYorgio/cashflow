'use client';

import { type ReactNode, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import {
  CheckCircleFillIcon,
  ChevronDownIcon,
  GlobeIcon,
  LockIcon,
  CopyIcon,
} from './icons';
import { useChatVisibility } from '@/hooks/use-chat-visibility';

export type VisibilityType = 'private' | 'public';

const visibilities: Array<{
  id: VisibilityType;
  label: string;
  description: string;
  icon: ReactNode;
}> = [
  {
    id: 'private',
    label: 'Privado',
    description: 'Solo tú puedes acceder a este chat',
    icon: <LockIcon />,
  },
  {
    id: 'public',
    label: 'Público',
    description: 'Cualquiera con el enlace puede acceder a este chat',
    icon: <GlobeIcon />,
  },
];

export function VisibilitySelector({
  chatId,
  className,
  selectedVisibilityType,
}: {
  chatId: string;
  selectedVisibilityType: VisibilityType;
} & React.ComponentProps<typeof Button>) {
  const [open, setOpen] = useState(false);

  const { visibilityType, setVisibilityType } = useChatVisibility({
    chatId,
    initialVisibilityType: selectedVisibilityType,
  });

  const selectedVisibility = useMemo(
    () => visibilities.find((visibility) => visibility.id === visibilityType),
    [visibilityType],
  );

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        asChild
        className={cn(
          'w-fit data-[state=open]:cursor-pointer data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
          className,
        )}
      >
        <Button
          data-testid="visibility-selector"
          variant="outline"
          className="my-2 hidden w-full cursor-pointer focus:outline-hidden focus:ring-0 md:flex md:h-fit md:px-2"
        >
          {selectedVisibility?.icon}
          {selectedVisibility?.label}
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="min-w-[300px]">
        {visibilities.map((visibility) => (
          <DropdownMenuItem
            data-testid={`visibility-selector-item-${visibility.id}`}
            key={visibility.id}
            onSelect={() => {
              setVisibilityType(visibility.id);
              setOpen(false);
            }}
            className="group/item flex cursor-pointer flex-row items-center justify-between gap-4"
            data-active={visibility.id === visibilityType}
          >
            <div className="flex flex-col items-start gap-1">
              {visibility.label}
              {visibility.description && (
                <div className="text-muted-foreground text-xs">
                  {visibility.description}
                </div>
              )}
            </div>
            <div className="text-foreground opacity-0 group-data-[active=true]/item:opacity-100 dark:text-foreground">
              <CheckCircleFillIcon />
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
      {visibilityType === 'public' && (
        <div className="mt-3 space-y-2 border-border/50 border-t pt-3">
          <div className="text-muted-foreground text-xs">Link</div>
          <div className="flex items-center gap-2 rounded-xl bg-accent px-3 py-2">
            <div className="truncate text-sm">
              {`${typeof window !== 'undefined' ? window.location.origin : ''}/chat/${chatId}`}
            </div>
            <button
              type="button"
              className="ml-auto cursor-pointer rounded-md p-1 hover:bg-muted/70"
              onClick={() => {
                const url = `${window.location.origin}/chat/${chatId}`;
                void navigator.clipboard.writeText(url);
              }}
              aria-label="Copy link"
            >
              <CopyIcon />
            </button>
          </div>
        </div>
      )}
    </DropdownMenu>
  );
}
