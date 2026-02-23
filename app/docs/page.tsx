import { redirect } from "next/navigation";

export default function DocsHome() {
  redirect("/docs/v1/introduction");
}