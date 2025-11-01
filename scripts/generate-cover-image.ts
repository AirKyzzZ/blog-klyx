/**
 * AI Cover Image Generator - 100% FREE
 * Uses Hugging Face Inference API (free tier) to generate cover images
 * Based on article title and description
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Load environment variables from .env.local manually
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

const HF_API_KEY = process.env.HUGGING_FACE_API_KEY || '';
const HF_MODEL = 'black-forest-labs/FLUX.1-dev'; // Hugging Face Model

interface ImageGenerationOptions {
  articlePath: string;
  force?: boolean; // Regenerate even if image exists
}

async function generateCoverImage({ articlePath, force = false }: ImageGenerationOptions) {
  try {
    // 1. Read article frontmatter
    const fileContents = fs.readFileSync(articlePath, 'utf8');
    const { data } = matter(fileContents);
    const { title, description, slug, tags } = data;

    // 2. Check if image already exists
    const imageDir = path.join(process.cwd(), 'public/assets/posts', slug);
    const imagePath = path.join(imageDir, 'cover.jpg');

    if (fs.existsSync(imagePath) && !force) {
      console.log(`✓ Image already exists for: ${title}`);
      return imagePath;
    }

    // 3. Create directory if needed
    if (!fs.existsSync(imageDir)) {
      fs.mkdirSync(imageDir, { recursive: true });
    }

    // 4. Generate prompt from article metadata
    const prompt = generatePrompt(title, description, tags);
    console.log(`🎨 Generating image for: ${title}`);
    console.log(`📝 Prompt: ${prompt}`);

    // 5. Call Hugging Face API
    const imageBuffer = await generateImageFromHuggingFace(prompt);

    // 6. Save image
    fs.writeFileSync(imagePath, imageBuffer);
    console.log(`✅ Image saved to: ${imagePath}`);

    return imagePath;
  } catch (error) {
    console.error('❌ Error generating image:', error);
    throw error;
  }
}

function generatePrompt(title: string, description: string, tags: string[]): string {
  // Create a focused, professional prompt for blog cover images
  const baseStyle = 'minimalist professional blog header, clean design, modern, high quality';
  const colorScheme = 'black and white with purple accent color #6b2fcd';
  const layout = '16:9 aspect ratio, centered composition, generous whitespace';
  
  // Extract key topics from title and description
  const topic = title.split('—')[0].trim(); // Get main topic before em dash
  const keywords = tags.join(', ');
  
  return `${baseStyle}, ${topic} theme, ${keywords} concept, ${colorScheme}, ${layout}, professional photography style, no text overlay, abstract modern design`;
}

async function generateImageFromHuggingFace(prompt: string): Promise<Buffer> {
  if (!HF_API_KEY) {
    throw new Error('HUGGING_FACE_API_KEY not set in environment variables');
  }

  const response = await fetch(
    `https://api-inference.huggingface.co/models/${HF_MODEL}`,
    {
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          width: 1200,
          height: 632, // Changed from 630 to 632 (divisible by 8)
          num_inference_steps: 30,
          guidance_scale: 7.5,
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`HuggingFace API error: ${error}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

// CLI usage
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: npm run generate-image <article-file.mdx> [--force]');
    console.log('Example: npm run generate-image content/posts/my-article.mdx');
    console.log('\nOr generate for all articles:');
    console.log('npm run generate-image --all');
    process.exit(1);
  }

  const force = args.includes('--force');

  if (args[0] === '--all') {
    // Generate for all articles in content/posts
    const postsDir = path.join(process.cwd(), 'content/posts');
    const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.mdx'));
    
    console.log(`🎨 Generating images for ${files.length} articles...\n`);
    
    for (const file of files) {
      const articlePath = path.join(postsDir, file);
      try {
        await generateCoverImage({ articlePath, force });
        // Wait 3 seconds between requests (free API rate limit)
        await new Promise(resolve => setTimeout(resolve, 3000));
      } catch (error) {
        console.error(`Failed to generate image for ${file}:`, error);
      }
    }
    
    console.log('\n✅ All images generated!');
  } else {
    // Generate for single article
    const articlePath = args.find(arg => !arg.startsWith('--')) || '';
    await generateCoverImage({ articlePath, force });
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

export { generateCoverImage };

