"use client";

import { useEffect } from "react";
import Button from "@/components/primitives/Button";
import StatusMessage from "@/components/sections/StatusMessage";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusMessage
      eyebrow="Something went wrong"
      title="We hit a snag"
      description="Sorry, this page didn’t load properly. Try again, or head back to the home page."
    >
      <Button size="lg" onClick={() => retry()}>
        Try again
      </Button>
      <Button href="/" size="lg" variant="outline">
        Back to home
      </Button>
    </StatusMessage>
  );
}
