/* ═══════════════════════════════════════════════════
   VALENTINE — script.js
═══════════════════════════════════════════════════ */


/* ── 1. LOADING SCREEN ── */
window.addEventListener('load', () => {
  window.scrollTo({ top: 0, behavior: 'instant' }); // ← shu qator
  setTimeout(() => {
    const ls = document.getElementById('loading-screen');
    ls.classList.add('fade-out');
    setTimeout(() => {
      ls.style.display = 'none';
      document.getElementById('hero').classList.add('active');
      spawnParticles();
    }, 800);
  }, 2400);
});

/* ── 2. FLOATING PARTICLES (Hero) ── */
function spawnParticles() {
  const container = document.getElementById('heroParticles');
  const symbols = ['♡', '❤', '✦', '✿', '♡', '♡'];
  for (let i = 0; i < 22; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    p.style.setProperty('--dur',  (7 + Math.random() * 8) + 's');
    p.style.setProperty('--delay', (Math.random() * 8) + 's');
    p.style.left  = Math.random() * 100 + '%';
    p.style.bottom = '-5%';
    p.style.fontSize = (0.7 + Math.random() * 0.9) + 'rem';
    container.appendChild(p);
  }
}

/* ── 3. HERO BUTTON → ENVELOPE SECTION ── */
document.getElementById('openLetterBtn').addEventListener('click', () => {
  scrollToSection('envelope-section');
});

