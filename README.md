# AIC Artwork Bluesky Bot

A simple bot that posts a random public domain artwork from the Art Institute of Chicago to Bluesky every day.

Inspired by [bsky-jokeaday](https://github.com/DMcP89/bsky-jokeaday).

## How it works

1.  Fetches a random public domain artwork from the [AIC API](https://api.artic.edu/docs/).
2.  Downloads the high-resolution IIIF image.
3.  Posts the image to Bluesky with a caption containing:
    -   Title
    -   Artist
    -   Date
    -   Link to the artwork on the AIC website.

## Setup

### Local Development

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file based on `.env.example` and fill in your Bluesky credentials:
    ```env
    BSKY_HANDLE=your-handle.bsky.social
    BSKY_PASSWORD=your-app-password
    ```
4.  Run the bot:
    ```bash
    npm start
    ```

### GitHub Actions

The bot is configured to run daily at 9:00 AM EST via GitHub Actions.

1.  Go to your repository's **Settings > Secrets and variables > Actions**.
2.  Add two **Repository secrets**:
    -   `BSKY_HANDLE`: Your Bluesky handle (e.g., `user.bsky.social`).
    -   `BSKY_PASSWORD`: Your Bluesky App Password.
