function getOrk(
  scene,
  position = { x: 0, y: 0, z: 1 },
  direction = { x0: 0, y0: 0 }
) {
  const HtmlView = document.createElement("div");
  HtmlView.innerHTML = `<div class="model"></div>`;
  HtmlView.classList.add("unit", "ork");

  HtmlView.style.cssText = `
    width: ${SIZE}px;
    height: ${2 * SIZE}px;
  `;

  scene.appendChild(HtmlView);
  HtmlView.classList.add("wait");
  HtmlView.setAttribute(
    "data-direction",
    getDirectionAttribute(direction.x0, direction.y0)
  );

  HtmlView.setAttribute("data-ork", `${position.x},${position.y}`);
  const unit = {
    id:
      "id" +
      Math.random().toString(36).replace("0.", "") +
      Date.now().toString(36),
    HtmlView,
    ...position,
    ...direction,

    heals: 100,

    isRun: {},
    isRunning: function () {
      return Object.values(this.isRun).some((e) => e);
    },

    hit: function () {
      this.heals -= Math.random() > 0.3 ? 35 : 15;
      if (this.heals <= 0) {
        HtmlView.classList.add("die");

        setTimeout(() => {
          HtmlView.remove();
        }, 1000);
      } else {
        HtmlView.classList.add("hit");
        setTimeout(() => {
          HtmlView.classList.remove("hit");
        }, 1000);
      }
    },

    move: function (x, y, isRun = false) {
      if (this.isRunning() || isRun) {
        if (this.isRun["KeyW"] || this.isRun["KeyS"]) this.y = y;
        if (this.isRun["KeyA"] || this.isRun["KeyD"]) this.x = x;

        const { top, left } = detectPosition(this.x, this.y);
        HtmlView.style.top = `${top}px`;
        HtmlView.style.left = `${left}px`;

        HtmlView.classList.add("move");
      } else if (HtmlView.classList.contains("move")) {
        HtmlView.classList.remove("move");
        HtmlView.classList.add("wait");
      }
    },

    run: function () {},
    attack: async function () {},
    wait: function () {},

    directionOn: function (key) {
      let isStop = !this.isRunning();
      this.isRun[key] = true;

      if (key === "KeyA" && !this.isRun["KeyD"]) {
        this.x0 = -1;
        if (isStop) this.y0 = 0;
      } else if (key === "KeyD" && !this.isRun["KeyA"]) {
        this.x0 = 1;
        if (isStop) this.y0 = 0;
      } else if (key === "KeyW" && !this.isRun["KeyS"]) {
        this.y0 = -1;
        if (isStop) this.x0 = 0;
      } else if (key === "KeyS" && !this.isRun["KeyW"]) {
        this.y0 = 1;
        if (isStop) this.x0 = 0;
      }

      HtmlView.setAttribute(
        "data-direction",
        getDirectionAttribute(this.x0, this.y0)
      );
    },

    directionOff: function (key, all = false) {
      this.isRun[key] = false;

      HtmlView.setAttribute(
        "data-direction",
        getDirectionAttribute(this.x0, this.y0)
      );
    },
  };

  unit.move(position.x, position.y, true);
  HtmlView.classList.remove("move");
  HtmlView.classList.add("wait");

  HtmlView.id = unit.id;

  return unit;
}
