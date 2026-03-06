"use client";

import { Agent } from "@/lib/agents";

const personaBadgeStyles: Record<Agent["persona"], string> = {
  "AI Clone": "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "Real Person": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "AI Legend": "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

type Props = {
  agent: Agent;
  unlocked: boolean;
  onTalk: (agent: Agent) => void;
};

export default function AgentCard({ agent, unlocked, onTalk }: Props) {
  const handleClick = () => {
    if (unlocked) {
      window.open(agent.url, "_blank", "noopener,noreferrer");
    } else {
      onTalk(agent);
    }
  };

  return (
    <div className="group relative rounded-xl border border-white/10 bg-[#1e1e2e] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]">
      <div className="mb-4 flex items-center justify-between">
        <span
          className={`rounded-full border px-3 py-1 text-xs font-medium ${personaBadgeStyles[agent.persona]}`}
        >
          {agent.persona}
        </span>
        {unlocked && (
          <span className="text-xs text-green-400">Unlocked</span>
        )}
      </div>

      <h3 className="mb-2 text-xl font-bold text-[#e2e8f0]">{agent.name}</h3>
      <p className="mb-4 text-sm leading-relaxed text-[#94a3b8]">
        {agent.description}
      </p>

      <div className="mb-5 flex flex-wrap gap-2">
        {agent.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-white/5 px-2 py-1 text-xs text-[#94a3b8]"
          >
            {tag}
          </span>
        ))}
      </div>

      <button
        onClick={handleClick}
        className="w-full cursor-pointer rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        {unlocked ? `Open ${agent.name}` : `Talk to ${agent.name}`}
      </button>
    </div>
  );
}
