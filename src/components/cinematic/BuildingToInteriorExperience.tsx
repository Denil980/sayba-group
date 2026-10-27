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

// =========================================================================
// GLSL SHADER: Continuous Architectural Fly-Through from Tower to Terrace
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

  // ACES Filmic Tone Mapping for photographic range
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
    // STAGE 1: Real Tower Exterior Drone Approach (p: 0.00 -> 0.35)
    // -------------------------------------------------------------
    float p1 = clamp(p / 0.35, 0.0, 1.0);
    float towerScale = mix(1.0, 2.85, pow(p1, 1.3));
    vec2 towerBalconyCenter = vec2(0.485, 0.445);
    vec2 towerFocus = mix(vec2(0.5, 0.5), towerBalconyCenter, p1);
    vec2 uvTower = (st - towerFocus) / towerScale + towerFocus;
    // Perspective tilt (simulates cinema camera tilting upward as it nears the facade)
    uvTower.y -= (1.0 - uvTower.y) * p1 * 0.035;
    vec4 colTower = texture2D(uTexTower, clamp(uvTower, 0.0, 1.0));

    // -------------------------------------------------------------
    // STAGE 2: Architectural Balcony Entrance (p: 0.28 -> 0.48)
    // -------------------------------------------------------------
    float p2 = clamp((p - 0.28) / 0.20, 0.0, 1.0);
    float balconyScale = mix(1.0, 1.7, pow(p2, 1.2));
    vec2 balconyFocus = mix(vec2(0.5, 0.5), vec2(0.54, 0.51), p2);
    vec2 uvBalcony = (st - balconyFocus) / balconyScale + balconyFocus;
    vec4 colBalcony = texture2D(uTexBalcony, clamp(uvBalcony, 0.0, 1.0));

    // Specular reflection sweep across balcony glass balustrade
    float glassSweep = smoothstep(0.0, 0.12, 0.06 - abs(st.x - 0.42 - (p - 0.35) * 1.8)) * (1.0 - p2);
    colBalcony.rgb += vec3(0.08, 0.10, 0.11) * glassSweep;

    // Optical transition from tower zoom into architectural balcony entrance
    float balcBlend = smoothstep(0.32, 0.40, p);
    vec3 sceneStage1 = mix(colTower.rgb, colBalcony.rgb, balcBlend);

    // -------------------------------------------------------------
    // STAGE 3: Passing Through Open Sliding Door (p: 0.42 -> 0.58)
    // -------------------------------------------------------------
    float p3 = clamp((p - 0.42) / 0.16, 0.0, 1.0);

    // -------------------------------------------------------------
    // STAGE 4 & 5: Traversing Living Suite Onto Private Terrace (p: 0.55 -> 1.00)
    // The camera glides all the way past the furniture, settling
    // at the balcony railing overlooking the morning city skyline
    // -------------------------------------------------------------
    float p4 = clamp((p - 0.55) / 0.45, 0.0, 1.0);
    // Scales to 2.38 so sofa & coffee table move completely past screen edges
    float interiorScale = mix(0.96, 2.38, pow(p4, 1.2));
    vec2 interiorFocus = vec2(0.505, 0.495);
    vec2 uvInterior = (st - interiorFocus) / interiorScale + interiorFocus;

    // Multiplane depth parallax: foreground furniture expands outward naturally
    float fgDepth = smoothstep(0.35, 0.95, st.y);
    uvInterior.y += fgDepth * p4 * 0.045;
    uvInterior.x += (st.x - 0.5) * fgDepth * p4 * 0.05;

    // Stabilized cinema gimbal sway
    float gimbalSway = sin(p * 16.0) * 0.0018 * (1.0 - p4);
    uvInterior.x += gimbalSway;
    vec4 colInterior = texture2D(uTexInterior, clamp(uvInterior, 0.0, 1.0));

    // Doorway frame occlusion: door opening is at x: 0.48 to 0.72
    float dLeft = mix(0.46, -0.1, p3);
    float dRight = mix(0.72, 1.1, p3);
    float inDoor = smoothstep(dLeft - 0.04, dLeft + 0.04, st.x) * (1.0 - smoothstep(dRight - 0.04, dRight + 0.04, st.x));
    float doorWipe = mix(smoothstep(0.42, 0.56, p), 1.0, inDoor * p3);
    vec3 sceneColor = mix(sceneStage1, colInterior.rgb, doorWipe);

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

    // Responsive Motion Loop: 0.22 lerp ensures tight scroll tracking without sluggish lag
    let currentProgress = 0;
    let targetProgress = 0;
    let animFrameId: number;

    const renderLoop = () => {
      currentProgress += (targetProgress - currentProgress) * 0.22;
      shaderUniforms.uProgress.value = currentProgress;
      renderer.render(scene, camera);
      animFrameId = requestAnimationFrame(renderLoop);
    };

    animFrameId = requestAnimationFrame(renderLoop);

    // GSAP ScrollTrigger Integration: scrub 0.3 for crisp immediate response
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
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

  // Final logo opacity and subtle rise only when settled at the balcony terrace viewpoint (p >= 0.86)
  const logoProgress = Math.max(0, Math.min(1, (p - 0.86) / 0.14));
  const logoOpacity = logoProgress;
  const logoTranslateY = (1 - logoProgress) * 16;

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${
        standalone ? 'h-screen' : 'h-[360vh] sm:h-[420vh]'
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

        {/* Stage Indicator Overlay (Discrete luxury architectural cue) */}
        <div className="absolute top-6 left-6 sm:left-10 z-20 pointer-events-none transition-opacity duration-500">
          <div className="flex items-center gap-2.5 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-white/85 text-[11px] tracking-widest uppercase font-medium shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#80B3AD] animate-pulse" />
            <span>
              {p < 0.35
                ? 'Exterior Tower View'
                : p < 0.55
                ? 'Balcony Approach & Entry'
                : p < 0.85
                ? 'Living Residence Traversal'
                : 'Panoramic Terrace Horizon'}
            </span>
          </div>
        </div>

        {/* ========================================================
            2. FINAL BRAND REVEAL AT BALCONY TERRACE (p >= 0.86)
            Elegantly revealed in the morning sky above the skyline
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

            {/* Tagline */}
            <p className="mt-4 text-xs sm:text-sm uppercase tracking-[0.3em] font-semibold text-[#80B3AD] text-center drop-shadow-md">
              Building Trust &bull; Creating Value
            </p>

            {/* Explore Button at final reveal */}
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
                className="px-8 py-3 rounded-full bg-[#80B3AD] hover:bg-[#689E98] text-[#141515] font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-[0_4px_25px_rgba(128,179,173,0.5)] active:scale-95"
              >
                Explore Sayba Residences
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================
            3. SCROLL DOWN HINT (Fades away once movement begins)
            ======================================================== */}
        <div
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none transition-opacity duration-500"
          style={{ opacity: p > 0.12 ? 0 : 1 }}
        >
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 text-white text-xs tracking-widest uppercase font-semibold shadow-xl">
            <span>Scroll to Enter</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#80B3AD] animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingToInteriorExperience;
