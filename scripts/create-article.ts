/**
 * Create New Article - Automated Blog Post Creation
 * Creates MDX file with proper frontmatter and downloads cover image
 */

import fs from 'fs';
import path from 'path';
import { downloadUnsplashImage } from './unsplash-images';

interface ArticleData {
  title: string;
  slug: string;
  description: string;
  keywords: string[];
  tags: string[];
  content: string;
  date?: string; // Optional, defaults to today
}

async function createArticle(data: ArticleData): Promise<void> {
  const {
    title,
    slug,
    description,
    keywords,
    tags,
    content,
    date = new Date().toISOString().split('T')[0], // Today's date by default
  } = data;

  // Create MDX file
  const articlePath = path.join(process.cwd(), 'content/posts', `${slug}.mdx`);
  
  if (fs.existsSync(articlePath)) {
    throw new Error(`Article already exists: ${slug}.mdx`);
  }

  const frontmatter = `---
title: "${title}"
date: "${date}"
slug: "${slug}"
description: "${description}"
keywords: ${JSON.stringify(keywords)}
tags: ${JSON.stringify(tags)}
coverImage: "/assets/posts/${slug}/cover.jpg"
author:
  name: "Klyx Studio"
  email: "contact@klyx.fr"
canonical: ""
---

${content}
`;

  fs.writeFileSync(articlePath, frontmatter, 'utf8');
  console.log(`✅ Article created: ${articlePath}`);

  // Download cover image from Unsplash
  console.log('\n📸 Downloading cover image from Unsplash...');
  try {
    await downloadUnsplashImage({ articlePath, force: false });
    console.log('✅ Cover image downloaded!\n');
  } catch (error) {
    console.error('⚠️  Failed to download image. You can run manually:\n');
    console.error(`   npm run get-image content/posts/${slug}.mdx\n`);
  }

  // Success message
  console.log('🎉 Article created successfully!\n');
  console.log('Next steps:');
  console.log(`1. Review article: content/posts/${slug}.mdx`);
  console.log(`2. Check image: public/assets/posts/${slug}/cover.jpg`);
  console.log(`3. Preview: npm run dev → http://localhost:3000/posts/${slug}`);
  console.log(`4. Deploy when ready!\n`);
}

// CLI
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === '--help') {
    console.log('\n📝 Create New Article');
    console.log('===================\n');
    console.log('This tool helps create article templates.');
    console.log('For AI-assisted article creation, use the chat workflow.\n');
    console.log('Manual usage:');
    console.log('  npm run create-article -- \\');
    console.log('    --title="Article Title" \\');
    console.log('    --slug="article-slug" \\');
    console.log('    --description="Description" \\');
    console.log('    --keywords="keyword1,keyword2" \\');
    console.log('    --tags="tag1,tag2" \\');
    console.log('    --content="# Content here"\n');
    process.exit(0);
  }

  const title = args.find(a => a.startsWith('--title='))?.split('=')[1] || '';
  const slug = args.find(a => a.startsWith('--slug='))?.split('=')[1] || '';
  const description = args.find(a => a.startsWith('--description='))?.split('=')[1] || '';
  const keywords = args.find(a => a.startsWith('--keywords='))?.split('=')[1]?.split(',') || [];
  const tags = args.find(a => a.startsWith('--tags='))?.split('=')[1]?.split(',') || [];
  const content = args.find(a => a.startsWith('--content='))?.split('=')[1] || '';
  const date = args.find(a => a.startsWith('--date='))?.split('=')[1];

  if (!title || !slug || !description || !content) {
    console.error('❌ Missing required fields: title, slug, description, content');
    process.exit(1);
  }

  await createArticle({ title, slug, description, keywords, tags, content, date });
}

if (require.main === module) {
  main().catch(console.error);
}

export { createArticle };

