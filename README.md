# Unit Conversion Challenge - Farcaster Miniapp

Test your science skills in our fast-paced unit conversion game! Compete globally and climb the leaderboard directly within Farcaster.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Funit-conversion-game)

## Features

- 🚀 Seamless Farcaster miniapp integration
- ⏱️ Timed challenges with 3 difficulty levels
- 🌎 Global leaderboard competition
- 🔒 Automatic user authentication via Farcaster context
- 📱 Mobile-optimized responsive design
- 🔄 Real-time score sharing to Farcaster

Farcaster Miniapp Integration
Manifest Configuration
The miniapp manifest is served at:
https://your-vercel-url.vercel.app/api/neynar/manifest

Miniapp Entry Point
The miniapp is accessible at:
https://your-vercel-url.vercel.app/miniapp

Embed Endpoint
The embed endpoint is at:
https://your-vercel-url.vercel.app/embed

Game Flow
Users access the miniapp via Farcaster client

Farcaster context (fid, username, pfp) is passed via URL parameters

Players select difficulty level

Timed unit conversion challenges begin

Scores are calculated and saved

Players can share scores to Farcaster

Technologies Used
Next.js 14 (App Router)

TypeScript

Tailwind CSS

Neynar API

Redis (Upstash)

Framer Motion

React Icons

Configuration Requirements
Neynar API Key:
Get from Neynar Developer Portal

Signer UUID:
Create signer via Neynar API

Redis Database:
Use Upstash Redis for persistence

Contributing
Contributions are welcome! Please follow these steps:

Fork the repository

Create your feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add some amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a pull request
