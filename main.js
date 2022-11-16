class Dino {
  constructor(maxJumpHeight, currentHeight = 0) {
    this.maxJumpHeight = maxJumpHeight;
    this.currentHeight = currentHeight;
  }

  jump() {
    this.currentHeight += 20;
  }

  descend() {
    this.currentHeight -= 20;
  }
}

const dinoDiv = document.getElementById('dino');
const grid = document.getElementById('grid');
let isJumpingAlready = false;

document.addEventListener('DOMContentLoaded', (event) => {
  const jack = new Dino(400);

  // listen for jump events
  document.addEventListener('keydown', (evt) => {
    evt.preventDefault();
    if (evt.key === ' ') {
      if (!isJumpingAlready) {
        isJumpingAlready = true;
        let jumpInterval, descendInterval;

        jumpInterval = setInterval(() => {
          if (jack.currentHeight < jack.maxJumpHeight) {
            jack.jump();
            dinoDiv.style.bottom = jack.currentHeight + 'px';
          } else {
            clearInterval(jumpInterval);

            descendInterval = setInterval(() => {
              if (jack.currentHeight !== 0) {
                jack.descend();
                dinoDiv.style.bottom = jack.currentHeight + 'px';
              } else {
                clearInterval(descendInterval);

                isJumpingAlready = false;
              }
            }, 12);
          }
        }, 8);
      }
    }
  });

  // create obstacles
  const obstacle = document.createElement('div');
  obstacle.classList.add('obstacle');
  grid.appendChild(obstacle);

  let rightMargin = 0;
  const obstacleInterval = setInterval(() => {
    rightMargin += 10;
    obstacle.style.right = rightMargin + 'px';
  }, 30);
});
