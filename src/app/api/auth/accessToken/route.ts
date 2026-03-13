import { cookies } from 'next/headers';

export async function GET() {
    return Response.json({ token: cookies().get('accessToken')?.value });
}