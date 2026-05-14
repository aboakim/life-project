/** Admin routes must never be statically cached (cookies + DB). */
export const dynamic = "force-dynamic";

import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return children;
}
