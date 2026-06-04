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
        className="w-full max-w-md rounded-lg border border-white/[0.1] bg-[#161616] p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-1 text-lg font-semibold text-[#e8e6e3]">
          {agent.name}
        </h2>
        <p className="mb-6 text-sm text-[#888888]">
          パスワードを入力してください
        </p>

        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="mb-4 w-full rounded-md border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-[#e8e6e3] placeholder-white/20 outline-none transition-colors focus:border-white/[0.2]"
          />

          {error && (
            <p className="mb-4 text-sm text-red-400/80">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="mb-3 w-full cursor-pointer rounded-md bg-white/[0.9] px-4 py-3 text-sm font-semibold text-[#0f0f0f] transition-opacity hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "Verifying..." : "Enter"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full cursor-pointer text-sm text-[#666666] transition-colors hover:text-[#e8e6e3]"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
