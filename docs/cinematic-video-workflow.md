# SAYBA GROUP — Photorealistic Cinematic Tower Reveal & Video Workflow

This document provides complete instructions for operating, customizing, and producing standalone video renders for the **SAYBA GROUP Photorealistic Cinematic Reveal**.

---

## 1. Overview of the 4-Scene Photorealistic Sequence

Rather than procedural 3D polygon meshes, this experience uses the **authentic high-resolution architectural photography** you provided, driven by smooth, scroll-controlled camera transforms (zoom, pan, depth aperture, and cross-dissolve transitions):

| Scene | Camera Range | Subject & Real Imagery | Cinematic Camera Motion |
| :--- | :--- | :--- | :--- |
| **Scene 1: Tower Introduction** | `Progress 0.00 – 0.28` | **50-Story Modern Skyscraper** (`scene1-tower.png`) | Starts wide framing the tower against morning mist; camera slowly zooms in (`scale: 1.0 → 1.28`) toward the facade as you scroll. |
| **Scene 2: The Approach** | `Progress 0.28 – 0.56` | **Revolving Glass Door Entrance** (`scene2-approach.png`) | Smooth cross-dissolve; camera glides inward toward the revolving bronze drum with warm golden sunset reflections. |
| **Scene 3: Interior Journey** | `Progress 0.56 – 0.82` | **Double-Height Grand Lobby** (`scene3-lobby.png`) | Transitions inside; camera tracks down the polished marble floor between monumental fluted bronze columns under the crystal chandelier. |
| **Scene 4: SAYBA GROUP Logo Reveal** | `Progress 0.82 – 1.00` | **Architectural Stone Feature Wall** (`scene4-logowall.jpg`) | Eases into a perfectly centered, stable hero composition; soft white halo backlight gently pulses around the clean white panel framing the official Sayba Group logo. |

---

## 2. Component Structure

The cinematic reveal is powered by clean, reusable components located in `src/components/cinematic/`:

```
src/components/cinematic/
├── CinematicTowerExperience.tsx            # Main wrapper component
├── PhotorealisticCinematicExperience.tsx   # Core engine with GSAP ScrollTrigger, lens transforms & overlay UI
└── CinematicFallback.tsx                   # Accessible fallback for reduced motion
```

### Key Props
- **`standalone`**: Pass `true` for a 100vh full-screen tour (used on `/cinematic`).
- **`onComplete`**: Callback function triggered when the user scrolls through to 100% or clicks "Skip Intro".

---

## 3. How to Replace or Update Image Assets

All 4 photographic assets reside in:
`public/assets/cinematic/`

1. **`scene1-tower.png`**: The modern skyscraper tower rising in the skyline.
2. **`scene2-approach.png`**: The revolving glass door grand entrance.
3. **`scene3-lobby.png`**: The double-height luxury lobby atrium.
4. **`scene4-logowall.jpg`**: The architectural stone feature wall with the Sayba Group logo.

To replace any image, overwrite the corresponding file in `public/assets/cinematic/`. The experience automatically preloads and renders the updated photography.

---

## 4. Running & Testing Locally

1. **Start the Development Server**:
   ```bash
   npm run dev
   ```
2. **Access the Pages**:
   - **Home Page Integrated Experience**: Open [http://localhost:5173/](http://localhost:5173/). Scrolling down advances through the 4 scenes smoothly, and seamlessly continues into the rest of the homepage.
   - **Dedicated Standalone Experience**: Open [http://localhost:5173/cinematic](http://localhost:5173/cinematic) (or click **"3D Reveal"** in the navigation bar).
3. **Interactive Features**:
   - **Play Tour Button**: Click `Play Tour` in the top right to watch an automated, hands-free 11.5-second cinematic playback at 60fps.
   - **Skip Intro Button**: Instantly scrolls past the intro down to the main homepage content.
   - **Restart Button**: Appears when reaching the logo reveal at 100% progress.

---

## 5. Standalone Video Rendering Workflow (10–12s 1080p MP4)

To generate a standalone 10–12 second 1920 × 1080 60fps MP4 video:

### Option A: Direct In-Browser High-Definition Video Recording
You can record the exact 11.5s 60fps tour directly from the browser:
1. Open [http://localhost:5173/cinematic](http://localhost:5173/cinematic).
2. Open Chrome DevTools (`F12`), paste the following script into the Console, and press Enter:
   ```javascript
   const element = document.querySelector('.sticky');
   navigator.mediaDevices.getDisplayMedia({ video: { frameRate: 60 } }).then(stream => {
     const recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });
     const chunks = [];
     recorder.ondataavailable = e => chunks.push(e.data);
     recorder.onstop = () => {
       const blob = new Blob(chunks, { type: 'video/webm' });
       const a = document.createElement('a');
       a.href = URL.createObjectURL(blob);
       a.download = 'sayba_cinematic_reveal.webm';
       a.click();
     };
     recorder.start();
     document.querySelector('button[title*="Play"]')?.click();
     setTimeout(() => recorder.stop(), 12000);
   });
   ```
3. Convert WebM to MP4 if required:
   ```bash
   ffmpeg -i sayba_cinematic_reveal.webm -c:v libx264 -crf 18 sayba_cinematic_reveal.mp4
   ```

### Option B: Blender Production Render Script
The automated Blender script is available in:
`scripts/blender_cinematic_render.py`
Run:
```bash
blender -b -P scripts/blender_cinematic_render.py -a
```
Outputs: `render_output/sayba_group_cinematic_reveal.mp4`.
