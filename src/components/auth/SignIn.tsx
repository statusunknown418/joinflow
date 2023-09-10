"use client";
import { BuiltInProviderType } from "@auth/core/providers";
import { LiteralUnion, signIn } from "next-auth/react";
import { Button } from "../ui/button";

export type SignInProps = {
  className?: string;
  provider: LiteralUnion<BuiltInProviderType>;
  label?: string;
  icon?: React.ReactNode;
};

export default function SignIn({
  className,
  provider,
  label,
  icon,
}: SignInProps) {
  return (
    <Button
      className={className}
      onClick={() =>
        signIn(provider, {
          callbackUrl: "/dashboard",
        })
      }
    >
      {icon}
      <span>{label}</span>
    </Button>
  );
}
