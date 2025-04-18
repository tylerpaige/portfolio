import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache'; 

export async function POST(req) {
  // Verify the webhook secret header (set this in your Sanity webhook settings)
  const webhookSecret = req.headers.get("x-sanity-webhook-secret");
  if (webhookSecret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.error("Invalid secret", { status: 401 });
  }

  try {
    revalidatePath('/')
    revalidatePath('/[slug]')
    revalidatePath('/minus/[page]')
    revalidatePath('/tagged/[tag]')
    revalidatePath('/tagged/[tag]/minus/[page]')
    return NextResponse.json({ revalidated: true });
  } catch (err) {
    return NextResponse.json({ error: 'Error revalidating' }, { status: 500 });
  }
}
