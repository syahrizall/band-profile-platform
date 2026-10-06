(function () {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#site-nav");
  const desktopNav = window.matchMedia("(min-width: 1041px)");

  function setMenu(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("is-open", open);
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenu(false);
      });
    });

    document.addEventListener("click", function (event) {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(event.target) || toggle.contains(event.target)) return;
      setMenu(false);
    });

    desktopNav.addEventListener("change", function (event) {
      if (event.matches) setMenu(false);
    });
  }

  const lightbox = document.querySelector("[data-lightbox]");
  const galleryButtons = Array.prototype.slice.call(document.querySelectorAll(".js-gallery"));
  let galleryIndex = 0;
  let galleryTrigger = null;

  function renderGallery() {
    const button = galleryButtons[galleryIndex];
    const image = lightbox.querySelector("img");
    const caption = lightbox.querySelector("figcaption");
    image.src = button.getAttribute("data-src");
    image.alt = button.getAttribute("data-caption") || "";
    caption.textContent = image.alt;
  }

  function openGallery(index, trigger) {
    galleryIndex = index;
    galleryTrigger = trigger;
    renderGallery();
    lightbox.hidden = false;
    lightbox.querySelector("[data-lightbox-close]").focus();
  }

  function closeGallery() {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    if (galleryTrigger) galleryTrigger.focus();
  }

  function stepGallery(direction) {
    galleryIndex = (galleryIndex + direction + galleryButtons.length) % galleryButtons.length;
    renderGallery();
  }

  if (lightbox && galleryButtons.length) {
    galleryButtons.forEach(function (button, index) {
      button.addEventListener("click", function () {
        openGallery(index, button);
      });
    });

    lightbox.querySelector("[data-lightbox-close]").addEventListener("click", closeGallery);
    lightbox.querySelector("[data-lightbox-prev]").addEventListener("click", function () {
      stepGallery(-1);
    });
    lightbox.querySelector("[data-lightbox-next]").addEventListener("click", function () {
      stepGallery(1);
    });

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) closeGallery();
    });
  }

  const modal = document.querySelector("[data-video-modal]");
  const player = modal ? modal.querySelector("video") : null;
  const videoTitle = modal ? modal.querySelector("#video-modal-title") : null;
  const videoExternal = modal ? modal.querySelector("[data-video-external]") : null;
  const videoStatus = modal ? modal.querySelector("[data-video-status]") : null;
  let videoTrigger = null;
  let playToken = 0;
  let clipUrl = null;

  function clipObjectUrl() {
    if (clipUrl) return clipUrl;
    const encoded = String(window.ARUNIKA_CLIP || "").split(",")[1] || "";
    const binary = atob(encoded);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
    clipUrl = URL.createObjectURL(new Blob([bytes], { type: "video/mp4" }));
    return clipUrl;
  }

  function loadClip() {
    if (window.ARUNIKA_CLIP) return Promise.resolve(clipObjectUrl());
    return new Promise(function (resolve, reject) {
      const script = document.createElement("script");
      script.src = "assets/js/clip.js";
      script.onload = function () {
        resolve(clipObjectUrl());
      };
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  function openVideo(trigger) {
    const token = ++playToken;
    videoTrigger = trigger;
    videoTitle.textContent = trigger.getAttribute("data-title") || "Video";
    videoExternal.href = trigger.getAttribute("data-external");
    videoStatus.hidden = false;
    videoStatus.textContent = "Loading video…";
    modal.hidden = false;
    modal.querySelector("[data-video-close]").focus();

    const source = location.protocol === "file:" ? loadClip() : Promise.resolve(trigger.getAttribute("data-src"));

    source.then(function (src) {
      if (token !== playToken || modal.hidden) return;
      const start = function () {
        if (token !== playToken || modal.hidden) return;
        player.play().then(function () {
          videoStatus.hidden = true;
        }).catch(function () {
          videoStatus.textContent = "Press play on the player if it does not start on its own.";
        });
      };
      player.addEventListener("canplay", start, { once: true });
      player.src = src;
      player.load();
      if (player.readyState >= 2) start();
    }).catch(function () {
      if (token !== playToken) return;
      videoStatus.textContent = "The video could not be loaded. Open it on YouTube instead.";
    });
  }

  function closeVideo() {
    if (!modal || modal.hidden) return;
    playToken += 1;
    player.pause();
    player.removeAttribute("src");
    player.load();
    modal.hidden = true;
    if (videoTrigger) videoTrigger.focus();
  }

  if (modal && player) {
    document.querySelectorAll(".js-video").forEach(function (button) {
      button.addEventListener("click", function () {
        openVideo(button);
      });
    });

    modal.querySelector("[data-video-close]").addEventListener("click", closeVideo);
    modal.addEventListener("click", function (event) {
      if (event.target === modal) closeVideo();
    });
    modal.querySelector(".modal-card").addEventListener("click", function (event) {
      event.stopPropagation();
    });
    player.addEventListener("error", function () {
      videoStatus.hidden = false;
    });
  }

  function trapFocus(container, event) {
    const focusable = Array.prototype.slice.call(
      container.querySelectorAll("a, button, video, [tabindex]:not([tabindex='-1'])")
    ).filter(function (element) {
      return !element.disabled && element.getAttribute("hidden") === null && element.offsetParent !== null;
    });

    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  document.addEventListener("keydown", function (event) {
    if (lightbox && !lightbox.hidden) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeGallery();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        stepGallery(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        stepGallery(-1);
      } else if (event.key === "Tab") {
        trapFocus(lightbox, event);
      }
      return;
    }

    if (modal && !modal.hidden) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeVideo();
      } else if (event.key === "Tab") {
        trapFocus(modal, event);
      }
      return;
    }

    if (event.key === "Escape" && toggle && toggle.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      toggle.focus();
    }
  });
})();
