const USER = getSpaceMarine(SCENE);

mainCamera(
  SCENE_MODEL.width / 4 + (USER.x * SIZE) / -1.5,
  SCENE_MODEL.height - USER.y * SIZE
);

//добавить управление стрелками

window.addEventListener("keydown", (e) => {
  USER.directionOn(e.code);
});

window.addEventListener("keyup", (e) => {
  USER.directionOff(e.code);
});

window.addEventListener("mouseout", () => {
  USER.directionOff(null, true);
});

SCENE.addEventListener("click", (e) => {
  let element = e.target;
  if (element.classList.contains("model")) {
    element = element.parentElement;
  }

  if (element.classList.contains("ork")) {
    const ork = ENEMIES.find((e) => e.id === element.id);
    ork.hit();
    element = window[`block${ork.x}-${ork.y}`];
  }

  if (element.classList.contains("block")) {
    const index = element.getAttribute("data-index");
    const { column, row } = SCENE_MODEL.earth[index];
    const { x: userColum, y: userRow } = USER;

    let key0 = "";
    if (column > userColum) {
      key0 = "KeyD";
    } else if (column < userColum) {
      key0 = "KeyA";
    }

    let key1 = "";
    if (row < userRow) {
      key1 = "KeyW";
    } else if (row > userRow) {
      key1 = "KeyS";
    }

    USER.attack(key0, key1);
  }
});
