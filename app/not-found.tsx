import Button from "@/components/primitives/Button";
import StatusMessage from "@/components/sections/StatusMessage";
import { buildMeta } from "@/utils/meta";

export const metadata = buildMeta({ title: "Page not found", noindex: true });

export default function NotFound() {
  return (
    <StatusMessage
      eyebrow="404 – Page not found"
      title="This page doesn’t exist"
      description="The page you’re looking for may have moved or no longer exists. Let’s get you back on track."
    >
      <Button href="/" size="lg">
        Back to home
      </Button>
      <Button href="/services" size="lg" variant="outline">
        View our services
      </Button>
    </StatusMessage>
  );
}
