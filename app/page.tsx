"use client";

import { useState, useEffect } from "react";
import { agents, Agent } from "@/lib/agents";
import AgentCard from "@/components/AgentCard";
import PasswordModal from "@/components/PasswordModal";

export default function Home() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [unlockedAgents, setUnlockedAgents] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const saved = localStorage.getItem("unlockedAgents");
      if (saved) {
        setUnlockedAgents(new Set(JSON.parse(saved)));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleUnlock = (agentId: string) => {
    setUnlockedAgents((prev) => {
      const next = new Set(prev);
      next.add(agentId);
      localStorage.setItem("unlockedAgents", JSON.stringify([...next]));
      return next;
    });
  };

  return (
    <main className="relative z-10 min-h-screen px-6 py-16">
      <header className="mx-auto mb-16 max-w-4xl text-center">
        <div className="mb-4 text-4xl">🎙️</div>
        <h1 className="mb-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            AI VOICES
          </span>
        </h1>
        <p className="text-lg text-[#94a3b8]">Select an Agent to Begin</p>
      </header>

      <div className="mx-auto max-w-7xl columns-1 sm:columns-2 lg:columns-3 gap-6">
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
