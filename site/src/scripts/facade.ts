// Smart facade: ҳақиқий видео фақат босилганда юкланади; бир вақтда фақат биттаси ўйнайди.
document.querySelectorAll<HTMLElement>('.vcard[data-src]').forEach((card) => {
  card.querySelector('.play')?.addEventListener('click', () => {
    document.querySelectorAll('video').forEach((v) => v.pause());
    const v = document.createElement('video');
    v.src = card.dataset.src!;
    v.controls = true;
    v.playsInline = true;
    v.autoplay = true;
    v.addEventListener('play', () => document.querySelectorAll('video').forEach((o) => o !== v && o.pause()));
    card.querySelector('.play')?.remove();
    card.querySelector('p')?.remove();
    card.appendChild(v);
  }, { once: true });
});
