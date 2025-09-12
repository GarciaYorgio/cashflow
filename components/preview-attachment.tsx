import type { Attachment } from '@/lib/types';
import { Loader } from './elements/loader';
import { CrossSmallIcon } from './icons';
import { Button } from './ui/button';
import Image from 'next/image';
import { useArtifact } from '@/hooks/use-artifact';
import { useCallback } from 'react';

export const PreviewAttachment = ({
  attachment,
  isUploading = false,
  onRemove,
  onEdit,
}: {
  attachment: Attachment;
  isUploading?: boolean;
  onRemove?: () => void;
  onEdit?: () => void;
}) => {
  const { name, url, contentType } = attachment;

  const { setArtifact } = useArtifact();

  const handlePreviewClick = useCallback(() => {
    const rect = document
      .querySelector(`[data-url="${url}"]`)
      ?.getBoundingClientRect() || {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    };

    setArtifact({
      documentId: url,
      title: name || 'Preview',
      content: url,
      kind: 'document-viewer',
      isVisible: true,
      status: 'idle',
      boundingBox: {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      },
    });
  }, [contentType, name, setArtifact, url]);

  return (
    <button
      type="button"
      data-testid="input-attachment-preview"
      data-url={url}
      className="group relative size-64 cursor-pointer overflow-hidden rounded-lg border bg-muted focus:outline-none"
      onClick={handlePreviewClick}
    >
      {contentType?.startsWith('image') ? (
        <Image
          src={url}
          alt={name ?? 'An image attachment'}
          className="size-full object-cover"
          width={512}
          height={512}
        />
      ) : (
        <div className="flex size-full items-center justify-center text-muted-foreground text-xs">
          {name}
        </div>
      )}

      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <Loader size={16} />
        </div>
      )}

      {onRemove && !isUploading && (
        <Button
          onClick={onRemove}
          size="sm"
          variant="destructive"
          className="absolute top-0.5 right-0.5 size-4 rounded-full p-0 opacity-0 transition-opacity group-hover:opacity-100"
        >
          <CrossSmallIcon size={8} />
        </Button>
      )}
    </button>
  );
};
