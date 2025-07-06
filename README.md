## App Overview

Unit Conversion Challenge is a fast-paced educational game built as a Farcaster miniapp. Test your science skills by converting between various measurement units under time pressure. The app features:

- 🎮 Real-time unit conversion challenges
- 🏆 Global leaderboard competition
- ⏱️ Timed gameplay with 3 difficulty levels
- 🔐 Seamless Farcaster authentication
- 📊 Score tracking and sharing
- 🌐 Responsive design for all devices

Players compete to solve as many unit conversion problems as possible within the time limit, earning points for correct answers. High scores are saved to a global leaderboard visible to all players.

## Technologies Used

The app is built with a modern tech stack optimized for performance and scalability:

- **Frontend**:
  - Next.js 14 (App Router)
  - React 18
  - TypeScript
  - Tailwind CSS
  - Framer Motion (animations)
  - React Icons

- **Backend**:
  - Node.js
  - Neynar API (Farcaster integration)
  - Redis (Upstash for data persistence)
  - Vercel Serverless Functions

- **Authentication**:
  - Farcaster Sign-in Protocol
  - Neynar API validation

- **Deployment**:
  - Vercel (serverless platform)
  - GitHub (version control)

- **Game Logic**:
  - Unit conversion algorithms
  - Score calculation system
  - Difficulty scaling

## Game Flow

The gameplay follows this sequence:

```mermaid
graph TD
    A[User Opens Miniapp] --> B[Farcaster Context Passed]
    B --> C[Select Difficulty]
    C --> D[Start Game]
    D --> E[Conversion Challenge Appears]
    E --> F[User Enters Answer]
    F --> G{Correct?}
    G -->|Yes| H[Add Points + New Question]
    G -->|No| I[New Question]
    H --> J{Timer Expired?}
    I --> J
    J -->|No| E
    J -->|Yes| K[Show Final Score]
    K --> L[Share to Farcaster]
    L --> M[Leaderboard Update]
