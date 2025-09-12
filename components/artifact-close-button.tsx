import { memo, useEffect, useCallback } from 'react';
import { CrossIcon } from './icons';
import { Button } from './ui/button';
import { initialArtifactData, useArtifact } from '@/hooks/use-artifact';

function PureArtifactCloseButton() {
  const { setArtifact } = useArtifact();

  const handleClose = useCallback(() => {
    setArtifact((currentArtifact) =>
      currentArtifact.status === 'streaming'
        ? {
            ...currentArtifact,
            isVisible: false,
          }
        : { ...initialArtifactData, status: 'idle' },
    );
  }, [setArtifact]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClose]);

  return (
    <Button
      data-testid="artifact-close-button"
      variant="outline"
      className='h-fit cursor-pointer p-2 dark:hover:bg-zinc-700'
      onClick={handleClose}
    >
      <CrossIcon size={18} />
    </Button>
  );
}

export const ArtifactCloseButton = memo(PureArtifactCloseButton, () => true);
