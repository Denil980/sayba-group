import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Loader2 } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface BuildingToInteriorExperienceProps {
  onComplete?: () => void;
  standalone?: boolean;
}

interface ArchitecturalSceneContent {
  id: string;
  sceneIndex: string;
  kicker: string;
  heading: string;
  description: string;
  highlights: string[];
  start: number;
  fadeInEnd: number;
  fadeOutStart: number;
  end: number;
}

const SCENE_CONTENTS: ArchitecturalSceneContent[] = [
  {
    id: 'scene-1-exterior',
    sceneIndex: '01',
    kicker: '01 / ARCHITECTURAL LANDMARK',
    heading: 'Beyond Ordinary Living',
    description:
      'A soaring testament to modern engineering and timeless aesthetic precision. Rising gracefully above the cityscape, Sayba Group’s signature tower integrates expansive panoramic glass exposures, morning sun orientation, and world-class structural integrity.',
    highlights: [
      'Iconic High-Rise Elevation',
      'Uninterrupted Skyline Vistas',
      'Sustainable Facade Design',
    ],
    start: 0.00,
    fadeInEnd: 0.05,
    fadeOutStart: 0.24,
    end: 0.31,
  },
  {
    id: 'scene-2-balcony',
    sceneIndex: '02',
    kicker: '02 / PRIVATE SKY SANCTUARY',
    heading: 'A View Beyond Expectations',
    description:
      'Expansive private terraces designed as natural extensions of the interior living space. Clad in artisanal Italian travertine stone with frameless glass balustrades that invite unobstructed morning breezes and serene horizon panoramas.',
    highlights: [
      'Frameless Glass Balustrades',
      'Italian Travertine Masonry',
      'Seamless Indoor-Outdoor Flow',
    ],
    start: 0.35,
    fadeInEnd: 0.39,
    fadeOutStart: 0.49,
    end: 0.54,
  },
  {
    id: 'scene-3-entrance',
    sceneIndex: '03',
    kicker: '03 / TIMELESS THRESHOLD',
    heading: 'Step Into Comfort',
    description:
      'A transition curated with acoustic comfort and spatial grandeur. Floor-to-ceiling thermal sliding portals glide effortlessly, welcoming natural light into an inviting sanctuary of refined craftsmanship and enduring warmth.',
    highlights: [
      'Acoustic Glazing Portals',
      'High-Ceiling Spatial Volume',
      'Natural Cross-Ventilation',
    ],
    start: 0.56,
    fadeInEnd: 0.60,
    fadeOutStart: 0.66,
    end: 0.70,
  },
  {
    id: 'scene-4-living',
    sceneIndex: '04',
    kicker: '04 / CURATED RESIDENCES',
    heading: 'Designed Around You',
    description:
      'Bespoke living environments crafted for modern luxury living and elevated hosting. Featuring European herringbone oak timber floors, custom ambient lighting, and generous proportions that harmonize style with complete daily peace.',
    highlights: [
      'Artisan Herringbone Oak Floors',
      'Designer Ambient Lighting',
      'Generous Open-Plan Layout',
    ],
    start: 0.72,
    fadeInEnd: 0.76,
    fadeOutStart: 0.85,
    end: 0.90,
  },
];

const getSceneMotion = (p: number, scene: ArchitecturalSceneContent, reducedMotion: boolean) => {
  if (p < scene.start || p > scene.end) {
    return { opacity: 0, translateY: 0, visible: false };
  }
  let opacity = 1;
  let translateY = 0;

  // Scene 1 is the establishing exterior shot: already visible at p = 0.00
  if (scene.start === 0.00 && p < scene.fadeInEnd) {
    opacity = 1;
    translateY = 0;
  } else if (p < scene.fadeInEnd) {
    const t = (p - scene.start) / (scene.fadeInEnd - scene.start);
    // Smooth cubic ease
    const ease = t * t * (3 - 2 * t);
    opacity = ease;
    translateY = (1 - ease) * 16;
  } else if (p > scene.fadeOutStart) {
    const t = (p - scene.fadeOutStart) / (scene.end - scene.fadeOutStart);
    const ease = t * t * (3 - 2 * t);
    opacity = 1 - ease;
    translateY = -ease * 16;
  }

  return {
    opacity: reducedMotion ? (opacity > 0.05 ? 1 : 0) : opacity,
    translateY: reducedMotion ? 0 : translateY,
    visible: opacity > 0.005,
  };
};

