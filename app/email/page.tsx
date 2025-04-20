"use client";

import ComingSoon from "../components/ComingSoon";
import Header from "../components/Header";

export default function Page() {
  return (
    <>
      <Header title="email" />

      <div className="mt-4">
        <ComingSoon title="Coming Soon.." />
      </div>
    </>
  );
}
