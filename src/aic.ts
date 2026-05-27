import axios from 'axios';

export interface Artwork {
  id: number;
  title: string;
  artist_display: string;
  date_display: string;
  image_id: string;
  source_url: string;
  image_url: string;
}

const AIC_API_URL = 'https://api.artic.edu/api/v1/artworks';
const IIIF_URL = 'https://www.artic.edu/iiif/2';

export async function getRandomArtwork(): Promise<Artwork> {
  // 1. Get total count of public domain artworks
  const initialResponse = await axios.get(`${AIC_API_URL}?limit=1&is_public_domain=true`, {
    headers: { 'AIC-User-Agent': 'AIC-Bluesky-Bot (https://github.com/DMcP89/bsky-aicbot)' }
  });
  
  const total = initialResponse.data.pagination.total;
  const randomPage = Math.floor(Math.random() * total) + 1;

  // 2. Fetch the artwork on that random page
  const response = await axios.get(`${AIC_API_URL}?page=${randomPage}&limit=1&is_public_domain=true&fields=id,title,artist_display,date_display,image_id`, {
    headers: { 'AIC-User-Agent': 'AIC-Bluesky-Bot (https://github.com/DMcP89/bsky-aicbot)' }
  });

  const data = response.data.data[0];
  if (!data || !data.image_id) {
    // If for some reason we got an artwork without an image, try again (recursive)
    return getRandomArtwork();
  }

  return {
    id: data.id,
    title: data.title,
    artist_display: data.artist_display,
    date_display: data.date_display,
    image_id: data.image_id,
    source_url: `https://www.artic.edu/artworks/${data.id}`,
    image_url: `${IIIF_URL}/${data.image_id}/full/843,/0/default.jpg`
  };
}

export async function downloadImage(url: string): Promise<Buffer> {
  const response = await axios.get(url, { 
    responseType: 'arraybuffer',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'AIC-User-Agent': 'AIC-Bluesky-Bot (https://github.com/DMcP89/bsky-aicbot)'
    }
  });
  return Buffer.from(response.data, 'binary');
}
