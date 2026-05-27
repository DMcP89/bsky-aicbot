import * as dotenv from 'dotenv';
import { getRandomArtwork, downloadImage } from './aic';
import { postArtwork } from './bluesky';

dotenv.config();

async function main() {
  try {
    console.log('Fetching a random artwork from AIC...');
    const artwork = await getRandomArtwork();
    console.log(`Found: "${artwork.title}" by ${artwork.artist_display}`);

    console.log('Downloading image...');
    const imageBuffer = await downloadImage(artwork.image_url);

    console.log('Posting to Bluesky...');
    await postArtwork(artwork, imageBuffer);

    console.log('Done!');
  } catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
  }
}

main();
