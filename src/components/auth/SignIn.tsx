"use client";
import { useLastViewedOrganization } from "@/lib/stores/last-viewed-organization";
import { BuiltInProviderType } from "@auth/core/providers";
import { LiteralUnion, signIn } from "next-auth/react";
import { useState } from "react";
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
  const [loader, startLoader] = useState(false);
  const hasOrganization = useLastViewedOrganization((state) => state.handle);

  return (
    <Button
      className={className}
      loading={loader}
      onClick={() => {
        startLoader(true);
        signIn(provider, {
          callbackUrl: hasOrganization
            ? `/spaces/${hasOrganization}`
            : "/spaces/select",
        });
      }}
    >
      {!loader && icon}
      <span>{label}</span>
    </Button>
  );
}
