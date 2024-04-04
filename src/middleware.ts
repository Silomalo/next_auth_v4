import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(function middleware(request: NextRequestWithAuth) {}, {
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|auth|reports|_next/static|_next/image|favicon.ico).*)"],
};

