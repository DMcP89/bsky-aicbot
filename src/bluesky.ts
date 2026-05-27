import { BskyAgent, RichText } from '@atproto/api';
import { Artwork } from './aic';

export async function postArtwork(artwork: Artwork, imageBuffer: Buffer) {
  const agent = new BskyAgent({
    service: 'https://bsky.social',
  });

  const handle = process.env.BSKY_HANDLE;
  const password = process.env.BSKY_PASSWORD;

  if (!handle || !password) {
    throw new Error('BSKY_HANDLE or BSKY_PASSWORD environment variables are missing');
  }

  await agent.login({
    identifier: handle,
    password: password,
  });

  // 1. Upload the image
  const uploadResponse = await agent.uploadBlob(imageBuffer, { encoding: 'image/jpeg' });

  // 2. Create the caption with RichText for clickable links
  const rt = new RichText({
    text: `${artwork.title}\n${artwork.artist_display}\n${artwork.date_display}\n\nSource: ${artwork.source_url}`,
  });
  await rt.detectFacets(agent);

  // 3. Post to Bluesky
  await agent.post({
    text: rt.text,
    facets: rt.facets,
    embed: {
      $type: 'app.bsky.embed.images',
      images: [
        {
          alt: `${artwork.title} by ${artwork.artist_display}`,
          image: uploadResponse.data.blob,
        },
      ],
    },
  });

  console.log(`Successfully posted artwork: ${artwork.title}`);
}
