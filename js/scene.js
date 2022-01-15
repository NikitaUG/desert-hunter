const SCENE = document.querySelector(".scene > .earth");

const SCENE_MODEL = {
  earth: [],
  earthMap: {},
  width: 0,
  height: 0,
};

const { width, height } = SCENE.getBoundingClientRect();

const SCENE_WIDTH = width - (width % SIZE);
const SCENE_HEIGHT = height - (height % SIZE);

SCENE.style.width = `${SCENE_WIDTH}px`;
SCENE.style.height = `${SCENE_HEIGHT}px`;

const rows = (1 * SCENE_HEIGHT) / SIZE;
const columns = (1 * SCENE_WIDTH) / SIZE;

SCENE_MODEL.width = SCENE_WIDTH;
SCENE_MODEL.height = SCENE_HEIGHT;
SCENE_MODEL.allRows = rows;
SCENE_MODEL.allColumns = columns;

for (let row = 0; row < rows; row++) {
  for (let column = 0; column < columns; column++) {
    let r = Math.random();
    SCENE_MODEL.earthMap[`${column} ${row}`] = SCENE_MODEL.earth.length;
    SCENE_MODEL.earth.push({
      width: SIZE,
      height: SIZE,
      id: `block${column}-${row}`,
      row,
      column,
      lvl: row === column ? 1 : r < 0.1 ? 0 : r < 0.9 ? 1 : r < 0.95 ? 2 : 3,
    });
  }
}


function generateWorld() {
  let html = "";
  SCENE_MODEL.earth.forEach((e, i) => {
    if (e.lvl === 3){
      html += `<div id="${e.id}" data-index="${i}" class="block" style="height: ${SIZE}px; width: ${SIZE}px" data-lvl="${e.lvl}">
      <div class="big_box">
        <div class="back side fog"></div>
        <div class="left side fog"></div>
        <div class="right side fog"></div>
        <div class="top side fog"></div>
        <div class="bottom side fog"></div>
        <div class="front side fog"></div>
      </div>
      </div>`;
    } else if (e.lvl === 2){
      html += `<div id="${e.id}" data-index="${i}" class="block" style="height: ${SIZE}px; width: ${SIZE}px" data-lvl="${e.lvl}">
      <div class="small_box">
        <div class="small_back small_side fog"></div>
        <div class="small_left small_side fog"></div>
        <div class="small_right small_side fog"></div>
        <div class="small_top small_side fog"></div>
        <div class="small_bottom small_side fog"></div>
        <div class="small_front small_side fog"></div>
      </div>
      </div>`
    }
    else{
      html += `<div id="${e.id}" data-index="${i}" class="block" style="height: ${SIZE}px; width: ${SIZE}px" data-lvl="${e.lvl}"></div>`;
    }
    
    
  });

  SCENE.innerHTML = html;
  SCENE.classList.add("earth-3d");
}

generateWorld();




