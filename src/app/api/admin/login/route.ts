import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// In a real application, these would be stored securely (e.g., in a database with hashed passwords)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      // In a real application, you would generate a proper JWT token
      const token = Buffer.from(`${username}-${Date.now()}`).toString('base64');
      
      // Set the token in an HTTP-only cookie
      const cookieStore = await cookies();
      cookieStore.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24, // 24 hours
      });


      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 