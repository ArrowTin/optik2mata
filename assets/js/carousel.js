// Geser pakai mouse; sentuhan dan navigasi keyboard tetap memakai perilaku native.
export function enablePointerDrag(track) {
  let pointerId = null;
  let startX = 0;
  let startScrollLeft = 0;
  let isDragging = false;
  let hasMoved = false;

  track.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    pointerId = event.pointerId;
    startX = event.clientX;
    startScrollLeft = track.scrollLeft;
    isDragging = false;
    hasMoved = false;
  });

  track.addEventListener("pointermove", (event) => {
    if (pointerId === null || event.pointerId !== pointerId) return;
    const delta = event.clientX - startX;
    if (!isDragging && Math.abs(delta) > 6) {
      isDragging = true;
      hasMoved = true;
      track.classList.add("is-dragging");
      try {
        track.setPointerCapture(pointerId);
      } catch (_) {}
    }
    if (isDragging) {
      track.scrollLeft = startScrollLeft - delta;
    }
  });

  const stopDragging = () => {
    if (pointerId === null) return;
    track.classList.remove("is-dragging");
    if (isDragging && pointerId !== null) {
      try {
        track.releasePointerCapture(pointerId);
      } catch (_) {}
    }
    pointerId = null;
    isDragging = false;
    if (hasMoved) {
      window.setTimeout(() => {
        hasMoved = false;
      }, 50);
    }
  };

  track.addEventListener("pointerup", stopDragging);
  track.addEventListener("pointercancel", stopDragging);
  track.addEventListener("lostpointercapture", stopDragging);
  track.addEventListener("dragstart", (event) => event.preventDefault());
  track.addEventListener(
    "click",
    (event) => {
      if (hasMoved) {
        event.preventDefault();
        event.stopPropagation();
        hasMoved = false;
      }
    },
    true
  );
}
