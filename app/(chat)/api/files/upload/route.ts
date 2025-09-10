import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { auth } from '@/app/(auth)/auth';

// Use Blob instead of File since File is not available in Node.js environment
// Accept any MIME type; enforce only configurable size limit
const MAX_UPLOAD_MB = Number(process.env.NEXT_MAX_UPLOAD_MB || 25);
const MAX_UPLOAD_BYTES = MAX_UPLOAD_MB * 1024 * 1024;

const FileSchema = z.object({
  file: z.instanceof(Blob).refine((file) => file.size <= MAX_UPLOAD_BYTES, {
    message: `File size should be less than ${MAX_UPLOAD_MB}MB`,
  }),
});

export async function POST(request: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (request.body === null) {
    return new Response('Request body is empty', { status: 400 });
  }

  try {
    const formData = await request.formData();
    const fileEntry = formData.get('file');

    if (!fileEntry || !(fileEntry instanceof Blob)) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const file = fileEntry as Blob;

    const validatedFile = FileSchema.safeParse({ file });

    if (!validatedFile.success) {
      const errorMessage = validatedFile.error.errors
        .map((error) => error.message)
        .join(', ');

      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    // Get filename from formData when available, otherwise generate one
    const filename = (fileEntry as File).name || `upload-${Date.now()}`;
    const fileBuffer = await file.arrayBuffer();

    try {
      const data = await put(`${filename}`, fileBuffer, {
        access: 'public',
        contentType: file.type || undefined,
      });

      return NextResponse.json({
        ...data,
        contentType: file.type || 'application/octet-stream',
      });
    } catch (error) {
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 },
    );
  }
}
