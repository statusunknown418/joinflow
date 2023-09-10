"use client";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export const SignOut = () => {
  return (
    <Button onClick={() => signOut()} variant="outline">
      Sign Out
    </Button>
  );
};
