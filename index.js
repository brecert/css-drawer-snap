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
