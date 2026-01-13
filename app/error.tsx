"use client";

import { Header, NotFoundError } from "../components";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div>
      <Header
        className="stripe-a-magenta stripe-b-red border-r-gold bg-magenta"
        innerProps={{
          className: "bg-magenta text-red"
        }}
      />
      <main>
        <NotFoundError />
      </main>
    </div>
  );
}
