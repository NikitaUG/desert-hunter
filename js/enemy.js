const ENEMIES = [];

const positions = [];
for (let i = 10; i--; ) {
  let p = Math.ceil(Math.random() * SCENE_MODEL.earth.length);
  if (!positions.includes(p)) {
    positions.push(p);

    ENEMIES.push(
      getOrk(
        SCENE,
        {
          x: SCENE_MODEL.earth[p].column,
          y: SCENE_MODEL.earth[p].row,
          z: 0,
        },
        randomDirection()
      )
    );
  }
}
function randomDirection() {
  const l = Math.random();

  let y0 = 0;
  const x0 = l < 0.3 ? 1 : l < 0.6 ? -1 : 0;

  if (!x0) {
    const r = Math.random();
    y0 = r < 0.3 ? 1 : r < 0.6 ? -1 : 0;
  }

  return {
    x0,
    y0,
  };
}
