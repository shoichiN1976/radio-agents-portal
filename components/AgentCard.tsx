"use client";

import { Agent } from "@/lib/agents";

const personaBadgeStyles: Record<Agent["persona"], string> = {
  "AI Clone": "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "Real Person": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "AI Legend": "bg-amber-500/20 text-amber-300 border-amber-500/30",
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
    <div className="group relative break-inside-avoid mb-6 rounded-2xl border border-white/10 bg-[#1e1e2e] overflow-hidden transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]">
      {/* Image area with gradient */}
      <div className={`relative ${aspectHeights[agent.imageAspect]} overflow-hidden`}>
        <div
          className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
          style={{ background: agent.imageGradient }}
        />

        {/* Persona badge - top left */}
        <span
          className={`absolute top-3 left-3 z-10 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm ${personaBadgeStyles[agent.persona]}`}
        >
          {agent.persona}
        </span>

        {/* Unlocked indicator - top right */}
        {unlocked && (
          <span className="absolute top-3 right-3 z-10 rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400 backdrop-blur-sm border border-green-500/30">
            Unlocked
          </span>
        )}

        {/* Hover overlay with action button */}
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
          <button
            onClick={handleClick}
            className="cursor-pointer rounded-full bg-white/90 px-6 py-2.5 text-sm font-semibold text-gray-900 shadow-lg transition-transform duration-200 hover:scale-105"
          >
            {unlocked ? "Open" : "Talk"}
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="p-5">
        <h3 className="mb-2 text-lg font-bold text-[#e2e8f0]">{agent.name}</h3>
        <p className="mb-4 text-sm leading-relaxed text-[#94a3b8]">
          {agent.description}
        </p>

        <div className="mb-4 flex flex-wrap gap-2">
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
    </div>
  );
}
