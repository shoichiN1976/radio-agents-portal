"use client";

import { Agent } from "@/lib/agents";

const personaBadgeStyles: Record<Agent["persona"], string> = {
  "AI Clone": "bg-white/[0.08] text-purple-300/70",
  "Real Person": "bg-white/[0.08] text-blue-300/70",
  "AI Legend": "bg-white/[0.08] text-amber-300/70",
};

type Props = {
  agent: Agent;
  unlocked: boolean;
  onTalk: (agent: Agent) => void;
};

export default function AgentListItem({ agent, unlocked, onTalk }: Props) {
  const handleClick = () => {
    if (unlocked) {
      window.open(agent.url, "_blank", "noopener,noreferrer");
    } else {
      onTalk(agent);
    }
  };

  return (
    <div
      className="flex items-center gap-5 rounded-lg border border-white/[0.06] bg-[#161616] px-5 py-4 transition-colors duration-300 hover:border-white/[0.15] cursor-pointer"
      onClick={handleClick}
    >
      {/* Gradient swatch */}
      <div
        className="h-10 w-10 shrink-0 rounded-md"
        style={{ background: agent.imageGradient }}
      />

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2.5">
          <h3 className="truncate text-sm font-semibold text-[#e8e6e3]">{agent.name}</h3>
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium tracking-wide ${personaBadgeStyles[agent.persona]}`}
          >
            {agent.persona}
          </span>
          {unlocked && (
            <span className="shrink-0 text-[10px] font-medium text-white/40 tracking-wide">
              Unlocked
            </span>
          )}
        </div>
        <p className="mt-0.5 truncate text-xs text-[#666666]">{agent.description}</p>
      </div>

      {/* Tags - hidden on mobile */}
      <div className="hidden shrink-0 gap-1.5 sm:flex">
        {agent.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-white/[0.04] px-2 py-0.5 text-[10px] text-[#666666]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Arrow */}
      <svg
        className="h-4 w-4 shrink-0 text-white/20"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </div>
  );
}