// =========================================================================
// GLSL SHADER: Slow, Cinematic Architectural Fly-Through with Portal Occlusion
// =========================================================================
const cinematicVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const cinematicFragmentShader = `
  uniform float uProgress;
  uniform vec2 uResolution;
  uniform float uAspect;
  uniform sampler2D uTexTower;
  uniform sampler2D uTexBalcony;
  uniform sampler2D uTexInterior;

  varying vec2 vUv;

  // ACES Filmic Tone Mapping for photographic dynamic range
  vec3 acesFilm(vec3 x) {
    float a = 2.51;
    float b = 0.03;
    float c = 2.43;
    float d = 0.59;
    float e = 0.14;
    return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
  }

  // Subtle organic 35mm film grain generator
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    // Exact 16:9 texture aspect ratio (1376 / 768 = 1.791667)
    float texAspect = 1376.0 / 768.0;
    vec2 st = vUv;

    // Object-fit: cover mapping across any viewport ratio (strictly within [0, 1], zero smearing)
    if (uAspect > texAspect) {
      st.y = (vUv.y - 0.5) * (texAspect / uAspect) + 0.5;
    } else {
      st.x = (vUv.x - 0.5) * (uAspect / texAspect) + 0.5;
    }

    float p = clamp(uProgress, 0.0, 1.0);

    // -------------------------------------------------------------
    // STAGE 1: Exterior Building Approach (p: 0.00 -> 0.35)
    // Camera starts wide showing complete tower, dollies toward Floor 8 balcony
    // -------------------------------------------------------------
    float p1 = clamp(p / 0.35, 0.0, 1.0);
    float easeP1 = smoothstep(0.0, 1.0, p1);
    float towerScale = mix(1.0, 2.85, pow(easeP1, 1.25));
    vec2 towerBalconyCenter = vec2(0.485, 0.445);
    vec2 towerFocus = mix(vec2(0.5, 0.5), towerBalconyCenter, easeP1);
    vec2 uvTower = (st - towerFocus) / towerScale + towerFocus;
    // Perspective tilt (simulates cinema camera tilting upward as it nears the facade)
    uvTower.y -= (1.0 - uvTower.y) * easeP1 * 0.032;
    vec4 colTower = texture2D(uTexTower, clamp(uvTower, 0.0, 1.0));

    // Optical match cut from tower zoom into architectural balcony entrance (p: 0.34 -> 0.365)
    // Fast, crisp transition prevents double-image ghosting
    float tTowerToBalcony = smoothstep(0.34, 0.365, p);

    // -------------------------------------------------------------
    // STAGE 2: Slow Balcony Approach and Close-up (p: 0.35 -> 0.55)
    // The camera holds and moves slowly across the balcony terrace.
    // Balcony railing, door frame, travertine wall, and reflections remain visible.
    // -------------------------------------------------------------
    float p2 = clamp((p - 0.35) / 0.20, 0.0, 1.0);
    float easeP2 = smoothstep(0.0, 1.0, p2);
    // Slow, stately camera push across the balcony (1.0 -> 1.25)
    float balconyScale = mix(1.0, 1.25, easeP2);
    vec2 balconyFocus = mix(vec2(0.5, 0.5), vec2(0.52, 0.50), easeP2);
    vec2 uvBalcony = (st - balconyFocus) / balconyScale + balconyFocus;
    vec4 colBalcony = texture2D(uTexBalcony, clamp(uvBalcony, 0.0, 1.0));

    // Specular reflection sweep across balcony glass balustrade as camera moves
    float glassSweep = (p >= 0.35 && p <= 0.55) ? 
      smoothstep(0.0, 0.14, 0.07 - abs(st.x - 0.44 - (p - 0.38) * 1.6)) * (1.0 - p2 * 0.5) : 0.0;
    colBalcony.rgb += vec3(0.07, 0.09, 0.10) * glassSweep;

    vec3 sceneStage2 = (p < 0.34) ? colTower.rgb : mix(colTower.rgb, colBalcony.rgb, tTowerToBalcony);

    // -------------------------------------------------------------
    // STAGE 3: Gradual Approach to Open Entrance (p: 0.55 -> 0.68)
    // Moving intentionally toward the open sliding door in center-right
    // -------------------------------------------------------------
    float p3 = clamp((p - 0.55) / 0.13, 0.0, 1.0);
    float easeP3 = smoothstep(0.0, 1.0, p3);
    float approachScale = mix(1.25, 1.95, easeP3);
    vec2 approachFocus = mix(vec2(0.52, 0.50), vec2(0.55, 0.51), easeP3);
    vec2 uvApproach = (st - approachFocus) / approachScale + approachFocus;
    vec4 colApproach = texture2D(uTexBalcony, clamp(uvApproach, 0.0, 1.0));

    vec3 sceneStage3 = (p < 0.55) ? sceneStage2 : colApproach.rgb;

    // -------------------------------------------------------------
    // STAGE 4: Crossing the Threshold & Revealing Interior (p: 0.68 -> 0.82)
    // Pure architectural door aperture occlusion:
    // Travertine stone wall and door frame remain 100% solid outside door opening.
    // Interior room is revealed strictly through the expanding door opening!
    // ZERO ghosting or transparent double-exposure.
    // -------------------------------------------------------------
    vec3 sceneStage4 = sceneStage3;
    if (p >= 0.68) {
      float p4 = clamp((p - 0.68) / 0.14, 0.0, 1.0);
      float easeP4 = smoothstep(0.0, 1.0, p4);

      // Door aperture expands outward as camera passes through
      float doorLeft = mix(0.48, -0.05, easeP4);
      float doorRight = mix(0.72, 1.05, easeP4);
      float inDoorway = smoothstep(doorLeft - 0.015, doorLeft + 0.015, st.x) * 
                        (1.0 - smoothstep(doorRight - 0.015, doorRight + 0.015, st.x));

      // Interior view entering the room
      float enterIntScale = mix(0.96, 1.35, easeP4);
      vec2 uvEnterInt = (st - vec2(0.505, 0.495)) / enterIntScale + vec2(0.505, 0.495);
      vec4 colEnterInt = texture2D(uTexInterior, clamp(uvEnterInt, 0.0, 1.0));

      // Continuous entrance: the interior view within doorway transitions seamlessly from balcony texture
      float interiorFade = smoothstep(0.0, 0.35, easeP4);
      vec3 doorwayContent = mix(colApproach.rgb, colEnterInt.rgb, interiorFade);

      sceneStage4 = mix(colApproach.rgb, doorwayContent, inDoorway);
    }

    // -------------------------------------------------------------
    // STAGE 5: Smooth Interior Traversal Onto Private Terrace (p: 0.82 -> 1.00)
    // Straight, rectilinear camera glide toward terrace horizon.
    // ZERO warping, ZERO tilt, 100% straight architectural lines.
    // -------------------------------------------------------------
    vec3 sceneColor = sceneStage4;
    if (p >= 0.82) {
      float p5 = clamp((p - 0.82) / 0.18, 0.0, 1.0);
      // Silky-smooth cinematic easing
      float easeP5 = smoothstep(0.0, 1.0, p5);
      
      // Pure rectilinear affine projection:
      // Preserves every straight line in the architecture (window mullions, door jambs, balustrade)
      float traverseScale = mix(1.35, 2.30, easeP5);
      vec2 traverseFocus = mix(vec2(0.505, 0.495), vec2(0.41, 0.485), easeP5);
      vec2 uvTraverse = (st - traverseFocus) / traverseScale + traverseFocus;

      vec4 colFinalInterior = texture2D(uTexInterior, clamp(uvTraverse, 0.0, 1.0));
      sceneColor = colFinalInterior.rgb;
    }

    // -------------------------------------------------------------
    // CINEMATIC LIGHTING & EXPOSURE DYNAMICS
    // -------------------------------------------------------------
    float exposure = 1.00;
    if (p > 0.42 && p <= 0.78) {
      float t = (p - 0.42) / 0.36;
      exposure = mix(1.00, 1.15, sin(t * 3.1415926));
    } else if (p > 0.78) {
      exposure = mix(1.15, 1.04, (p - 0.78) / 0.22);
    }

    sceneColor *= exposure;

    // ACES Filmic Tone Mapping
    sceneColor = acesFilm(sceneColor);

    // Lens Vignette
    float vignette = 1.0 - 0.18 * pow(length(vUv - 0.5) * 1.35, 2.0);
    sceneColor *= clamp(vignette, 0.0, 1.0);

    // Fine 35mm Cinema Grain
    float grain = (hash(vUv * uResolution + fract(p * 100.0)) - 0.5) * 0.010;
    sceneColor += grain;

    gl_FragColor = vec4(sceneColor, 1.0);
  }
`;