/* ── 4. SCROLL REVEAL ── */
function scrollToSection(id) {
  const el = document.getElementById(id);
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.section').forEach(s => observer.observe(s));

/* ── 5. ENVELOPE CLICK → LETTER ── */
const envelope = document.getElementById('envelope');
let envelopeOpened = false;

envelope.addEventListener('click', () => {
  if (envelopeOpened) return;
  envelopeOpened = true;
  envelope.classList.add('open');

  setTimeout(() => {
    // Fade out envelope section
    const envSection = document.getElementById('envelope-section');
    envSection.style.transition = 'opacity 0.7s ease';
    envSection.style.opacity = '0';

    setTimeout(() => {
      envSection.style.display = 'none';
      scrollToSection('letter-section');
      startTypewriter();
      spawnBgHearts();
    }, 700);
  }, 900);
});

/* ── 6. FLOATING HEARTS (Letter bg) ── */
function spawnBgHearts() {
  const container = document.getElementById('letterBgHearts');
  for (let i = 0; i < 14; i++) {
    const h = document.createElement('span');
    h.className = 'bg-heart';
    h.textContent = '♡';
    h.style.setProperty('--dur',   (9 + Math.random() * 10) + 's');
    h.style.setProperty('--delay', (Math.random() * 10) + 's');
    h.style.left    = Math.random() * 100 + '%';
    h.style.bottom  = '-5%';
    h.style.fontSize = (0.9 + Math.random() * 1.2) + 'rem';
    container.appendChild(h);
  }
}

/* ── 7. TYPEWRITER ── */
// ════════════════════════════════════════════════
// YOUR MESSAGE — replace the text inside letterLines
// ════════════════════════════════════════════════
const letterLines = [
  "Janim Gulsevar, bayramiñ qutlı bolsın!",
  "Muhabbatımızg'a ko'z tiymesin,",
  "baxtımız ha'mme waqıt jarıq bolsin.",
  "Tanısqanımızg'a 4 jıldan artıq waqıt boldı,",
  "sonsha waqıt men menen birge bolg'anıña raxmet.",
  "Bunnan keyin de o'mir boyı birge bolıw nasip etsin.",
  "Janim, seni bar juregim menen qattı jaqsı ko'remen ❤️😘"
];

function startTypewriter() {
  const body   = document.getElementById('letterBody');
  const sigEl  = document.getElementById('letterSignature');
  const contBtn = document.getElementById('continueBtn');

  let lineIdx = 0;
  let charIdx = 0;
  let fullText = '';

  // cursor
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  body.appendChild(cursor);

  function typeChar() {
    if (lineIdx >= letterLines.length) {
      // Done — show signature
      cursor.remove();
      setTimeout(() => {
        sigEl.textContent = 'Yours forever…';
        sigEl.classList.add('show');
        setTimeout(() => {
          contBtn.classList.remove('hidden');
          setTimeout(() => contBtn.classList.add('show'), 50);
        }, 900);
      }, 600);
      return;
    }

    const line = letterLines[lineIdx];

    if (charIdx < line.length) {
      fullText += line[charIdx];
      charIdx++;
      body.innerHTML = fullText.replace(/\n/g, '<br>') + '<span class="cursor"></span>';
      setTimeout(typeChar, line[charIdx - 1] === ',' ? 90 : 38);
    } else {
      // End of line
      fullText += '\n';
      lineIdx++;
      charIdx = 0;
      body.innerHTML = fullText.replace(/\n/g, '<br>') + '<span class="cursor"></span>';
      setTimeout(typeChar, lineIdx < letterLines.length && letterLines[lineIdx] === '' ? 280 : 120);
    }
  }

  setTimeout(typeChar, 500);
}

/* ── 8. CONTINUE BUTTON → MEMORIES ── */
document.getElementById('continueBtn').addEventListener('click', () => {
  scrollToSection('memories-section');
});

/* ── 9. MEMORIES — Modal ── */
const modal    = document.getElementById('memoryModal');
const modalImg = document.getElementById('modalImg');
const closeBtn = document.getElementById('modalClose');

document.querySelectorAll('.memory-card').forEach(card => {
  card.addEventListener('click', () => {
    const img = card.querySelector('img');
    if (img && img.src && !img.style.display) {
      modalImg.src = img.src;
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  });
});

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

function closeModal() {
  modal.style.opacity = '0';
  modal.style.transition = 'opacity 0.3s ease';
  setTimeout(() => {
    modal.classList.add('hidden');
    modal.style.opacity = '';
    modal.style.transition = '';
    document.body.style.overflow = '';
  }, 300);
}

/* ── 10. MUSIC PLAYER ── */

// ════════════════════════════════════════════════
// PLAYLIST — Replace src with your mp3 file paths
// e.g. "music/song1.mp3"
// Replace title, artist with real info
// ════════════════════════════════════════════════
const songs = [
  { title: "Men boliwim kerek",  artist: "Duman",  src: "music/song1.mp3",  cover: "" },
  { title: "Seni mag'an tangerten",  artist: "Artist Name",  src: "music/song2.mp3",  cover: "" },
  { title: "Million",  artist: "Duman",  src: "music/song3.mp3",  cover: "" },
  { title: "Medina",  artist: "Jah Khalib",  src: "music/song4.mp3",  cover: "" },
  { title: "Sen mening adamimsin",  artist: "Kayrat Nurtas",  src: "music/song5.mp3",  cover: "" },
  { title: "Qansha kun",  artist: "Sadraddin",  src: "music/song6.mp3",  cover: "" },
  { title: "Hayrana",  artist: "Alisher Bayniyazov",  src: "music/song7.mp3",  cover: "" },
  { title: "Неужели это все любовь",  artist: "Macan, Navai",  src: "music/song8.mp3",  cover: "" },
  { title: "Колыбельная",  artist: "Jah Khalib",  src: "music/song9.mp3",  cover: "" },
  { title: "My love", artist: "Jeren Halnazarova, MAD Nazarov",  src: "music/song10.mp3", cover: "" },
];

const audio     = document.getElementById('audioPlayer');
const playBtn   = document.getElementById('playBtn');
const prevBtn   = document.getElementById('prevBtn');
const nextBtn   = document.getElementById('nextBtn');
const playIcon  = playBtn.querySelector('.play-icon');
const pauseIcon = playBtn.querySelector('.pause-icon');
const progFill  = document.getElementById('progressFill');
const progThumb = document.getElementById('progressThumb');
const progBar   = document.getElementById('progressBar');
const curTime   = document.getElementById('currentTime');
const totTime   = document.getElementById('totalTime');
const volSlider = document.getElementById('volumeSlider');
const playerTitle  = document.getElementById('playerTitle');
const playerArtist = document.getElementById('playerArtist');
const playerCover  = document.getElementById('playerCover');
const playlist  = document.getElementById('playlist');

let currentIdx  = 0;
let isPlaying   = false;

// Build playlist UI
songs.forEach((song, i) => {
  const item = document.createElement('div');
  item.className = 'playlist-item' + (i === 0 ? ' active' : '');
  item.innerHTML = `
    <div class="playing-bars">
      <span class="bar"></span><span class="bar"></span><span class="bar"></span>
    </div>
    <span class="pl-num">${i + 1}</span>
    <div class="pl-info">
      <div class="pl-title">${song.title}</div>
      <div class="pl-artist">${song.artist}</div>
    </div>
    <span class="pl-dur" id="dur-${i}">—</span>
  `;
  item.addEventListener('click', () => loadSong(i, true));
  playlist.appendChild(item);
});

function loadSong(idx, autoPlay = false) {
  currentIdx = idx;
  const song = songs[idx];

  audio.src = song.src;
  playerTitle.textContent  = song.title;
  playerArtist.textContent = song.artist;

  // Cover
  playerCover.innerHTML = '';
  if (song.cover) {
    const img = document.createElement('img');
    img.src = song.cover;
    img.alt = song.title;
    playerCover.appendChild(img);
  } else {
    playerCover.innerHTML = '<div class="cover-placeholder">♪</div>';
  }

  // Highlight playlist
  document.querySelectorAll('.playlist-item').forEach((el, i) => {
    el.classList.toggle('active', i === idx);
  });

  // Scroll into view
  const activeEl = playlist.querySelectorAll('.playlist-item')[idx];
  if (activeEl) activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });

  if (autoPlay) {
    audio.play().then(() => setPlaying(true)).catch(() => {});
  } else {
    setPlaying(false);
  }
}

