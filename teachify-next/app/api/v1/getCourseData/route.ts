import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(request: Request): Promise<NextResponse> {
    const { searchParams, origin } = new URL(request.url);
    const course = searchParams.get("course");

    try {
        const filePath = path.join(process.cwd(), 'outlines', `${course}.txt`);
        const fileContent = await fs.readFile(filePath, 'utf8');

        return NextResponse.json({ fileContent });
    } catch (error) {
        return NextResponse.json({ error });
    }
}