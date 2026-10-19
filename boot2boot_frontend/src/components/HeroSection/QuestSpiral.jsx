import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import { SERVICES } from "../../data/servicesData";
import { createCardFrontCanvas, createCardBackCanvas } from "../../utils/cardTextureGenerator";
import { usePageTransition } from "../PageTransition";

const VERTEX_SHADER = `
  uniform float uBend;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 p = position;
    // Parabolic curve: curl side edges backwards for 3D bent plane look
    p.z -= uBend * position.x * position.x;
    p.z -= uBend * 0.35 * position.y * position.y;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  uniform sampler2D uTex;
  uniform sampler2D uNextTex;
  uniform float uMix;
  uniform sampler2D uBack;
  uniform float uSmear;
  uniform vec2 uDir;
  uniform float uDim;
  varying vec2 vUv;

  void main() {
    if (uDim < 0.01) {
      discard;
    }

    // Back face texture with un-mirrored UV so "Boot2Boot" reads correctly
    if (!gl_FrontFacing) {
      vec2 backUv = vec2(1.0 - vUv.x, vUv.y);
      vec4 b = texture2D(uBack, backUv);
      gl_FragColor = vec4(b.rgb, b.a * uDim);
      return;
    }

    // Front face with smooth dual-texture crossfade
    vec4 cA = texture2D(uTex, vUv);
    vec4 cB = texture2D(uNextTex, vUv);
    vec4 c0 = mix(cA, cB, clamp(uMix, 0.0, 1.0));

    // Front face without motion blur
    if (uSmear < 0.0008) {
      gl_FragColor = vec4(c0.rgb, c0.a * uDim);
      return;
    }

    // Directional velocity motion smear / blur
    vec4 acc = vec4(0.0);
    float total = 0.0;
    for (int i = 0; i < 7; i++) {
      float t = float(i) / 6.0 - 0.5;
      float w = 1.0 - abs(t) * 1.3;
      if (w <= 0.0) continue;
      vec4 smA = texture2D(uTex, vUv + uDir * t * uSmear);
      vec4 smB = texture2D(uNextTex, vUv + uDir * t * uSmear);
      acc += mix(smA, smB, clamp(uMix, 0.0, 1.0)) * w;
      total += w;
    }
    vec4 c = acc / total;
    gl_FragColor = vec4(c.rgb, c.a * uDim);
  }
`;

const DEFAULT_CONFIG = {
  angleStep: 0.70,
  radius: 3.6,
  squish: 0.74,
  gapX: -0.16,
  gapY: 0.72,
  edgeTwist: -0.06,
  cardScale: 0.72,
  bend: 0.04,
  smear: 0.6,
  auto: true,
  autoSpeed: 0.16,
};

const NUM_SLOTS = 16;
const NUM_SERVICES = SERVICES.length; // 8 services
const CARD_ASPECT = 480 / 380;
const CARD_3D_W = 2.3;
const CARD_3D_H = CARD_3D_W * CARD_ASPECT;
const CARD_SPACING = 3.1; // Horizontal spacing between cards in service row

const lerp = (a, b, t) => a + (b - a) * t;
const smoothstep = (min, max, value) => {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
};

