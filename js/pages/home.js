import { logo } from "/js/components/logo-svg.js";

let running = false;

export const home = () => {
  $("main").build(logo);
  $(".svg-logo h1").span();
  $(".svg-logo h3").span();
  const flip = flipLetters.bind(this, $$(".svg-logo span"), 80);
  flip();
  setInterval(flip, 5000);

  $(".svg-logo").on("mouseenter", explode);
  createParticles();
};

const createParticles = () => {
  $$(".green > *, .blue > *").each((el) => {
    const paths = [
      "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
      "polygon(9% 0, 0% 100%, 100% 100%)",
      "polygon(9% 0, 0% 100%, 100% 100%)",
    ];

    for (let i = 0; i < 100; i++) {
      const div = document.createElement("div");
      div.className = "burst";
      div.style.width = randBetween(5, 8) + "px";
      div.style.height = randBetween(5, 8) + "px";
      div.style.top = randBetween(0, 90) + "%";
      div.style.left = randBetween(0, 90) + "%";
      div.style.clipPath = randChoice(paths);
      div.style.transform = "rotate(" + randBetween(0, 360) + "deg)";
      el.append(div);
    }
  }, "pass");
};

const explode = () => {
  if (!running) {
    running = !running;
    if ($(".svg-logo").dataset.burst === "false") {
      $(".svg-logo").dataset.burst = "true";

      $$(".rect").each((el) => {
        el.style.overflow = "visible";
      }, "pass");

      $$(".rect, .inner").each((el) => {
        el.classList.add("transparent");
      }, "pass");

      $$(".burst").each((el) => {
        el.style.opacity = 1;
      }, "pass");

      burstExplode();
    }
  }
};

const burstExplode = () => {
  let opacity = 1,
    startBurst,
    startFade,
    trans;

  const burst = (timestamp) => {
    if (startBurst === undefined) startBurst = timestamp;
    const elapsed = timestamp - startBurst;

    $$(".burst").each((el) => {
      const rotate = el.style.transform.split("rotate(")[1].split(")")[0];
      if (el.style.transform.split(" ").length <= 1) trans = 0;
      else trans = +el.style.transform.split("translate(")[1].split("px")[0];
      trans += Math.round(randDec(0, 4) * 100) / 100;
      el.style.transform = "rotate(" + rotate + ") translate(" + trans + "px)";
    }, "pass");

    if (elapsed < 1000) requestAnimationFrame(burst);
    else {
      startBurst = undefined;
    }
  };

  const fadeOut = (timestamp) => {
    if (startFade === undefined) startFade = timestamp;
    const elapsed = timestamp - startFade;

    $$(".burst").each((el) => {
      opacity = +el.style.opacity;
      if (opacity > 0) {
        el.style.opacity = opacity - randBetween(0.02, 0.06);
      } else el.style.opacity = 0;
    }, "pass");

    if (elapsed < 1000) requestAnimationFrame(fadeOut);
    else {
      startFade = undefined;
      $(".svg-logo").dataset.burst = "true";
      $(".svg-logo").removeEventListener("mouseenter", explode);
      setTimeout(() => {
        $("main").on("mousemove", resetBursts);
        running = !running;
      }, 500);
    }
  };

  window.requestAnimationFrame(burst);
  window.requestAnimationFrame(fadeOut);
};

const resetBursts = () => {
  if (
    $(".svg-logo").dataset.burst === "true" &&
    !$(".svg-logo").contains(window.event.target)
  ) {
    $$(".burst").each((el) => {
      el.style.opacity = 1;
    }, "pass");

    resetExplode();

    $$(".inner").each((el) => el.classList.remove("transparent"), "pass");
  }
};

const resetExplode = () => {
  let startReset,
    startShow,
    startFade,
    trans,
    scale = 1,
    opacity = 1;

  const showRects = (time) => {
    if (startShow === undefined) startShow = time;
    const elapsed = time - startShow;

    $$(".rect").each((el) => {
      if (elapsed < 1) el.style.transition = "all 0.6s ease";
      else if (elapsed >= 250 && elapsed <= 270)
        el.classList.remove("transparent");
      else if (elapsed >= 600 && elapsed <= 620) {
        el.style.transition = "";
        el.style.overflow = "";
      }
    }, "pass");

    if (elapsed < 1100) {
      window.requestAnimationFrame(showRects);
    } else startShow = undefined;
  };

  const resetParticles = (time) => {
    if (startReset === undefined) startReset = time;
    const elapsed = time - startReset;
    if (elapsed > 500) scale -= 0.05;

    $$(".burst").each((el) => {
      const rotate = el.style.transform.split("rotate(")[1].split(")");
      if (rotate.length > 1)
        trans = +el.style.transform.split("translate(")[1].split("px")[0];
      else trans = 0;
      if (trans > 0) {
        trans -= Math.max(Math.round(randDec(1, 2) * 100) / 100, 0);
        el.style.transform =
          "rotate(" +
          rotate[0] +
          ") translate(" +
          trans +
          "px) scale(" +
          scale +
          ")";
      }
    }, "pass");

    if (elapsed < 1000) {
      window.requestAnimationFrame(resetParticles);
    } else {
      startReset = undefined;
      $$(".burst").each((el) => {
        el.remove();
      }, "pass");
      createParticles();
    }
  };

  const fadeOut = (timestamp) => {
    if (startFade === undefined) startFade = timestamp;
    const elapsed = timestamp - startFade;

    $$(".burst").each((el) => {
      if (elapsed > 450) {
        opacity = +el.style.opacity;
        el.style.opacity = opacity - 0.02;
      }
    }, "pass");

    if (elapsed < 1200) requestAnimationFrame(fadeOut);
    else {
      startFade = undefined;
      $(".svg-logo").dataset.burst = "false";
      $("main").removeEventListener("mousemove", resetBursts);

      setTimeout(() => {
        $(".svg-logo").on("mouseenter", explode);
      }, 400);
    }
  };

  window.requestAnimationFrame(showRects);
  window.requestAnimationFrame(fadeOut);
  window.requestAnimationFrame(resetParticles);
};
