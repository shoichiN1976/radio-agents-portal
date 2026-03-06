export type Agent = {
  id: string;
  name: string;
  description: string;
  persona: "AI Clone" | "Real Person" | "AI Legend";
  originalPerson: string;
  url: string;
  tags: string[];
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
  },
  {
    id: "sean-kawakami",
    name: "Sean Kawakami",
    description: "実在のSean Kawakami本人によるAIエージェント。",
    persona: "Real Person",
    originalPerson: "Sean Kawakami",
    url: "https://elevenlabs.io/app/talk-to?agent_id=agent_4301kj72gdwfes79r4dr113805qr&branch_id=agtbrch_0501kj72gehkftzt0gve4a9t9tfn",
    tags: ["実在人物"],
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
  },
];