function setPlaying(state) {
  isPlaying = state;
  playIcon.classList.toggle('hidden', state);
  pauseIcon.classList.toggle('hidden', !state);
  playerCover.classList.toggle('playing', state);
}

playBtn.addEventListener('click', () => {
  if (!audio.src || audio.src.endsWith('/')) {
    loadSong(0, true);
    return;
  }
  if (isPlaying) {
    audio.pause();
    setPlaying(false);
  } else {
    audio.play().then(() => setPlaying(true)).catch(() => {});
  }
});

prevBtn.addEventListener('click', () => {
  loadSong((currentIdx - 1 + songs.length) % songs.length, isPlaying);
});
nextBtn.addEventListener('click', () => {
  loadSong((currentIdx + 1) % songs.length, isPlaying);
});
audio.addEventListener('ended', () => {
  loadSong((currentIdx + 1) % songs.length, true);
});

// Progress
audio.addEventListener('timeupdate', () => {
  if (!audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  progFill.style.width  = pct + '%';
  progThumb.style.left  = pct + '%';
  curTime.textContent   = formatTime(audio.currentTime);
});
audio.addEventListener('loadedmetadata', () => {
  totTime.textContent = formatTime(audio.duration);
  // Update duration in playlist
  const durEl = document.getElementById('dur-' + currentIdx);
  if (durEl) durEl.textContent = formatTime(audio.duration);
});

progBar.addEventListener('click', e => {
  const rect = progBar.getBoundingClientRect();
  const pct  = (e.clientX - rect.left) / rect.width;
  audio.currentTime = pct * audio.duration;
});

// Volume
audio.volume = parseFloat(volSlider.value);
volSlider.addEventListener('input', () => {
  audio.volume = parseFloat(volSlider.value);
});

function formatTime(s) {
  if (isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2,'0');
  return `${m}:${sec}`;
}

// Initial load (no autoplay)
loadSong(0, false);
