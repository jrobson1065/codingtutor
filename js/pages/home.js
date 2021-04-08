import { logo } from "/js/components/logo-svg.js";

let start,
  start2,
  running = false;

export const home = () => {
  $("main").build(logo);
  $(".svg-logo h1").span();
  $(".svg-logo h3").span();
  const flip = flipLetters.bind(this, $$(".svg-logo span"), 80);
  flip();
  setInterval(flip, 5000);

  $(".svg-logo").on("mouseenter", explode);
  $("main").on("mousemove", resetBursts);
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
  if (running) return;
  else running = !running;
  if ($(".svg-logo").dataset.burst === "false") {
    $(".svg-logo").dataset.burst = "true";

    $$(".rect").each((el) => {
      el.classList.add("overflow-visible");
    }, "pass");

    $$(".rect, .inner").each((el) => {
      el.classList.add("transparent");
    }, "pass");

    window.requestAnimationFrame(burstExplode);

    $$(".burst").each((el, i) => {
      el.classList.add("no-opacity");
    }, "pass");
  }
  running = !running;
};

const resetBursts = () => {
  if (running) return;
  else running = !running;
  if ($(".svg-logo").dataset.burst === "true") {
    const e = window.event;
    if (!$(".svg-logo").contains(e.target)) {
      $$(".burst").each((el) => {
        el.classList.remove("no-opacity");
      }, "pass");

      $$(".rect").each((el) => {
        el.style.transition = "all .6s";
        setTimeout(() => el.classList.remove("transparent"), 600);

        setTimeout(() => {
          el.style.transition = "";
          el.classList.remove("overflow-visible");
        }, 1000);
      }, "pass");

      window.requestAnimationFrame(resetExplode);

      $$(".inner").each((el) => el.classList.remove("transparent"), "pass");
    }
  }
  running = !running;
};

const resetExplode = (timestamp) => {
  if (start === undefined) start = timestamp;
  const elapsed = timestamp - start;

  $$(".burst").each((el) => {
    const value = el.style.transform.split("translate(")[1].split("px")[0];
    el.style.transform =
      el.style.transform.split(" ")[0] +
      "translate(" +
      Math.max(value - 1.5, 0) +
      "px)";
  }, "pass");

  if (elapsed < 1500) {
    window.requestAnimationFrame(resetExplode);
  } else {
    start = undefined;
    $$(".burst").each((el) => {
      el.remove();
    }, "pass");
    $(".svg-logo").dataset.burst = "false";
    createParticles();
  }
};

const burstExplode = (timestamp) => {
  if (start2 === undefined) start2 = timestamp;
  const elapsed = timestamp - start2;

  $$(".burst").each((el, i) => {
    el.style.transform += " translate(" + (1 + (i % 10) * 5) + "px";
  }, "pass");

  if (elapsed < 1000) {
    window.requestAnimationFrame(burstExplode);
  } else start = undefined;
};
