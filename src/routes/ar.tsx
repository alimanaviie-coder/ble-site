import { createFileRoute } from "@tanstack/react-router";
import { Home } from "./index";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/ar")({
  head: () => seoHead("ar"),
  component: () => <Home lang="ar" />,
});
