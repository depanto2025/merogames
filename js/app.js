// ==========================================
// Mero's Magical World - Main Application
// تطبيق عالم ميرو السحري - إدارة الواجهة والتفاعل
// ==========================================

class MeroApplication {
  constructor() {
    this.currentTab = 'arabic';
    this.currentAvatar = localStorage.getItem('mero_avatar') || 'smile';
    this.stars = parseInt(localStorage.getItem('mero_stars') || '10', 10);
    this.activeLetter = null;
    this.tracingBoard = null;

    this.init();
  }

  init() {
    this.updateAvatarUI();
    this.updateStarsUI();
    this.setupNavigation();
    this.setupAvatarSwitcher();
    this.setupCompanion();
    this.setupAudioToggle();

    // Render default view (Arabic letters)
    this.renderArabicModule();

    // Initialize tracing board when DOM is ready
    setTimeout(() => {
      this.tracingBoard = new MeroTracingBoard('tracingCanvas');
    }, 200);

    // Initial warm welcome message on first interaction
    document.body.addEventListener('click', () => {
      if (!this.welcomed) {
        this.welcomed = true;
        MeroAudio.speakArabic('أهلاً يا ميرو في عالمك السحري! يلا نلعب ونتعلم سوا!');
      }
    }, { once: true });
  }

  // --- إدارة النقاط والنجوم ---
  addStar(count = 1) {
    this.stars += count;
    localStorage.setItem('mero_stars', this.stars);
    this.updateStarsUI();
    MeroAudio.playSparkle();
  }

  updateStarsUI() {
    const starEls = document.querySelectorAll('.user-stars-count');
    starEls.forEach(el => {
      el.textContent = this.stars;
    });
  }

  // --- تبديل واختيار شخصية ميرو ---
  setAvatar(avatarId) {
    this.currentAvatar = avatarId;
    localStorage.setItem('mero_avatar', avatarId);
    this.updateAvatarUI();
    MeroAudio.playClick();
    const avatar = MERO_DATA.avatars.find(a => a.id === avatarId);
    if (avatar) {
      MeroAudio.speakArabic(`اخترتي ${avatar.title}.. يا جمالك يا ميرو!`);
    }
  }

  updateAvatarUI() {
    const avatar = MERO_DATA.avatars.find(a => a.id === this.currentAvatar) || MERO_DATA.avatars[0];
    const avatarImgs = document.querySelectorAll('.mero-current-avatar-img');
    avatarImgs.forEach(img => {
      img.src = avatar.badge;
    });

    const companionImg = document.getElementById('companionAvatarImg');
    if (companionImg) {
      companionImg.src = avatar.badge;
    }

    const titleEl = document.getElementById('currentAvatarTitle');
    if (titleEl) {
      titleEl.textContent = avatar.title;
    }
  }

