"use client";

import { Header, NotFoundError } from "./components";

export default function Error({ error, reset }) {
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
