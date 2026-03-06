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
    <main className="min-h-screen px-6 py-16">
      <header className="mx-auto mb-16 max-w-4xl text-center">
        <div className="mb-4 text-4xl">🎙️</div>
        <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-[#e2e8f0] sm:text-5xl">
          AI VOICES
        </h1>
        <p className="text-lg text-[#94a3b8]">Select an Agent to Begin</p>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            unlocked={unlockedAgents.has(agent.id)}
            onTalk={setSelectedAgent}
          />
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
