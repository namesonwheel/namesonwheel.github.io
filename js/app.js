// =============================================
// NAMES ON WHEEL — Main App JS
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ─── Color Palettes ───────────────────────
  const palettes = {
    rainbow: ['#FF6B6B','#FF8E53','#FFD166','#06D6A0','#4ECDC4','#45B7D1','#6C63FF','#9B59B6','#FF8B94','#A8E6CF'],
    pastel:  ['#FFB3BA','#FFDFBA','#FFFFBA','#BAFFC9','#BAE1FF','#D4BAFF','#FFD1DC','#B5EAD7','#C7CEEA','#FFDAC1'],
    ocean:   ['#0077B6','#00B4D8','#48CAE4','#90E0EF','#ADE8F4','#023E8A','#0096C7','#0099CC','#33B5E5','#006994'],
    sunset:  ['#FF6B35','#F7931E','#FFD700','#FF4757','#FF6348','#FFA502','#FF7675','#E84393','#A29BFE','#6C5CE7'],
    forest:  ['#2D6A4F','#40916C','#52B788','#74C69D','#95D5B2','#B7E4C7','#1B4332','#27AE60','#58D68D','#82E0AA'],
    candy:   ['#FF6EFF','#FF3CAC','#784BA0','#2B86C5','#00C6FB','#FF8C42','#FFC857','#E9FF70','#A8FF78','#FF6B9D'],
  };

  let currentPalette = 'rainbow';
  let spinHistory = [];
  let isSpinning = false;
  let currentAngle = 0;
  let removeWinner = false;

  // ─── Get Names ──────────────────────────
  function getNames() {
    const raw = document.getElementById('namesTextarea').value;
    return raw.split('\n').map(n => n.trim()).filter(n => n.length > 0);
  }

  // ─── Update count ───────────────────────
  function updateCount() {
    const n = getNames().length;
    document.getElementById('namesCount').textContent = `${n} name${n !== 1 ? 's' : ''}`;
    drawWheel(currentAngle);
  }

  // ─── Draw Wheel ─────────────────────────
  function drawWheel(angle, canvas, size) {
    const cvs = canvas || document.getElementById('mainWheel');
    const names = getNames();
    if (!cvs) return;

    const sz = size || cvs.width;
    const ctx = cvs.getContext('2d');
    const cx = sz / 2, cy = sz / 2, r = sz / 2 - 4;
    ctx.clearRect(0, 0, sz, sz);

    const colors = palettes[currentPalette];

    if (names.length === 0) {
      // Empty state
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, 2 * Math.PI);
      ctx.fillStyle = '#F0EDE8';
      ctx.fill();
      ctx.font = `bold ${sz*0.055}px Nunito, sans-serif`;
      ctx.fillStyle = '#aaa';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Add names above!', cx, cy);
      return;
    }

    const slice = (2 * Math.PI) / names.length;

    names.forEach((name, i) => {
      const start = angle + i * slice;
      const end = start + slice;
      const color = colors[i % colors.length];

      // Slice
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, end);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Text
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(start + slice / 2);
      const fontSize = Math.min(sz * 0.045, Math.max(sz * 0.022, sz * 0.045 / Math.max(1, name.length / 8)));
      ctx.font = `700 ${fontSize}px Nunito, sans-serif`;
      ctx.fillStyle = isLightColor(color) ? '#333' : '#fff';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      const textR = r * 0.82;
      const maxW = textR * 0.75;
      let displayName = name;
      ctx.save();
      const measured = ctx.measureText(displayName).width;
      if (measured > maxW) {
        while (ctx.measureText(displayName + '…').width > maxW && displayName.length > 1) {
          displayName = displayName.slice(0, -1);
        }
        displayName += '…';
      }
      ctx.restore();
      ctx.fillText(displayName, textR, 0);
      ctx.restore();
    });

    // Center circle
    const grad = ctx.createRadialGradient(cx, cy, 2, cx, cy, r * 0.14);
    grad.addColorStop(0, '#fff');
    grad.addColorStop(1, '#f0ece8');
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.14, 0, 2 * Math.PI);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function isLightColor(hex) {
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 145;
  }

  // ─── Spin ────────────────────────────────
  function spinWheel() {
    if (isSpinning) return;
    const names = getNames();
    if (names.length === 0) {
      alert('Please add some names first!');
      return;
    }

    isSpinning = true;
    const spinBtn = document.getElementById('wheelSpinBtn');
    spinBtn?.classList.add('spinning');
    spinBtn && (spinBtn.textContent = '...');

    const totalSpins = (5 + Math.random() * 5) * 2 * Math.PI;
    const duration = 3500 + Math.random() * 2000;
    const startAngle = currentAngle;
    const targetAngle = startAngle + totalSpins;
    const startTime = performance.now();

    function easeOut(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      currentAngle = startAngle + (targetAngle - startAngle) * easeOut(progress);
      drawWheel(currentAngle);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        currentAngle = currentAngle % (2 * Math.PI);
        isSpinning = false;
        spinBtn?.classList.remove('spinning');
        spinBtn && (spinBtn.textContent = 'SPIN');
        announceWinner();
      }
    }

    requestAnimationFrame(animate);
  }

  function announceWinner() {
    const names = getNames();
    if (!names.length) return;

    const slice = (2 * Math.PI) / names.length;
    // Pointer is at top (PI * 1.5), find which slice is at top
    const normalizedAngle = ((currentAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    const pointerAngle = (2 * Math.PI - normalizedAngle + 1.5 * Math.PI) % (2 * Math.PI);
    const winnerIndex = Math.floor(pointerAngle / slice) % names.length;
    const winner = names[winnerIndex];

    // Update result box
    const resultBox = document.getElementById('wheelResultBox');
    const resultEmoji = document.getElementById('resultEmoji');
    const resultName = document.getElementById('resultName');
    const resultPlaceholder = document.getElementById('resultPlaceholder');
    if (resultBox) {
      resultBox.classList.add('has-result');
      resultEmoji && (resultEmoji.style.display = 'block');
      resultName && (resultName.textContent = winner);
      resultPlaceholder && (resultPlaceholder.style.display = 'none');
    }

    // History
    const colors = palettes[currentPalette];
    const color = colors[(getNames().indexOf(winner)) % colors.length];
    addToHistory(winner, color);

    // Show modal after short delay
    setTimeout(() => showWinnerModal(winner), 200);
    // Confetti
    launchConfetti();
  }

  // ─── Winner Modal ─────────────────────────
  function showWinnerModal(name) {
    document.getElementById('winnerName').textContent = name;
    document.getElementById('winnerModalOverlay').classList.add('show');
  }
  function closeWinnerModal() {
    document.getElementById('winnerModalOverlay').classList.remove('show');
  }

  document.getElementById('winnerModalOverlay')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('winnerModalOverlay')) closeWinnerModal();
  });
  document.getElementById('closeModalBtn')?.addEventListener('click', closeWinnerModal);
  document.getElementById('spinAgainBtn')?.addEventListener('click', () => {
    closeWinnerModal();
    if (removeWinner) removeCurrentWinner();
    setTimeout(spinWheel, 300);
  });

  document.getElementById('removeWinnerToggle')?.addEventListener('change', (e) => {
    removeWinner = e.target.checked;
  });

  function removeCurrentWinner() {
    const resultName = document.getElementById('resultName')?.textContent;
    if (!resultName) return;
    const textarea = document.getElementById('namesTextarea');
    const lines = textarea.value.split('\n').map(l => l.trim());
    const idx = lines.findIndex(l => l === resultName);
    if (idx !== -1) {
      lines.splice(idx, 1);
      textarea.value = lines.filter(l => l).join('\n');
      updateCount();
    }
  }

  // ─── History ──────────────────────────────
  function addToHistory(name, color) {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    spinHistory.unshift({ name, color, time: timeStr });
    spinHistory = spinHistory.slice(0, 20);
    renderHistory();
  }

  function renderHistory() {
    const list = document.getElementById('historyList');
    if (!list) return;
    if (spinHistory.length === 0) {
      list.innerHTML = '<div class="history-empty">No spins yet. Give it a spin! 🎡</div>';
      return;
    }
    list.innerHTML = spinHistory.map(h => `
      <div class="history-item">
        <div class="history-dot" style="background:${h.color}"></div>
        <span class="history-name">${h.name}</span>
        <span class="history-time">${h.time}</span>
      </div>
    `).join('');
  }

  // ─── Confetti ─────────────────────────────
  function launchConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const particles = [];
    const colors = ['#FF6B6B','#FFD166','#06D6A0','#45B7D1','#9B59B6','#FF8E53','#4ECDC4'];

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -200,
        w: Math.random() * 12 + 4,
        h: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * 360,
        spin: (Math.random() - 0.5) * 8,
        vy: Math.random() * 4 + 3,
        vx: (Math.random() - 0.5) * 3,
        opacity: 1
      });
    }

    let frame = 0;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.y += p.vy;
        p.x += p.vx;
        p.angle += p.spin;
        if (frame > 80) p.opacity -= 0.015;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle * Math.PI / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
        ctx.restore();
      });
      frame++;
      if (frame < 140) requestAnimationFrame(animate);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    animate();
  }

  // ─── Tabs ─────────────────────────────────
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`tab-${tab}`)?.classList.add('active');
      if (tab === 'history') renderHistory();
    });
  });

  // ─── Quick Add ────────────────────────────
  document.getElementById('quickAddBtn')?.addEventListener('click', () => {
    const input = document.getElementById('quickAddInput');
    if (!input?.value.trim()) return;
    const textarea = document.getElementById('namesTextarea');
    const val = textarea.value.trim();
    textarea.value = val ? val + '\n' + input.value.trim() : input.value.trim();
    input.value = '';
    updateCount();
  });
  document.getElementById('quickAddInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') document.getElementById('quickAddBtn')?.click();
  });

  // ─── Clear All ────────────────────────────
  document.getElementById('clearAllBtn')?.addEventListener('click', () => {
    if (confirm('Clear all names?')) {
      document.getElementById('namesTextarea').value = '';
      updateCount();
    }
  });

  // ─── Color Palette Swatches ──────────────
  document.querySelectorAll('.swatch').forEach(sw => {
    sw.addEventListener('click', () => {
      currentPalette = sw.dataset.palette;
      document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
      sw.classList.add('active');
      drawWheel(currentAngle);
    });
  });

  // ─── Wheel Type Presets ──────────────────
  const wheelPresets = {
    yesno:    'Yes\nNo',
    number:   '1\n2\n3\n4\n5\n6\n7\n8\n9\n10',
    team:     'Team A\nTeam B\nTeam C\nTeam D',
    prize:    '🥇 Grand Prize\n🥈 Silver Award\n🥉 Bronze Award\n🎁 Gift Card\n🎉 Free Entry\nTry Again',
  };

  document.querySelectorAll('.wheel-type-card').forEach(card => {
    card.addEventListener('click', () => {
      const type = card.dataset.type;
      if (wheelPresets[type]) {
        document.getElementById('namesTextarea').value = wheelPresets[type];
        updateCount();
        document.querySelector('#wheel-app')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        document.querySelector('#wheel-app')?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ─── Spin button ──────────────────────────
  document.getElementById('wheelSpinBtn')?.addEventListener('click', spinWheel);

  // ─── Textarea listener ────────────────────
  document.getElementById('namesTextarea')?.addEventListener('input', updateCount);

  // ─── FAQ accordion ───────────────────────
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(fi => fi.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ─── Scroll animations ────────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

  // ─── Hero wheel preview ───────────────────
  function drawHeroWheel() {
    const canvas = document.getElementById('heroWheelCanvas');
    if (!canvas) return;
    const sz = 280;
    canvas.width = sz;
    canvas.height = sz;
    const names = ['Alice','Bob','Charlie','Diana','Evan','Fiona','George','Hannah'];
    const colors = palettes.rainbow;
    const ctx = canvas.getContext('2d');
    const cx = sz/2, cy = sz/2, r = sz/2 - 4;
    const slice = (2 * Math.PI) / names.length;
    let angle = 0;

    function animateHero() {
      ctx.clearRect(0,0,sz,sz);
      angle += 0.005;
      names.forEach((name, i) => {
        const start = angle + i * slice;
        const end = start + slice;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, r, start, end);
        ctx.closePath();
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(start + slice/2);
        ctx.font = `700 12px Nunito, sans-serif`;
        ctx.fillStyle = isLightColor(colors[i % colors.length]) ? '#333' : '#fff';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(name, r*0.82, 0);
        ctx.restore();
      });
      // Center
      ctx.beginPath();
      ctx.arc(cx, cy, r*0.13, 0, 2*Math.PI);
      ctx.fillStyle = 'white';
      ctx.fill();
      requestAnimationFrame(animateHero);
    }
    animateHero();
  }

  // ─── Feature wheel in visual ─────────────
  function drawFeatureWheel() {
    const canvas = document.getElementById('featWheel');
    if (!canvas) return;
    const sz = 200;
    canvas.width = sz; canvas.height = sz;
    const names = ['🎉','🎊','🎁','🏆','⭐','🎯'];
    const colors = palettes.candy;
    const ctx = canvas.getContext('2d');
    const cx = sz/2, cy = sz/2, r = sz/2 - 3;
    const slice = (2*Math.PI)/names.length;
    let a = 0;
    function draw() {
      ctx.clearRect(0,0,sz,sz);
      a += 0.008;
      names.forEach((n,i) => {
        const s = a+i*slice, e = s+slice;
        ctx.beginPath(); ctx.moveTo(cx,cy); ctx.arc(cx,cy,r,s,e); ctx.closePath();
        ctx.fillStyle = colors[i%colors.length]; ctx.fill();
        ctx.strokeStyle='rgba(255,255,255,0.5)'; ctx.lineWidth=1.5; ctx.stroke();
        ctx.save(); ctx.translate(cx,cy); ctx.rotate(s+slice/2);
        ctx.font=`bold 18px sans-serif`; ctx.textAlign='right'; ctx.textBaseline='middle';
        ctx.fillText(n, r*0.75, 0); ctx.restore();
      });
      ctx.beginPath(); ctx.arc(cx,cy,r*0.15,0,2*Math.PI);
      ctx.fillStyle='white'; ctx.fill();
      requestAnimationFrame(draw);
    }
    draw();
  }

  // ─── Init ─────────────────────────────────
  drawHeroWheel();
  drawWheel(0);
  drawFeatureWheel();
  updateCount();

  // Window resize
  window.addEventListener('resize', () => {
    const canvas = document.getElementById('confettiCanvas');
    if (canvas) { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  });

});