export const BuildingToInteriorExperience: React.FC<BuildingToInteriorExperienceProps> = ({
  onComplete,
  standalone = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAssetsLoaded, setIsAssetsLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // 1. Accessibility: Detect user's reduced-motion preference
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', handler);
    return () => motionQuery.removeEventListener('change', handler);
  }, []);

  // 2. Real WebGL Cinema Camera Engine
  useEffect(() => {
    if (prefersReducedMotion || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    let width = canvas.clientWidth || window.innerWidth;
    let height = canvas.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Load High-Res Architectural Textures
    const textureLoader = new THREE.TextureLoader();
    let loadedCount = 0;
    const totalTextures = 3;

    const checkLoaded = () => {
      loadedCount++;
      if (loadedCount >= totalTextures) {
        setIsAssetsLoaded(true);
      }
    };

    const texTower = textureLoader.load(
      '/assets/cinematic/scene1-tower-hd.jpg',
      checkLoaded
    );
    texTower.minFilter = THREE.LinearMipmapLinearFilter;
    texTower.magFilter = THREE.LinearFilter;
    texTower.generateMipmaps = true;

    const texBalcony = textureLoader.load(
      '/assets/cinematic/balcony-entrance-hd.jpg',
      checkLoaded
    );
    texBalcony.minFilter = THREE.LinearMipmapLinearFilter;
    texBalcony.magFilter = THREE.LinearFilter;
    texBalcony.generateMipmaps = true;

    const texInterior = textureLoader.load(
      '/assets/cinematic/interior-suite-hd.jpg',
      checkLoaded
    );
    texInterior.minFilter = THREE.LinearMipmapLinearFilter;
    texInterior.magFilter = THREE.LinearFilter;
    texInterior.generateMipmaps = true;

    // Shader Uniforms
    const shaderUniforms = {
      uProgress: { value: 0.0 },
      uResolution: { value: new THREE.Vector2(width, height) },
      uAspect: { value: width / height },
      uTexTower: { value: texTower },
      uTexBalcony: { value: texBalcony },
      uTexInterior: { value: texInterior },
    };

    const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader: cinematicVertexShader,
      fragmentShader: cinematicFragmentShader,
      uniforms: shaderUniforms,
      depthTest: false,
      depthWrite: false,
    });

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMaterial);
    scene.add(quad);

    // Responsive Motion Loop: 0.18 lerp ensures tight scroll tracking without sluggish lag
    let currentProgress = 0;
    let targetProgress = 0;
    let animFrameId: number;

    const renderLoop = () => {
      currentProgress += (targetProgress - currentProgress) * 0.18;
      shaderUniforms.uProgress.value = currentProgress;
      renderer.render(scene, camera);
      animFrameId = requestAnimationFrame(renderLoop);
    };

    animFrameId = requestAnimationFrame(renderLoop);

    // GSAP ScrollTrigger Integration: scrub 0.35 for crisp immediate response
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.35,
        onUpdate: (self) => {
          targetProgress = self.progress;
          setScrollProgress(self.progress);
        },
      });
    }, containerRef);

    // Window Resize Handler
    const handleResize = () => {
      if (!canvasRef.current) return;
      width = canvasRef.current.clientWidth || window.innerWidth;
      height = canvasRef.current.clientHeight || window.innerHeight;
      renderer.setSize(width, height, false);
      shaderUniforms.uResolution.value.set(width, height);
      shaderUniforms.uAspect.value = width / height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameId);
      ctx.revert();
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      shaderMaterial.dispose();
      quad.geometry.dispose();
      texTower.dispose();
      texBalcony.dispose();
      texInterior.dispose();
    };
  }, [prefersReducedMotion]);

  const p = scrollProgress;

  // Final logo opacity and subtle rise only when settled at the balcony terrace viewpoint (p >= 0.94)
  const logoProgress = Math.max(0, Math.min(1, (p - 0.94) / 0.06));
  const logoOpacity = logoProgress;
  const logoTranslateY = (1 - logoProgress) * 16;

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${
        standalone ? 'h-screen' : 'h-[480vh] sm:h-[540vh]'
      } bg-[#0A0B0C]`}
    >
      {/* Sticky 100vh Fullscreen Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden select-none bg-[#0A0B0C]">
        {/* ========================================================
            1. REAL THREE.JS PHOTOREALISTIC SHADER CANVAS
            ======================================================== */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block touch-none"
        />

        {/* Loading Overlay while assets initialize */}
        {!isAssetsLoaded && !prefersReducedMotion && (
          <div className="absolute inset-0 z-30 bg-[#0A0B0C] flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-[#80B3AD] animate-spin" />
            <p className="text-xs uppercase tracking-[0.25em] text-white/70 font-medium">
              Loading Architectural Experience...
            </p>
          </div>
        )}


        {/* ========================================================
            2. SCENE-SYNCHRONIZED EDITORIAL CONTENT (Scenes 1 - 4)
            High-contrast luxury frosted card with expanded architectural details
            ======================================================== */}
        <div className="absolute bottom-8 sm:bottom-12 md:bottom-14 left-4 sm:left-10 md:left-16 max-w-[calc(100vw-2rem)] sm:max-w-lg md:max-w-xl pointer-events-none z-20">
          {SCENE_CONTENTS.map((scene) => {
            const motion = getSceneMotion(p, scene, prefersReducedMotion);
            if (!motion.visible) return null;

            return (
              <div
                key={scene.id}
                className="transition-all duration-300 ease-out bg-black/80 sm:bg-black/75 backdrop-blur-2xl border border-white/20 p-5 sm:p-7 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
                style={{
                  opacity: motion.opacity,
                  transform: `translateY(${motion.translateY}px)`,
                }}
              >
                {/* Kicker / Category tag (Crisp White & Silver, NO blue) */}
                <div className="flex items-center gap-2.5 mb-2 sm:mb-2.5">
                  <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-white/75">
                    {scene.kicker}
                  </span>
                  <span className="h-px w-6 sm:w-8 bg-white/30" />
                </div>

                {/* Main Heading (Pure High-Contrast White) */}
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-serif font-normal text-white tracking-tight leading-[1.18] drop-shadow-sm">
                  {scene.heading}
                </h2>

                {/* Expanded Description (Crisp, High-Contrast White) */}
                <p className="mt-2 sm:mt-2.5 text-xs sm:text-sm md:text-[15px] text-white/90 leading-relaxed font-light drop-shadow-sm">
                  {scene.description}
                </p>

                {/* Architectural Highlights / Key Specs Badges */}
                <div className="mt-3.5 pt-3 border-t border-white/15 flex flex-wrap gap-1.5 sm:gap-2">
                  {scene.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/90 text-[11px] sm:text-xs font-medium tracking-wide"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================
            3. FINAL BRAND REVEAL AT BALCONY TERRACE (p >= 0.94)
            Elegantly revealed only at final terrace viewpoint
            ======================================================== */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 px-4 sm:px-8 transition-opacity duration-700"
          style={{
            opacity: prefersReducedMotion ? 1 : logoOpacity,
            transform: `translateY(${logoTranslateY}px)`,
          }}
        >
          {/* Authentic SAYBA GROUP Vector Branding */}
          <div className="relative w-[85vw] max-w-sm sm:max-w-md md:max-w-lg flex flex-col items-center">
            {/* SVG Logo: 100% exact vector geometry, authentic colors, zero cracks */}
            <svg
              viewBox="0 0 208 75"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto select-none filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.7)] drop-shadow-[0_0_25px_rgba(255,255,255,0.45)]"
            >
              {/* Architectural Triangle Roof: Exact authentic coordinates */}
              <polygon points="36.5,7 66,36.5 7,36.5" fill="#B3B3B3" />

              {/* Bold Teal Monogram S: Continuous mathematical Bézier curves, flush baseline cut */}
              <path
                d="M 37.202 65.624 Q 33.562 65.624 30.364 64.298 Q 27.166 62.972 24.852 60.528 Q 22.538 58.084 21.394 54.756 L 27.998 51.792 Q 29.454 54.964 32.028 56.784 Q 34.602 58.604 37.722 58.604 Q 39.386 58.604 40.582 58.084 Q 41.778 57.564 42.454 56.654 Q 43.13 55.744 43.13 54.496 Q 43.13 53.144 42.298 52.182 Q 41.466 51.22 39.698 50.648 L 32.106 48.152 Q 27.478 46.644 25.138 43.862 Q 22.798 41.08 22.798 37.18 Q 22.798 33.748 24.488 31.148 Q 26.178 28.548 29.22 27.092 Q 32.262 25.636 36.214 25.636 Q 39.698 25.636 42.662 26.832 Q 45.626 28.028 47.784 30.212 Q 49.942 32.396 51.403 36.5 L 43.466 36.5 Q 42.54 35.127 41.206 34.19 Q 39.022 32.656 36.214 32.656 Q 34.602 32.656 33.354 33.176 Q 32.106 33.696 31.43 34.658 Q 30.754 35.62 30.754 36.868 Q 30.754 38.22 31.638 39.234 Q 32.522 40.248 34.29 40.82 L 41.726 43.212 Q 46.406 44.72 48.72 47.424 Q 51.034 50.128 51.034 54.028 Q 51.034 57.408 49.266 60.034 Q 47.498 62.66 44.404 64.142 Q 41.31 65.624 37.202 65.624 Z"
                fill="#80B3AD"
              />

              {/* Typography: SAYBA (Bold Luxury Geometric) */}
              <text
                x="71"
                y="35"
                fontFamily="'Plus Jakarta Sans', Arial, Helvetica, sans-serif"
                fontSize="27"
                fontWeight="800"
                letterSpacing="0.22em"
                fill="#FFFFFF"
              >
                SAYBA
              </text>

              {/* Typography: GROUP (Refined Geometric) */}
              <text
                x="71"
                y="58"
                fontFamily="'Plus Jakarta Sans', Arial, Helvetica, sans-serif"
                fontSize="19"
                fontWeight="700"
                letterSpacing="0.42em"
                fill="#E8ECEB"
              >
                GROUP
              </text>
            </svg>

            {/* Tagline (Crisp Pure White) */}
            <p className="mt-4 text-xs sm:text-sm uppercase tracking-[0.3em] font-medium text-white text-center drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              Building Trust &bull; Creating Value
            </p>

            {/* Explore Button (High-Contrast White Luxury) */}
            <div className="mt-8 pointer-events-auto">
              <button
                type="button"
                onClick={() => {
                  if (onComplete) {
                    onComplete();
                  } else {
                    document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-8 py-3.5 rounded-full bg-white hover:bg-neutral-100 text-[#141515] font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-[0_4px_30px_rgba(255,255,255,0.4)] active:scale-95"
              >
                Explore Sayba Residences
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================
            4. SCROLL DOWN HINT (Fades away once movement begins)
            ======================================================== */}
        <div
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none transition-opacity duration-500"
          style={{ opacity: p > 0.12 ? 0 : 1 }}
        >
          <div className="flex items-center gap-2 bg-black/75 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 text-white text-xs tracking-widest uppercase font-semibold shadow-xl">
            <span>Scroll to Enter</span>
            <ArrowDown className="w-3.5 h-3.5 text-white animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingToInteriorExperience;
