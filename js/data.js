// ==========================================
// Mero's Magical World - Educational Data
// عالم ميرو السحري - بيانات التأسيس التعليمي
// ==========================================

const MERO_DATA = {
  // الحروف العربية كاملة ومفصلة لعمر 4 سنوات
  arabicLetters: [
    { char: 'أ', name: 'ألف', word: 'أرنب', wordEn: 'Rabbit', emoji: '🐰', color: '#FF6B6B', sound: 'أَ' },
    { char: 'ب', name: 'باء', word: 'بطة', wordEn: 'Duck', emoji: '🦆', color: '#4ECDC4', sound: 'بَ' },
    { char: 'ت', name: 'تاء', word: 'تفاحة', wordEn: 'Apple', emoji: '🍎', color: '#FF8ED4', sound: 'تَ' },
    { char: 'ث', name: 'ثاء', word: 'ثعلب', wordEn: 'Fox', emoji: '🦊', color: '#FFA07A', sound: 'ثَ' },
    { char: 'ج', name: 'جيم', word: 'جمل', wordEn: 'Camel', emoji: '🐪', color: '#F7B731', sound: 'جَ' },
    { char: 'ح', name: 'حاء', word: 'حصان', wordEn: 'Horse', emoji: '🐴', color: '#596275', sound: 'حَ' },
    { char: 'خ', name: 'خاء', word: 'خروف', wordEn: 'Sheep', emoji: '🐑', color: '#A3CB38', sound: 'خَ' },
    { char: 'د', name: 'دال', word: 'دبدوب', wordEn: 'Teddy Bear', emoji: '🧸', color: '#D6A2E8', sound: 'دَ' },
    { char: 'ذ', name: 'ذال', word: 'ذرة', wordEn: 'Corn', emoji: '🌽', color: '#FED330', sound: 'ذَ' },
    { char: 'ر', name: 'راء', word: 'رمان', wordEn: 'Pomegranate', emoji: '🍇', color: '#FC427B', sound: 'رَ' },
    { char: 'ز', name: 'زاي', word: 'زرافة', wordEn: 'Giraffe', emoji: '🦒', color: '#E1B12C', sound: 'زَ' },
    { char: 'س', name: 'سين', word: 'سيارة', wordEn: 'Car', emoji: '🚗', color: '#25CCF7', sound: 'سَ' },
    { char: 'ش', name: 'شين', word: 'شمس', wordEn: 'Sun', emoji: '☀️', color: '#FFA801', sound: 'شَ' },
    { char: 'ص', name: 'صاد', word: 'صقر', wordEn: 'Falcon', emoji: '🦅', color: '#3B3B98', sound: 'صَ' },
    { char: 'ض', name: 'ضاد', word: 'ضفدع', wordEn: 'Frog', emoji: '🐸', color: '#2ED573', sound: 'ضَ' },
    { char: 'ط', name: 'طاء', word: 'طائرة', wordEn: 'Airplane', emoji: '✈️', color: '#70A1FF', sound: 'طَ' },
    { char: 'ظ', name: 'ظاء', word: 'ظرف', wordEn: 'Envelope', emoji: '✉️', color: '#57606F', sound: 'ظَ' },
    { char: 'ع', name: 'عين', word: 'عصفور', wordEn: 'Bird', emoji: '🐦', color: '#1E90FF', sound: 'عَ' },
    { char: 'غ', name: 'غين', word: 'غزالة', wordEn: 'Gazelle', emoji: '🦌', color: '#FA8231', sound: 'غَ' },
    { char: 'ف', name: 'فاء', word: 'فراشة', wordEn: 'Butterfly', emoji: '🦋', color: '#FF9FF3', sound: 'فَ' },
    { char: 'ق', name: 'قاف', word: 'قطة', wordEn: 'Cat', emoji: '🐱', color: '#FD79A8', sound: 'قَ' },
    { char: 'ك', name: 'كاف', word: 'كتاب', wordEn: 'Book', emoji: '📖', color: '#00CEC9', sound: 'كَ' },
    { char: 'ل', name: 'لام', word: 'ليمون', wordEn: 'Lemon', emoji: '🍋', color: '#FFEAA7', sound: 'لَ' },
    { char: 'م', name: 'ميم', word: 'موزة', wordEn: 'Banana', emoji: '🍌', color: '#FDCB6E', sound: 'مَ' },
    { char: 'ن', name: 'نون', word: 'نجمة', wordEn: 'Star', emoji: '⭐', color: '#E84393', sound: 'نَ' },
    { char: 'هـ', name: 'هاء', word: 'هلال', wordEn: 'Moon', emoji: '🌙', color: '#6C5CE7', sound: 'هَ' },
    { char: 'و', name: 'واو', word: 'وردة', wordEn: 'Rose', emoji: '🌹', color: '#FF7675', sound: 'وَ' },
    { char: 'ي', name: 'ياء', word: 'يد', wordEn: 'Hand', emoji: '✋', color: '#0984E3', sound: 'يَ' }
  ],

  // الحروف الإنجليزية والتأسيس الصوتي الكامل (A-Z)
  englishLetters: [
    { char: 'A', lower: 'a', word: 'Apple', wordAr: 'تفاحة', emoji: '🍎', phonics: 'ah', color: '#FF6B6B' },
    { char: 'B', lower: 'b', word: 'Butterfly', wordAr: 'فراشة', emoji: '🦋', phonics: 'buh', color: '#4ECDC4' },
    { char: 'C', lower: 'c', word: 'Cat', wordAr: 'قطة', emoji: '🐱', phonics: 'kuh', color: '#FFA07A' },
    { char: 'D', lower: 'd', word: 'Dolphin', wordAr: 'دلفين', emoji: '🐬', phonics: 'duh', color: '#70A1FF' },
    { char: 'E', lower: 'e', word: 'Elephant', wordAr: 'فيل', emoji: '🐘', phonics: 'eh', color: '#D6A2E8' },
    { char: 'F', lower: 'f', word: 'Flower', wordAr: 'وردة', emoji: '🌸', phonics: 'fuh', color: '#FF9FF3' },
    { char: 'G', lower: 'g', word: 'Giraffe', wordAr: 'زرافة', emoji: '🦒', phonics: 'guh', color: '#E1B12C' },
    { char: 'H', lower: 'h', word: 'Heart', wordAr: 'قلب', emoji: '💖', phonics: 'huh', color: '#FF4757' },
    { char: 'I', lower: 'i', word: 'Ice cream', wordAr: 'آيس كريم', emoji: '🍦', phonics: 'ih', color: '#2ED573' },
    { char: 'J', lower: 'j', word: 'Juice', wordAr: 'عصير', emoji: '🧃', phonics: 'juh', color: '#FFA801' },
    { char: 'K', lower: 'k', word: 'Kite', wordAr: 'طائرة ورقية', emoji: '🪁', phonics: 'kuh', color: '#25CCF7' },
    { char: 'L', lower: 'l', word: 'Lion', wordAr: 'أسد', emoji: '🦁', phonics: 'luh', color: '#F7B731' },
    { char: 'M', lower: 'm', word: 'Mero & Monkey', wordAr: 'ميرو والقرد اللطيف', emoji: '🐵', phonics: 'muh', color: '#FC427B' },
    { char: 'N', lower: 'n', word: 'Nest', wordAr: 'عش', emoji: '🪺', phonics: 'nuh', color: '#596275' },
    { char: 'O', lower: 'o', word: 'Orange', wordAr: 'برتقالة', emoji: '🍊', phonics: 'aw', color: '#FA8231' },
    { char: 'P', lower: 'p', word: 'Panda', wordAr: 'باندا', emoji: '🐼', phonics: 'puh', color: '#A3CB38' },
    { char: 'Q', lower: 'q', word: 'Queen Mero', wordAr: 'الملكة ميرو', emoji: '👑', phonics: 'kwuh', color: '#FED330' },
    { char: 'R', lower: 'r', word: 'Rainbow', wordAr: 'قوس قزح', emoji: '🌈', phonics: 'ruh', color: '#6C5CE7' },
    { char: 'S', lower: 's', word: 'Star', wordAr: 'نجمة', emoji: '⭐', phonics: 'suh', color: '#FDCB6E' },
    { char: 'T', lower: 't', word: 'Teddy', wordAr: 'دبدوب', emoji: '🧸', phonics: 'tuh', color: '#00CEC9' },
    { char: 'U', lower: 'u', word: 'Umbrella', wordAr: 'شمسية', emoji: '☂️', phonics: 'uh', color: '#FD79A8' },
    { char: 'V', lower: 'v', word: 'Violin', wordAr: 'كمان', emoji: '🎻', phonics: 'vuh', color: '#8854D0' },
    { char: 'W', lower: 'w', word: 'Whale', wordAr: 'حوت', emoji: '🐳', phonics: 'wuh', color: '#1B9CFC' },
    { char: 'X', lower: 'x', word: 'Xylophone', wordAr: 'إكسيلوفون', emoji: '🎶', phonics: 'ks', color: '#FF7675' },
    { char: 'Y', lower: 'y', word: 'Yo-yo', wordAr: 'يويو', emoji: '🪀', phonics: 'yuh', color: '#20BF6B' },
    { char: 'Z', lower: 'z', word: 'Zebra', wordAr: 'حمار وحشي', emoji: '🦓', phonics: 'zuh', color: '#4B6584' }
  ],

  // الأرقام والرياضيات (عربي وإنجليزي وعد بصري)
  numbers: [
    {
      num: 1,
      arDigit: '١',
      enDigit: '1',
      nameAr: 'واحد',
      nameEn: 'One',
      itemEmoji: '☀️',
      itemNameAr: 'شمس مشرقة واحدة',
      itemNameEn: 'One bright sun',
      color: '#FF6B6B'
    },
    {
      num: 2,
      arDigit: '٢',
      enDigit: '2',
      nameAr: 'اثنان',
      nameEn: 'Two',
      itemEmoji: '🐰',
      itemNameAr: 'أرنبان لطيفان',
      itemNameEn: 'Two cute rabbits',
      color: '#4ECDC4'
    },
    {
      num: 3,
      arDigit: '٣',
      enDigit: '3',
      nameAr: 'ثلاثة',
      nameEn: 'Three',
      itemEmoji: '🌸',
      itemNameAr: 'ثلاث وردات جميلة',
      itemNameEn: 'Three lovely flowers',
      color: '#FF9FF3'
    },
    {
      num: 4,
      arDigit: '٤',
      enDigit: '4',
      nameAr: 'أربعة',
      nameEn: 'Four',
      itemEmoji: '🎈',
      itemNameAr: 'أربع بالونات ملونة (سن ميرو!)',
      itemNameEn: 'Four colorful balloons (Mero is 4!)',
      color: '#F7B731'
    },
    {
      num: 5,
      arDigit: '٥',
      enDigit: '5',
      nameAr: 'خمسة',
      nameEn: 'Five',
      itemEmoji: '⭐',
      itemNameAr: 'خمس نجوم لامعة',
      itemNameEn: 'Five sparkling stars',
      color: '#6C5CE7'
    },
    {
      num: 6,
      arDigit: '٦',
      enDigit: '6',
      nameAr: 'ستة',
      nameEn: 'Six',
      itemEmoji: '🍓',
      itemNameAr: 'ست حبات فراولة لذيذة',
      itemNameEn: 'Six sweet strawberries',
      color: '#FC427B'
    },
    {
      num: 7,
      arDigit: '٧',
      enDigit: '7',
      nameAr: 'سبعة',
      nameEn: 'Seven',
      itemEmoji: '🦋',
      itemNameAr: 'سبع فراشات رقيقة',
      itemNameEn: 'Seven fluttering butterflies',
      color: '#2ED573'
    },
    {
      num: 8,
      arDigit: '٨',
      enDigit: '8',
      nameAr: 'ثمانية',
      nameEn: 'Eight',
      itemEmoji: '🧁',
      itemNameAr: 'ثماني قطع كب كيك شهية',
      itemNameEn: 'Eight yummy cupcakes',
      color: '#FFA801'
    },
    {
      num: 9,
      arDigit: '٩',
      enDigit: '9',
      nameAr: 'تسعة',
      nameEn: 'Nine',
      itemEmoji: '🐬',
      itemNameAr: 'تسعة دلافين مرحة',
      itemNameEn: 'Nine playful dolphins',
      color: '#25CCF7'
    },
    {
      num: 10,
      arDigit: '١٠',
      enDigit: '10',
      nameAr: 'عشرة',
      nameEn: 'Ten',
      itemEmoji: '💖',
      itemNameAr: 'عشرة قلوب حب لميرو',
      itemNameEn: 'Ten hearts for Mero',
      color: '#FF4757'
    }
  ],

  // الأشكال والألوان للأطفال
  shapes: [
    { nameAr: 'دائرة', nameEn: 'Circle', emoji: '⭕', color: '#FF4757' },
    { nameAr: 'مربع', nameEn: 'Square', emoji: '🟩', color: '#2ED573' },
    { nameAr: 'مثلث', nameEn: 'Triangle', emoji: '🔺', color: '#FFA801' },
    { nameAr: 'نجمة', nameEn: 'Star', emoji: '⭐', color: '#FED330' },
    { nameAr: 'قلب', nameEn: 'Heart', emoji: '💖', color: '#FF7675' },
    { nameAr: 'مستطيل', nameEn: 'Rectangle', emoji: '▭', color: '#70A1FF' }
  ],

  colors: [
    { nameAr: 'أحمر', nameEn: 'Red', hex: '#FF4757' },
    { nameAr: 'أزرق', nameEn: 'Blue', hex: '#1E90FF' },
    { nameAr: 'أصفر', nameEn: 'Yellow', hex: '#FED330' },
    { nameAr: 'أخضر', nameEn: 'Green', hex: '#2ED573' },
    { nameAr: 'وردي', nameEn: 'Pink', hex: '#FF9FF3' },
    { nameAr: 'بنفسجي', nameEn: 'Purple', hex: '#8854D0' },
    { nameAr: 'برتقالي', nameEn: 'Orange', hex: '#FA8231' }
  ],

  // مسائل جمع بصرية مسلية
  mathPuzzles: [
    { a: 1, b: 1, emoji: '🍎', textAr: 'تفاحة + تفاحة = كم؟', choices: [1, 2, 3], answer: 2 },
    { a: 2, b: 1, emoji: '⭐', textAr: 'نجمتان + نجمة = كم؟', choices: [2, 3, 4], answer: 3 },
    { a: 2, b: 2, emoji: '🎈', textAr: 'بالونان + بالونان = كم؟', choices: [3, 4, 5], answer: 4 },
    { a: 3, b: 1, emoji: '🧁', textAr: '٣ كب كيك + ١ كب كيك = كم؟', choices: [4, 5, 2], answer: 4 },
    { a: 1, b: 4, emoji: '🍓', textAr: '١ فراولة + ٤ فراولات = كم؟', choices: [3, 4, 5], answer: 5 }
  ],

  // عبارات ميرو التشجيعية التفاعلية
  cheers: {
    ar: [
      'شطورة يا ميرو يا عسل! 🌟',
      'أنتِ أذكى وأشطر بنوتة في الدنيا! 💖',
      'يا عيني على الجمال والشطارة! 👑',
      'برافو يا أميرة ميرال! خطوة رائعة! ✨',
      'أنا فخورة بيكي أوي يا ميرو! 🏆',
      'ممتازة يا بطلة! كملي يا قمر! 🚀'
    ],
    en: [
      'Super Mero! You are brilliant! 🌟',
      'Amazing job, Princess Miral! 💖',
      'You did it! High five, Mero! 🖐️',
      'Wonderful! Keep shining, star! ✨',
      'Super smart girl Mero! 👑'
    ]
  },

  // رسائل ميرو الرفيقة عند النقر عليها
  companionQuotes: [
    'أهلاً بكِ في عالمي السحري! أنا ميرو، وأنتِ بطلتي الجميلة! 💖',
    'يلا نكتب ونتعلم مع بعض.. التعليم ممتع وسهل جداً! ✏️',
    'أنا بحب الألوان والنجوم والبالونات، وأنتِ بتحبي إيه يا ميرو؟ 🎈',
    'اضغطي على أي حرف أو رقم عشان تسمعي صوته وننطقه سوا! 🔊',
    'كل ما تتعلمي حاجة جديدة، بتكسبي نجوم دهبية وكأس كبير! 🏆'
  ],

  // صور ميرو المتوفرة داخل التطبيق
  avatars: [
    {
      id: 'smile',
      title: 'ميرو البطلة الضاحكة 💖',
      titleEn: 'Super Mero Smile',
      badge: 'assets/images/mero_avatar_badge.png',
      photo: 'assets/images/mero_avatar_smile.jpg',
      full: 'assets/images/mero_full_smile.jpg',
      desc: 'ضحكة ميرو العسل المشرقة'
    },
    {
      id: 'garden',
      title: 'ميرو الأميرة الزهرية 🌸',
      titleEn: 'Princess Miral Garden',
      badge: 'assets/images/mero_garden_badge.png',
      photo: 'assets/images/mero_avatar_garden.jpg',
      full: 'assets/images/mero_princess_full.jpg',
      desc: 'فستان ميرو الجميل في الحديقة'
    }
  ]
};

