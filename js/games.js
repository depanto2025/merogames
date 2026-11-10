// ==========================================
// Mero's Fun Games & Activities
// ألعاب ميرو الذكية والمرحة: البالونات والذاكرة والعد والشهادة
// ==========================================

class MeroGamesEngine {
  constructor() {
    this.balloonInterval = null;
    this.balloonActive = false;
    this.memoryCards = [];
    this.flippedCards = [];
    this.matchedPairs = 0;
    this.currentCountTarget = 4;
    this.countedItems = 0;
  }

  // ==========================================
  // 1. لعبة فرقعة البالونات (Balloon Pop)
  // ==========================================
  startBalloonGame(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    this.balloonActive = true;

    // تعليمات صوتية من ميرو
    MeroAudio.speakArabic('يلا يا ميرو، فرقعي البالونات الشقية واسمعي أصواتها!');

    if (this.balloonInterval) clearInterval(this.balloonInterval);

    // إنتاج بالون كل 1.2 ثانية
    this.balloonInterval = setInterval(() => {
      if (!this.balloonActive) return;
      this.spawnBalloon(container);
    }, 1200);

    // إنتاج 3 بالونات أولية فوراً
    for (let i = 0; i < 3; i++) {
      setTimeout(() => this.spawnBalloon(container), i * 350);
    }
  }

  stopBalloonGame() {
    this.balloonActive = false;
    if (this.balloonInterval) {
      clearInterval(this.balloonInterval);
      this.balloonInterval = null;
    }
  }

  spawnBalloon(container) {
    if (!this.balloonActive) return;

    const balloon = document.createElement('div');
    balloon.className = 'floating-balloon';

    // اختيار محتوى البالون (حرف أو رقم أو صورة ميرو)
    const types = ['ar', 'en', 'num', 'mero'];
    const chosenType = types[Math.floor(Math.random() * types.length)];
    let content = '';
    let speechText = '';
    let speechLang = 'ar-SA';

    const colors = ['#FF6B6B', '#4ECDC4', '#FF8ED4', '#FFA07A', '#A3CB38', '#D6A2E8', '#25CCF7', '#F7B731'];
    const bgColor = colors[Math.floor(Math.random() * colors.length)];

    if (chosenType === 'ar') {
      const item = MERO_DATA.arabicLetters[Math.floor(Math.random() * MERO_DATA.arabicLetters.length)];
      content = `<span>${item.char}</span>`;
      speechText = `${item.char} .. ${item.word}`;
      speechLang = 'ar-SA';
    } else if (chosenType === 'en') {
      const item = MERO_DATA.englishLetters[Math.floor(Math.random() * MERO_DATA.englishLetters.length)];
      content = `<span>${item.char}</span>`;
      speechText = `${item.char} .. ${item.word}`;
      speechLang = 'en-US';
    } else if (chosenType === 'num') {
      const item = MERO_DATA.numbers[Math.floor(Math.random() * MERO_DATA.numbers.length)];
      content = `<span>${item.arDigit} / ${item.enDigit}</span>`;
      speechText = `${item.nameAr} .. ${item.nameEn}`;
      speechLang = 'ar-SA';
    } else {
      content = `<img src="assets/images/mero_avatar_badge.png" class="balloon-mero-img" alt="ميرو">`;
      speechText = 'ميرو العسل!';
      speechLang = 'ar-SA';
    }

    balloon.innerHTML = content;
    balloon.style.backgroundColor = bgColor;

    // موقع أفقي عشوائي
    const maxLeft = container.clientWidth - 90;
    const leftPos = Math.max(10, Math.floor(Math.random() * maxLeft));
    balloon.style.left = `${leftPos}px`;

    // سرعة صعود عشوائية
    const duration = 5.5 + Math.random() * 3.5;
    balloon.style.animationDuration = `${duration}s`;

    // فرقعة البالون عند اللمس
    const popAction = (e) => {
      e.stopPropagation();
      e.preventDefault();
      MeroAudio.playPop();
      this.createPopParticles(balloon, bgColor);

      if (speechLang.startsWith('en')) {
        MeroAudio.speakEnglish(speechText);
      } else {
        MeroAudio.speakArabic(speechText);
      }

      if (window.MeroApp) {
        window.MeroApp.addStar(1);
      }

      balloon.remove();
    };

    balloon.addEventListener('pointerdown', popAction);

    // إزالة البالون بعد الصعود للخارج
    balloon.addEventListener('animationend', () => {
      balloon.remove();
    });

    container.appendChild(balloon);
  }

  createPopParticles(element, color) {
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    for (let i = 0; i < 8; i++) {
      const p = document.createElement('div');
      p.className = 'pop-star-particle';
      p.innerText = ['⭐', '✨', '🎈', '💖'][Math.floor(Math.random() * 4)];
      p.style.left = `${x}px`;
      p.style.top = `${y}px`;
      const angle = (i / 8) * Math.PI * 2;
      const dist = 50 + Math.random() * 40;
      p.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
      p.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
      document.body.appendChild(p);

      setTimeout(() => p.remove(), 700);
    }
  }

