import { Artifact } from '@/components/create-artifact';
import { DocumentSkeleton } from '@/components/document-skeleton';
import Image from 'next/image';

export const documentViewerArtifact = new Artifact<'document-viewer', {}>({
  kind: 'document-viewer',
  description: 'For viewing documents, images, PDFs and other files.',
  actions: [],
  toolbar: [],
  onStreamPart: () => {},
  content: ({ content, title, isLoading }) => {
    if (isLoading) {
      return <DocumentSkeleton artifactKind="document-viewer" />;
    }

    return (
      <div className="flex flex-col items-center justify-center bg-background p-8 md:p-20">
        <div className="max-w-4xl">
          <Image
            src={content}
            alt={title}
            width={1024}
            height={1024}
            className="w-full rounded-lg"
          />
        </div>
      </div>
    );
  },
});
