🛠️ Step-by-Step: Setting Up the "Unknown" Project
Phase 1: The "Clean House" Setup
Before you write any logic, make sure the environment is professional.

Clean the Boilerplate: \* Remove the default Next.js styling in globals.css (keep the Tailwind directives).

Delete the placeholder images in /public.

Clean up page.tsx to just show a "Hello World" or a "Project Loading" state.

Configure Prettier & ESLint:

Ensure your code auto-formats on save. This is crucial for TypeScript.

Strict Mode Check:

Go to tsconfig.json and ensure "strict": true is on. No shortcuts!

Phase 2: Structural Foundation
Create your folder architecture now so you don't have a mess later.

Create Core Folders: Inside /src or /app, create:

/components (For your UI buttons, inputs, etc.)

/hooks (For custom React hooks)

/types (For your TypeScript interfaces/types)

/lib (For utility functions like cn for Tailwind)

Layout Design: \* Set up your layout.tsx with a basic Navbar and Footer placeholder. This makes it feel like a real app immediately.

Phase 3: The "Mock" Phase (Type Prep)
Since you are studying TypeScript Mastery at 06:30 PM, use this project as your playground.

Define a "User" Type: \* Create a file types/index.ts and define what a User or a Project looks like.

Setup a Mock API: \* Create a simple local JSON file or a mock fetch function to practice getting data into your React components using Types.

Phase 4: The "Idea" Hunt
While you are doing your 09:00 AM Application Blitz, look at the websites of the companies you are applying to.

Identify a Gap: Does a company have a bad UI? A slow search bar?

The "Clone" Strategy: If you still don't know what to make, pick a small feature from a site you like (e.g., "The Spotify Playlist Creator" or "A Kanban Board") and start building just that feature.

Phase 5: Deployment
Push to GitHub: Do this immediately.

Connect to Vercel: Get that "Automatic Deployment" set up.

Why? Because seeing a live URL (even if it's empty) is a massive psychological boost.
