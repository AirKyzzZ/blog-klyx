#!/bin/bash

# Generate Cover Images for All Blog Posts - 100% FREE
# Uses Hugging Face Inference API (free tier)

echo "🎨 AI Cover Image Generator - Blog Klyx"
echo "========================================"
echo ""

# Check if Hugging Face API key is set
if [ -z "$HUGGING_FACE_API_KEY" ]; then
    echo "⚠️  HUGGING_FACE_API_KEY not set!"
    echo ""
    echo "Get your FREE API key:"
    echo "1. Go to https://huggingface.co/settings/tokens"
    echo "2. Create a new token (read access is enough)"
    echo "3. Copy the token"
    echo "4. Add to .env.local:"
    echo "   HUGGING_FACE_API_KEY=hf_xxxxxxxxxxxx"
    echo ""
    exit 1
fi

# Generate images for all articles
echo "📝 Found articles in content/posts/"
echo ""

for article in content/posts/*.mdx; do
    if [ -f "$article" ]; then
        echo "🎨 Processing: $(basename $article)"
        npm run generate-image "$article"
        echo ""
    fi
done

echo "✅ All cover images generated!"
echo ""
echo "📁 Images saved to: public/assets/posts/*/cover.jpg"
echo "🚀 Ready to deploy!"

