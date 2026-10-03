/* 页脚年份：自动更新，不用每年手动改 */
const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());

/* 复制邮箱 */
const copyButton = document.getElementById('copy');
if (copyButton) {
  const email = document.getElementById('email');
  const status = document.getElementById('copy-status');
  const idleText = status ? status.textContent : '';

  copyButton.addEventListener('click', async () => {
    const value = email?.textContent?.trim();
    if (!value) return;

    let copied = true;
    try {
      await navigator.clipboard.writeText(value);
      if (status) status.textContent = '已复制，去写信吧。';
    } catch {
      copied = false;
      const range = document.createRange();
      range.selectNodeContents(email);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      if (status) status.textContent = '已选中，按 ⌘C / Ctrl+C 复制。';
    }

    copyButton.textContent = copied ? '已复制' : '已选中';
    window.setTimeout(() => {
      copyButton.textContent = '复制';
      if (status) status.textContent = idleText;
    }, 2200);
  });
}

/* 滚动入场 + 分数计数
   贴纸和索引条目进入视口时才播放，只播一次。
   用户开了「减少动态」或浏览器不支持 IntersectionObserver 时什么都不做，内容保持原样可见。 */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function countUp(score, delay) {
  const node = score.firstChild;
  const target = Number.parseInt(node?.nodeValue, 10);
  if (node?.nodeType !== Node.TEXT_NODE || Number.isNaN(target)) return;

  const duration = 800;
  node.nodeValue = '0';
  window.setTimeout(() => {
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      node.nodeValue = String(Math.round(target * eased));
      if (t < 1) requestAnimationFrame(tick);
      else node.nodeValue = String(target);
    };
    requestAnimationFrame(tick);
  }, delay);
}

if (!reduceMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ isIntersecting, target }) => {
      if (!isIntersecting) return;
      target.classList.add('is-in');
      observer.unobserve(target);
      const score = target.querySelector('.score');
      if (score) countUp(score, 3 * 80);
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('.stickers, .entry').forEach((group) => {
    [...group.children].forEach((child, i) => child.style.setProperty('--i', i));
    group.classList.add('reveal');
    observer.observe(group);
  });
}
