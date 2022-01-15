let RUN = true;

let gameTick = 0;

let userX0 = USER.x0;
let userY0 = USER.y0;

async function main() {
  function game() {
    gameTick++;
    // USER.move();
    // USER.x
    if (
      gameTick % (ANIMATION_SPEED / GAME_CYCLE) === 0 ||
      userX0 !== USER.x0 ||
      userY0 !== USER.y0
    ) {
      let x = USER.x + USER.x0;
      let y = USER.y + USER.y0;

      try {
        const index = SCENE_MODEL.earthMap[`${x} ${y}`];
        if (SCENE_MODEL.earth[index].lvl !== 1) {
          throw "";
        }
      } catch (e) {
        x = USER.x;
        y = USER.y;
      }

      userX0 = USER.x0;
      userY0 = USER.y0;
      

      if (ENEMIES.every((e) => e.x !== x || e.y !== y)) {
        USER.move(x, y);
        mainCamera(
          SCENE_MODEL.width / 4 - USER.x * SIZE,
          SCENE_MODEL.height - USER.y * SIZE
        );

        let xLightStart = 0;
        let xLightEnd = 0;
        let yLightStart = 0;
        let yLightEnd = 0;

        if (userX0 == -1) {
          xLightStart = USER.x - 2 + userX0;
          xLightEnd = USER.x + 2;
        } else if (userX0 == 1) {
          xLightStart = USER.x - 2;
          xLightEnd = USER.x + 2 + userX0;
        } else {
          xLightStart = USER.x - 2;
          xLightEnd = USER.x + 2;
        }


        if (userY0 == -1) {
          yLightStart = USER.y - 2 + userY0;
          yLightEnd = USER.y + 2;
        } else if (userY0 == 1) {
          yLightStart = USER.y - 2;
          yLightEnd = USER.y + 2 + userY0;
        } else {
          yLightStart = USER.y - 2;
          yLightEnd = USER.y + 2;
        }
        document.querySelectorAll('.xxx').forEach((e)=>{
          e.style.removeProperty('background-blend-mode');
          e.classList.remove('xxx');
          const bigBoxes = e.querySelectorAll('.side');
          const smallBoxes = e.querySelectorAll('.small_side');
          if (e.getAttribute('data-lvl') == 2 || e.getAttribute('data-lvl') == 3) {
            bigBoxes.forEach((e) => { e.classList.add('fog') });
            smallBoxes.forEach((e) => { e.classList.add('fog') });

          }
        })
        document.querySelectorAll('.ork').forEach((e)=>{
          e.classList.add('none-display');
        })




        for (let i = xLightStart; i <= xLightEnd; i++) {
          if (i >= 0 && i <= SCENE_MODEL.allColumns) {

            for (let j = yLightStart; j <= yLightEnd; j++) {
              if (j >= 0 && j <= SCENE_MODEL.allRows) {
                const userPositionLight = document.querySelector(`#block${i}-${j}`);
                const fog = userPositionLight.querySelectorAll('.fog');

                const orkPosition = document.querySelector(`[data-ork="${i},${j}"`);

                if (orkPosition){
                  orkPosition.classList.remove('none-display');
                }


                userPositionLight.classList.add('xxx');
                userPositionLight.style.backgroundBlendMode = 'unset';
                
                
                
                if (userPositionLight.getAttribute('data-lvl') == 2 || userPositionLight.getAttribute('data-lvl') == 3) {
                  fog.forEach((e) => { e.classList.remove('fog') });
                }

                // if(i == ENEMIES.x && j == )
              }

            }
          }
        }




        //расчитываем координаты и обновляем классы блоков вокруг
        // если юзер за блоком делаем полупрозрачность и скрываем всё что дальше

        // по направлению 
      }
    }

    return sleep(GAME_CYCLE);
  }

  while (RUN) {
    await game();
  }
}

main();
