let CAMERA_X = 0;
let CAMERA_Y = 0;
let CAMERA_OVERVIEW = 0;

let lastClientX = 0;

mainCamera();

function mainCamera(x = CAMERA_X, y = CAMERA_Y, v = CAMERA_OVERVIEW) {
  const html = `
  .earth-3d {
    transform: perspective(${
      2 * window.innerHeight
    }px) rotateX(65deg) rotateZ(${v}deg) translate(${x}px, ${y}px) scale(1.1);
  }`

  if(SCENE_CAMERA.innerHTML !== html) {
    SCENE_CAMERA.innerHTML = html;
  }
}

window.addEventListener("keydown", (e) => {
  if (e.altKey) {
    if (e.code === "KeyW" || e.code === "ArrowUp") {
      CAMERA_Y += CAMERA_STEP;
    } else if (e.code === "KeyS" || e.code === "ArrowDown") {
      CAMERA_Y -= CAMERA_STEP;
    }

    if (e.code === "KeyA" || e.code === "ArrowLeft") {
      CAMERA_X += CAMERA_STEP;
    } else if (e.code === "KeyD" || e.code === "ArrowRight") {
      CAMERA_X -= CAMERA_STEP;
    }

    mainCamera();
  }
});
