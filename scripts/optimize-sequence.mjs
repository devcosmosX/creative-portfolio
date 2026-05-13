import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, '../public/sequence');

async function optimizeImages() {
  try {
    const files = await fs.readdir(directoryPath);
    const pngFiles = files.filter(file => file.endsWith('.png'));

    if (pngFiles.length === 0) {
      console.log('No PNG files found to optimize.');
      return;
    }

    console.log(`Found ${pngFiles.length} PNG files. Starting conversion to WebP...`);

    let processedCount = 0;
    let savedBytes = 0;

    for (const file of pngFiles) {
      const inputPath = path.join(directoryPath, file);
      const outputFilename = file.replace('.png', '.webp');
      const outputPath = path.join(directoryPath, outputFilename);

      // Get original size
      const statsBefore = await fs.stat(inputPath);

      // Convert to webp
      await sharp(inputPath)
        .webp({ quality: 80, effort: 6 }) // high compression effort
        .toFile(outputPath);

      // Get new size
      const statsAfter = await fs.stat(outputPath);
      savedBytes += (statsBefore.size - statsAfter.size);

      // Remove the original PNG
      await fs.unlink(inputPath);

      processedCount++;
      if (processedCount % 10 === 0) {
        console.log(`Processed ${processedCount}/${pngFiles.length} frames...`);
      }
    }

    console.log(`✅ Conversion complete!`);
    console.log(`Saved ${(savedBytes / 1024 / 1024).toFixed(2)} MB in total.`);

  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

optimizeImages();
