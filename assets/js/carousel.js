// Geser pakai mouse; sentuhan dan navigasi keyboard tetap memakai perilaku native.
export function enablePointerDrag(track) {
  let pointerId = null;
  let startX = 0;
  let startScrollLeft = 0;
  let didDrag = false;
  let suppressClick = false;

  track.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    pointerId = event.pointerId;
    startX = event.clientX;
    startScrollLeft = track.scrollLeft;
    didDrag = false;
    track.classList.add("is-dragging");
    track.setPointerCapture(pointerId);
  });

  track.addEventListener("pointermove", (event) => {
    if (event.pointerId !== pointerId) return;
    const delta = event.clientX - startX;
    if (Math.abs(delta) > 5) didDrag = true;
    if (didDrag) track.scrollLeft = startScrollLeft - delta;
  });

  const stopDragging = () => {
    if (pointerId === null) return;
    track.classList.remove("is-dragging");
    if (didDrag) {
      suppressClick = true;
      window.setTimeout(() => { suppressClick = false; }, 0);
    }
    pointerId = null;
  };

  track.addEventListener("pointerup", stopDragging);
  track.addEventListener("pointercancel", stopDragging);
  track.addEventListener("lostpointercapture", stopDragging);
  track.addEventListener("dragstart", (event) => event.preventDefault());
  track.addEventListener("click", (event) => {
    if (!suppressClick) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClick = false;
  });
}
