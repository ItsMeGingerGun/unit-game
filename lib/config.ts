// lib/config.ts
export const getConfig = () => {
  return {
    neynarApiKey: process.env.NEYNAR_API_KEY || "",
    signerUuid: process.env.SIGNER_UUID || "",
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://unit-game-ruddy.vercel.app",
    isProduction: process.env.NODE_ENV === "production",
  };
};

export type Config = ReturnType<typeof getConfig>;
