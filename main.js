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
let isJumpingAlready = false;

document.addEventListener('DOMContentLoaded', (event) => {
  const jack = new Dino(300);

  document.addEventListener('keyup', (evt) => {
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
            }, 10);
          }
        }, 5);
      }
    }
  });
});
