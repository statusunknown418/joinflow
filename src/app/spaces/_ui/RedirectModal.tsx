"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { useMounted } from "@/lib/hooks/use-mounted";
import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import Link from "next/link";

export const RedirectModal = () => {
  const mounted = useMounted();
  const onboard = useOnboardingStore((state) => state.isOnboard);

  return (
    mounted && (
      <Dialog open={!onboard}>
        <DialogContent dismissible={false}>
          <DialogHeader className="text-2xl font-bold">
            Welcome to the revolution
          </DialogHeader>

          <DialogDescription>
            Let&apos;s get you up to speed! Keep in mind that you{" "}
            <span className="font-bold underline underline-offset-1">need</span>{" "}
            to be an organization admin to do this.
          </DialogDescription>

          <DialogFooter>
            <Link href="/onboarding" className="rounded-full" passHref>
              <Button>Let&apos;s go</Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  );
};
