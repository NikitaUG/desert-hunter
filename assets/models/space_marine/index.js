function getSpaceMarine(
  scene,
  position = { x: 0, y: 0, z: 1 },
  direction = { x0: 0, y0: 0 }
) {
  const HtmlView = document.createElement("div");
  HtmlView.innerHTML = '<div class="model"></div>';
  HtmlView.classList.add("unit");

  HtmlView.style.cssText = `
    width: 75px;
    height: 150px;
  `;

  scene.appendChild(HtmlView);
  HtmlView.classList.add("wait", "space-marine");
  HtmlView.setAttribute(
    "data-direction",
    getDirectionAttribute(direction.x0, direction.y0)
  );

  const unit = {
    HtmlView,
    ...position,
    ...direction,

    isRun: {},
    isRunning: function () {
      return Object.values(this.isRun).some((e) => e);
    },

    move: function (x, y, isRun = false) {
      if (this.isRunning() || isRun) {
        if (this.isRun["KeyW"] || this.isRun["KeyS"] || this.isRun["ArrowUp"] || this.isRun["ArrowDown"]) this.y = y;
        if (this.isRun["KeyA"] || this.isRun["KeyD"] || this.isRun["Arrowleft"] || this.isRun["ArrowRight"]) this.x = x;

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

    isAttack: false,
    attackId: null,
    attack: async function (key0, key1) {
      if (this.isRunning()) {
        this.isAttack = false;
        HtmlView.classList.remove("attack");
      } else {
        this.attackDirection(key0, key1);
        clearTimeout(this.attackId);
        this.isAttack = true;
        HtmlView.classList.add("attack");

        this.attackId = setTimeout(() => {
          this.isAttack = false;
          HtmlView.classList.remove("attack");
        }, 1350);
      }
    },

    attackDirection: function (key0, key1) {
      if (key0 === "KeyA") this.x0 = -1;
      else if (key0 === "KeyD") this.x0 = 1;
      else this.x0 = 0;

      if (key1 === "KeyW") this.y0 = -1;
      else if (key1 === "KeyS") this.y0 = 1;
      else this.y0 = 0;

      HtmlView.setAttribute(
        "data-direction",
        getDirectionAttribute(this.x0, this.y0)
      );
    },

    wait: function () {},

    directionOn: function (key) {
      let isStop = !this.isRunning();
      this.isRun[key] = true;

      if ((key === "KeyA" && !this.isRun["KeyD"]) || (key === "ArrowLeft" && !this.isRun["ArrowRight"])) {
        this.x0 = -1;
        if (isStop) this.y0 = 0;
      } else if ((key === "KeyD" && !this.isRun["KeyA"]) || (key === "ArrowRight" && !this.isRun["ArrowLeft"])) {
        this.x0 = 1;
        if (isStop) this.y0 = 0;
      } else if ((key === "KeyW" && !this.isRun["KeyS"]) || (key === "ArrowUp" && !this.isRun["ArrowDown"])) {
        this.y0 = -1;
        if (isStop) this.x0 = 0;
      } else if ((key === "KeyS" && !this.isRun["KeyW"]) || (key === "ArrowDown" && !this.isRun["ArrowUp"])) {
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

  return unit;
}
