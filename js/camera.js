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
  if (e.code === "KeyM"){
    document.querySelectorAll('.ork').forEach((e)=>{
      e.classList.remove('none-display');
    })
    const allMap = document.querySelector('.earth-3d');
    CAMERA_ALL.innerHTML = `
    .earth-3d {
      transform: translate(-67px, -31px) scale(1.1)!important;
    }`
    document.querySelector('.scene').style.boxShadow = 'none';
    document.querySelectorAll('.left-panel, .top-panel, .right-panel, .bottom-panel').forEach((e)=>{
      e.style.opacity = '0';
    })

    }
});

window.addEventListener('keyup', (e)=>{
  if (e.code === "KeyM"){
    document.querySelectorAll('.ork').forEach((e)=>{
      e.classList.add('none-display');
    })
    CAMERA_ALL.innerHTML = '';
    document.querySelector('.scene').style.boxShadow = 'inset 10px 10px 50px rgba(59, 59, 59, 0.5)';
    document.querySelectorAll('.left-panel, .top-panel, .right-panel, .bottom-panel').forEach((e)=>{
      e.style.opacity = '1';
    })
    }
})



