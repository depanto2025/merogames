// ==========================================
// Mero's Magical Audio & Speech Engine
// نظام الصوتيات والنطق الذكي التفاعلي لميرو
// ==========================================

class MeroAudioManager {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.arabicVoices = [];
    this.englishVoices = [];
    this.initVoices();
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  initVoices() {
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        const allVoices = window.speechSynthesis.getVoices();
        this.arabicVoices = allVoices.filter(v => v.lang.startsWith('ar'));
        this.englishVoices = allVoices.filter(v => v.lang.startsWith('en'));
      };
      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    return this.isMuted;
  }

  // --- Web Audio API Procedural Sound Effects ---

  // صوت فرقعة الفقاعات والبالونات
  playPop() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.12);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.13);
  }

  // صوت نقرة ألعاب لطيفة
  playClick() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  }

  // نغمة نجاح مبهجة مع تصفيق لطيف
  playSuccess() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const now = this.ctx.currentTime;

    notes.forEach((freq, index) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = now + index * 0.09;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.3, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.36);
    });
  }

  // نغمة التتويج الملكي والشهادة (Fanfare)
  playFanfare() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const notes = [
      { f: 523.25, d: 0.15 }, // C5
      { f: 659.25, d: 0.15 }, // E5
      { f: 783.99, d: 0.15 }, // G5
      { f: 1046.50, d: 0.45 }, // C6
      { f: 880.00, d: 0.2 },  // A5
      { f: 1046.50, d: 0.6 }  // C6
    ];

    let t = this.ctx.currentTime;
    notes.forEach((item) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(item.f, t);

      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.2, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + item.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + item.d);

      t += item.d * 0.85;
    });
  }

  // صوت النجوم المتلألئة (Twinkle Sparkle)
  playSparkle() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    for (let i = 0; i < 5; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = now + i * 0.06;
      const freq = 1200 + Math.random() * 800;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.21);
    }
  }

  // نغمة رقيقة لتشجيع الطفل
  playBoop() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(350, now + 0.15);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.16);
  }

  // --- Web Speech API Synthesis Engine ---

  speak(text, lang = 'ar-SA', rate = 0.9, pitch = 1.1) {
    if (this.isMuted || !('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel(); // إلغاء أي كلام سابق
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = rate; // سرعة هادئة تناسب عمر 4 سنوات
      utterance.pitch = pitch; // نبرة مرحة للأطفال

      // اختيار أفضل صوت متاح
      if (lang.startsWith('ar') && this.arabicVoices.length > 0) {
        // نفضل الصوت الأنثوي أو العربي الطبيعي
        const femaleAr = this.arabicVoices.find(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('salma') || v.name.toLowerCase().includes('laila') || v.name.toLowerCase().includes('zayd'));
        utterance.voice = femaleAr || this.arabicVoices[0];
      } else if (lang.startsWith('en') && this.englishVoices.length > 0) {
        const kidEn = this.englishVoices.find(v => v.name.toLowerCase().includes('child') || v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('samantha') || v.name.toLowerCase().includes('zira'));
        utterance.voice = kidEn || this.englishVoices[0];
      }

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  }

  speakArabic(text) {
    this.speak(text, 'ar-SA', 0.88, 1.15);
  }

  speakEnglish(text) {
    this.speak(text, 'en-US', 0.85, 1.15);
  }

  // نطق الحرف العربي ومثاله بصوت تعليمي شيق
  speakArabicLetter(char, name, word) {
    const fullSpeech = `${name} .. ${char} .. ${word}`;
    this.speakArabic(fullSpeech);
  }

  // نطق الحرف الإنجليزي ومثاله
  speakEnglishLetter(letter, word) {
    const fullSpeech = `Letter ${letter} .. ${word}`;
    this.speakEnglish(fullSpeech);
  }

  // نطق الرقم بالعربي والإنجليزي
  speakNumber(nameAr, nameEn, digit) {
    this.speakArabic(`${digit} .. ${nameAr} .. ${nameEn}`);
  }
}

// Global instance
const MeroAudio = new MeroAudioManager();