  // ==========================================
  // 2. لعبة كروت الذاكرة لميرو (Memory Match)
  // ==========================================
  initMemoryGame(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    this.flippedCards = [];
    this.matchedPairs = 0;

    const cardsPool = [
      { id: 'mero1', type: 'img', value: 'assets/images/mero_avatar_badge.png', label: 'ميرو البطلة' },
      { id: 'mero2', type: 'img', value: 'assets/images/mero_garden_badge.png', label: 'ميرو الأميرة' },
      { id: 'apple', type: 'emoji', value: '🍎', label: 'تفاحة' },
      { id: 'bunny', type: 'emoji', value: '🐰', label: 'أرنب' },
      { id: 'butterfly', type: 'emoji', value: '🦋', label: 'فراشة' },
      { id: 'star', type: 'emoji', value: '⭐', label: 'نجمة' }
    ];

    // نأخذ 4 كروت نضاعفها لتصبح 8 كروت تناسب عمر 4 سنوات
    const selected = cardsPool.slice(0, 4);
    const deck = [...selected, ...selected].map((item, idx) => ({
      ...item,
      uniqueId: idx
    }));

    // خلط الكروت
    deck.sort(() => Math.random() - 0.5);

    MeroAudio.speakArabic('طابقي الكروت المتشابهة يا أميرة ميرو!');

    deck.forEach((card) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'memory-card';
      cardEl.dataset.id = card.id;

      cardEl.innerHTML = `
        <div class="card-inner">
          <div class="card-front">
            <span class="card-question">❓</span>
            <span class="card-sparkle">✨</span>
          </div>
          <div class="card-back">
            ${card.type === 'img' ? `<img src="${card.value}" alt="${card.label}">` : `<span class="card-emoji">${card.value}</span>`}
          </div>
        </div>
      `;

      cardEl.addEventListener('click', () => this.handleCardClick(cardEl, card));
      container.appendChild(cardEl);
    });
  }

  handleCardClick(cardEl, card) {
    if (cardEl.classList.contains('flipped') || cardEl.classList.contains('matched') || this.flippedCards.length >= 2) {
      return;
    }

    MeroAudio.playClick();
    cardEl.classList.add('flipped');
    this.flippedCards.push({ el: cardEl, card });

    if (this.flippedCards.length === 2) {
      const [c1, c2] = this.flippedCards;
      if (c1.card.id === c2.card.id) {
        // تطابق صحيح!
        setTimeout(() => {
          c1.el.classList.add('matched');
          c2.el.classList.add('matched');
          MeroAudio.playSuccess();
          MeroAudio.speakArabic(`ممتازة! ${c1.card.label}`);
          this.matchedPairs++;
          if (window.MeroApp) {
            window.MeroApp.addStar(2);
            window.MeroApp.triggerConfetti();
          }

          if (this.matchedPairs === 4) {
            setTimeout(() => {
              MeroAudio.playFanfare();
              MeroAudio.speakArabic('برافو يا ميرو! فزتي باللعبة وجمعتي كل الكروت!');
              if (window.MeroApp) {
                window.MeroApp.showCelebrationBadge('فوز ساحق لأميرتنا ميرو! 🏆👑');
              }
            }, 600);
          }
          this.flippedCards = [];
        }, 500);
      } else {
        // عدم تطابق
        setTimeout(() => {
          MeroAudio.playBoop();
          c1.el.classList.remove('flipped');
          c2.el.classList.remove('flipped');
          this.flippedCards = [];
        }, 900);
      }
    }
  }

  // ==========================================
  // 3. عدّي مع ميرو (Interactive Counting)
  // ==========================================
  initCountingModule(numObj, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    this.currentCountTarget = numObj.num;
    this.countedItems = 0;

    MeroAudio.speakArabic(`يلا نعد ${numObj.nameAr} مع ميرو.. اضغطي على كل واحدة!`);

    const header = document.createElement('div');
    header.className = 'count-header-box';
    header.innerHTML = `
      <div class="count-big-badge">
        <span class="ar-digit">${numObj.arDigit}</span>
        <span class="divider">/</span>
        <span class="en-digit">${numObj.enDigit}</span>
      </div>
      <div class="count-names">
        <h3>${numObj.nameAr} - ${numObj.nameEn}</h3>
        <p>${numObj.itemNameAr}</p>
      </div>
    `;
    container.appendChild(header);

    const itemsGrid = document.createElement('div');
    itemsGrid.className = 'counting-items-grid';

    for (let i = 1; i <= numObj.num; i++) {
      const item = document.createElement('div');
      item.className = 'count-single-item';
      item.dataset.index = i;
      item.innerHTML = `
        <span class="item-emoji">${numObj.itemEmoji}</span>
        <span class="item-number-tag">${i}</span>
      `;

      item.addEventListener('click', () => {
        if (!item.classList.contains('counted')) {
          item.classList.add('counted');
          this.countedItems++;
          MeroAudio.playPop();

          const countWords = ['واحد', 'اثنان', 'ثلاثة', 'أربعة', 'خمسة', 'ستة', 'سبعة', 'ثمانية', 'تسعة', 'عشرة'];
          MeroAudio.speakArabic(countWords[i - 1] || `${i}`);

          if (this.countedItems === this.currentCountTarget) {
            setTimeout(() => {
              MeroAudio.playSuccess();
              MeroAudio.speakArabic(`شطورة يا ميرو! عديتي ${numObj.nameAr} بنجاح!`);
              if (window.MeroApp) {
                window.MeroApp.addStar(2);
                window.MeroApp.triggerConfetti();
              }
            }, 500);
          }
        }
      });

      itemsGrid.appendChild(item);
    }

    container.appendChild(itemsGrid);
  }
}

// Global Games Engine
const MeroGames = new MeroGamesEngine();

