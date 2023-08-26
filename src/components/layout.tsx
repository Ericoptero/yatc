import type { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout(props: PageLayoutProps) {
  return (
    <main className="flex h-full min-h-screen justify-center">
      <div className="h-full w-full border-x border-slate-400 md:max-w-2xl">
        {props.children}
      </div>
    </main>
  );
}
