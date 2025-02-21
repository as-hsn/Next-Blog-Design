import { NextRequest, NextResponse } from 'next/server'

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; 

  const authRoutes = ["/login", "/register"]; // Routes that wont be access able after login

  // Check if user authenticated then will be redirected to home page
  if (token && authRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register"], // Middleware run on these routes
};