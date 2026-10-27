import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface BuildingToInteriorExperienceProps {
  onComplete?: () => void;
  standalone?: boolean;
}

export const BuildingToInteriorExperience: React.FC<BuildingToInteriorExperienceProps> = ({
  onComplete,
  standalone = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // 1. Check reduced motion preferences
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', handler);
    return () => motionQuery.removeEventListener('change', handler);
  }, []);

  // 2. Three.js Cinematic Scene & Camera Spline Trajectory
  useEffect(() => {
    if (prefersReducedMotion || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdce7ee);
    scene.fog = new THREE.FogExp2(0xdce7ee, 0.007);

    const camera = new THREE.PerspectiveCamera(46, width / height, 0.08, 600);
    camera.position.set(0, 10.8, 38);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // --- Texture Loading ---
    const textureLoader = new THREE.TextureLoader();

    // High-res architectural PBR textures
    const marbleTex = textureLoader.load('/assets/textures/marble_floor.jpg');
    marbleTex.wrapS = THREE.RepeatWrapping;
    marbleTex.wrapT = THREE.RepeatWrapping;
    marbleTex.repeat.set(4, 8);

    const woodSlatsTex = textureLoader.load('/assets/textures/wood_slats.jpg');
    woodSlatsTex.wrapS = THREE.RepeatWrapping;
    woodSlatsTex.wrapT = THREE.RepeatWrapping;
    woodSlatsTex.repeat.set(4, 2);

    const cityPanoTex = textureLoader.load('/assets/textures/city_skyline_pano.jpg');
    cityPanoTex.wrapS = THREE.ClampToEdgeWrapping;
    cityPanoTex.wrapT = THREE.ClampToEdgeWrapping;

    const towerPhotoTex = textureLoader.load('/assets/cinematic/scene1-tower-hd.jpg');

    // --- Lighting Rig ---
    // Warm morning sun casting realistic diagonal light
    const sunLight = new THREE.DirectionalLight(0xfff1de, 2.5);
    sunLight.position.set(30, 44, 28);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 160;
    sunLight.shadow.camera.left = -28;
    sunLight.shadow.camera.right = 28;
    sunLight.shadow.camera.top = 28;
    sunLight.shadow.camera.bottom = -28;
    sunLight.shadow.bias = -0.0004;
    scene.add(sunLight);

    // Soft morning sky ambient fill
    const ambientLight = new THREE.AmbientLight(0xcadbe8, 0.9);
    scene.add(ambientLight);

    // Warm interior cove & chandelier lights
    const interiorPoint = new THREE.PointLight(0xffd59e, 2.4, 24, 1.2);
    interiorPoint.position.set(0, 8.8, -4);
    interiorPoint.castShadow = true;
    interiorPoint.shadow.bias = -0.001;
    scene.add(interiorPoint);

    // Recessed ceiling cove illumination
    const coveLight = new THREE.DirectionalLight(0xffdcad, 1.2);
    coveLight.position.set(0, 9.6, -6);
    coveLight.target.position.set(0, 5, -6);
    scene.add(coveLight);
    scene.add(coveLight.target);

    // --- 1. Distant Panoramic City Sky Dome ---
    const panoGeo = new THREE.CylinderGeometry(90, 90, 48, 48, 1, true, -Math.PI * 0.75, Math.PI * 1.5);
    const panoMat = new THREE.MeshBasicMaterial({
      map: cityPanoTex,
      side: THREE.BackSide,
      fog: false,
    });
    const panoMesh = new THREE.Mesh(panoGeo, panoMat);
    panoMesh.position.set(0, 10, -26);
    scene.add(panoMesh);

    // Flanking city skyline buildings for 3D depth parallax
    const cityMat = new THREE.MeshStandardMaterial({
      color: 0x94a5b2,
      roughness: 0.9,
      metalness: 0.1,
    });
    const cityGroup = new THREE.Group();
    for (let i = 0; i < 30; i++) {
      const bWidth = 3.2 + Math.random() * 4.2;
      const bHeight = 16 + Math.random() * 34;
      const bDepth = 3.2 + Math.random() * 4.2;
      const bGeo = new THREE.BoxGeometry(bWidth, bHeight, bDepth);
      const bMesh = new THREE.Mesh(bGeo, cityMat);
      
      const side = i % 2 === 0 ? 1 : -1;
      const x = side * (16 + Math.random() * 28);
      const z = -10 + Math.random() * 38;
      bMesh.position.set(x, bHeight / 2 - 4, z);
      cityGroup.add(bMesh);
    }
    scene.add(cityGroup);

    // --- 2. The 3D Architectural Tower Facade ---
    const towerGroup = new THREE.Group();
    const slabMat = new THREE.MeshStandardMaterial({
      color: 0xe8e6e2,
      roughness: 0.6,
      metalness: 0.1,
    });
    const columnMat = new THREE.MeshStandardMaterial({
      color: 0x3d3630, // Champagne bronze
      roughness: 0.35,
      metalness: 0.75,
    });
    const facadeGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xa8c8c5,
      transmission: 0.82,
      opacity: 1,
      transparent: true,
      roughness: 0.08,
      metalness: 0.15,
      ior: 1.52,
    });
    const railingMat = new THREE.MeshPhysicalMaterial({
      color: 0xb5d4d2,
      transmission: 0.92,
      transparent: true,
      roughness: 0.05,
      metalness: 0.2,
      ior: 1.5,
    });

    // 16 floors of architectural tower structure
    const totalFloors = 16;
    const floorHeight = 1.35;
    for (let f = 0; f < totalFloors; f++) {
      const y = f * floorHeight;
      // Floor concrete slab
      const slabGeo = new THREE.BoxGeometry(16.5, 0.22, 12);
      const slab = new THREE.Mesh(slabGeo, slabMat);
      slab.position.set(0, y, 0);
      slab.receiveShadow = true;
      slab.castShadow = true;
      towerGroup.add(slab);

      // Balcony projection for alternating floors
      if (f % 2 === 1 && f !== 8) {
        const balcSlabGeo = new THREE.BoxGeometry(7, 0.18, 2.2);
        const balcSlab = new THREE.Mesh(balcSlabGeo, slabMat);
        balcSlab.position.set(0, y, 6.2);
        towerGroup.add(balcSlab);

        // Glass railing
        const railGeo = new THREE.BoxGeometry(7, 0.7, 0.08);
        const rail = new THREE.Mesh(railGeo, railingMat);
        rail.position.set(0, y + 0.45, 7.25);
        towerGroup.add(rail);
      }

      // Exterior window glass panels on facade
      if (f !== 8) {
        const winGeo = new THREE.BoxGeometry(14, floorHeight - 0.28, 0.08);
        const win = new THREE.Mesh(winGeo, facadeGlassMat);
        win.position.set(0, y + floorHeight / 2, 5.8);
        towerGroup.add(win);
      }
    }

    // Architectural photo facade backdrop (provides authentic Sayba building texture)
    const photoPlaneGeo = new THREE.PlaneGeometry(16.5, totalFloors * floorHeight);
    const photoPlaneMat = new THREE.MeshBasicMaterial({
      map: towerPhotoTex,
      side: THREE.FrontSide,
    });
    const photoPlane = new THREE.Mesh(photoPlaneGeo, photoPlaneMat);
    photoPlane.position.set(0, (totalFloors * floorHeight) / 2, 5.72);
    towerGroup.add(photoPlane);

    // Vertical structural columns flanking the facade
    const colGeo = new THREE.BoxGeometry(0.5, totalFloors * floorHeight, 0.8);
    const colLeft = new THREE.Mesh(colGeo, columnMat);
    colLeft.position.set(-8.1, (totalFloors * floorHeight) / 2, 5.8);
    const colRight = new THREE.Mesh(colGeo, columnMat);
    colRight.position.set(8.1, (totalFloors * floorHeight) / 2, 5.8);
    towerGroup.add(colLeft);
    towerGroup.add(colRight);
    scene.add(towerGroup);

    // --- 3. The Target Suite (Floor 8: y = 5.2 to 9.8) ---
    const targetGroup = new THREE.Group();

    // Large Balcony Terrace Floor extending forward
    const terraceGeo = new THREE.BoxGeometry(11, 0.24, 2.8);
    const terrace = new THREE.Mesh(terraceGeo, slabMat);
    terrace.position.set(0, 5.2, 7.2);
    terrace.receiveShadow = true;
    targetGroup.add(terrace);

    // Glass safety railing on the balcony entrance
    const balcRailGeo = new THREE.BoxGeometry(10.8, 0.82, 0.08);
    const balcRail = new THREE.Mesh(balcRailGeo, railingMat);
    balcRail.position.set(0, 5.7, 8.5);
    targetGroup.add(balcRail);

    // Dark bronze aluminum sliding door frame at z = 6.0
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x221d19,
      metalness: 0.82,
      roughness: 0.22,
    });
    
    // Top & bottom horizontal door tracks
    const frameTop = new THREE.Mesh(new THREE.BoxGeometry(11.2, 0.16, 0.3), frameMat);
    frameTop.position.set(0, 9.7, 6.0);
    const frameBottom = new THREE.Mesh(new THREE.BoxGeometry(11.2, 0.16, 0.3), frameMat);
    frameBottom.position.set(0, 5.3, 6.0);
    targetGroup.add(frameTop);
    targetGroup.add(frameBottom);

    // Vertical door posts (left, right, center mullions)
    const postGeo = new THREE.BoxGeometry(0.16, 4.3, 0.3);
    const postLeft = new THREE.Mesh(postGeo, frameMat);
    postLeft.position.set(-5.4, 7.5, 6.0);
    const postRight = new THREE.Mesh(postGeo, frameMat);
    postRight.position.set(5.4, 7.5, 6.0);
    const postCenter = new THREE.Mesh(postGeo, frameMat);
    postCenter.position.set(0, 7.5, 6.0);
    targetGroup.add(postLeft);
    targetGroup.add(postRight);
    targetGroup.add(postCenter);

    // Sliding glass doors at entrance
    const doorGlassLeft = new THREE.Mesh(new THREE.BoxGeometry(5.2, 4.2, 0.05), facadeGlassMat);
    doorGlassLeft.position.set(-2.8, 7.5, 6.0);
    const doorGlassRight = new THREE.Mesh(new THREE.BoxGeometry(5.2, 4.2, 0.05), facadeGlassMat);
    doorGlassRight.position.set(2.8, 7.5, 6.0);
    targetGroup.add(doorGlassLeft);
    targetGroup.add(doorGlassRight);
    scene.add(targetGroup);

    // --- 4. The Modern Luxury Apartment Interior (z = 6.0 down to z = -14.0) ---
    const roomGroup = new THREE.Group();

    // Marble Floor (y = 5.2, z: 6.0 to -14.0)
    const floorGeo = new THREE.PlaneGeometry(12.8, 20.2);
    const floorMat = new THREE.MeshStandardMaterial({
      map: marbleTex,
      roughness: 0.18,
      metalness: 0.06,
    });
    const roomFloor = new THREE.Mesh(floorGeo, floorMat);
    roomFloor.rotation.x = -Math.PI / 2;
    roomFloor.position.set(0, 5.21, -4.0);
    roomFloor.receiveShadow = true;
    roomGroup.add(roomFloor);

    // False Ceiling with recessed warm cove (y = 9.8)
    const ceilGeo = new THREE.PlaneGeometry(12.8, 20.2);
    const ceilMat = new THREE.MeshStandardMaterial({
      color: 0xf6f5f2,
      roughness: 0.8,
    });
    const roomCeil = new THREE.Mesh(ceilGeo, ceilMat);
    roomCeil.rotation.x = Math.PI / 2;
    roomCeil.position.set(0, 9.8, -4.0);
    roomGroup.add(roomCeil);

    // Glowing Cove Recess Strip
    const coveStripGeo = new THREE.BoxGeometry(10.5, 0.1, 16.5);
    const coveStripMat = new THREE.MeshStandardMaterial({
      color: 0xffe2b8,
      emissive: 0xffcb85,
      emissiveIntensity: 0.9,
    });
    const coveStrip = new THREE.Mesh(coveStripGeo, coveStripMat);
    coveStrip.position.set(0, 9.72, -4.0);
    roomGroup.add(coveStrip);

    // Left Feature Wall: Fluted Architectural Wood Slats (x = -6.4)
    const leftWallGeo = new THREE.PlaneGeometry(20.2, 4.6);
    const leftWallMat = new THREE.MeshStandardMaterial({
      map: woodSlatsTex,
      roughness: 0.45,
      metalness: 0.15,
    });
    const leftWall = new THREE.Mesh(leftWallGeo, leftWallMat);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-6.38, 7.5, -4.0);
    roomGroup.add(leftWall);

    // Recessed art piece on wood wall
    const artGeo = new THREE.BoxGeometry(0.12, 2.2, 3.4);
    const artMat = new THREE.MeshStandardMaterial({
      color: 0x1f2e2d, // Deep teal / gold luxury abstract
      emissive: 0x0a1413,
      roughness: 0.3,
    });
    const art = new THREE.Mesh(artGeo, artMat);
    art.position.set(-6.3, 7.5, -3.5);
    roomGroup.add(art);

    // Right Wall: Off-white luxury plaster (x = 6.4)
    const rightWallGeo = new THREE.PlaneGeometry(20.2, 4.6);
    const rightWallMat = new THREE.MeshStandardMaterial({
      color: 0xeeece8,
      roughness: 0.75,
    });
    const rightWall = new THREE.Mesh(rightWallGeo, rightWallMat);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(6.38, 7.5, -4.0);
    roomGroup.add(rightWall);

    // Built-in low credenza along right wall
    const credenzaGeo = new THREE.BoxGeometry(0.9, 0.75, 7.5);
    const credenzaMat = new THREE.MeshStandardMaterial({
      color: 0x2e2722, // Dark walnut & brass
      roughness: 0.3,
      metalness: 0.4,
    });
    const credenza = new THREE.Mesh(credenzaGeo, credenzaMat);
    credenza.position.set(5.85, 5.6, -3.5);
    credenza.castShadow = true;
    credenza.receiveShadow = true;
    roomGroup.add(credenza);

    // --- Luxury Furniture Group ---
    // 1. Curved Italian Sectional Sofa (Bouclé Cream)
    const sofaMat = new THREE.MeshStandardMaterial({
      color: 0xf2eee6,
      roughness: 0.85,
    });
    const sofaBaseGeo = new THREE.BoxGeometry(4.2, 0.45, 1.8);
    const sofaBase = new THREE.Mesh(sofaBaseGeo, sofaMat);
    sofaBase.position.set(-2.2, 5.45, -0.5);
    sofaBase.castShadow = true;
    sofaBase.receiveShadow = true;
    roomGroup.add(sofaBase);

    // Sofa backrest
    const sofaBackGeo = new THREE.BoxGeometry(4.2, 0.55, 0.45);
    const sofaBack = new THREE.Mesh(sofaBackGeo, sofaMat);
    sofaBack.position.set(-2.2, 5.85, 0.2);
    sofaBack.castShadow = true;
    roomGroup.add(sofaBack);

    // Sofa chaise return on left
    const chaiseGeo = new THREE.BoxGeometry(1.6, 0.45, 2.0);
    const chaise = new THREE.Mesh(chaiseGeo, sofaMat);
    chaise.position.set(-3.5, 5.45, -1.8);
    chaise.castShadow = true;
    chaise.receiveShadow = true;
    roomGroup.add(chaise);

    // Accent throw pillows (teal & warm taupe)
    const pillowMat1 = new THREE.MeshStandardMaterial({ color: 0x80b3ad, roughness: 0.6 });
    const pillow1 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.4, 0.2), pillowMat1);
    pillow1.position.set(-1.0, 5.8, 0.05);
    pillow1.rotation.y = -0.2;
    roomGroup.add(pillow1);

    // 2. Modern Coffee Table (Calacatta marble top & brushed brass rim)
    const tableTopGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.08, 32);
    const tableTopMat = new THREE.MeshStandardMaterial({
      map: marbleTex,
      roughness: 0.2,
      metalness: 0.1,
    });
    const tableTop = new THREE.Mesh(tableTopGeo, tableTopMat);
    tableTop.position.set(-1.0, 5.5, -2.6);
    tableTop.castShadow = true;
    tableTop.receiveShadow = true;
    roomGroup.add(tableTop);

    const tableBaseGeo = new THREE.CylinderGeometry(0.75, 0.9, 0.26, 32);
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.85,
      roughness: 0.25,
    });
    const tableBase = new THREE.Mesh(tableBaseGeo, brassMat);
    tableBase.position.set(-1.0, 5.34, -2.6);
    roomGroup.add(tableBase);

    // Architectural hardcover books on coffee table
    const bookMat = new THREE.MeshStandardMaterial({ color: 0x141515, roughness: 0.3 });
    const book = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.05, 0.35), bookMat);
    book.position.set(-0.85, 5.57, -2.5);
    book.rotation.y = 0.3;
    roomGroup.add(book);

    // 3. Contemporary Leather Lounge Chair
    const leatherMat = new THREE.MeshStandardMaterial({
      color: 0x8f522e, // Cognac leather
      roughness: 0.4,
      metalness: 0.1,
    });
    const chairSeat = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.38, 1.3), leatherMat);
    chairSeat.position.set(2.2, 5.42, -1.8);
    chairSeat.rotation.y = -0.45;
    chairSeat.castShadow = true;
    roomGroup.add(chairSeat);

    const chairBack = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.7, 0.25), leatherMat);
    chairBack.position.set(2.5, 5.85, -1.4);
    chairBack.rotation.y = -0.45;
    chairBack.castShadow = true;
    roomGroup.add(chairBack);

    // 4. Large Designer Area Rug
    const rugGeo = new THREE.PlaneGeometry(6.2, 5.5);
    const rugMat = new THREE.MeshStandardMaterial({
      color: 0xdedad4,
      roughness: 0.95,
    });
    const rug = new THREE.Mesh(rugGeo, rugMat);
    rug.rotation.x = -Math.PI / 2;
    rug.position.set(-1.2, 5.22, -2.0);
    rug.receiveShadow = true;
    roomGroup.add(rug);

    // 5. Architectural Floor Lamp
    const lampStem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.8, 16), brassMat);
    lampStem.position.set(-4.8, 6.6, 1.2);
    roomGroup.add(lampStem);

    const lampShade = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.5, 0.45, 24),
      new THREE.MeshStandardMaterial({
        color: 0xfff0d6,
        emissive: 0xffd9a3,
        emissiveIntensity: 0.8,
        roughness: 0.5,
      })
    );
    lampShade.position.set(-4.8, 7.9, 1.2);
    roomGroup.add(lampShade);

    // 6. Sculptural Indoor Ceramic Planter with Plant
    const potGeo = new THREE.CylinderGeometry(0.45, 0.32, 0.85, 24);
    const potMat = new THREE.MeshStandardMaterial({ color: 0xe6e4e0, roughness: 0.4 });
    const pot = new THREE.Mesh(potGeo, potMat);
    pot.position.set(4.6, 5.63, 0.8);
    pot.castShadow = true;
    roomGroup.add(pot);

    // Plant leaves
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x284736, roughness: 0.35 });
    for (let l = 0; l < 7; l++) {
      const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.35, 8, 8), leafMat);
      leaf.scale.set(0.3, 1.4, 0.7);
      leaf.rotation.set(0.4 + l * 0.2, l * 0.9, 0.3);
      leaf.position.set(4.6 + Math.sin(l) * 0.2, 6.3 + l * 0.12, 0.8 + Math.cos(l) * 0.2);
      roomGroup.add(leaf);
    }

    scene.add(roomGroup);

    // --- 5. The Panoramic Balcony Beyond (z = -14.0 to -24.0) ---
    const balconyGroup = new THREE.Group();

    // Floor-to-ceiling sliding glass wall leading to balcony (at z = -14.0)
    const backFrameTop = new THREE.Mesh(new THREE.BoxGeometry(12.8, 0.18, 0.3), frameMat);
    backFrameTop.position.set(0, 9.7, -14.0);
    const backFrameBottom = new THREE.Mesh(new THREE.BoxGeometry(12.8, 0.18, 0.3), frameMat);
    backFrameBottom.position.set(0, 5.3, -14.0);
    balconyGroup.add(backFrameTop);
    balconyGroup.add(backFrameBottom);

    // Open sliding door panels: Left panel fixed, right panel open
    const backDoorLeft = new THREE.Mesh(new THREE.BoxGeometry(5.8, 4.2, 0.05), facadeGlassMat);
    backDoorLeft.position.set(-3.2, 7.5, -14.0);
    balconyGroup.add(backDoorLeft);

    // Private Balcony Terrace Deck (z: -14.0 to -24.0)
    const balcDeckGeo = new THREE.BoxGeometry(12.8, 0.22, 10.0);
    const deckMat = new THREE.MeshStandardMaterial({
      color: 0x423d38, // Modern dark teak composite deck
      roughness: 0.65,
    });
    const balcDeck = new THREE.Mesh(balcDeckGeo, deckMat);
    balcDeck.position.set(0, 5.15, -19.0);
    balcDeck.receiveShadow = true;
    balconyGroup.add(balcDeck);

    // Frameless Glass Balustrade railing on balcony edge
    const frontRail = new THREE.Mesh(new THREE.BoxGeometry(12.8, 0.95, 0.08), railingMat);
    frontRail.position.set(0, 5.75, -23.95);
    const leftRail = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.95, 10.0), railingMat);
    leftRail.position.set(-6.36, 5.75, -19.0);
    const rightRail = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.95, 10.0), railingMat);
    rightRail.position.set(6.36, 5.75, -19.0);
    balconyGroup.add(frontRail);
    balconyGroup.add(leftRail);
    balconyGroup.add(rightRail);

    // Bronze handrail cap
    const handrailGeo = new THREE.BoxGeometry(12.8, 0.08, 0.14);
    const handrail = new THREE.Mesh(handrailGeo, frameMat);
    handrail.position.set(0, 6.25, -23.95);
    balconyGroup.add(handrail);

    scene.add(balconyGroup);

    // --- 6. Camera Spline & Smooth Scroll Interpolation ---
    const cameraPoints = [
      new THREE.Vector3(0.0, 10.8, 38.0),   // p = 0.00: Full tower wide view
      new THREE.Vector3(0.3, 8.4, 23.0),    // p = 0.22: Approaching facade
      new THREE.Vector3(0.0, 6.7, 8.2),     // p = 0.38: Close to window threshold
      new THREE.Vector3(0.0, 6.52, 5.6),    // p = 0.50: Passing through window frame
      new THREE.Vector3(-0.3, 6.4, 1.2),    // p = 0.65: Inside room, gliding past sofa
      new THREE.Vector3(0.1, 6.35, -6.5),   // p = 0.80: Moving toward balcony doors
      new THREE.Vector3(0.0, 6.3, -15.5),   // p = 0.92: Stepping onto the balcony
      new THREE.Vector3(0.0, 6.3, -19.2),   // p = 1.00: Resting panoramic balcony view
    ];

    const targetPoints = [
      new THREE.Vector3(0.0, 6.6, 6.0),     // Target window center
      new THREE.Vector3(0.0, 6.5, 4.0),
      new THREE.Vector3(0.0, 6.4, 0.0),
      new THREE.Vector3(0.0, 6.3, -5.0),
      new THREE.Vector3(-0.1, 6.25, -12.0),
      new THREE.Vector3(0.0, 6.25, -20.0),
      new THREE.Vector3(0.0, 6.3, -45.0),   // Distant horizon
      new THREE.Vector3(0.0, 6.3, -55.0),
    ];

    const cameraCurve = new THREE.CatmullRomCurve3(cameraPoints, false, 'catmullrom', 0.2);
    const targetCurve = new THREE.CatmullRomCurve3(targetPoints, false, 'catmullrom', 0.2);

    let currentProgress = 0;
    let targetProgress = 0;
    let animFrameId: number;

    const renderLoop = () => {
      // Butter-smooth lerp interpolation (0.09) for fluid 60fps response
      currentProgress += (targetProgress - currentProgress) * 0.09;
      
      const clampedP = Math.max(0, Math.min(0.9999, currentProgress));
      const pos = cameraCurve.getPointAt(clampedP);
      const look = targetCurve.getPointAt(clampedP);

      camera.position.copy(pos);
      camera.lookAt(look);

      // Dynamic FOV expansion as we enter the room (from 46 to 52 for luxury interior spaciousness)
      if (clampedP < 0.4) {
        camera.fov = 46;
      } else if (clampedP < 0.7) {
        camera.fov = 46 + (clampedP - 0.4) * 20;
      } else {
        camera.fov = 52;
      }
      camera.updateProjectionMatrix();

      // Dynamic glass door opacity and window frame reflection modulation
      if (clampedP > 0.35 && clampedP < 0.6) {
        const t = (clampedP - 0.35) / 0.25;
        doorGlassLeft.material.opacity = Math.max(0.08, 1 - t * 0.92);
        doorGlassRight.material.opacity = Math.max(0.08, 1 - t * 0.92);
      } else if (clampedP >= 0.6) {
        doorGlassLeft.material.opacity = 0.08;
        doorGlassRight.material.opacity = 0.08;
      } else {
        doorGlassLeft.material.opacity = 1;
        doorGlassRight.material.opacity = 1;
      }

      renderer.render(scene, camera);
      animFrameId = requestAnimationFrame(renderLoop);
    };

    animFrameId = requestAnimationFrame(renderLoop);

    // --- 7. GSAP ScrollTrigger Integration ---
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
        onUpdate: (self) => {
          targetProgress = self.progress;
          setScrollProgress(self.progress);
        },
      });
    }, containerRef);

    // --- 8. Window Resize Handler ---
    const handleResize = () => {
      if (!canvasRef.current) return;
      const newWidth = canvasRef.current.clientWidth || window.innerWidth;
      const newHeight = canvasRef.current.clientHeight || window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight, false);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameId);
      ctx.revert();
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      marbleTex.dispose();
      woodSlatsTex.dispose();
      cityPanoTex.dispose();
      towerPhotoTex.dispose();
    };
  }, [prefersReducedMotion]);

  const p = scrollProgress;

  // Final logo opacity and translation at balcony horizon
  const logoProgress = Math.max(0, Math.min(1, (p - 0.88) / 0.12));
  const logoOpacity = logoProgress;
  const logoTranslateY = (1 - logoProgress) * 16;

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${
        standalone ? 'h-screen' : 'h-[320vh] sm:h-[360vh]'
      } bg-[#0A0B0C]`}
    >
      {/* Sticky 100vh Fullscreen Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden select-none bg-[#0A0B0C]">
        {/* ========================================================
            1. REAL THREE.JS 3D VIEWPORT CANVAS
            ======================================================== */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block touch-none"
        />

        {/* Subtle Atmospheric Vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-black/10 to-black/45 pointer-events-none z-10" />

        {/* Stage Indicator Overlay (Discrete luxury architectural cue) */}
        <div className="absolute top-6 left-6 sm:left-10 z-20 pointer-events-none transition-opacity duration-500">
          <div className="flex items-center gap-2.5 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-white/80 text-[11px] tracking-widest uppercase font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#80B3AD] animate-pulse" />
            <span>
              {p < 0.35
                ? 'Exterior Tower View'
                : p < 0.52
                ? 'Approaching Suite 801'
                : p < 0.85
                ? 'Living Residence & Terrace'
                : 'Panoramic Horizon'}
            </span>
          </div>
        </div>

        {/* ========================================================
            2. FINAL BRAND REVEAL AT BALCONY HORIZON (p >= 0.88)
            ======================================================== */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 px-4 sm:px-8 transition-opacity duration-700"
          style={{
            opacity: prefersReducedMotion ? 1 : logoOpacity,
            transform: `translateY(${logoTranslateY}px)`,
          }}
        >
          {/* Authentic SAYBA GROUP Vector Branding */}
          <div className="relative w-[90vw] max-w-md sm:max-w-xl md:max-w-2xl flex flex-col items-center">
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
          style={{ opacity: p > 0.15 ? 0 : 1 }}
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
