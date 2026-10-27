import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\denil\\.gemini\\antigravity\\brain\\ede45c85-8a11-47e3-9900-45af5861c1f1\\validation_shots';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function capture() {
  console.log('Launching Chrome...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
    defaultViewport: { width: 1280, height: 720 }
  });

  const page = await browser.newPage();
  console.log('Navigating to http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'load', timeout: 45000 });

  // Wait for loading spinner to disappear (meaning all 3 textures are loaded)
  try {
    await page.waitForFunction(() => !document.querySelector('.animate-spin'), { timeout: 20000 });
  } catch (e) {
    console.log('Spinner check timeout, continuing...');
  }
  await new Promise(r => setTimeout(r, 2500));

  // Get total scrollable height of the cinematic container
  const containerHeight = await page.evaluate(() => {
    const el = document.querySelector('.sticky')?.parentElement;
    return el ? el.offsetHeight - window.innerHeight : 3500;
  });

  console.log('Cinematic scroll range:', containerHeight);

  const steps = [
    { name: '0_opening_hero', p: 0.00 },
    { name: '1_exterior_approach', p: 0.15 },
    { name: '2_balcony_closeup', p: 0.45 },
    { name: '3_entrance_approach', p: 0.62 },
    { name: '4_living_room_entry', p: 0.78 },
    { name: '5_room_traversal', p: 0.84 },
    { name: '6_terrace_final_reveal', p: 1.00 }
  ];

  for (const step of steps) {
    const scrollY = step.p * containerHeight;
    await page.evaluate((y) => {
      window.scrollTo(0, y);
    }, scrollY);

    // Wait for GSAP scrub & animation loop to settle
    await new Promise(r => setTimeout(r, 1200));

    const shotPath = path.join(outDir, `${step.name}.png`);
    await page.screenshot({ path: shotPath });
    console.log(`Captured ${step.name} at p=${step.p} (scrollY=${scrollY})`);
  }

  await browser.close();
  console.log('All screenshots captured successfully in:', outDir);
}

capture().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});
