import type { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout(props: PageLayoutProps) {
  return (
    <main className="flex h-full min-h-screen flex-col items-center">
      <div className="flex h-full w-full flex-grow flex-col border-x border-slate-400 md:max-w-2xl">
        {props.children}
      </div>
    </main>
  );
}
