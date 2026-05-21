const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const publicDir = path.join(__dirname, "public");
const imageExtensions = [".webp", ".webp", ".webp"];

async function convertImages(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await convertImages(fullPath);
      continue;
    }

    const ext = path.extname(file).toLowerCase();

    if (imageExtensions.includes(ext)) {
      const outputPath = fullPath.replace(ext, ".webp");

      if (fs.existsSync(outputPath)) {
        console.log("Already exists:", outputPath);
        continue;
      }

      await sharp(fullPath)
        .webp({ quality: 80 })
        .toFile(outputPath);

      console.log("Converted:", outputPath);
    }
  }
}

convertImages(publicDir)
  .then(() => console.log("All images converted to WebP"))
  .catch(console.error);