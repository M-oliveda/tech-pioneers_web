#!/usr/bin/env node

/**
 * Image Optimization Script
 *
 * This script:
 * 1. Converts PNG images to WebP format
 * 2. Optimizes PNG images
 * 3. Provides optimization statistics
 */

import sharp from "sharp";
import { statSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Go up one level from scripts/ to project root
const PROJECT_ROOT = join(__dirname, "..");
const IMAGES_DIR = join(PROJECT_ROOT, "public", "assets", "images");

/**
 * Get file size in KB
 */
function getFileSizeInKB(filepath) {
  const stats = statSync(filepath);
  return (stats.size / 1024).toFixed(2);
}

/**
 * Convert PNG to WebP
 */
async function convertToWebP(inputPath, outputPath, options = {}) {
  try {
    const originalSize = getFileSizeInKB(inputPath);

    // Default quality is 85, but can be overridden for small images
    const quality = options.quality || 85;
    const effort = options.effort || 6;

    await sharp(inputPath).webp({ quality, effort }).toFile(outputPath);

    const newSize = getFileSizeInKB(outputPath);
    const reduction = ((1 - newSize / originalSize) * 100).toFixed(1);

    console.log(`✅ Created WebP: ${outputPath}`);
    console.log(
      `   Original: ${originalSize} KB → WebP: ${newSize} KB (${reduction}% reduction, quality: ${quality})`
    );

    return { originalSize, newSize, reduction };
  } catch (error) {
    console.error(`❌ Error converting ${inputPath}:`, error.message);
    return null;
  }
}

/**
 * Optimize PNG
 */
async function optimizePNG(inputPath, outputPath) {
  try {
    const originalSize = getFileSizeInKB(inputPath);

    await sharp(inputPath)
      .png({ quality: 85, compressionLevel: 9, effort: 10 })
      .toFile(outputPath);

    const newSize = getFileSizeInKB(outputPath);
    const reduction = ((1 - newSize / originalSize) * 100).toFixed(1);

    console.log(`✅ Optimized PNG: ${outputPath}`);
    console.log(
      `   Original: ${originalSize} KB → Optimized: ${newSize} KB (${reduction}% reduction)`
    );

    return { originalSize, newSize, reduction };
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
    return null;
  }
}

/**
 * Main function
 */
async function main() {
  console.log("🚀 Starting image optimization...\n");

  const results = [];

  // Convert hero_image.png to WebP
  console.log("📸 Converting hero_image.png to WebP...");
  const heroWebP = await convertToWebP(
    join(IMAGES_DIR, "hero_image.png"),
    join(IMAGES_DIR, "hero_image.webp")
  );
  if (heroWebP) {
    results.push({ file: "hero_image.webp", ...heroWebP });
  }

  console.log("\n📸 Optimizing hero_image.png...");
  const heroPNG = await optimizePNG(
    join(IMAGES_DIR, "hero_image.png"),
    join(IMAGES_DIR, "hero_image_optimized.png")
  );
  if (heroPNG) {
    results.push({ file: "hero_image_optimized.png", ...heroPNG });
  }

  // Optimize apple_icon.png
  console.log("\n📸 Optimizing apple_icon.png...");
  const appleIcon = await optimizePNG(
    join(IMAGES_DIR, "apple_icon.png"),
    join(IMAGES_DIR, "apple_icon_optimized.png")
  );
  if (appleIcon) {
    results.push({ file: "apple_icon_optimized.png", ...appleIcon });
  }

  // Convert all SVGs to WebP
  console.log("\n📸 Converting SVGs to WebP...");

  // Separate files by size - small images need higher quality
  const smallSvgFiles = [
    "katherine_johnson.svg",
    "claude_shannon.svg",
    "radia_perlman.svg",
    "vint_cerf.svg",
    "shafrira_goldwasser.svg",
    "donald_knuth.svg",
  ];

  const largeSvgFiles = [
    "ada_lovelace.svg",
    "alan_turing.svg",
    "grace_hopper.svg",
    "tim_berners_lee.svg",
  ];

  // Convert small images with higher quality (95) to avoid blurriness
  console.log(
    "\n   Converting small profile images (80x80) with high quality..."
  );
  for (const file of smallSvgFiles) {
    const inputPath = join(IMAGES_DIR, file);
    const outputPath = join(IMAGES_DIR, file.replace(".svg", ".webp"));

    console.log(`   Processing ${file}...`);
    const webpResult = await convertToWebP(inputPath, outputPath, {
      quality: 95,
      effort: 6,
    });

    if (webpResult) {
      results.push({ file: outputPath.split("/").pop(), ...webpResult });
    }
  }

  // Convert large images with standard quality (85)
  console.log(
    "\n   Converting large profile images (223x223) with standard quality..."
  );
  for (const file of largeSvgFiles) {
    const inputPath = join(IMAGES_DIR, file);
    const outputPath = join(IMAGES_DIR, file.replace(".svg", ".webp"));

    console.log(`   Processing ${file}...`);
    const webpResult = await convertToWebP(inputPath, outputPath, {
      quality: 85,
      effort: 6,
    });

    if (webpResult) {
      results.push({ file: outputPath.split("/").pop(), ...webpResult });
    }
  }

  console.log("\n🎉 Image optimization complete!\n");
  console.log("📊 Summary:");
  console.log("─".repeat(60));

  let totalOriginal = 0;
  let totalNew = 0;

  results.forEach((result) => {
    totalOriginal += parseFloat(result.originalSize);
    totalNew += parseFloat(result.newSize);
    console.log(`${result.file}:`);
    console.log(
      `  Original: ${result.originalSize} KB → New: ${result.newSize} KB`
    );
    console.log(`  Reduction: ${result.reduction}%`);
  });

  const totalReduction = ((1 - totalNew / totalOriginal) * 100).toFixed(1);
  console.log("─".repeat(60));
  console.log(
    `Total: ${totalOriginal.toFixed(2)} KB → ${totalNew.toFixed(2)} KB`
  );
  console.log(`Overall reduction: ${totalReduction}%`);
  console.log(
    "\n⚠️  Note: Replace original files with optimized versions manually after review"
  );
}

main().catch(console.error);
