/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SurahMeta, Ayah, Reciter } from '../types';

export const SURAH_LIST: SurahMeta[] = [
  { id: 1, nameArabic: "الفاتحة", nameEnglish: "Al-Fatihah", nameKurdish: "دەستپێک (فاتیحە)", revelationType: "Meccan", versesCount: 7, startPage: 1, endPage: 1 },
  { id: 2, nameArabic: "البقرة", nameEnglish: "Al-Baqarah", nameKurdish: "مانگا (بەقەرە)", revelationType: "Medinan", versesCount: 286, startPage: 2, endPage: 49 },
  { id: 3, nameArabic: "آل عمران", nameEnglish: "Ali 'Imran", nameKurdish: "خێزانی عیمران", revelationType: "Medinan", versesCount: 200, startPage: 50, endPage: 76 },
  { id: 4, nameArabic: "النساء", nameEnglish: "An-Nisa", nameKurdish: "ئافرەتان (نیسا)", revelationType: "Medinan", versesCount: 176, startPage: 77, endPage: 106 },
  { id: 5, nameArabic: "المائدة", nameEnglish: "Al-Ma'idah", nameKurdish: "خوان (مائیدە)", revelationType: "Medinan", versesCount: 120, startPage: 107, endPage: 127 },
  { id: 6, nameArabic: "الأنعام", nameEnglish: "Al-An'am", nameKurdish: "وڵاخەکان (ئەنعام)", revelationType: "Meccan", versesCount: 165, startPage: 128, endPage: 150 },
  { id: 7, nameArabic: "الأعراف", nameEnglish: "Al-A'raf", nameKurdish: "بەرزایییەکان (ئەعراف)", revelationType: "Meccan", versesCount: 206, startPage: 151, endPage: 176 },
  { id: 8, nameArabic: "الأنفال", nameEnglish: "Al-Anfal", nameKurdish: "دەستکەوتەکانی جەنگ", revelationType: "Medinan", versesCount: 75, startPage: 177, endPage: 186 },
  { id: 9, nameArabic: "التوبة", nameEnglish: "At-Tawbah", nameKurdish: "تۆبە", revelationType: "Medinan", versesCount: 129, startPage: 187, endPage: 207 },
  { id: 10, nameArabic: "يونس", nameEnglish: "Yunus", nameKurdish: "یونس", revelationType: "Meccan", versesCount: 109, startPage: 208, endPage: 221 },
  { id: 36, nameArabic: "يس", nameEnglish: "Ya-Sin", nameKurdish: "یاسین", revelationType: "Meccan", versesCount: 83, startPage: 440, endPage: 445 },
  { id: 55, nameArabic: "الرحمن", nameEnglish: "Ar-Rahman", nameKurdish: "بەخشندە (ڕەحمان)", revelationType: "Medinan", versesCount: 78, startPage: 531, endPage: 534 },
  { id: 56, nameArabic: "الواقعة", nameEnglish: "Al-Waqi'ah", nameKurdish: "رووداوەکە (واقعە)", revelationType: "Meccan", versesCount: 96, startPage: 534, endPage: 537 },
  { id: 67, nameArabic: "الملك", nameEnglish: "Al-Mulk", nameKurdish: "دەسەڵات (مولک)", revelationType: "Meccan", versesCount: 30, startPage: 562, endPage: 564 },
  { id: 112, nameArabic: "الإخلاص", nameEnglish: "Al-Ikhlas", nameKurdish: "پاکی باوەڕ (ئیخلاس)", revelationType: "Meccan", versesCount: 4, startPage: 604, endPage: 604 },
  { id: 113, nameArabic: "الفلق", nameEnglish: "Al-Falaq", nameKurdish: "بەرەبەیان (فەلەق)", revelationType: "Meccan", versesCount: 5, startPage: 604, endPage: 604 },
  { id: 114, nameArabic: "الناس", nameEnglish: "An-Nas", nameKurdish: "خەڵکی (ناس)", revelationType: "Meccan", versesCount: 6, startPage: 604, endPage: 604 }
];

export const RECITERS: Reciter[] = [
  {
    id: "alafasy",
    nameAr: "مشاري بن راشد العفاسي",
    nameEn: "Mishary Rashid Alafasy",
    nameKu: "میشاری ڕەشید عەفاسی",
    style: "مرتل",
    audioBaseUrl: "https://everyayah.com/data/Alafasy_128kbps/"
  },
  {
    id: "minshawi_teacher",
    nameAr: "المنشاوي مع الأطفال (المصحف المعلم)",
    nameEn: "Al-Minshawi (Teacher Mode with Kids)",
    nameKu: "مەنشاوی (فێرکاری لەگەڵ منداڵان)",
    style: "معلم",
    audioBaseUrl: "https://everyayah.com/data/Minshawy_Teacher_128kbps/"
  },
  {
    id: "husary",
    nameAr: "محمود خليل الحصري",
    nameEn: "Mahmoud Khalil Al-Husary",
    nameKu: "مەحموود خەلیل حوسەری",
    style: "مرتل",
    audioBaseUrl: "https://everyayah.com/data/Husary_128kbps/"
  }
];

