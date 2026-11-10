// ==========================================
// Mero's Interactive Tracing Canvas Engine
// سبورة تتبع وكتابة الحروف والأرقام السحرية لميرو
// ==========================================

class MeroTracingBoard {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.isDrawing = false;
    this.currentColor = 'rainbow';
    this.rainbowHue = 0;
    this.brushSize = 22;
    this.currentLetter = 'أ';
    this.currentLang = 'ar';
    this.drawnPixels = 0;
    this.points = [];

    this.initEvents();
    this.resizeCanvas();
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const parent = this.canvas.parentElement;
    let width = parent ? parent.clientWidth : 340;
    if (!width || width < 100) width = 340;
    const size = Math.min(width, 360);
    this.canvas.width = size;
    this.canvas.height = size;
    this.render();
  }

  initEvents() {
    const handleStart = (e) => {
      e.preventDefault();
      this.isDrawing = true;
      const pos = this.getPos(e);
      this.points = [pos];
      this.drawPoint(pos.x, pos.y);
      MeroAudio.playSparkle();
    };

    const handleMove = (e) => {
      if (!this.isDrawing) return;
      e.preventDefault();
      const pos = this.getPos(e);
      this.points.push(pos);
      this.drawSmooth();
    };

    const handleEnd = (e) => {
      if (!this.isDrawing) return;
      e.preventDefault();
      this.isDrawing = false;
      this.points = [];
      this.checkProgress();
    };

    // Pointer events for touch and mouse
    this.canvas.addEventListener('pointerdown', handleStart);
    this.canvas.addEventListener('pointermove', handleMove);
    this.canvas.addEventListener('pointerup', handleEnd);
    this.canvas.addEventListener('pointercancel', handleEnd);
  }

  getPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    return {
      x: (e.clientX - rect.x) * scaleX,
      y: (e.clientY - rect.y) * scaleY
    };
  }

  setLetter(char, lang = 'ar') {
    this.currentLetter = char;
    this.currentLang = lang;
    this.clearCanvas();
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.render();
  }

  render() {
    // 1. Draw soft playground background grid
    const w = this.canvas.width;
    const h = this.canvas.height;

    // Draw background guide lines for writing
    this.ctx.save();
    this.ctx.strokeStyle = '#E2E8F0';
    this.ctx.lineWidth = 2;
    this.ctx.setLineDash([8, 8]);

    // Top, middle, bottom writing guidelines
    const lineY1 = h * 0.28;
    const lineY2 = h * 0.50;
    const lineY3 = h * 0.72;

    this.ctx.beginPath();
    this.ctx.moveTo(30, lineY1);
    this.ctx.lineTo(w - 30, lineY1);
    this.ctx.moveTo(30, lineY2);
    this.ctx.lineTo(w - 30, lineY2);
    this.ctx.moveTo(30, lineY3);
    this.ctx.lineTo(w - 30, lineY3);
    this.ctx.stroke();

    // 2. Draw the guide letter in dashed light-pink style
    this.ctx.setLineDash([]);
    this.ctx.font = `bold ${Math.floor(w * 0.55)}px 'Fredoka', 'Cairo', sans-serif`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    // Soft outline shadow
    this.ctx.strokeStyle = '#FAD2E1';
    this.ctx.lineWidth = 14;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.strokeText(this.currentLetter, w / 2, h / 2 + 10);

    // Inner dotted trace path
    this.ctx.strokeStyle = '#FF6B97';
    this.ctx.setLineDash([10, 14]);
    this.ctx.lineWidth = 4;
    this.ctx.strokeText(this.currentLetter, w / 2, h / 2 + 10);

    // Guide start dot
    this.ctx.fillStyle = '#10B981';
    this.ctx.beginPath();
    this.ctx.arc(w / 2, h * 0.25, 8, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.restore();
  }

  setBrushColor(color) {
    this.currentColor = color;
  }

  drawPoint(x, y) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.brushSize / 2, 0, Math.PI * 2);
    this.ctx.fillStyle = this.getStrokeStyle();
    this.ctx.fill();
    this.ctx.restore();
  }

  getStrokeStyle() {
    if (this.currentColor === 'rainbow') {
      this.rainbowHue = (this.rainbowHue + 4) % 360;
      return `hsl(${this.rainbowHue}, 95%, 55%)`;
    }
    return this.currentColor;
  }

  drawSmooth() {
    if (this.points.length < 2) return;

    this.ctx.save();
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.lineWidth = this.brushSize;
    this.ctx.strokeStyle = this.getStrokeStyle();

    this.ctx.beginPath();
    const p1 = this.points[this.points.length - 2];
    const p2 = this.points[this.points.length - 1];

    this.ctx.moveTo(p1.x, p1.y);
    this.ctx.lineTo(p2.x, p2.y);
    this.ctx.stroke();

    this.ctx.restore();
  }

  // تحقق تشجيعي من رسم ميرو للحرف
  checkProgress() {
    // نتحقق من عدد البيكسلات الملونة
    const imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    let colored = 0;
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 16) {
      if (data[i + 3] > 100) {
        colored++;
      }
    }

    if (colored > 120) {
      this.celebrate();
    }
  }

  celebrate() {
    MeroAudio.playSuccess();
    if (window.MeroApp) {
      window.MeroApp.addStar(1);
      window.MeroApp.triggerConfetti();
      window.MeroApp.showCelebrationBadge('خطك رائع يا أميرة ميرو! 🌟✏️');
    }
  }
}
