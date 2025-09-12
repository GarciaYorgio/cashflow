'use client';

import { memo } from 'react';
import { SidebarToggle } from '@/components/sidebar-toggle';
import { useSidebar } from './ui/sidebar';
import useSWR from 'swr';
import { fetcher } from '@/lib/utils';
import type { Chat } from '@/lib/db/schema';
import { type VisibilityType, VisibilitySelector } from './visibility-selector';
import type { Session } from 'next-auth';
import { ModeToggle } from './ui/theme-toggle';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

function PureChatHeader({
  chatId,
  selectedVisibilityType,
  isReadonly,
  session,
}: {
  chatId: string;
  selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
  session: Session;
}) {
  const { open } = useSidebar();

  const { data: chatHistory } = useSWR<{ chats: Chat[] }>(
    chatId ? `/api/history?limit=1&ending_before=${chatId}` : null,
    fetcher,
  );

  const chatTitle = chatHistory?.chats[0]?.title;

  return (
    <header className="sticky top-0 flex w-full items-center justify-between gap-2 bg-background px-2 py-1.5 md:px-2">
      <div className="flex items-center gap-2">
        {!open && <SidebarToggle />}
      </div>
      <div className="flex-1 overflow-hidden px-2">
        {/* <div className="truncate text-right font-medium text-foreground">
          {chatTitle}
        </div> */}
      </div>

      {/* {(!open || windowWidth < 768) && (
        <Button
          variant="outline"
          className='order-2 ml-auto h-8 cursor-pointer px-2 md:order-1 md:ml-0 md:h-fit md:px-2'
          onClick={() => {
            router.push('/');
            router.refresh();
          }}
        >
          <PlusIcon />
          <span className="md:sr-only">New Chat</span>
        </Button>
      )} */}
      <ModeToggle />

      {!isReadonly && (
        <Popover>
          <PopoverTrigger className="cursor-pointer rounded-lg bg-accent p-2">
            Compartir
          </PopoverTrigger>
          <PopoverContent className="w-[376px]">
            <span className="pb-8 font-semibold text-md">Compartir chat</span>
            <VisibilitySelector
              chatId={chatId}
              selectedVisibilityType={selectedVisibilityType}
              className="order-1 md:order-2"
            />
          </PopoverContent>
        </Popover>
      )}
    </header>
  );
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
  return (
    prevProps.chatId === nextProps.chatId &&
    prevProps.selectedVisibilityType === nextProps.selectedVisibilityType &&
    prevProps.isReadonly === nextProps.isReadonly
  );
});
