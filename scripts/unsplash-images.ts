/**
 * Unsplash API Image Finder
 * Official Unsplash REST API implementation
 * FREE: 50 requests/hour (Demo) | 5000 requests/hour (Production)
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import https from 'https';

// Load .env.local
function loadEnvFile() {
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        const value = valueParts.join('=').trim();
        if (key && value) {
          process.env[key] = value;
        }
      }
    });
  }
}

loadEnvFile();

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || '';

// Track used image IDs to avoid duplicates
const usedImageIds = new Set<string>();

interface ImageOptions {
  articlePath: string;
  force?: boolean;
}

async function downloadUnsplashImage({ articlePath, force = false }: ImageOptions) {
  try {
    const fileContents = fs.readFileSync(articlePath, 'utf8');
    const { data } = matter(fileContents);
    const { title, description, slug, tags } = data;

    const imageDir = path.join(process.cwd(), 'public/assets/posts', slug);
    const imagePath = path.join(imageDir, 'cover.jpg');

    if (fs.existsSync(imagePath) && !force) {
      console.log(`✓ Image exists: ${title}`);
      return imagePath;
    }

    if (!fs.existsSync(imageDir)) {
      fs.mkdirSync(imageDir, { recursive: true });
    }

    console.log(`🔍 Searching for: ${title}`);

    const searchQuery = generateSearchQuery(title, description, tags);
    console.log(`📝 Query: ${searchQuery}`);

    // Search Unsplash API
    const photo = await searchUnsplash(searchQuery);
    
    if (!photo) {
      console.log(`⚠️  No results, trying broader search...`);
      const fallbackQuery = tags[0] || 'technology';
      const fallbackPhoto = await searchUnsplash(fallbackQuery);
      
      if (!fallbackPhoto) {
        throw new Error('No images found');
      }
      
      await downloadImage(fallbackPhoto.urls.regular, imagePath);
      await triggerDownload(fallbackPhoto.links.download_location);
    } else {
      await downloadImage(photo.urls.regular, imagePath);
      await triggerDownload(photo.links.download_location);
    }

    console.log(`✅ Saved: ${imagePath}`);
    return imagePath;
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

function generateSearchQuery(title: string, description: string, tags: string[]): string {
  const titleLower = title.toLowerCase();
  
  // Create VERY specific search queries with variations for uniqueness
  if (titleLower.includes('création') && titleLower.includes('bordeaux')) {
    return 'web developer coding modern office bordeaux';
  } else if (titleLower.includes('création') || titleLower.includes('site web') || titleLower.includes('développement')) {
    return 'programming code laptop developer desk workspace';
  } else if (titleLower.includes('coût') || titleLower.includes('prix') || titleLower.includes('budget')) {
    return 'financial planning business budget accounting';
  } else if (titleLower.includes('wordpress')) {
    return 'website performance speed optimization metrics';
  } else if (titleLower.includes('choisir') || titleLower.includes('agence')) {
    return 'business handshake partnership collaboration meeting';
  } else if (titleLower.includes('seo') && titleLower.includes('bordeaux')) {
    return 'digital marketing analytics bordeaux business';
  } else if (titleLower.includes('seo') || titleLower.includes('référencement')) {
    return 'search engine optimization data analytics growth';
  } else if (titleLower.includes('étude') || titleLower.includes('case')) {
    return 'business success metrics dashboard results';
  } else if (titleLower.includes('événements') && titleLower.includes('bordeaux')) {
    return 'bordeaux city architecture events technology';
  } else if (titleLower.includes('événements') || titleLower.includes('calendar')) {
    return 'tech conference networking people event';
  } else if (titleLower.includes('tendances') || titleLower.includes('design')) {
    return 'ui ux designer workspace figma modern';
  } else if (titleLower.includes('performance') || titleLower.includes('optimiser')) {
    return 'website performance speed optimization metrics';
  } else if (titleLower.includes('next.js') || titleLower.includes('nextjs')) {
    return 'fast loading website speed test dashboard';
  } else {
    // Use description keywords for better relevance
    const descWords = description.toLowerCase()
      .split(/\s+/)
      .filter(w => w.length > 4 && !['dans', 'pour', 'avec', 'sans', 'vous'].includes(w))
      .slice(0, 3)
      .join(' ');
    return descWords || `${tags[0] || 'technology'} professional business`;
  }
}

async function searchUnsplash(query: string): Promise<any | null> {
  if (!UNSPLASH_ACCESS_KEY) {
    throw new Error('UNSPLASH_ACCESS_KEY not set. Get free key at: https://unsplash.com/developers');
  }

  try {
    // Request 10 results to have variety and avoid duplicates
    const searchUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=10&orientation=landscape&content_filter=high&order_by=relevant`;
    
    const response = await fetch(searchUrl, {
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        'Accept-Version': 'v1',
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`Unsplash API error: ${error}`);
      return null;
    }

    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
      console.log(`No results for: ${query}`);
      return null;
    }

    // Find a photo we haven't used yet
    let photo = null;
    for (const result of data.results) {
      if (!usedImageIds.has(result.id)) {
        photo = result;
        usedImageIds.add(result.id); // Mark as used
        break;
      }
    }

    // If all photos are used, take the first one (shouldn't happen with 10 results)
    if (!photo) {
      photo = data.results[0];
      usedImageIds.add(photo.id);
    }

    console.log(`✓ Found: ${photo.description || photo.alt_description || 'Untitled'}`);
    console.log(`  By: ${photo.user.name} (@${photo.user.username})`);
    return photo;
  } catch (error) {
    console.error('Error searching Unsplash:', error);
    return null;
  }
}

async function triggerDownload(downloadLocation: string): Promise<void> {
  if (!UNSPLASH_ACCESS_KEY) return;
  
  try {
    // Trigger download tracking (required by Unsplash API guidelines)
    await fetch(downloadLocation, {
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });
  } catch (error) {
    // Non-critical, just for tracking
    console.log('Download tracking skipped');
  }
}

async function downloadImage(url: string, outputPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        if (response.headers.location) {
          https.get(response.headers.location, (redirectResponse) => {
            const file = fs.createWriteStream(outputPath);
            redirectResponse.pipe(file);
            file.on('finish', () => {
              file.close();
              resolve();
            });
          }).on('error', reject);
        }
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed: ${response.statusCode}`));
        return;
      }

      const file = fs.createWriteStream(outputPath);
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('\n📸 Unsplash API Image Finder');
    console.log('============================\n');
    console.log('Usage:');
    console.log('  npm run get-images        # Download all');
    console.log('  npm run get-image <file>  # Download one\n');
    console.log('Setup:');
    console.log('  1. Get FREE API key: https://unsplash.com/developers');
    console.log('  2. Add to .env.local: UNSPLASH_ACCESS_KEY=your_key\n');
    process.exit(1);
  }

  const force = args.includes('--force');

  if (args[0] === '--all') {
    const postsDir = path.join(process.cwd(), 'content/posts');
    const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.mdx'));
    
    console.log(`\n📸 Finding images for ${files.length} articles...\n`);
    
    for (const file of files) {
      const articlePath = path.join(postsDir, file);
      try {
        await downloadUnsplashImage({ articlePath, force });
        await new Promise(resolve => setTimeout(resolve, 1000)); // Rate limit friendly
      } catch (error) {
        console.error(`Failed: ${file}`);
      }
    }
    
    console.log('\n✅ All images downloaded!\n');
    console.log('📁 Check: public/assets/posts/*/cover.jpg');
    console.log('🔄 Refresh: http://localhost:3000\n');
  } else {
    const articlePath = args.find(arg => !arg.startsWith('--')) || '';
    await downloadUnsplashImage({ articlePath, force });
  }
}

if (require.main === module) {
  main().catch(console.error);
}

export { downloadUnsplashImage };

