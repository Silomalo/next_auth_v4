"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function AppBar() {
  // const session =  useSession();
  const { data: session, status } = useSession();
  const user:any = session?.user;
  console.log("session", session);
  return (
    <div className="p-2 bg-gradient-to-b from-slate-800 to-slate-600 flex gap-2 ">
      <Link href={"/clientPage"}>Client Page</Link>
      <Link href={"/serverPage"}>Server Page</Link>
      <Link href={"/middlewareProtected"}>Middleware Protected Page</Link>
      <div className="ml-auto">
        {session && (
          <div className="flex gap-2">
            <p>{status}</p>
            <p>{user?.message}</p>

            <button onClick={() => signIn()} type="submit">
              Sign In
            </button>
            <button onClick={() => signOut()} type="submit">
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
