# Implementation Plan: AIC Artwork Bluesky Bot

This plan outlines the steps to build a Bluesky bot that posts a random artwork from the Art Institute of Chicago (AIC) daily, based on the structure of the `bsky-jokeaday` project.

## Objective
Build a TypeScript-based Node.js application that:
1.  Fetches a random public domain artwork from the Art Institute of Chicago API.
2.  Downloads the associated image.
3.  Posts the image to Bluesky with a caption containing the title, artist, date, and a source link.
4.  Schedules the post to run daily at 9:00 AM EST (14:00 UTC) via GitHub Actions.

## Key Files & Context
- `src/index.ts`: Main entry point for the bot.
- `src/aic.ts`: Logic for interacting with the AIC API.
- `src/bluesky.ts`: Logic for interacting with the Bluesky API.
- `package.json`: Project dependencies and scripts.
- `tsconfig.json`: TypeScript configuration.
- `.github/workflows/post.yml`: GitHub Actions scheduling.
- `.env.example`: Template for required environment variables.

## Implementation Steps

### 1. Project Setup
- Initialize a new Node.js project.
- Install dependencies:
  - `@atproto/api` (Bluesky interaction)
  - `dotenv` (Environment variables)
  - `axios` or `node-fetch` (API requests)
- Set up TypeScript configuration.

### 2. AIC API Integration (`src/aic.ts`)
- Implement `getRandomArtwork()`:
  - Fetch total count of artworks from `https://api.artic.edu/api/v1/artworks?limit=1&is_public_domain=true`.
  - Pick a random page within the total count.
  - Fetch the artwork on that page: `https://api.artic.edu/api/v1/artworks?page={random_page}&limit=1&fields=id,title,artist_display,date_display,image_id`.
  - Construct the image URL: `https://www.artic.edu/iiif/2/{image_id}/full/843,/0/default.jpg`.
  - Construct the source link: `https://www.artic.edu/artworks/{id}`.

### 3. Bluesky Integration (`src/bluesky.ts`)
- Implement `postArtwork(artworkData, imageBuffer)`:
  - Authenticate using `BSKY_HANDLE` and `BSKY_PASSWORD`.
  - Upload the image buffer as a blob.
  - Create a post with the caption and the uploaded blob as an embed.

### 4. Main Logic (`src/index.ts`)
- Orchestrate the process:
  - Load environment variables.
  - Fetch random artwork data.
  - Download the image.
  - Post to Bluesky.

### 5. Automation & Configuration
- Create `.github/workflows/post.yml` with a cron schedule `0 14 * * *` (9:00 AM EST).
- Create `.env.example` with placeholders for `BSKY_HANDLE` and `BSKY_PASSWORD`.

## Verification & Testing
- **Local Test Script:** Run the bot manually to verify it fetches artwork and posts correctly to a test account (or verify the post payload if a real account isn't available).
- **Unit Tests:** (Optional but recommended) Test the AIC URL construction and caption formatting logic.
- **Workflow Simulation:** Verify the GitHub Action syntax and secrets requirements.

## Migration & Rollback
- Not applicable as this is a new project.
