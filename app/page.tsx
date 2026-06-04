"use client";

import { useState, useEffect } from "react";
import { agents, Agent } from "@/lib/agents";
import AgentCard from "@/components/AgentCard";
import AgentListItem from "@/components/AgentListItem";
import PasswordModal from "@/components/PasswordModal";

type ViewMode = "grid" | "list";

export default function Home() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [unlockedAgents, setUnlockedAgents] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("unlockedAgents");
      if (saved) {
        setUnlockedAgents(new Set(JSON.parse(saved)));
      }
      const savedView = localStorage.getItem("viewMode");
      if (savedView === "grid" || savedView === "list") {
        setViewMode(savedView);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleViewChange = (mode: ViewMode) => {
    setViewMode(mode);
    localStorage.setItem("viewMode", mode);
  };

  const handleUnlock = (agentId: string) => {
    setUnlockedAgents((prev) => {
      const next = new Set(prev);
      next.add(agentId);
      localStorage.setItem("unlockedAgents", JSON.stringify([...next]));
      return next;
    });
  };

  return (
    <main className="relative min-h-screen px-8 py-20">
      <header className="mx-auto mb-20 max-w-4xl text-center">
        <h1 className="mb-3 text-4xl font-light tracking-[0.2em] uppercase text-white sm:text-5xl">
          AI VOICES
        </h1>
        <p className="text-sm tracking-wide text-[#888888]">
          Select an Agent to Begin
        </p>
      </header>

      {/* View toggle */}
      <div className="mx-auto mb-8 flex max-w-7xl justify-end">
        <div className="flex gap-1 rounded-md border border-white/[0.06] p-1">
          <button
            onClick={() => handleViewChange("grid")}
            className={`cursor-pointer rounded p-1.5 transition-colors ${
              viewMode === "grid" ? "bg-white/[0.1] text-[#e8e6e3]" : "text-[#666666] hover:text-[#888888]"
            }`}
            aria-label="Grid view"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
          </button>
          <button
            onClick={() => handleViewChange("list")}
            className={`cursor-pointer rounded p-1.5 transition-colors ${
              viewMode === "list" ? "bg-white/[0.1] text-[#e8e6e3]" : "text-[#666666] hover:text-[#888888]"
            }`}
            aria-label="List view"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Grid view */}
      {viewMode === "grid" && (
        <div className="mx-auto max-w-7xl columns-1 sm:columns-2 lg:columns-3 gap-8">
          {agents.map((agent) => (
            <div key={agent.id} className="card-animate">
              <AgentCard
                agent={agent}
                unlocked={unlockedAgents.has(agent.id)}
                onTalk={setSelectedAgent}
              />
            </div>
          ))}
        </div>
      )}

      {/* List view */}
      {viewMode === "list" && (
        <div className="mx-auto flex max-w-4xl flex-col gap-2">
          {agents.map((agent) => (
            <div key={agent.id} className="card-animate">
              <AgentListItem
                agent={agent}
                unlocked={unlockedAgents.has(agent.id)}
                onTalk={setSelectedAgent}
              />
            </div>
          ))}
        </div>
      )}

      {selectedAgent && (
        <PasswordModal
          agent={selectedAgent}
          onSuccess={handleUnlock}
          onClose={() => setSelectedAgent(null)}
        />
      )}
    </main>
  );
}
