#!/usr/bin/env node

/**
 * Get Image Dimensions Script
 *
 * Reads all images and outputs their dimensions for adding to HTML
 */

import sharp from "sharp";
import { readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PROJECT_ROOT = join(__dirname, "..");
const IMAGES_DIR = join(PROJECT_ROOT, "public", "assets", "images");
const ICONS_DIR = join(PROJECT_ROOT, "public", "assets", "icons");

async function getDimensions(directory, label) {
  console.log(`\n📐 ${label}:`);
  console.log("─".repeat(60));

  try {
    const files = readdirSync(directory);

    for (const file of files) {
      if (file.match(/\.(png|jpg|jpeg|svg|webp)$/i)) {
        try {
          const filePath = join(directory, file);
          const metadata = await sharp(filePath).metadata();
          console.log(`${file}:`);
          console.log(
            `  width="${metadata.width}" height="${metadata.height}"`
          );
        } catch (error) {
          console.log(`${file}: Error - ${error.message}`);
        }
      }
    }
  } catch (error) {
    console.error(`Error reading ${label}:`, error.message);
  }
}

async function main() {
  console.log("🖼️  Image Dimensions Report");
  console.log("═".repeat(60));

  await getDimensions(IMAGES_DIR, "Images");
  await getDimensions(ICONS_DIR, "Icons");

  console.log("\n✅ Done!\n");
}

main().catch(console.error);
