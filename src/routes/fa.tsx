import { createFileRoute } from "@tanstack/react-router";
import { Home } from "./index";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/fa")({
  head: () => seoHead("fa"),
  component: () => <Home lang="fa" />,
});
