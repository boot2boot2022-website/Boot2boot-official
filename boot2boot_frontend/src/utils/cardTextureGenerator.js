/**
 * Card texture generator for 3D card faces with clean full-bleed photography and Boot2Boot branding.
 */
import boot2bootLogo from "../assets/boot2boot-logo/boot2boot-logo.png";

const CARD_W = 380;
const CARD_H = 480;
const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
const DPI = isMobile ? 1.0 : 1.5;

let logoImg = null;
if (typeof window !== "undefined") {
  logoImg = new Image();
  logoImg.src = boot2bootLogo;
}

/**
 * Front card canvas with pure full-bleed photo
 */
export function createCardFrontCanvas(item, onUpdate) {
  const canvas = document.createElement("canvas");
  canvas.width = CARD_W * DPI;
  canvas.height = CARD_H * DPI;
  const ctx = canvas.getContext("2d");

  const renderCard = (img = null) => {
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.scale(DPI, DPI);

    // 1. Clip to rounded card path
    ctx.beginPath();
    ctx.roundRect(0, 0, CARD_W, CARD_H, 22);
    ctx.clip();

    // 2. Medium Slate Gray Background
    const cardBg = ctx.createLinearGradient(0, 0, 0, CARD_H);
    cardBg.addColorStop(0, "#525663");
    cardBg.addColorStop(0.5, "#3b3e48");
    cardBg.addColorStop(1, "#272931");
    ctx.fillStyle = cardBg;
    ctx.fillRect(0, 0, CARD_W, CARD_H);

    // Full-bleed Image rendering with medium-gray scrim
    if (img && img.complete && img.naturalWidth > 0) {
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const targetAspect = CARD_W / CARD_H;
      let sx, sy, sw, sh;
      if (imgAspect > targetAspect) {
        sh = img.naturalHeight;
        sw = sh * targetAspect;
        sx = (img.naturalWidth - sw) / 2;
        sy = 0;
      } else {
        sw = img.naturalWidth;
        sh = sw / targetAspect;
        sx = 0;
        sy = (img.naturalHeight - sh) / 2;
      }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, CARD_W, CARD_H);
    }

    // 3. Bottom Scrim Gradient for Text Contrast (softer shadow)
    const scrim = ctx.createLinearGradient(0, CARD_H * 0.45, 0, CARD_H);
    scrim.addColorStop(0, "rgba(20, 22, 28, 0)");
    scrim.addColorStop(0.5, "rgba(20, 22, 28, 0.32)");
    scrim.addColorStop(1, "rgba(15, 16, 20, 0.68)");
    ctx.fillStyle = scrim;
    ctx.fillRect(0, 0, CARD_W, CARD_H);

    // Top gentle vignette (softer shadow)
    const topVignette = ctx.createLinearGradient(0, 0, 0, 70);
    topVignette.addColorStop(0, "rgba(15, 16, 20, 0.35)");
    topVignette.addColorStop(1, "rgba(15, 16, 20, 0)");
    ctx.fillStyle = topVignette;
    ctx.fillRect(0, 0, CARD_W, 70);

    // 4. Top Tag / Badge with Boot2Boot Logo
    const hasLogo = logoImg && logoImg.complete && logoImg.naturalWidth > 0;
    if (hasLogo) {
      ctx.drawImage(logoImg, 22, 21, 16, 16);
    }
    const categoryText = item.category || item.tag || "Boot2Boot";
    ctx.font = "700 11px 'Parkinsans', monospace";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "left";
    ctx.fillText(categoryText.toUpperCase(), hasLogo ? 44 : 24, 33);

    // 5. Service Name Typography at Bottom-Left in White
    const displayName = item.shortName || item.name || item.title || "Service";
    const lines = displayName.split("\n");

    ctx.textAlign = "left";
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 28px 'Parkinsans', system-ui, sans-serif";
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 8;

    const startY = CARD_H - 36 - (lines.length - 1) * 32;
    lines.forEach((line, idx) => {
      ctx.fillText(line, 24, startY + idx * 32);
    });

    ctx.shadowBlur = 0; // Reset shadow

    // 6. Subtle metallic rim border highlight
    ctx.beginPath();
    ctx.roundRect(0.5, 0.5, CARD_W - 1, CARD_H - 1, 22);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.28)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.restore();
  };

  renderCard();

  if (item.image) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      renderCard(img);
      if (onUpdate) onUpdate();
    };
    img.src = item.image;
    if (img.complete && img.naturalWidth > 0) {
      renderCard(img);
      if (onUpdate) onUpdate();
    }
  }

  return canvas;
}

/**
 * Luxury matte monochrome back card canvas with Boot2Boot branding
 */
export function createCardBackCanvas(quest, onUpdate) {
  const canvas = document.createElement("canvas");
  canvas.width = CARD_W * DPI;
  canvas.height = CARD_H * DPI;
  const ctx = canvas.getContext("2d");

  const renderBack = () => {
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.scale(DPI, DPI);

    // 1. Medium Slate Gray Studio Radial Gradient
    ctx.beginPath();
    ctx.roundRect(0, 0, CARD_W, CARD_H, 22);
    const grad = ctx.createRadialGradient(
      CARD_W / 2,
      CARD_H / 2,
      15,
      CARD_W / 2,
      CARD_H / 2,
      CARD_W * 0.8
    );
    grad.addColorStop(0, "#525663");
    grad.addColorStop(0.5, "#3b3e48");
    grad.addColorStop(1, "#23252d");
    ctx.fillStyle = grad;
    ctx.fill();

    // 2. Outer metallic rim border
    ctx.beginPath();
    ctx.roundRect(0.5, 0.5, CARD_W - 1, CARD_H - 1, 22);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Inner inset border
    ctx.beginPath();
    ctx.roundRect(12, 12, CARD_W - 24, CARD_H - 24, 14);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // 3. Concentric geometric decorative rings
    ctx.save();
    ctx.translate(CARD_W / 2, CARD_H / 2);

    for (let r = 38; r <= 130; r += 28) {
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.10)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Crosshair accent marks
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-20, 0);
    ctx.lineTo(20, 0);
    ctx.moveTo(0, -20);
    ctx.lineTo(0, 20);
    ctx.stroke();

    // 4. Prominent Boot2Boot Logo & Typography
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    if (logoImg && logoImg.complete && logoImg.naturalWidth > 0) {
      const logoSize = 64;
      ctx.drawImage(
        logoImg,
        -logoSize / 2,
        -logoSize / 2 - 32,
        logoSize,
        logoSize
      );
    }

    ctx.shadowColor = "rgba(255, 255, 255, 0.25)";
    ctx.shadowBlur = 16;

    ctx.font = "800 30px 'Parkinsans', system-ui, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Boot2Boot", 0, 26);

    ctx.shadowBlur = 0; // Reset shadow

    // Subtitle badge
    ctx.font = "700 9.5px 'Parkinsans', monospace";
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.fillText("COLLECTIVE", 0, 48);

    ctx.restore();

    // 5. Corner Monograms (Top-Left & Bottom-Right)
    ctx.font = "800 11px 'Parkinsans', monospace";
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";

    ctx.textAlign = "left";
    ctx.fillText("B2B", 24, 32);

    ctx.textAlign = "right";
    ctx.fillText("B2B", CARD_W - 24, CARD_H - 24);

    ctx.restore();
  };

  renderBack();

  if (logoImg && (!logoImg.complete || logoImg.naturalWidth === 0)) {
    logoImg.onload = () => {
      renderBack();
      if (onUpdate) onUpdate();
    };
  }

  return canvas;
}
