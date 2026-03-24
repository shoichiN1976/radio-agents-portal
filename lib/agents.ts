export type Agent = {
  id: string;
  name: string;
  description: string;
  persona: "AI Clone" | "Real Person" | "AI Legend";
  originalPerson: string;
  url: string;
  tags: string[];
  imageGradient: string;
  imageAspect: "short" | "medium" | "tall";
};

export const agents: Agent[] = [
  {
    id: "kawada-chiyume",
    name: "川田千夢",
    description:
      "川田十夢のAIクローン。テクノロジー、カルチャー、メディアの交差点を語るクリエイター。",
    persona: "AI Clone",
    originalPerson: "川田十夢",
    url: "https://elevenlabs.io/app/talk-to?agent_id=agent_8601khtqn90bemstpdp8tathec45&branch_id=agtbrch_6001khtqn9rzemntx8jn4jbt8jrn",
    tags: ["テクノロジー", "カルチャー", "メディア"],
    imageGradient: "linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)",
    imageAspect: "tall",
  },
  {
    id: "sean-kawakami",
    name: "Sean Kawakami",
    description: "実在のSean Kawakami本人によるAIエージェント。",
    persona: "Real Person",
    originalPerson: "Sean Kawakami",
    url: "https://elevenlabs.io/app/talk-to?agent_id=agent_4301kj72gdwfes79r4dr113805qr&branch_id=agtbrch_0501kj72gehkftzt0gve4a9t9tfn",
    tags: ["実在人物"],
    imageGradient: "linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #60a5fa 100%)",
    imageAspect: "short",
  },
  {
    id: "shiga-naoya",
    name: "志賀直哉",
    description:
      "小説の神様・志賀直哉のAI。お孫さん山田裕氏の公式許可のもと制作。",
    persona: "AI Legend",
    originalPerson: "志賀直哉",
    url: "https://elevenlabs.io/app/talk-to?agent_id=agent_01jzap12j6ftwrws5rt0vx9aqf",
    tags: ["文豪", "小説", "明治・大正・昭和"],
    imageGradient: "linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #fbbf24 100%)",
    imageAspect: "medium",
  },
  {
    id: "ai-edison",
    name: "AIエジソン",
    description:
      "発明王トーマス・エジソンのAI。電球、蓄音機、映画など数々の発明を生み出した天才発明家。",
    persona: "AI Legend",
    originalPerson: "トーマス・エジソン",
    url: "https://elevenlabs.io/app/talk-to?agent_id=agent_4801km9v0znqenbrw8r22bg4fmg4&branch_id=agtbrch_9901km9v1204ffwtq5j1kk7xm4qj",
    tags: ["発明家", "テクノロジー", "歴史"],
    imageGradient: "linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)",
    imageAspect: "medium",
  },
  {
    id: "ai-nishimura",
    name: "AI西村光久",
    description:
      "西村光久のAIクローン。本人の知識と人柄を再現したAIエージェント。",
    persona: "AI Clone",
    originalPerson: "西村光久",
    url: "https://elevenlabs.io/app/talk-to?agent_id=agent_0301kmfar0m4e6trays5ra2mca1s&branch_id=agtbrch_0001kmfar2h7eryv0tvxzpjv9nfd",
    tags: ["AIクローン"],
    imageGradient: "linear-gradient(135deg, #0891b2 0%, #06b6d4 50%, #22d3ee 100%)",
    imageAspect: "tall",
  },
];
