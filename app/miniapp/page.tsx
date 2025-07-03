import { neynar } from "@neynar/nodejs-sdk";
import Game from "@/components/Game";

export default async function MiniAppPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Get Farcaster user context
  const fid = searchParams.fid?.toString() || "";
  const signerUuid = searchParams.signer_uuid?.toString() || "";

  // Fetch user data from Neynar
  const neynarClient = new neynar.ApiClient(process.env.NEYNAR_API_KEY!);
  let user;
  
  if (fid) {
    try {
      const response = await neynarClient.fetchBulkUsers([parseInt(fid)]);
      user = response.users[0];
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  return (
    <div className="w-full h-screen bg-black">
      <Game farcasterUser={user} signerUuid={signerUuid} />
    </div>
  );
}
