import fs from "fs";
import path from "path";
import https from "https";

// -----------------------------
// SDK FILES TO DOWNLOAD
// -----------------------------

const FILES = [
  {
    url: "https://raw.githubusercontent.com/battlefield-portal-community/OfficailPortalSDK/main/code/mod/index.d.ts",
    local: "code/mod/index.d.ts",
  },
  {
    url: "https://raw.githubusercontent.com/battlefield-portal-community/OfficailPortalSDK/main/code/modlib/index.ts",
    local: "code/modlib/index.ts",
  }
];

// -----------------------------

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(dest);

    // Create directory if not exists
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const file = fs.createWriteStream(dest);

    https.get(url, response => {
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode} for ${url}`));
        return;
      }

      response.pipe(file);

      file.on("finish", () => {
        file.close(() => {
          console.log(`✔ Updated: ${dest}`);
          resolve();
        });
      });
    }).on("error", err => {
      reject(err);
    });
  });
}

// -----------------------------

async function updateSDK() {
  console.log("🔄 Updating SDK files...\n");

  for (const file of FILES) {
    try {
      await downloadFile(file.url, file.local);
    } catch (err) {
      console.error(`❌ Failed to update ${file.local}: ${err.message}`);
    }
  }

  console.log("\n✨ SDK update complete!");
}

updateSDK();