  setupAvatarSwitcher() {
    const btn = document.getElementById('switchAvatarBtn');
    const modal = document.getElementById('avatarModal');
    const closeBtn = document.getElementById('closeAvatarModal');

    if (btn && modal) {
      btn.addEventListener('click', () => {
        modal.classList.add('active');
        MeroAudio.playClick();
      });
    }

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        MeroAudio.playClick();
      });
    }

    // Avatar options in modal
    const options = document.querySelectorAll('.avatar-choice-card');
    options.forEach(opt => {
      opt.addEventListener('click', () => {
        const id = opt.dataset.avatarId;
        this.setAvatar(id);
        if (modal) modal.classList.remove('active');
      });
    });
  }

  // --- رفيقة ميرو الذكية العائمة ---
  setupCompanion() {
    const companion = document.getElementById('floatingMeroCompanion');
    const bubble = document.getElementById('companionSpeechBubble');

    if (companion && bubble) {
      companion.addEventListener('click', () => {
        MeroAudio.playPop();
        const quotes = MERO_DATA.companionQuotes;
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        bubble.textContent = randomQuote;
        bubble.classList.add('visible');

        companion.classList.add('bounce-anim');
        setTimeout(() => companion.classList.remove('bounce-anim'), 800);

        MeroAudio.speakArabic(randomQuote);

        setTimeout(() => {
          bubble.classList.remove('visible');
        }, 5000);
      });
    }
  }

  // --- زر الصوت وكتم الصوت ---
  setupAudioToggle() {
    const toggleBtn = document.getElementById('audioToggleBtn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const isMuted = MeroAudio.toggleMute();
        toggleBtn.innerHTML = isMuted ? '🔇' : '🔊';
        toggleBtn.title = isMuted ? 'تشغيل الصوت' : 'كتم الصوت';
      });
    }
  }

  // --- التنقل بين الأقسام الرئيسية ---
  setupNavigation() {
    const navButtons = document.querySelectorAll('.main-nav-btn');
    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        MeroAudio.playClick();
        navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const tab = btn.dataset.tab;
        this.switchTab(tab);
      });
    });
  }

  switchTab(tab) {
    this.currentTab = tab;
    // Hide all view containers
    document.querySelectorAll('.app-module-view').forEach(v => v.classList.remove('active'));

    // Stop games if leaving games
    if (tab !== 'games') {
      MeroGames.stopBalloonGame();
    }

    const target = document.getElementById(`module-${tab}`);
    if (target) {
      target.classList.add('active');
    }

    if (tab === 'arabic') {
      this.renderArabicModule();
      MeroAudio.speakArabic('قسم الحروف العربية الجميلة!');
    } else if (tab === 'english') {
      this.renderEnglishModule();
      MeroAudio.speakEnglish('Welcome to the English Alphabet with Mero!');
    } else if (tab === 'math') {
      this.renderMathModule();
      MeroAudio.speakArabic('عالم الأرقام والأشكال والرياضيات لميرو!');
    } else if (tab === 'games') {
      this.renderGamesModule();
    } else if (tab === 'certificate') {
      this.renderCertificateModule();
    }
  }

  // ==========================================
  // قسم 1: الحروف العربية (Arabic Module)
  // ==========================================
  renderArabicModule() {
    const grid = document.getElementById('arabicGrid');
    if (!grid) return;
    grid.innerHTML = '';

    MERO_DATA.arabicLetters.forEach(item => {
      const card = document.createElement('div');
      card.className = 'letter-card-item';
      card.style.setProperty('--accent-color', item.color);

      card.innerHTML = `
        <div class="card-char-big">${item.char}</div>
        <div class="card-emoji-box">${item.emoji}</div>
        <div class="card-word-title">${item.word}</div>
        <div class="card-word-sub">${item.name}</div>
        <button class="card-listen-btn" title="اسمعي الحرف">🔊</button>
      `;

      // Tap on card opens detailed learning view & plays speech
      card.addEventListener('click', () => {
        this.openLetterDetail(item, 'ar');
      });

      const listenBtn = card.querySelector('.card-listen-btn');
      listenBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        MeroAudio.playPop();
        MeroAudio.speakArabicLetter(item.char, item.name, item.word);
      });

      grid.appendChild(card);
    });
  }

  // ==========================================
  // قسم 2: الحروف الإنجليزية (English Module)
  // ==========================================
  renderEnglishModule() {
    const grid = document.getElementById('englishGrid');
    if (!grid) return;
    grid.innerHTML = '';

    MERO_DATA.englishLetters.forEach(item => {
      const card = document.createElement('div');
      card.className = 'letter-card-item english-card';
      card.style.setProperty('--accent-color', item.color);

      card.innerHTML = `
        <div class="card-char-big">${item.char} <span class="lower">${item.lower}</span></div>
        <div class="card-emoji-box">${item.emoji}</div>
        <div class="card-word-title">${item.word}</div>
        <div class="card-word-sub">${item.wordAr}</div>
        <button class="card-listen-btn" title="Listen">🔊</button>
      `;

      card.addEventListener('click', () => {
        this.openLetterDetail(item, 'en');
      });

      const listenBtn = card.querySelector('.card-listen-btn');
      listenBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        MeroAudio.playPop();
        MeroAudio.speakEnglishLetter(item.char, item.word);
      });

      grid.appendChild(card);
    });
  }

  // ==========================================
  // نافذة تفاصيل الحرف والكتابة (Detail & Tracing Modal)
  // ==========================================
  openLetterDetail(item, lang = 'ar') {
    this.activeLetter = item;
    const modal = document.getElementById('letterDetailModal');
    if (!modal) return;

    modal.classList.add('active');
    MeroAudio.playClick();

    const charDisplay = document.getElementById('detailCharDisplay');
    const wordDisplay = document.getElementById('detailWordDisplay');
    const emojiDisplay = document.getElementById('detailEmojiDisplay');
    const subDisplay = document.getElementById('detailSubDisplay');

    if (lang === 'ar') {
      charDisplay.textContent = item.char;
      wordDisplay.textContent = item.word;
      emojiDisplay.textContent = item.emoji;
      subDisplay.textContent = `حرف ال${item.name} - صوت (${item.sound})`;
      MeroAudio.speakArabicLetter(item.char, item.name, item.word);
    } else {
      charDisplay.textContent = `${item.char} ${item.lower}`;
      wordDisplay.textContent = item.word;
      emojiDisplay.textContent = item.emoji;
      subDisplay.textContent = `Phonics: "${item.phonics}" (${item.wordAr})`;
      MeroAudio.speakEnglishLetter(item.char, item.word);
    }

    // Set letter on tracing canvas
    if (this.tracingBoard) {
      setTimeout(() => {
        this.tracingBoard.resizeCanvas();
        this.tracingBoard.setLetter(item.char, lang);
      }, 60);
    }

    // Bind pronounce buttons
    const speakBtn = document.getElementById('detailSpeakBtn');
    if (speakBtn) {
      speakBtn.onclick = () => {
        MeroAudio.playPop();
        if (lang === 'ar') {
          MeroAudio.speakArabicLetter(item.char, item.name, item.word);
        } else {
          MeroAudio.speakEnglishLetter(item.char, item.word);
        }
      };
    }
  }

  closeLetterDetail() {
    const modal = document.getElementById('letterDetailModal');
    if (modal) modal.classList.remove('active');
    MeroAudio.playClick();
  }

  // ==========================================
  // قسم 3: الرياضيات والأرقام (Math Module)
  // ==========================================
  renderMathModule() {
    const numGrid = document.getElementById('numbersGrid');
    if (numGrid) {
      numGrid.innerHTML = '';
      MERO_DATA.numbers.forEach(item => {
        const card = document.createElement('div');
        card.className = 'number-card-item';
        card.style.setProperty('--accent-color', item.color);

        card.innerHTML = `
          <div class="num-digits-row">
            <span class="ar-num">${item.arDigit}</span>
            <span class="num-sep">•</span>
            <span class="en-num">${item.enDigit}</span>
          </div>
          <div class="num-emoji-preview">${item.itemEmoji.repeat(Math.min(item.num, 5))}</div>
          <div class="num-names">${item.nameAr} - ${item.nameEn}</div>
          <button class="num-count-btn">عدّي مع ميرو 🎈</button>
        `;

        card.addEventListener('click', () => {
          this.openCountingActivity(item);
        });

        numGrid.appendChild(card);
      });
    }

    // Shapes rendering
    const shapesGrid = document.getElementById('shapesGrid');
    if (shapesGrid) {
      shapesGrid.innerHTML = '';
      MERO_DATA.shapes.forEach(shape => {
        const shapeCard = document.createElement('div');
        shapeCard.className = 'shape-card-item';
        shapeCard.innerHTML = `
          <div class="shape-icon">${shape.emoji}</div>
          <div class="shape-name-ar">${shape.nameAr}</div>
          <div class="shape-name-en">${shape.nameEn}</div>
        `;
        shapeCard.addEventListener('click', () => {
          MeroAudio.playPop();
          MeroAudio.speakArabic(`${shape.nameAr} .. ${shape.nameEn}`);
          shapeCard.classList.add('bounce-anim');
          setTimeout(() => shapeCard.classList.remove('bounce-anim'), 600);
        });
        shapesGrid.appendChild(shapeCard);
      });
    }

    // Math visual puzzles
    this.renderMathPuzzles();
  }

  openCountingActivity(numObj) {
    const modal = document.getElementById('countingModal');
    if (!modal) return;
    modal.classList.add('active');
    MeroGames.initCountingModule(numObj, 'countingContainer');
  }

  closeCountingModal() {
    const modal = document.getElementById('countingModal');
    if (modal) modal.classList.remove('active');
    MeroAudio.playClick();
  }

  renderMathPuzzles() {
    const puzzleContainer = document.getElementById('mathPuzzlesContainer');
    if (!puzzleContainer) return;
    puzzleContainer.innerHTML = '';

    const puzzle = MERO_DATA.mathPuzzles[Math.floor(Math.random() * MERO_DATA.mathPuzzles.length)];

    const box = document.createElement('div');
    box.className = 'math-puzzle-card';
    box.innerHTML = `
      <div class="puzzle-title">مسألة ميرو الذكية 🧠</div>
      <div class="puzzle-visual-row">
        <span class="visual-items">${puzzle.emoji.repeat(puzzle.a)}</span>
        <span class="visual-op">+</span>
        <span class="visual-items">${puzzle.emoji.repeat(puzzle.b)}</span>
        <span class="visual-eq">=</span>
        <span class="visual-q">❓</span>
      </div>
      <div class="puzzle-text">${puzzle.textAr}</div>
      <div class="puzzle-choices-row"></div>
    `;

    const choicesRow = box.querySelector('.puzzle-choices-row');
    puzzle.choices.forEach(ch => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.textContent = ch;

      btn.addEventListener('click', () => {
        if (ch === puzzle.answer) {
          btn.classList.add('correct');
          MeroAudio.playSuccess();
          MeroAudio.speakArabic(`شطورة يا ميرو! الإجابة صحيحة: ${ch}!`);
          this.addStar(2);
          this.triggerConfetti();
          setTimeout(() => this.renderMathPuzzles(), 1800);
        } else {
          btn.classList.add('wrong');
          MeroAudio.playBoop();
          MeroAudio.speakArabic('حاولي مرة أخرى يا أميرة، أنتِ قريبة جداً!');
        }
      });

      choicesRow.appendChild(btn);
    });

    puzzleContainer.appendChild(box);
  }

  // ==========================================
  // قسم 4: ألعاب ميرو ومرحها (Games Module)
  // ==========================================
  renderGamesModule() {
    const subTabs = document.querySelectorAll('.game-sub-tab');
    subTabs.forEach(st => {
      st.onclick = () => {
        subTabs.forEach(s => s.classList.remove('active'));
        st.classList.add('active');

        const gtype = st.dataset.game;
        document.getElementById('balloonGameArea').style.display = gtype === 'balloon' ? 'block' : 'none';
        document.getElementById('memoryGameArea').style.display = gtype === 'memory' ? 'block' : 'none';

        if (gtype === 'balloon') {
          MeroGames.startBalloonGame('balloonGameArea');
        } else {
          MeroGames.stopBalloonGame();
          MeroGames.initMemoryGame('memoryGrid');
        }
      };
    });

    // Start balloon game by default
    MeroGames.startBalloonGame('balloonGameArea');
  }

  // ==========================================
  // قسم 5: شهادة التقدير الملكية لميرو (Certificate)
  // ==========================================
  renderCertificateModule() {
    const certPhoto = document.getElementById('certMeroPhoto');
    const avatar = MERO_DATA.avatars.find(a => a.id === this.currentAvatar) || MERO_DATA.avatars[0];
    if (certPhoto) {
      certPhoto.src = avatar.badge;
    }

    const certDate = document.getElementById('certDate');
    if (certDate) {
      const today = new Date();
      certDate.textContent = today.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    const certStars = document.getElementById('certStarsEarned');
    if (certStars) {
      certStars.textContent = this.stars;
    }

    MeroAudio.playFanfare();
    MeroAudio.speakArabic('مبروك للأميرة البطلة ميرال! تستحقين هذه الشهادة الذهبية عن جدارة!');
  }

  printCertificate() {
    window.print();
  }

  // --- تشغيل تأثير الكونفيتي والألعاب النارية ---
  triggerConfetti() {
    const container = document.getElementById('confettiContainer');
    if (!container) return;

    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#FF8ED4', '#6C5CE7', '#2ED573'];
    for (let i = 0; i < 45; i++) {
      const c = document.createElement('div');
      c.className = 'confetti-piece';
      c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      c.style.left = `${Math.random() * 100}%`;
      c.style.top = '-20px';
      c.style.transform = `rotate(${Math.random() * 360}deg)`;
      const duration = 2.5 + Math.random() * 2;
      c.style.animationDuration = `${duration}s`;

      container.appendChild(c);
      setTimeout(() => c.remove(), duration * 1000);
    }
  }

  showCelebrationBadge(message) {
    const badge = document.createElement('div');
    badge.className = 'celebration-pop-toast';
    const avatar = MERO_DATA.avatars.find(a => a.id === this.currentAvatar) || MERO_DATA.avatars[0];

    badge.innerHTML = `
      <img src="${avatar.badge}" class="toast-mero-img" alt="ميرو">
      <div class="toast-text">${message}</div>
    `;

    document.body.appendChild(badge);
    setTimeout(() => {
      badge.classList.add('fade-out');
      setTimeout(() => badge.remove(), 500);
    }, 2800);
  }
}

// Global Launch
window.addEventListener('DOMContentLoaded', () => {
  window.MeroApp = new MeroApplication();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(err => {
      console.log('SW registration failed:', err);
    });
  }
});
