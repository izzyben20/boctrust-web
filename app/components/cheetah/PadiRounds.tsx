"use client";

import { useState } from "react";

const MEMBERS = ["You", "Ada", "Bola", "Chidi", "Dupe"];
const CONTRIBUTION = 10_000;
const POT = CONTRIBUTION * MEMBERS.length;

/** A step-through of the documented payout logic, using example numbers. */
export function PadiRounds() {
  const [round, setRound] = useState(0);
  const finished = round >= MEMBERS.length;

  return (
    <div>
      <ol className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {MEMBERS.map((member, index) => {
          const paid = index < round;
          const current = index === round - 1;
          return (
            <li key={member} className={`rounded-3xl p-4 transition-colors duration-300 ${current ? "bg-white text-padi-ink" : paid ? "bg-white/25" : "bg-white/10"}`}>
              <p className="font-display text-xl font-bold tracking-tight">{member}</p>
              <p className="text-sm">Turn {index + 1}</p>
              <p className="tabular mt-5 font-display text-lg font-bold">{paid ? `₦${POT.toLocaleString("en-NG")}` : "Waiting"}</p>
            </li>
          );
        })}
      </ol>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => setRound(finished ? 0 : round + 1)}
          className="min-h-13 rounded-full bg-white px-6 font-display font-bold text-padi-ink"
        >
          {finished ? "Start again" : round === 0 ? "Run the first round" : `Run round ${round + 1}`}
        </button>
        <p role="status" className="font-medium">
          {round === 0
            ? `Everyone contributes, and the pool reaches ₦${POT.toLocaleString("en-NG")} each round.`
            : finished
              ? "Everyone has been paid, so the cycle closes automatically."
              : `Round ${round}: ${MEMBERS[round - 1]} collects the full pool.`}
        </p>
      </div>
    </div>
  );
}
