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
      console.log('userX0, userY0',userX0, userY0)

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
        } else if(userX0 == 1){
          xLightStart = USER.x - 2 ;
          xLightEnd = USER.x + 2 + userX0;
        } else {
          xLightStart = USER.x - 2 ;
          xLightEnd = USER.x + 2;
        }


        if (userY0 == -1) {
          yLightStart = USER.y - 2 + userY0;
          yLightEnd = USER.y + 2;
        } else if(userY0 == 1){
          yLightStart = USER.y - 2 ;
          yLightEnd = USER.y + 2 + userY0;
        } else {
          yLightStart = USER.y - 2 ;
          yLightEnd = USER.y + 2;
        }


        for (let i = xLightStart; i <= xLightEnd; i++) {
          if (i >= 0) {
            for (let j = yLightStart; j <= yLightEnd; j++) {
              if (j >= 0) {

                const userPositionLight = document.querySelector(`#block${i}-${j}`);
                userPositionLight.style.backgroundBlendMode = 'unset';
                if (userX0 == -1){
                  if (userY0 = -1){
                    fogOfWar (i,j, USER.x + 2, USER.y + 2, userPositionLight);
                  } else if (userY0 = 0){
                    fogOfWar (i,j, USER.x + 2, USER.y + 2, userPositionLight);
                  }

                } else if (userX0 == 0){

                } 
                else {

                }

                

              }

            }
          }
        }




        //расчитываем координаты и обновляем классы блоков вокруг
        // если юзер за блоком делаем полупрозрачность и скрываем всё что дальше

        // по направлению 

        // const smallBox = document.querySelectorAll('[data-lvl=3] > .fog');
                    // console.log(smallBox);
                    // const style = document.querySelector(`.small_side`).style;
                    // style.setProperty('--background-color', 'rgba(0,0,0,.0)');
                    // console.log(userPositionLight.style);
                    // userPositionLight.style.setProperty('--background-color', 'rgba(0,0,0,.0);');
      }
    }

    return sleep(GAME_CYCLE);
  }

  while (RUN) {
    await game();
  }
}

main();



function fogOfWar (i,j, ifI, ifJ, value){
  if (i >= ifI || j >= ifJ) {
    value.style.removeProperty('background-blend-mode');
  
    if (value.getAttribute('data-lvl') == 2 || value.getAttribute('data-lvl') == 3) {
      
      value.classList.toggle('fog');
    }
  } else {
    value.style.backgroundBlendMode = 'unset';
  
    if (value.getAttribute('data-lvl') == 2 || value.getAttribute('data-lvl') == 3) {
      
      value.classList.toggle('fog');
      
    }
  }
}

