// Click-triggered color pulse-wave that sweeps through the .hero text only.
// A radial color band expands from the pointer, clipped to the glyphs via the
// element's background-clip:text; multiple clicks stack as separate layers.
//
// The wave also carries ACROSS navigation: clicking an internal link stashes the
// pointer position + time, and the destination page resumes the wave from there,
// offset by the elapsed load time so it looks like one continuous ripple.
(function () {
  var hero = document.querySelector('.hero');
  if (!hero) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var waves = [];
  var raf = null;
  var DUR = 1300;  // wave lifetime, ms
  var BW = 150;    // band half-width, px (the feather on each side of the crest)
  var BASE = 'linear-gradient(#6c706c, #6c706c)';  // resting gray, always the bottom layer

  // Spawn a wave from a viewport point. `elapsed` (ms) starts it partway through
  // its life, so a wave handed off by the previous page resumes mid-flight.
  function spawn(clientX, clientY, elapsed) {
    var rect = hero.getBoundingClientRect();
    var x = clientX - rect.left;
    var y = clientY - rect.top;
    // Reach = distance to the farthest corner, so the crest fully clears the
    // text no matter where the origin lands (even outside it, e.g. the sidebar).
    var corners = [[0, 0], [rect.width, 0], [0, rect.height], [rect.width, rect.height]];
    var max = 0;
    for (var i = 0; i < corners.length; i++) {
      var d = Math.hypot(corners[i][0] - x, corners[i][1] - y);
      if (d > max) max = d;
    }
    waves.push({ x: x, y: y, t0: performance.now() - (elapsed || 0), reach: max });
    if (!raf) raf = requestAnimationFrame(frame);
  }

  function frame(now) {
    var layers = [];
    for (var i = waves.length - 1; i >= 0; i--) {
      var w = waves[i];
      var p = (now - w.t0) / DUR;
      if (p >= 1) { waves.splice(i, 1); continue; }
      if (p < 0) { raf = requestAnimationFrame(frame); return; }  // handed-off wave not yet due
      var r = p * (w.reach + BW * 2);        // crest radius travels outward
      var fade = 1 - p * p * p;               // near-full most of the way, quick clear at the end
      var a1 = fade.toFixed(3);               // halo alpha
      var a2 = fade.toFixed(3);               // core alpha
      var cx = w.x.toFixed(1), cy = w.y.toFixed(1);
      // Band is its own gradient: #583c48 halo -> #443444 core -> #583c48 halo.
      // Opaque over the transparent glyph fill, so it fully replaces the gray as
      // it passes -> color and motion through the letters.
      layers.push(
        'radial-gradient(circle at ' + cx + 'px ' + cy + 'px,' +
        ' transparent ' + Math.max(0, r - BW).toFixed(1) + 'px,' +
        ' rgba(88,60,72,' + a1 + ') ' + Math.max(0, r - BW * 0.5).toFixed(1) + 'px,' +
        ' rgba(68,52,68,' + a2 + ') ' + r.toFixed(1) + 'px,' +
        ' rgba(88,60,72,' + a1 + ') ' + (r + BW * 0.5).toFixed(1) + 'px,' +
        ' transparent ' + (r + BW).toFixed(1) + 'px)'
      );
    }
    layers.push(BASE);   // resting gray underneath every wave
    hero.style.backgroundImage = layers.join(',');
    raf = waves.length ? requestAnimationFrame(frame) : null;
  }

  // Live clicks on this page.
  window.addEventListener('pointerdown', function (e) {
    spawn(e.clientX, e.clientY, 0);
  });

  // Hand the wave off across an internal, same-tab navigation: stash the click
  // point + time so the destination page can resume it. Capture phase, so it runs
  // before the browser follows the link.
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    if (a.target && a.target !== '_self') return;      // new-tab/window links opt out
    var url;
    try { url = new URL(a.href, location.href); } catch (_) { return; }
    if (url.origin !== location.origin) return;        // internal only
    var cx = e.clientX, cy = e.clientY;
    if (!cx && !cy) {                                  // keyboard activation -> link center
      var r = a.getBoundingClientRect();
      cx = r.left + r.width / 2;
      cy = r.top + r.height / 2;
    }
    try {
      sessionStorage.setItem('wave', cx.toFixed(1) + ',' + cy.toFixed(1) + ',' + Date.now());
    } catch (_) {}
  }, true);

  // Resume a wave handed off by the previous page (fires once, then clears).
  try {
    var s = sessionStorage.getItem('wave');
    if (s) {
      sessionStorage.removeItem('wave');
      var parts = s.split(',');
      var elapsed = Date.now() - parseFloat(parts[2]);
      if (elapsed >= 0 && elapsed < DUR) {
        spawn(parseFloat(parts[0]), parseFloat(parts[1]), elapsed);
      }
    }
  } catch (_) {}
})();
