/* Edit Japanese copy in index.html; English translations live below. No build required. */
(() => {
  'use strict';
  const english = {
    skip: 'Skip to content', navLabel: 'Main navigation', navAbout: 'Our community', navProgram: 'What we do', navVisit: 'Come along',
    heroLine1: 'Mom & Kid', heroLine2: 'Community.', promise: 'You are not alone as a mom.',
    intro: 'A place to share the joys and challenges of motherhood, encourage one another, and find your people along the way.',
    register: 'Join our community', formNote: 'Opens our Google registration form in a new tab.', invite: 'First time? You are welcome here.',
    photoAlt: 'An illustration of moms and young children spending time together', photoCaption: 'Little moments. Meaningful connections.',
    visitLabel: 'When and where to meet', when: 'WHEN WE MEET', day: 'Every Thursday', breakNote: 'We take a break on the 5th week.',
    where: 'WHERE TO FIND US', address: '4-6-13 Taihei, Tokyo Mode Gakuin Building 1F, Sumida-ku, Tokyo 130-0012', map: 'Open the map',
    contact: 'SAY HELLO', contactTitle: 'We’d love to hear from you.', contactBody: 'Get in touch with any questions about joining us.',
    programTitle: 'A little joy, every week.', programIntro: 'Learning, playing, and connecting.\nFor moms and little ones alike.',
    week1: '1st week', week2: '2nd week', week3: '3rd week', week4: '4th week', week5: '5th week',
    topicTitle: 'MomCo Topic Study', topicBody: 'Let’s explore parenting, relationships, and personal growth, and learn together as moms.',
    playTitle: 'Kids Playgroup', playBody: 'Playtime, songs, dancing, and fun activities to enjoy together.',
    bibleTitle: 'Discovery Bible Study', bibleBody: 'Discover the Bible and learn together.',
    cookTitle: 'Cooking Class', cookBody: 'Come and make dishes from around the world together.',
    restTitle: 'A little pause', restBody: 'A time to rest, refresh, and recharge.',
    asideLabel: 'Time for moms and children', kidsTitle: 'Sing a little.\nDance a little.',
    kidsBody: 'Little ones enjoy songs and dancing in English, and have fun playing together with friends.',
    momsBody: 'A little time for moms to learn.\nA little time for children to play.',
    joinEyebrow: 'THERE’S A PLACE FOR YOU HERE', joinTitle: 'Motherhood is better\ntogether.',
    joinBody: 'Come as you are, even if it’s your very first time.\nWe look forward to meeting you and your little ones.',
    qrAlt: 'QR code for the MomCo registration form', qrCaption: 'Scan with your phone to register',
    downloadTitle: 'Share a little community.', downloadBody: 'Download an A3 poster to print or pass along.',
    footer: 'A community for moms & little ones', footerContact: 'Get in touch ↗'
  };
  const targets = [...document.querySelectorAll('[data-i18n], [data-i18n-aria], [data-i18n-alt]')];
  const japanese = new Map(targets.map(el => [el, {
    text: el.innerHTML, aria: el.getAttribute('aria-label'), alt: el.getAttribute('alt')
  }]));
  const titleJA = document.title;
  const description = document.querySelector('meta[name="description"]');
  const descriptionJA = description.content;
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const ogJA = [ogTitle.content, ogDescription.content];
  function setLanguage(lang, save = false) {
    lang = lang === 'en' ? 'en' : 'ja';
    document.documentElement.lang = lang;
    for (const el of targets) {
      const original = japanese.get(el);
      if (el.dataset.i18n) {
        if (lang === 'ja') el.innerHTML = original.text;
        else {
          const lines = english[el.dataset.i18n].split('\n');
          el.replaceChildren();
          lines.forEach((line, index) => {
            if (index) el.append(document.createElement('br'));
            el.append(document.createTextNode(line));
          });
        }
      }
      if (el.dataset.i18nAria) el.setAttribute('aria-label', lang === 'ja' ? original.aria : english[el.dataset.i18nAria]);
      if (el.dataset.i18nAlt) el.setAttribute('alt', lang === 'ja' ? original.alt : english[el.dataset.i18nAlt]);
    }
    document.querySelectorAll('[data-lang]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === lang)));
    document.title = lang === 'ja' ? titleJA : 'MomCo Tokyo | Mom & Kid Community';
    description.content = lang === 'ja' ? descriptionJA : 'A welcoming community for moms and little ones in Sumida, Tokyo. Thursdays, 10:30–12:00 at Tokyo Multicultural Church. No meeting on the 5th week.';
    ogTitle.content = lang === 'ja' ? ogJA[0] : 'MomCo Tokyo — Mom & Kid Community';
    ogDescription.content = lang === 'ja' ? ogJA[1] : english.intro;
    if (save) {
      try { localStorage.setItem('momco-language', lang); } catch (_) { /* Browsing without storage is supported. */ }
      try {
        const url = new URL(location.href);
        url.searchParams.set('lang', lang);
        history.replaceState(null, '', url);
      } catch (_) { /* Local file previews may restrict history access. */ }
    }
  }
  let language = 'ja';
  const query = new URLSearchParams(location.search).get('lang');
  if (query === 'ja' || query === 'en') language = query;
  else { try { if (localStorage.getItem('momco-language') === 'en') language = 'en'; } catch (_) {} }
  setLanguage(language);
  document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang, true)));
})();
