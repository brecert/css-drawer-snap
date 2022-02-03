const dbg = (...args) => {
  console.log(...args);
  return args[0];
};

// This could likely be done with target and hash, but I'll leave it alone for
document.querySelectorAll("nav > .mid").forEach(
  (el) =>
    // even though onpointer events are closer to what I want
    // it will always register as down even wehn going for a drag
    (el.onclick = () =>
      el.scrollIntoView({
        block: "end",
        behavior: "smooth",
      }))
);

window.onload = () => {
  document.querySelector(".mid > div").textContent =
    `mid\n` +
    Array(100)
      .fill(0)
      .map((_, i) => i.toString(10).padStart(3, "0"))
      .join("\n");

  document.querySelector(".mid").scrollIntoView();
};

async function polyfill() {
  console.info('Loading polyfill for ScrollTimeline https://wicg.github.io/scroll-animations/')
  await import("https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js");
  const $bottom = document.getElementById('bottom')
  const $nav = document.getElementById('nav')
  const $lhs = document.getElementById('lhs')
  
  $bottom.animate(
    { bottom: ['var(--height)', 'calc(0px - var(--height))'] },
    {
      duration: 1,
      fill: 'forwards',
      easing: 'linear',
      timeline: new ScrollTimeline({
        timeRange: 1,
        orientation: 'inline',
        source: $nav,
        scrollOffsets: [
          { target: $lhs, edge: "end", threshold: 0 },
          { target: $lhs, edge: "start", threshold: 0 }
        ]
      })
    }
  )
}

if (!CSS.supports("animation-timeline", "initial"))
  polyfill()