export const AYAH_DATA: Record<number, Ayah[]> = {
  // Surah Al-Fatihah
  1: [
    {
      id: 11,
      surahId: 1,
      ayahNumber: 1,
      juz: 1,
      hizb: 1,
      page: 1,
      textUthmani: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      textClean: "بسم الله الرحمن الرحيم",
      textImlaei: "بسم الله الرحمن الرحيم",
      translations: {
        en: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
        'ku-ckb': "بەناوی خوای بەخشندەی میهرەبان (بە ناوی اللە کە یەکجار بەخشندە و یەکجار بەبەزەییە).",
        'ku-kmr': "Bi ناڤێ خودێ بەخشندێ دۆستپەروەر (خودایێ دلۆڤان و دلۆڤانکار)."
      },
      tafsir: {
        ar: "سورة الفاتحة سميت بذلك لافتتاح كتاب الله بها. وهي سبع آيات مكية أجمع المفسرون عليها. تبدأ باسم الله المستحق للعبادة وحده جل جلاله.",
        'ku-ckb': "سورەتی فاتیحە بە دەستپێکی قورئانی پیرۆز دادەنرێت. پێشەکییەکی بێوێنەیە کە تێیدا سوپاس و ستایشی پەروەردگار و تەوحیدی پۆخت بوونی هەیە."
      }
    },
    {
      id: 12,
      surahId: 1,
      ayahNumber: 2,
      juz: 1,
      hizb: 1,
      page: 1,
      textUthmani: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
      textClean: "الحمد لله رب العالمين",
      textImlaei: "الحمد لله رب العالمين",
      translations: {
        en: "[All] praise is [due] to Allah, Lord of the worlds -",
        'ku-ckb': "هەموو ستایش و سوپاسێک بۆ خوایە کە پەروەردگاری هەموو جیهانیانە.",
        'ku-kmr': "هەمی سپاس و حەمد بۆ خودێ رب العالمين و خودانێ گەردوونییە."
      },
      tafsir: {
        ar: "الحمد لله الثناء الكامل الجميل لله مستحق الحمد وحده رب العالمين المربي لجميع الخلق بنعمه.",
        'ku-ckb': "سوپاسگوزاری پۆخت تەنها هی خوایە، کە بەخێوکەر و پەروەردەکاری گشتی دروستکراوەکانیەتی."
      }
    },
    {
      id: 13,
      surahId: 1,
      ayahNumber: 3,
      juz: 1,
      hizb: 1,
      page: 1,
      textUthmani: "الرَّحْمَٰنِ الرَّحِيمِ",
      textClean: "الرحمن الرحيم",
      textImlaei: "الرحمن الرحيم",
      translations: {
        en: "The Entirely Merciful, the Especially Merciful,",
        'ku-ckb': "کە یەکجار بەخشندە و یەکجار بەبەزەییە.",
        'ku-kmr': "کۆ گەلەک بەخشندەیە و دلۆڤانە."
      },
      tafsir: {
        ar: "الرحمن الرحيم صفتان لله تدلان على سعة رحمته وعظمها وعمومها لجميع الخلائق.",
        'ku-ckb': "دوو ناوی مەزنی خودان کە نیشاندەری ڕەحمەتی فراوان و هەمیشەیی ئەون بۆ دروستکراوەکانی."
      }
    },
    {
      id: 14,
      surahId: 1,
      ayahNumber: 4,
      juz: 1,
      hizb: 1,
      page: 1,
      textUthmani: "مَالِكِ يَوْمِ الدِّينِ",
      textClean: "مالك يوم الدين",
      textImlaei: "مالك يوم الدين",
      translations: {
        en: "Sovereign of the Day of Recompense.",
        'ku-ckb': "خاوەن و دەسەڵاتداری ڕۆژی دوایی و سزادان (پاداشت و سزا).",
        'ku-kmr': "خودان و پادشایێ روژا حساب و پاداشت و جزادانێیە."
      },
      tafsir: {
        ar: "مالك يوم الدين هو المالك المنفرد بالتصرف في يوم الجزاء والحساب يوم القيامة.",
        'ku-ckb': "پەروەردگار خاوەنی تاقانەی ڕۆژی قیامەتە، ڕۆژێک کە هیچ کەس خاوەن بڕیار نییە جگە لەو."
      }
    },
    {
      id: 15,
      surahId: 1,
      ayahNumber: 5,
      juz: 1,
      hizb: 1,
      page: 1,
      textUthmani: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
      textClean: "إياك نعبد وإياك نستعين",
      textImlaei: "إياك نعبد وإياك نستعين",
      translations: {
        en: "It is You we worship and You we ask for help.",
        'ku-ckb': "تەنها تۆ دەپەرستین و تەنها هاوکاری و کۆمەکیش لە تۆ دەخوازین.",
        'ku-kmr': "ئەم بتنێ تە دپەرێسین و د حەبێنین، و هەر بتنێ هاریکاریێ ژتە دخوازین."
      },
      tafsir: {
        ar: "نعبدك وحدك ولا نعبد غيرك، ونستعين بك وحدك في طاعتك وفي سائر أمورنا.",
        'ku-ckb': "تۆحید و پەرستن تەنیا بۆ خودایە و پشت بە هیچ کەس پێویست ناکات ببەسترێت جگە لەو زاتە مەزنە."
      }
    },
    {
      id: 16,
      surahId: 1,
      ayahNumber: 6,
      juz: 1,
      hizb: 1,
      page: 1,
      textUthmani: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
      textClean: "اهدنا الصراط المستقيم",
      textImlaei: "اهدنا الصراط المستقيم",
      translations: {
        en: "Guide us to the straight path -",
        'ku-ckb': "بمانپارێزە و ڕێنماییمان بکە بۆ سەر ڕێگا ڕاست و دروستەکە.",
        'ku-kmr': "مە ڕێنمایی بکە بۆ سەر ڕێکا ڕاست و مەزن."
      },
      tafsir: {
        ar: "أرشدنا ووفقنا واسلك بنا الصراط المستقيم وهو الإسلام الواضح الموصل إلى الجنة.",
        'ku-ckb': "داواکارین لە خودا کە دامەزراومان بکات لەسەر ئایینی ڕاست کە مرۆڤ دەگەیەنێتە بەهەشتی نەمر."
      }
    },
    {
      id: 17,
      surahId: 1,
      ayahNumber: 7,
      juz: 1,
      hizb: 1,
      page: 1,
      textUthmani: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
      textClean: "صراط الذين أنعمت عليهم غير المغضوب عليهم ولا الضالين",
      textImlaei: "صراط الذين أنعمت عليهم غير المغضوب عليهم ولا الضالين",
      translations: {
        en: "The path of those upon whom You have bestowed favor, not of those who have earned [Your] anger or of those who are astray.",
        'ku-ckb': "ڕێگای ئەو کەسانەی ڕێز و بەخششت پێداون (پێغەمبەران و هاوەڵانیان)، نەک ڕێگای ئەوانەی کە بەهرەمەند بوون لە تووڕەیی تۆ یان ڕێگای گومڕایان.",
        'ku-kmr': "ڕێکا وان کەسێن تە کەرەم و نیعمەت پێکرینە، نە ڕێکا یەزدان لێ غەزەب کری و نە ڕێکا یێن گومڕا و بەرزە بووین."
      },
      tafsir: {
        ar: "صراط الذين أنعمت عليهم من النبيين والصديقين والشهداء والصالحين، غير صراط المغضوب عليهم (اليهود)، ولا صراط الضالين (النصارى).",
        'ku-ckb': "دوا ساتی ئەم نزایە مەزنەیە بۆ دەستکەوتنی ڕێگای پێشەوایانی دادپەروەری و پارێزراوبوون لە هزرە چەوتەکان."
      }
    }
  ],

  // Surah Al-Mulk (First 10 verses)
  67: [
    {
      id: 671,
      surahId: 67,
      ayahNumber: 1,
      juz: 29,
      hizb: 57,
      page: 562,
      textUthmani: "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
      textClean: "تبارك الذي بيده الملك وهو على كل شيء قدير",
      textImlaei: "تبارك الذي بيده الملك وهو على كل شيء قدير",
      translations: {
        en: "Blessed is He in whose hand is dominion, and He is over all things competent -",
        'ku-ckb': "پڕبەرەکەت و مەزنە ئەو زاتەی کە دەسەڵاتی جیهان و گەردوونی بەدەستە، و ئاوا هەمیشە بەسەر هەموو شتێکدا بەتوانایە.",
        'ku-kmr': "پڕبەرەکەت و گەورەیە ئەو خودایێ دەسەڵات د دەستێ وێدا، و ئەو بەسەر هەمی تشتاندا خودان شیانە."
      },
      tafsir: {
        ar: "تنزّه وعظم المعبود سبحانه وتعالى الذي بيده التصرف والملك المطلق في ملكوته العظيم.",
        'ku-ckb': "خودا بێ نیاز و پاکە، خاوەنی هەموو گەردوونە و توانای بەسەر هەموو جیهاندا هەیە."
      }
    },
    {
      id: 672,
      surahId: 67,
      ayahNumber: 2,
      juz: 29,
      hizb: 57,
      page: 562,
      textUthmani: "الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ الْعَزِيزُ الْغَفُورُ",
      textClean: "الذي خلق الموت والحياة ليبلوكم أيكم أحسن عملا وهو العزيز الغفور",
      textImlaei: "الذي خلق الموت والحياة ليبلوكم أيكم أحسن عملا وهو العزيز الغفور",
      translations: {
        en: "[He] who created death and life to test you [as to] which of you is best in deed - and He is the Exalted in Might, the Forgiving -",
        'ku-ckb': "ئەو زاتەی کە مردن و ژیانی بەدیهێناوە تا تاقیتان بکاتەوە کامەتان خاوەن چاکترین کۆششە، ئەو سەرکەوتووی لێخۆشبووە.",
        'ku-kmr': "ئەو خودایێ مرن و ژیان ئافراندی دا تەجرەبێ ل وە بکەت کانێ کیژ ژ وە یێ باشترە د عەمەلدا."
      },
      tafsir: {
        ar: "خلق الموت والحياة لحكمة بالغة ليمتحنكم أيها الناس بالابتلاء ليتبين المطيع المحسن من العاصي المسيء.",
        'ku-ckb': "ئامانجی ژیان و مردن تاقیکردنەوەی مرۆڤەکانە بۆ ئەوەی کردەوە باشرەکان بدرەوشێنەوە."
      }
    },
    {
      id: 673,
      surahId: 67,
      ayahNumber: 3,
      juz: 29,
      hizb: 57,
      page: 562,
      textUthmani: "الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا ۖ مَّا تَرَىٰ فِي خَلْقِ الرَّحْمَٰنِ مِن تَفَاوُتٍ ۖ فَارْجِعِ الْبَصَرَ هَلْ تَرَىٰ مِن فُطُورٍ",
      textClean: "الذي خلق سبع سماوات طباقا ما ترى في خلق الرحمن من تفاوت فارجع البصر هل ترى من فطور",
      textImlaei: "الذي خلق سبع سماوات طباقا ما ترى في خلق الرحمن من تفاوت فارجع البصر هل ترى من فطور",
      translations: {
        en: "[And] who created seven heavens in layers. You do not see in the creation of the Most Merciful any inconsistency. So return [your] vision [to the sky]; do you see any breaks?",
        'ku-ckb': "ئەو زاتەی حەوت ئاسمانی چین لەسەر چین دروستکرد، لە خوڵقاندنی خوای بەخشندەدا هیچ ناتەواوی و جیاوازییەک نابینیت، بڕوانە ئاسمانی پان کوا تلیش یان درزێک بەدی دەکەیت؟",
        'ku-kmr': "ئەو خودایێ حەفت ئەسمان د سەریەکدا چێکرین، تۆ د خەلقکرنا رەحمانیدا چو کێماسی و عەیبان نابینی."
      },
      tafsir: {
        ar: "خلق سبع سماوات متطابقة بعضها فوق بعض، لا تجد في خلق الرحمن أي خلل أو عيب.",
        'ku-ckb': "تەسلیمی دروستی دروستکراوەکانی خودا بە بێ کەم و کوڕی لە قەبارە و بونیادی گەردوونیدا."
      }
    },
    {
      id: 674,
      surahId: 67,
      ayahNumber: 4,
      juz: 29,
      hizb: 57,
      page: 562,
      textUthmani: "ثُمَّ ارْجِعِ الْبَصَرَ كَرَّتَيْنِ يَنقَلِبْ إِلَيْكَ الْبَصَرُ خَاسِئًا وَهُوَ حَسِيرٌ",
      textClean: "ثم ارجع البصر كرتين ينقلب إليك البصر خاسئا وهو حسير",
      textImlaei: "ثم ارجع البصر كرتين ينقلب إليك البصر خاسئا وهو حسير",
      translations: {
        en: "Then return [your] vision twice again. [Your] vision will return to you humbled while it is fatigued.",
        'ku-ckb': "دووبارە چاو بخشێنەوە و تەماشاکە، دواجار چاوت بە سەرسامی و ماندوویی و بێئومێدی بەرەو ڕووت دەگەڕێتەوە بەبێ دۆزینەوەی عەیبێک.",
        'ku-kmr': "پاشان تو تەماشاکە جارەکا دی، چاڤێ تە دێ ب زلیلی و عاجزی و ماندوویی زڤریتە دەف تە."
      },
      tafsir: {
        ar: "كرر النظر مرة بعد مرة، يرجع إليك بصرك ذليلاً خاسئاً عاجزاً عن رصد أي عيب وهو متعب كليل.",
        'ku-ckb': "مرۆڤ هەر چەند تێبڕوانێت ناتوانێت بچووکترین درز یان کێماسی لە دروستکردنی ئاسمانەکاندا بدۆزێتەوە."
      }
    },
    {
      id: 675,
      surahId: 67,
      ayahNumber: 5,
      juz: 29,
      hizb: 57,
      page: 562,
      textUthmani: "وَلَقَدْ زَيَّنَّا السَّمَاءَ الدُّنْيَا بِمَصَابِيحَ وَجَعَلْنَاهَا رُجُومًا لِّلشَّيَاطِينِ ۖ وَأَعْتَدْنَا لَهُمْ عَذَابَ السَّعِيرِ",
      textClean: "ولقد زينا السماء الدنيا بمصابيح وجعلناها رجوما للشياطين وأعتدنا لهم عذاب السعير",
      textImlaei: "ولقد زينا السماء الدنيا بمصابيح وجعلناها رجوما للشياطين وأعتدنا لهم عذاب السعير",
      translations: {
        en: "And We have certainly beautified the nearest heaven with stars and have made [meaning, Halos] them thrown at the devils and have prepared for them the punishment of the Blaze.",
        'ku-ckb': "بەڕاستی ئێمە ئاسمانی یەکەم و نزیکمان ڕازاندووەتەوە بە چراکان (ئەستێرە گەشەکان) و کردمانن بە تير و بەرد بۆ وەدەرنانی شەیتانە دزەکان، و سزای دۆزەخی گەرممان بۆ ئامادەکردوون.",
        'ku-kmr': "و ب دروستی مە ئەسمانێ دنیا ڕازاندیە ب چرا و ستێران، و مە کرینە تير دا شەیتانان پێ دەرکەین."
      },
      tafsir: {
        ar: "لقد جمّلنا السماء القريبة للنظر بكواكب مضيئة، وجعلنا منها شهباً محرقة للشياطين الذين يسترقون السمع.",
        'ku-ckb': "ڕازاندنەوەی ئاسمان بە ئەستێرەکان هەم بۆ جوانی ڕواڵەتی یە و هەم بۆ ڕاونانی شەیتانە یاخییەکان."
      }
    },
    {
      id: 676,
      surahId: 67,
      ayahNumber: 6,
      juz: 29,
      hizb: 57,
      page: 563,
      textUthmani: "وَلِلَّذِينَ كَفَرُوا بِرَبِّهِمْ عَذَابُ جَهَنَّمَ ۖ وَبِئْسَ الْمَصِيرُ",
      textClean: "وللذين كفروا بربهم عذاب جهنم وبئس المصير",
      textImlaei: "وللذين كفروا بربهم عذاب جهنم وبئس المصير",
      translations: {
        en: "And for those who have disbelieved in their Lord is the punishment of Hell, and wretched is the destination.",
        'ku-ckb': "سزای دۆزەخ بۆ ئەو بێباوەڕانەیە کە نکوڵییان لە پەروەردگاریان کردووە، ئای کە سەرەنجام و گەڕانەوەیەکی خراپە.",
        'ku-kmr': "و بۆ وان ئەوێن کافر بووین د خودایێ خوەدا، عەزابێ دۆزەخێ یێ بو وان هەی، و ئەوا خرابترین جیهە."
      },
      tafsir: {
        ar: "وللكافرين بربهم عذاب موجع يوم القيامة في نار جهنم، وبئس المرجع والمآل الذي ينتهون إليه.",
        'ku-ckb': "هەڕەشەی توند لە بێباوەڕان کە دەرئەنجامێکی پڕ لە ئازاریان لە پێشە."
      }
    },
    {
      id: 677,
      surahId: 67,
      ayahNumber: 7,
      juz: 29,
      hizb: 57,
      page: 563,
      textUthmani: "إِذَا أُلْقُوا فِيهَا سَمِعُوا لَهَا شَهِيقًا وَهِيَ تَفُورُ",
      textClean: "إذا ألقوا فيها سمعوا لها شهيقا وهي تفور",
      textImlaei: "إذا ألقوا فيها سمعوا لها شهيقا وهي تفور",
      translations: {
        en: "When they are thrown into it, they hear from it a [dreadful] inhaling while it boils,",
        'ku-ckb': "کاتێک فڕێدەدرێنە ناوی، نوزە و شەکاندنەوەی ترسناکی لێ دەبیستن لەکاتێکدا دۆزەخ لە توڕەییدا دەکوڵێت.",
        'ku-kmr': "دەمێ بو ناڤ دۆزەخێ دهێنە هاڤێتن، دەنگێ هناسە دژوارێن وێ دبهیسن هەک تێت کوڵین."
      },
      tafsir: {
        ar: "إذا قُذف هؤلاء الكفار في جهنم سمعوا لها صوتاً شديداً منكراً كشهيق الحمير وهي تغلي بهم غلياناً شديداً.",
        'ku-ckb': "دۆزەخ هاوشێوەی بوونەوەرێکی تووڕەیە کاتێک تاوانبارانی پێشکەش دەکرێت."
      }
    },
    {
      id: 678,
      surahId: 67,
      ayahNumber: 8,
      juz: 29,
      hizb: 57,
      page: 563,
      textUthmani: "تَكَادُ تَمَيَّزُ مِنَ الْغَيْظِ ۖ كُلَّمَا أُلْقِيَ فِيهَا فَوْجٌ سَأَلَهُمْ خَزَنَتُهَا أَلَمْ يَأْتِكُمْ نَذِيرٌ",
      textClean: "تكاد تميز من الغيظ كلما ألقي فيها فوج سألهم خزنتها ألم يأتكم نذير",
      textImlaei: "تكاد تميز من الغيظ كلما ألقي فيها فوج سألهم خزنتها ألم يأتكم نذير",
      translations: {
        en: "It almost bursts with rage. Every time a company is thrown into it, its keepers ask them, \"Did there not come to you a warner?\"",
        'ku-ckb': "وەک بڵێی لە کین و داخدا پارچە پارچە دەبێت، هەر دەستەیەکی لێ فڕێبدرێت پارێزەرەکانی دۆزەخ لێیان دەپرسن: ئایا ئاگادارکەرەوە و ترسێنەرتان بۆ نەهات؟",
        'ku-kmr': "نێزیکە ژبەر عاجزیێ پارچە پارچە ببیت، هەر جارێ کۆ گروپەک بو ناڤ دهێتە هاڤێتن، خەزنەچیێن وێ دپرسن: ئەرێ بو هەوە ترسێنەرەک نەهات؟"
      },
      tafsir: {
        ar: "تكاد تمزق جهنم وتنشق من شدة الغضب والغيظ على الكفار، كلما رُميت فيها جماعة سألتهم ملائكتها تبكيتاً لهم.",
        'ku-ckb': "پرسیاری سەرزەنشتکارانە لەلایەن فریشتەکانی دۆزەخەوە کە ئایا بێ ئاگا بوون لە ئامۆژگاری."
      }
    },
    {
      id: 679,
      surahId: 67,
      ayahNumber: 9,
      juz: 29,
      hizb: 57,
      page: 563,
      textUthmani: "قَالُوا بَلَىٰ قَدْ جَاءَنَا نَذِيرٌ فَكَذَّبْنَا وَقُلْنَا مَا نَزَّلَ اللَّهُ مِن شَيْءٍ إِنْ أَنتُمْ إِلَّا فِي ضَلَالٍ كَبِيرٍ",
      textClean: "قالوا بلى قد جاءنا نذير فكذبنا وقلنا ما نزل الله من شيء إن أنتم إلا في ضلال كبير",
      textImlaei: "قالوا بلى قد جاءنا نذير فكذبنا وقلنا ما نزل الله من شيء إن أنتم إلا في ضلال كبير",
      translations: {
        en: "They will say, \"Yes, a warner had come to us, but we denied and said, 'Allah has not sent down anything. You are not but in great error.'\"",
        'ku-ckb': "لە وەڵامدا دەڵێن: بەڵێ، ترسێنەر و پێغەمبەرمان بۆ هات بەڵام ئێمە بە درۆمان زانین و گوتمان: خودا هیچ فەرمانێکی دانەبەزاندووە و ئێوەش فێڵ دەکەن و لە گومڕاییەکی گەورەدان.",
        'ku-kmr': "وان دوت: بەلێ، بۆ مە ترسێنەر هات لێ مە ئەوان ب درەو دەرخستن و مە دگوت خودێ چو چیز دەرنەکریە."
      },
      tafsir: {
        ar: "يعترف أهل الكفر ويقولون: بلى قد جاءنا الرسل فكذبناهم وقلنا بغرور ما أنزل الله من وحي وإن أنتم إلا في تيه وضلال واسع.",
        'ku-ckb': "دانپێدانانی دوا جار بە کەم تەرخەمی و ڕەتکردنەوەی ژیری و بانگەوازی ڕاستەقینە."
      }
    },
    {
      id: 6710,
      surahId: 67,
      ayahNumber: 10,
      juz: 29,
      hizb: 57,
      page: 563,
      textUthmani: "وَقَالُوا لَوْ كُنَّا نَسْمَعُ أَوْ نَعْقِلُ مَا كُنَّا فِي أَصْحَابِ السَّعِيرِ",
      textClean: "وقالوا لو كنا نسمع أو نعقل ما كنا في أصحاب السعير",
      textImlaei: "وقالوا لو كنا نسمع أو نعقل ما كنا في أصحاب السعير",
      translations: {
        en: "And they will say, \"If only we had been listening or reasoning, we would not be among the companions of the Blaze.\"",
        'ku-ckb': "بەتەحەسەرەوە دەڵێن: ئەگەر گۆێمان بگرتایە و یان عەقڵمان بەکار بهێنایە هەرگیز خاوەنی ئەم دۆزەخە گەرمە نەدەبووین.",
        'ku-kmr': "و دیار کەن و د بێژن: ئەگەر مە گوهداریا حەق ببا یان عەقلێ خوە ببا، ئەم نەبووینە ژ یارێن ئاگرێ سەعیر."
      },
      tafsir: {
        ar: "وقالوا نادمين: لو كنا نسمع سماع قبول أو نتفكر ونعقل ما نُصحنا به ما كنا اليوم في عداد المعذبين أصحاب النار المستعرة.",
        'ku-ckb': "کۆسپەکە بەکارهێنانی عەقڵ و بەزەیی بووە کە کاتی خۆی لێی دوور کەوتوونەتەوە."
      }
    }
  ],

  // Surah Al-Ikhlas
  112: [
    {
      id: 1121,
      surahId: 112,
      ayahNumber: 1,
      juz: 30,
      hizb: 60,
      page: 604,
      textUthmani: "قُلْ هُوَ اللَّهُ أَحَدٌ",
      textClean: "قل هو الله أحد",
      textImlaei: "قل هو الله أحد",
      translations: {
        en: "Say, \"He is Allah, [who is] One,",
        'ku-ckb': "بڵێ (ئەی محمد): ئەو خوایە هاوتای نییە و تاقانەیە.",
        'ku-kmr': "بێژە: ئەو یە خودایێ تاقانە."
      },
      tafsir: {
        ar: "قل -أيها الرسول- للناس: هو الله المتفرد بالألوهية والربوبية والأسماء والصفات، لا شريك له.",
        'ku-ckb': "پۆختەی توحیدی باوەڕ کە خودا تاقانە و بێ نیازە لە پەرستندا."
      }
    },
    {
      id: 1122,
      surahId: 112,
      ayahNumber: 2,
      juz: 30,
      hizb: 60,
      page: 604,
      textUthmani: "اللَّهُ الصَّمَدُ",
      textClean: "الله الصمد",
      textImlaei: "الله الصمد",
      translations: {
        en: "Allah, the Absolute Reference (the Eternal Refuge).",
        'ku-ckb': "خوایەکە بێ نیازە و هەموو بۆ پێویستیەکانیان ڕووی تێ دەکەن.",
        'ku-kmr': "خودایێ بێ نیازە کو هەمی محتاجێن وی نە."
      },
      tafsir: {
        ar: "الله وحده المقصود بالحوائج، الذي تصمد وتحتاج إليه جميع الخلائق في كل أمورها.",
        'ku-ckb': "سەمەد واتە ئەو زاتەی هەمووان محتاج و خاوەن پێداویستی ئەون بەڵام ئەو بێ نیازی موتڵەقە."
      }
    },
    {
      id: 1123,
      surahId: 112,
      ayahNumber: 3,
      juz: 30,
      hizb: 60,
      page: 604,
      textUthmani: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
      textClean: "لم يلد ولم يولد",
      textImlaei: "لم يلد ولم يولد",
      translations: {
        en: "He neither begets nor is born,",
        'ku-ckb': "منداڵی نەبووە و لە کەسیش نەبووە (کەسیش باوکی نەبووە).",
        'ku-kmr': "نە کەس بویە و نە ژ کەسێ هاتیە بوون."
      },
      tafsir: {
        ar: "لم يكن له ولد، ولم يلد كشيء من البشر أو الخلق، ولم يلده أحد، فليس له أب ولا أم.",
        'ku-ckb': "خودا دوورە لە هەبوونی بنەچە یان درێژبوونەوەی نەسەب بە شێوەی مرۆڤ دۆستانە."
      }
    },
    {
      id: 1124,
      surahId: 112,
      ayahNumber: 4,
      juz: 30,
      hizb: 60,
      page: 604,
      textUthmani: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
      textClean: "ولم يكن له كفوا أحد",
      textImlaei: "ولم يكن له كفوا أحد",
      translations: {
        en: "And there is none co-equal or comparable unto Him.\"",
        'ku-ckb': "و هیچ کەسێک هاوشێوە و وێنەی ئەو نییە.",
        'ku-kmr': "و چو کەس نینە هاوشێوە و وێنەیێ وی."
      },
      tafsir: {
        ar: "ولم يكن له مثيل ولا شبيه في صفاته ولا أفعاله تبارك وتعالى وتعاظم علواً كبيراً.",
        'ku-ckb': "هیچ هاوشێوە و هاوتایەکی نییە لە دروستکەردا."
      }
    }
  ],

  // Surah Al-Falaq
  113: [
    {
      id: 1131,
      surahId: 113,
      ayahNumber: 1,
      juz: 30,
      hizb: 60,
      page: 604,
      textUthmani: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",
      textClean: "قل أعوذ برب الفلق",
      textImlaei: "قل أعوذ برب الفلق",
      translations: {
        en: "Say, \"I seek refuge in the Lord of daybreak",
        'ku-ckb': "بڵێ (پەنا دەگرم): بە پەروەردگاری بەرەبەیان (سپێدە).",
        'ku-kmr': "بێژە: ئەز پەنا دگرم ب رب الفلق کو سپێدەیە."
      },
      tafsir: {
        ar: "قل: أتحصن وأستعيذ برب الصبح وهو فالق الإصباح وجلاء الظلمة.",
        'ku-ckb': "فەلەق سپێدەیە یان کفت بوونی ڕووناکی کە بڵاوە دەکات بەسەر تاریکیدا."
      }
    },
    {
      id: 1132,
      surahId: 113,
      ayahNumber: 2,
      juz: 30,
      hizb: 60,
      page: 604,
      textUthmani: "مِن شَرِّ مَا خَلَقَ",
      textClean: "من شر ما خلق",
      textImlaei: "من شر ما خلق",
      translations: {
        en: "From the evil of that which He created",
        'ku-ckb': "لە خراپەی هەرچی دروستی کردووە (لە بوونەوەرە زیانبەخشەکان).",
        'ku-kmr': "ژ خرابی و شەڕێ هەر تشتەکێ وی ئافراندی."
      },
      tafsir: {
        ar: "من شر جميع ما خلق وأوجد من الإنس والجن والدواب والهوام والجمادات المؤذية.",
        'ku-ckb': "پەنا بردن بە خودا لە زیانی هەموو ئەو زیندەوەر و توخمانەی تێکدەر و ئازاربەخشن لە جیهاندا."
      }
    },
    {
      id: 1133,
      surahId: 113,
      ayahNumber: 3,
      juz: 30,
      hizb: 60,
      page: 604,
      textUthmani: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ",
      textClean: "ومن شر غاسق إذا وقب",
      textImlaei: "ومن شر غاسق إذا وقب",
      translations: {
        en: "And from the evil of darkness when it settles",
        'ku-ckb': "و لە خراپەی شەوی تاریک کاتێک دادێت و باڵ بەسەر زەویدا دەکێشێت.",
        'ku-kmr': "و ژ شەڕێ شەڤا تاری دەمێ دهێتە سەر عەردی."
      },
      tafsir: {
        ar: "ومن شر ظلام الليل إذا دخل بظلمته وتخفى فيه الأشرار والمؤذون.",
        'ku-ckb': "تاریکی الليل شوێنی چەوت و بەدکردارانە بۆیە نزا دەکەین تا تێیدا بپارێزرێین."
      }
    },
    {
      id: 1134,
      surahId: 113,
      ayahNumber: 4,
      juz: 30,
      hizb: 60,
      page: 604,
      textUthmani: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ",
      textClean: "ومن شر النفاثات في العقد",
      textImlaei: "ومن شر النفاثات في العقد",
      translations: {
        en: "And from the evil of the blowers in knots",
        'ku-ckb': "و لە خراپەی ژنە جادووگەرە فووکەرەکان لە گرێکان (بۆ جادووکردن).",
        'ku-kmr': "و ژ شەڕێ وان جادوکەرێن پڤ دکەنە د گرێیاندا."
      },
      tafsir: {
        ar: "ومن شر الساحرات والساحرين الذين ينفثون في العقد التي يعقدونها للسحر والضر العظيم.",
        'ku-ckb': "پاراستن لە چاوتێبڕین و فێڵی ئەوانەی کە دەیانەوێت بەیەکەوەبوونی مرۆڤەکان تێکبدەن."
      }
    },
    {
      id: 1135,
      surahId: 113,
      ayahNumber: 5,
      juz: 30,
      hizb: 60,
      page: 604,
      textUthmani: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
      textClean: "ومن شر حاسد إذا حسد",
      textImlaei: "ومن شر حاسد إذا حسد",
      translations: {
        en: "And from the evil of an envier when he envies.\"",
        'ku-ckb': "و لە خراپەی حەسود کاتێک حەسوودی بە خەڵکی دەبات.",
        'ku-kmr': "و ژ شەڕ و خرابیێن حەسودکاران دەمێ حەسودیێ دکەن."
      },
      tafsir: {
        ar: "ومن شر مبغض للناس يتمنى زوال نعمهم إذا حرك كيده وأراد إيقاع الأذى والضرر بهم.",
        'ku-ckb': "حەسودی نەخۆشیەکی کوشندەیە کە دەروونی پیس تێکدەدات و جوانی و شادی کەسانی تر ڕەتدەکاتەوە."
      }
    }
  ],

  // Surah An-Nas
  114: [
    {
      id: 1141,
      surahId: 114,
      ayahNumber: 1,
      juz: 30,
      hizb: 60,
      page: 604,
      textUthmani: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
      textClean: "قل أعوذ برب الناس",
      textImlaei: "قل أعوذ برب الناس",
      translations: {
        en: "Say, \"I seek refuge in the Lord of mankind,",
        'ku-ckb': "بڵێ: پەنا دەگرم بە پەروەردگاری خەڵک و مرۆڤەکان.",
        'ku-kmr': "بێژە: ئەز پەنا دگرم ب خودایێ مروڤان."
      },
      tafsir: {
        ar: "قل: أستعوذ وأتمنع برب الناس المستحق للعبادة وخالقهم وحاميهم من الآفات.",
        'ku-ckb': "سەرەتای پەناگرتنێکی بەهێزە کە تێیدا سیفەتی گەورەی خودا بەسەر دروستکراوەکاندا پیشان دەدات."
      }
    },
    {
      id: 1142,
      surahId: 114,
      ayahNumber: 2,
      juz: 30,
      hizb: 60,
      page: 604,
      textUthmani: "مَلِكِ النَّاسِ",
      textClean: "ملك الناس",
      textImlaei: "ملك الناس",
      translations: {
        en: "The Sovereign of mankind,",
        'ku-ckb': "پاوشا و حاکمی مرۆڤەکان.",
        'ku-kmr': "خودان و مەلەکێ هەمی مروڤان."
      },
      tafsir: {
        ar: "ملك الناس المتصرف في شؤونهم وسلطانه الفوقي المطلق عليهم بالتدبير.",
        'ku-ckb': "خودا پادشای حەق و بێ نیازە کە فەرمانڕەوایەکی دادپەروەرە بۆ هەموو گەردوون."
      }
    },
    {
      id: 1143,
      surahId: 114,
      ayahNumber: 3,
      juz: 30,
      hizb: 60,
      page: 604,
      textUthmani: "إِلَٰهِ النَّاسِ",
      textClean: "إله الناس",
      textImlaei: "إله الناس",
      translations: {
        en: "The God of mankind,",
        'ku-ckb': "پەرستراو و خوای تاقانەی مرۆڤەکان.",
        'ku-kmr': "پەرستراوێ هەمی خەلکێ."
      },
      tafsir: {
        ar: "إله الناس معبودهم الحق البارئ الذي لا يستحق الألوهية غيره ولا يشرك معه سواه.",
        'ku-ckb': "خودا پەرستراوی ڕاستەقینەیە کە هیچ خودایەکی تر نییە بۆ پەرستن جگە لەو."
      }
    },
    {
      id: 1144,
      surahId: 114,
      ayahNumber: 4,
      juz: 30,
      hizb: 60,
      page: 604,
      textUthmani: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ",
      textClean: "من شر الوسواس الخناس",
      textImlaei: "من شر الوسواس الخناس",
      translations: {
        en: "From the evil of the retreating whisperer -",
        'ku-ckb': "لە خراپەی فریودەری پاشەکشەکاری وسوەسەکەر (کە شەیتانە).",
        'ku-kmr': "ژ شەڕێ شەیتانێ کو وسوەسا دکەت پاش دزڤریت."
      },
      tafsir: {
        ar: "من شر الشيطان الذي يلقي وسواسه في صدر العبد إذا غفل ويختفي هرباً ويخنس إذا ذكر العبد ربه.",
        'ku-ckb': "وسوەسەی شەیتان بێ هێز دەبێت کاتێک مرۆڤ یادی خودا بکات، بۆیە ناوی دەنرێت خەناس چونکە پاشەکشە دەکات."
      }
    },
    {
      id: 1145,
      surahId: 114,
      ayahNumber: 5,
      juz: 30,
      hizb: 60,
      page: 604,
      textUthmani: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ",
      textClean: "الذي يوسوس في صدور الناس",
      textImlaei: "الذي يوسوس في صدور الناس",
      translations: {
        en: "Who whispers [evil] into the breasts of mankind -",
        'ku-ckb': "ئەو شەیتانەی کە چرتەچرت دەکاتە نێو دڵ و دەروونی خەڵکییەوە.",
        'ku-kmr': "ئەوێ کو فێر و فوت دڵێ واندا چێ دکەت."
      },
      tafsir: {
        ar: "الذي يلقي بأوهام وسوسة الشكوك والشرور في قلوب الناس ويزين المعاصي لهم.",
        'ku-ckb': "شەیتان هەمیشە هەوڵدەدات گومان بنێتە دڵی مرۆڤەکانەوە تا بەرەو ڕێگای هەڵە برۆن."
      }
    },
    {
      id: 1146,
      surahId: 114,
      ayahNumber: 6,
      juz: 30,
      hizb: 60,
      page: 604,
      textUthmani: "مِنَ الْجِنَّةِ وَالنَّاسِ",
      textClean: "من الجنة والناس",
      textImlaei: "من الجنة والناس",
      translations: {
        en: "From among the jinn and mankind.\"",
        'ku-ckb': "جا ئەو شەیتانە لە ڕەگەزی جندۆکە بێت یان لە ڕەگەزی مرۆڤەکان.",
        'ku-kmr': "چ ژ جندان بن یان مروڤان خۆ بن."
      },
      tafsir: {
        ar: "سواء كان هذا الموسوس المضل من شياطين الجن أو من أعوانهم المفسدين من شياطين الإنس.",
        'ku-ckb': "شڵەژێنەران هەم لە شێوەی شەیتانی جن دا کار دەکەن هەم هاوشێوەی مرۆڤە دڵ خراپەکان."
      }
    }
  ]
};

// Simulated mock database of Prayer Times based on simple calculations for Kurdish Cities (Erbil, Sulaymaniyah, Duhok, Kirkuk)
export const GET_PRAYER_TIMES = (city: string) => {
  // Simple deterministic offline prayer times for tests
  return {
    city: city || "هەولێر (Erbil)",
    fajr: "04:12",
    sunrise: "05:43",
    dhuhr: "12:15",
    asr: "16:02",
    maghrib: "18:48",
    isha: "20:18",
    qibla: "196°" // Facing Mecca from Kurdistan
  };
};

export const MOCK_DKIHR_LIST = [
  { text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ", translation: "پاک و بێگەردی بۆ خودا و سوپاسگوزاریش بۆ ئەو.", count: 0 },
  { text: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ", translation: "داوای لێخۆشبوون لە خودا دەکەم و دەگەڕێمەوە بۆ لای.", count: 0 },
  { text: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ", translation: "درود و سڵاوی خودا لەسەر محمد بێت.", count: 0 },
  { text: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ", translation: "هیچ پەرستراوێک نییە بێجگە لە الله تاقانەیە و هاوبەشی نییە.", count: 0 }
];
