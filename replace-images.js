const fs = require("fs");
const path = require("path");

const rootDir = __dirname;

const allowedExtensions = [".js", ".jsx", ".ts", ".tsx", ".html", ".css"];
const skipFolders = ["node_modules", ".next", "out", "dist", ".git"];
const imageExtensions = [".webp", ".webp", ".webp"];

function replaceInFiles(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!skipFolders.includes(file)) {
        replaceInFiles(fullPath);
      }
      continue;
    }

    const ext = path.extname(file).toLowerCase();

    if (!allowedExtensions.includes(ext)) continue;

    let content = fs.readFileSync(fullPath, "utf8");
    let updated = content;

    imageExtensions.forEach((imgExt) => {
      const regex = new RegExp(`\\${imgExt}`, "gi");
      updated = updated.replace(regex, ".webp");
    });

    if (updated !== content) {
      fs.writeFileSync(fullPath, updated, "utf8");
      console.log("Updated:", fullPath);
    }
  }
}

replaceInFiles(rootDir);
console.log("All image references replaced to WebP");