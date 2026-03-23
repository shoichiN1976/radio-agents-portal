"use client";

import { useState, useEffect, useRef } from "react";
import { Agent } from "@/lib/agents";

type Props = {
  agent: Agent;
  onSuccess: (agentId: string) => void;
  onClose: () => void;
};

export default function PasswordModal({ agent, onSuccess, onClose }: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId: agent.id, password }),
      });

      const data = await res.json();

      if (data.success) {
        onSuccess(agent.id);
        window.open(data.url, "_blank", "noopener,noreferrer");
        onClose();
      } else {
        setError("パスワードが違います");
      }
    } catch {
      setError("エラーが発生しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-purple-500/20 bg-[#1e1e2e] p-8 shadow-[0_0_60px_rgba(124,58,237,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-1 text-xl font-bold text-[#e2e8f0]">
          {agent.name}
        </h2>
        <p className="mb-6 text-sm text-[#94a3b8]">
          パスワードを入力してください
        </p>

        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="mb-4 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-[#e2e8f0] placeholder-[#94a3b8]/50 outline-none transition-colors focus:border-purple-500/50"
          />

          {error && (
            <p className="mb-4 text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="mb-3 w-full cursor-pointer rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Enter"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full cursor-pointer text-sm text-[#94a3b8] transition-colors hover:text-[#e2e8f0]"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
