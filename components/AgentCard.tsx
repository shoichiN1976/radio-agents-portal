"use client";

import { Agent } from "@/lib/agents";

const personaBadgeStyles: Record<Agent["persona"], string> = {
  "AI Clone": "bg-white/[0.08] text-purple-300/70",
  "Real Person": "bg-white/[0.08] text-blue-300/70",
  "AI Legend": "bg-white/[0.08] text-amber-300/70",
};

const aspectHeights: Record<Agent["imageAspect"], string> = {
  short: "h-40",
  medium: "h-56",
  tall: "h-72",
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
    <div
      className="group relative break-inside-avoid mb-8 rounded-lg border border-white/[0.06] bg-[#161616] overflow-hidden transition-colors duration-300 hover:border-white/[0.15] cursor-pointer"
      onClick={handleClick}
    >
      {/* Image area with gradient */}
      <div className={`relative ${aspectHeights[agent.imageAspect]} overflow-hidden`}>
        <div
          className="absolute inset-0"
          style={{ background: agent.imageGradient }}
        />

        {/* Persona badge - top left */}
        <span
          className={`absolute top-3 left-3 z-10 rounded-full px-3 py-1 text-[11px] font-medium tracking-wide ${personaBadgeStyles[agent.persona]}`}
        >
          {agent.persona}
        </span>

        {/* Unlocked indicator - top right */}
        {unlocked && (
          <span className="absolute top-3 right-3 z-10 text-[11px] font-medium text-white/40 tracking-wide">
            Unlocked
          </span>
        )}
      </div>

      {/* Content area */}
      <div className="p-5">
        <h3 className="mb-2 text-base font-semibold text-[#e8e6e3]">{agent.name}</h3>
        <p className="mb-4 text-sm leading-relaxed text-[#888888]">
          {agent.description}
        </p>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {agent.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-[#666666]"
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          className="w-full cursor-pointer rounded-md border border-white/[0.1] px-4 py-2 text-sm text-[#888888] transition-colors duration-200 hover:border-white/[0.2] hover:text-[#e8e6e3]"
        >
          {unlocked ? `Open ${agent.name}` : `Talk to ${agent.name}`}
        </button>
      </div>
    </div>
  );
}
