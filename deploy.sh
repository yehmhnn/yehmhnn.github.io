#!/bin/bash
set -e

# 1. Clear out the old local content to ensure a clean mirror
echo "🧹 Cleaning local deployment folder..."
rm -rf ./content

# 2. Copy the fresh content, configs, and components from your iCloud Quartz folder
echo "🔄 Copying latest files from iCloud Quartz..."
rsync -av --delete "/Users/yeh/Library/Mobile Documents/com~apple~CloudDocs/quartz_cloud/content/" ./content/
rsync -av --delete "/Users/yeh/Library/Mobile Documents/com~apple~CloudDocs/quartz_cloud/quartz/" ./quartz/
cp "/Users/yeh/Library/Mobile Documents/com~apple~CloudDocs/quartz_cloud/quartz.config.ts" ./quartz.config.ts
cp "/Users/yeh/Library/Mobile Documents/com~apple~CloudDocs/quartz_cloud/quartz.layout.ts" ./quartz.layout.ts

# 3. Clean the local build cache and push to GitHub
echo "🚀 Publishing to GitHub..."
# npx quartz build
npx quartz sync

echo "✅ Deployment finished successfully!"
