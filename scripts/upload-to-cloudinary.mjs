#!/usr/bin/env node
/**
 * Upload all photos from public/images/ to Cloudinary.
 * 
 * Prerequisites:
 *   npm install cloudinary
 * 
 * Usage:
 *   CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME node scripts/upload-to-cloudinary.mjs
 * 
 * Or set individual env vars:
 *   CLOUDINARY_CLOUD_NAME=xxx CLOUDINARY_API_KEY=xxx CLOUDINARY_API_SECRET=xxx node scripts/upload-to-cloudinary.mjs
 */
import { v2 as cloudinary } from "cloudinary";
import { readdirSync, statSync } from "fs";
import { join, basename, extname } from "path";

// Configure from env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const IMAGES_DIR = "public/images";

function getFiles(dir, prefix = "") {
  const entries = readdirSync(dir);
  let files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      files = files.concat(getFiles(fullPath, prefix ? `${prefix}/${entry}` : entry));
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(entry)) {
      const name = basename(entry, extname(entry));
      const publicId = `prashanthi/${prefix ? prefix + "/" : ""}${name}`;
      files.push({ path: fullPath, publicId });
    }
  }
  return files;
}

async function main() {
  const files = getFiles(IMAGES_DIR);
  console.log(`Found ${files.length} images to upload\n`);

  let uploaded = 0;
  let skipped = 0;

  for (const file of files) {
    try {
      // Check if already exists
      try {
        await cloudinary.api.resource(file.publicId);
        console.log(`SKIP: ${file.publicId} (already exists)`);
        skipped++;
        continue;
      } catch {
        // Does not exist, upload it
      }

      const result = await cloudinary.uploader.upload(file.path, {
        public_id: file.publicId,
        overwrite: false,
        resource_type: "image",
      });
      console.log(`OK: ${file.publicId} -> ${result.secure_url}`);
      uploaded++;
    } catch (err) {
      console.error(`FAIL: ${file.publicId} - ${err.message}`);
    }
  }

  console.log(`\nDone! Uploaded: ${uploaded}, Skipped: ${skipped}, Total: ${files.length}`);
}

main();