export default function QuestSpiral({
  totalProgRef: externalTotalProgRef = null,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const { isTransitioning } = usePageTransition();
  const isTransitioningRef = useRef(isTransitioning);

  useEffect(() => {
    isTransitioningRef.current = isTransitioning;
  }, [isTransitioning]);

  const [cfg] = useState(DEFAULT_CONFIG);
  const cfgRef = useRef(cfg);
  cfgRef.current = cfg;

  const navigate = useNavigate();
  const navigateRef = useRef(navigate);
  navigateRef.current = navigate;

  const defaultTotalProgRef = useRef(0);
  const totalProgRef = externalTotalProgRef || defaultTotalProgRef;
  const smoothTotalProgRef = useRef(0);

  // Animation refs
  const progressRef = useRef(0);
  const smoothProgressRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.z = 10.5;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !isMobile, // Disable MSAA on mobile for dramatic fill-rate boost
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.0 : 1.5));
    renderer.setClearColor(0x000000, 0);

    const group = new THREE.Group();
    scene.add(group);

    // 2. Generate Textures for all Services with Pure White Typography
    const frontTextures = SERVICES.map((service) => {
      let tex;
      const cvs = createCardFrontCanvas(service, () => {
        if (tex) tex.needsUpdate = true;
      });
      tex = new THREE.CanvasTexture(cvs);
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      tex.needsUpdate = true;
      return tex;
    });

    const backTextures = SERVICES.map((service) => {
      let tex;
      const cvs = createCardBackCanvas(service, () => {
        if (tex) tex.needsUpdate = true;
      });
      tex = new THREE.CanvasTexture(cvs);
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      tex.needsUpdate = true;
      return tex;
    });

    // 3. Subdivided Plane Geometry for Smooth Curvature (optimized vertex count for mobile)
    const geometry = new THREE.PlaneGeometry(
      CARD_3D_W,
      CARD_3D_H,
      isMobile ? 16 : 24,
      isMobile ? 12 : 16
    );

    // 4. Create Card Meshes for all 16 slots (enables infinite looping spiral)
    const cardMeshes = [];
    for (let i = 0; i < NUM_SLOTS; i++) {
      const material = new THREE.ShaderMaterial({
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        uniforms: {
          uTex: { value: frontTextures[0] },
          uNextTex: { value: frontTextures[0] },
          uMix: { value: 0 },
          uBack: { value: backTextures[0] },
          uBend: { value: cfgRef.current.bend },
          uSmear: { value: 0 },
          uDir: { value: new THREE.Vector2(0, 1) },
          uDim: { value: 0 },
        },
        transparent: true,
        side: THREE.DoubleSide,
        depthTest: true,
        depthWrite: false,
      });

      const mesh = new THREE.Mesh(geometry, material);
      group.add(mesh);
      cardMeshes.push(mesh);
    }

    // 5. Resize Handler
    const handleResize = () => {
      if (!canvas.parentElement) return;
      const width = canvas.parentElement.clientWidth;
      const height = canvas.parentElement.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // 6. Card click interaction to navigate to services page (mouse dragging is disabled)
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const visibleMeshes = cardMeshes.filter(
        (m) => m.visible && m.material.uniforms?.uDim?.value > 0.1
      );
      const hits = raycaster.intersectObjects(visibleMeshes, false);
      if (hits.length > 0) {
        navigateRef.current("/services");
      }
    };

    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const visibleMeshes = cardMeshes.filter(
          (m) => m.visible && m.material.uniforms?.uDim?.value > 0.1
        );
        const hits = raycaster.intersectObjects(visibleMeshes, false);
        canvas.style.cursor = hits.length > 0 ? "pointer" : "default";
      } else {
        canvas.style.cursor = "default";
      }
    };

    canvas.addEventListener("click", handleClick);
    window.addEventListener("pointermove", handlePointerMove);

    // 7. Main Animation Render Loop
    let animId = null;
    let lastTime = performance.now();
    let prevSmoothProg = 0;
    let isIntersecting = true;
    let introProgress = 0;
    const centerSlot = Math.floor(NUM_SLOTS / 2); // 8

    // Synchronize 3D entrance animation with Loading Screen completion
    let hasStartedIntro = typeof window !== "undefined" && Boolean(window.__boot2boot_loaded);

    const handleStartHero = () => {
      hasStartedIntro = true;
    };
    window.addEventListener("boot2boot:startHeroAnimation", handleStartHero);

    // Safety fallback: ensure cards animate into place even if loading screen is skipped or unmounted
    const safetyTimer = setTimeout(() => {
      hasStartedIntro = true;
    }, 2800);

    const animate = (time) => {
      if (!isIntersecting) return;

      const dt = Math.min((time - lastTime) / 1000, 0.05) || 0.016;
      lastTime = time;

      const c = cfgRef.current;

      // Authentic Grail-app signature entrance animation (smooth cubic ease-out over 1.35s)
      // Only increments when page transition is NOT active, allowing 3D card bloom to play on return from Work/Services
      if (!isTransitioningRef.current && hasStartedIntro && introProgress < 1.0) {
        introProgress = Math.min(1.0, introProgress + dt / 1.35);
      }
      const m = 1 - Math.pow(1 - introProgress, 3);

      // Grail-app dynamic parameters during entrance:
      // Rotation speed starts with a dynamic spin (1.1) and gracefully decelerates to idle autoSpeed (0.16)
      const currentAutoSpeed = lerp(1.1, c.autoSpeed, m);

      // Smooth scroll progress interpolation
      const totalDecay = 1 - Math.exp(-14.0 * dt);
      smoothTotalProgRef.current += (totalProgRef.current - smoothTotalProgRef.current) * totalDecay;
      const totalP = smoothTotalProgRef.current;

      // Stage 1: Hero Assemble Progress [0.0 -> 0.28]
      const aProg = smoothstep(0.0, 0.28, totalP);

      // Stage 2: Spread Out Progress [0.28 -> 0.44]
      const spreadProg = smoothstep(0.28, 0.44, totalP);

      // Stage 3: Horizontal Scroll Track Progress [0.44 -> 1.0]
      const horizScrollProg = Math.max(0, Math.min(1, (totalP - 0.44) / 0.56));

      // Auto rotation in Hero spiral with initial entrance spin boost (runs only once intro has started and curtain opened)
      if (!isTransitioningRef.current && hasStartedIntro && c.auto && aProg < 0.85 && totalP < 0.05) {
        progressRef.current += currentAutoSpeed * dt;
      }

      // Inertia lerp for hero spiral rotation
      const progressDecay = 1 - Math.exp(-10.0 * dt);
      smoothProgressRef.current += (progressRef.current - smoothProgressRef.current) * progressDecay;
      const prog = smoothProgressRef.current;

      // Motion blur calculation (skip on mobile or micro-rotations to eliminate expensive fragment passes)
      const vel = (prog - prevSmoothProg) / dt;
      prevSmoothProg = prog;
      const rawSmear = Math.min(0.035, Math.abs(vel) * 0.008 * c.smear) * Math.max(0, 1 - aProg * 1.5);
      const smearAmount = isMobile || rawSmear < 0.002 ? 0 : rawSmear;

      const timeSec = time * 0.001;

      // Dynamic Camera Position with Grail-app cinematic dolly-in on initial load
      const cameraZHero = lerp(c.radius * c.squish + 6.5, 8.2, aProg);
      const targetCameraZ = lerp(cameraZHero, 8.5, spreadProg) + (1 - m) * 2.5;
      camera.position.z = targetCameraZ;
      camera.position.y = 0;

      // Horizontal Row Layout Metrics
      const totalTrackScroll = (NUM_SERVICES - 1) * CARD_SPACING;

      // Base index calculation for infinite spiral looping
      const baseCenterIdx = Math.round(prog) - centerSlot;

      // 8. Update Each Slot in the 3D Scene
      for (let i = 0; i < NUM_SLOTS; i++) {
        const mesh = cardMeshes[i];
        if (!mesh) continue;

        // --- Phase 1: Infinite Spiral Slot Coordinates ---
        const itemIdx = baseCenterIdx + i;
        const offset = itemIdx - prog;
        const angle = offset * c.angleStep;
        const sinA = Math.sin(angle);
        const cosA = Math.cos(angle);

        // Grail-app staggered unfurl: center cards arrive first, outer spiral cascades inward
        const distFromCenter = Math.abs(i - centerSlot);
        const cardDelay = (distFromCenter / (NUM_SLOTS / 2)) * 0.25;
        const cardRawProg = Math.max(0, Math.min(1, (introProgress - cardDelay) / (1 - cardDelay)));
        const cardM = 1 - Math.pow(1 - cardRawProg, 3);

        const motionDamp = Math.max(0, 1 - aProg * 1.2);
        const floatWave = Math.sin(timeSec * 1.6 + offset * 0.35) * 0.05 * motionDamp;

        // Radius contracts inward from wide perimeter (11.5) into resting spiral radius (c.radius)
        const slotRadius = lerp(11.5, c.radius, cardM);
        const spiralX = slotRadius * sinA + offset * c.gapX * cardM;
        const spiralY = (offset * c.gapY + floatWave) * cardM;
        const spiralZ = slotRadius * cosA * c.squish + (1 - cardM) * -2.5;

        const spiralRotY = angle * cardM;
        const spiralRotZ = -sinA * c.edgeTwist * cardM;
        const spiralBend = c.bend * cardM;
        const spiralDim = Math.min(1.0, Math.max(0.4, 0.5 + 0.5 * cosA)) * Math.min(1.0, cardM * 1.5);
        const spiralScale = c.cardScale * (1 + Math.max(0, 1 - Math.abs(offset)) * 0.22) * lerp(0.28, 1.0, cardM);

        // --- Phase 2: Assembled Stack Coordinates ---
        const stackX = 0;
        const stackY = 0.5;
        const stackZ = 0.6 - Math.abs(offset) * 0.04;
        const stackRotY = 0;
        const stackRotZ = 0;
        const stackBend = 0.01;
        const stackScale = c.cardScale * 1.45;
        const stackDim = Math.max(0.15, 1.0 - Math.min(1.0, Math.abs(offset) * 0.22));

        // --- Phase 3: Spread Out Horizontal Service Row Coordinates ---
        // Map 8 central slots (i = 4 to 11) to the 8 services (0 to 7)
        const isServiceCard = i >= 4 && i < 4 + NUM_SERVICES;
        const serviceIdx = i - 4;

        let horizX = 0;
        let horizY = 0.85;
        let horizZ = 0.6;
        let horizRotY = 0;
        let horizRotZ = 0;
        let horizBend = 0.02;
        let horizScale = c.cardScale * 1.32;
        let horizDim = 0.0;

        if (isServiceCard) {
          const initialSpreadX = serviceIdx * CARD_SPACING;
          horizX = initialSpreadX - horizScrollProg * totalTrackScroll;
          horizDim = 1.0;
        }

        // --- Blend Coordinates across Phases ---
        // Step 1: Blend Spiral -> Stack
        const p1X = lerp(spiralX, stackX, aProg);
        const p1Y = lerp(spiralY, stackY, aProg);
        const p1Z = lerp(spiralZ, stackZ, aProg);
        const p1RotY = lerp(spiralRotY, stackRotY, aProg);
        const p1RotZ = lerp(spiralRotZ, stackRotZ, aProg);
        const p1Bend = lerp(spiralBend, stackBend, aProg);
        const p1Scale = lerp(spiralScale, stackScale, aProg);
        const p1Dim = lerp(spiralDim, stackDim, aProg);

        // Step 2: Blend Stack -> Horizontal Row
        const finalX = lerp(p1X, horizX, spreadProg);
        const finalY = lerp(p1Y, horizY, spreadProg);
        const finalZ = lerp(p1Z, horizZ, spreadProg);
        const finalRotY = lerp(p1RotY, horizRotY, spreadProg);
        const finalRotZ = lerp(p1RotZ, horizRotZ, spreadProg);
        const finalBend = lerp(p1Bend, horizBend, spreadProg);
        const finalScale = lerp(p1Scale, horizScale, spreadProg);
        const finalDim = lerp(p1Dim, horizDim, spreadProg);

        // Apply to Mesh
        mesh.position.set(finalX, finalY, finalZ);
        mesh.rotation.set(0, finalRotY, finalRotZ);
        mesh.scale.set(finalScale, finalScale, 1);
        mesh.visible = finalDim > 0.01;
        mesh.renderOrder = Math.round(finalZ * 100) + 500;

        // Texture assignment:
        // In spiral: cyclic texture assignment based on itemIdx
        // In horizontal service view: direct mapping to serviceIdx for the 8 cards
        const spiralTexIdx = (((itemIdx % NUM_SERVICES) + NUM_SERVICES) % NUM_SERVICES);
        const activeTexIdx = isServiceCard && spreadProg > 0.5 ? serviceIdx : spiralTexIdx;

        const uniforms = mesh.material.uniforms;
        uniforms.uTex.value = frontTextures[activeTexIdx];
        uniforms.uNextTex.value = frontTextures[activeTexIdx];
        uniforms.uMix.value = 0.0;
        uniforms.uBack.value = backTextures[activeTexIdx];
        uniforms.uBend.value = finalBend;
        uniforms.uSmear.value = smearAmount * (1 - spreadProg);
        uniforms.uDim.value = finalDim;
      }

      renderer.render(scene, camera);

      animId = requestAnimationFrame(animate);
    };

    // Pause Three.js render loop when hero is offscreen to save 100% GPU/battery
    let observer = null;
    if ("IntersectionObserver" in window && containerRef.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          isIntersecting = entry.isIntersecting;
          if (isIntersecting) {
            lastTime = performance.now();
            if (!animId) {
              animId = requestAnimationFrame(animate);
            }
          } else {
            if (animId) {
              cancelAnimationFrame(animId);
              animId = null;
            }
          }
        },
        { rootMargin: "100px" }
      );
      observer.observe(containerRef.current);
    }

    animId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      clearTimeout(safetyTimer);
      window.removeEventListener("boot2boot:startHeroAnimation", handleStartHero);
      if (observer) observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("click", handleClick);

      geometry.dispose();
      cardMeshes.forEach((mesh) => mesh.material.dispose());
      frontTextures.forEach((t) => t.dispose());
      backTextures.forEach((t) => t.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-transparent overflow-hidden select-none font-sans"
    >
      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-default z-10"
      />
    </div>
  );
}
