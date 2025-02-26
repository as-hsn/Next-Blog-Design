import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  console.log("🚀 Middleware running on:", req.nextUrl.pathname);
  console.log("🚀 Existing Access Token:", accessToken);
  console.log("🚀 Existing Refresh Token:", refreshToken);

  const authRoutes = ["/login", "/register", "/reset-password", "/password-reset"];
  const protectedRoutes = ["/contact"];

  // 🚀 Prevent logged-in users from accessing auth pages
  if (accessToken && authRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 🚀 If user is NOT authenticated and tries to access protected routes
  if (!accessToken && refreshToken && protectedRoutes.includes(req.nextUrl.pathname)) {
    try {
      const res = await fetch(`${req.nextUrl.origin}/api/auth/refresh`, {
        method: "GET",
        headers: req.headers, // Forward all headers, including cookies
      });

      const data = await res.json();

      if (data.success) {
        console.log(" Tokens refreshed:", data);

        // Create a response object
        const response = NextResponse.next();

        // 🚀 Set Access Token in Cookies
        response.cookies.set("accessToken", data.accessToken, {
          httpOnly: false, // Should be true for security
          secure: process.env.NODE_ENV === "production",
          path: "/",
          maxAge: 20 * 60, // 20 minutes
        });

        // 🚀 Set Refresh Token in Cookies
        response.cookies.set("refreshToken", data.refreshToken, {
          httpOnly: false, // Should be true for security
          secure: process.env.NODE_ENV === "production",
          path: "/",
          maxAge: 7 * 24 * 60 * 60, // 7 days
        });

        return response;
      } else {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    } catch (error) {
      console.error(" Error refreshing token:", error);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/reset-password", "/password-reset", "/contact"],
};