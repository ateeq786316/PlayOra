#!/usr/bin/env node
/**
 * IndexNow submit helper (manual).
 * Usage:
 *   node scripts/indexnow_submit.mjs <KEY>
 *
 * 1) Generate an IndexNow key in Bing Webmaster Tools.
 * 2) Create a UTF-8 file at: public/<KEY>.txt containing the KEY.
 * 3) Deploy, then run this script to submit your URLs to IndexNow.
 *
 * Docs: https://www.bing.com/indexnow/getstarted
 */
const key = process.argv[2];
if (!key) {
  console.error("Missing key. Example: node scripts/indexnow_submit.mjs <KEY>");
  process.exit(1);
}

const host = "www.playoraapp.com";
const keyLocation = `https://${host}/${key}.txt`;

const urlList = [
  "https://www.playoraapp.com/",
  "https://www.playoraapp.com/links",
  "https://www.playoraapp.com/what-is-playora",
  "https://www.playoraapp.com/book-grounds-pakistan",
  "https://www.playoraapp.com/teams",
  "https://www.playoraapp.com/sports",
  "https://www.playoraapp.com/privacy-policy",
  "https://www.playoraapp.com/delete-account",
];

const payload = { host, key, keyLocation, urlList };

const res = await fetch("https://api.indexnow.org/IndexNow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(payload),
});

const text = await res.text().catch(() => "");
console.log("Status:", res.status);
console.log(text || "OK");
