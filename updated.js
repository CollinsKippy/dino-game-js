const {
  interval,
  take,
  of,
  takeWhile,
  catchError,
  map,
  fromEvent,
  concatWith,
} = rxjs;

const dinoDiv = document.getElementById('dino');
const gridDiv = document.getElementById('grid');

let myDino;
const duration = 20;
const increment = 3;

class ModernDino {
  constructor(yLocation, maxYLocation) {
    this.maxYLocation = maxYLocation;
    this.yLocation = yLocation;
  }

  jump(element) {
    if (!element) {
      console.log('no element in jump();');
      return;
    }
    const jumpInterval$ = interval(duration);
    const descendInterval$ = interval(duration);
    jumpInterval$
      .pipe(
        map((integer) => {
          this.yLocation += increment;
          element.style.bottom = `${this.yLocation}rem`;
          console.log(this.yLocation);
        }),
        takeWhile(() => this.yLocation < this.maxYLocation),
        concatWith(
          descendInterval$.pipe(
            map((integer) => {
              this.yLocation -= increment;
              element.style.bottom = `${this.yLocation}rem`;
            }),
            takeWhile(() => this.yLocation > 0)
          )
        ),
        catchError((err) => of(err))
      )
      .subscribe(console.log);
  }
}

// DOM CONTENT LOADED
const domLoads$ = fromEvent(document, 'DOMContentLoaded');
const domObserver = {
  next: domSuccess,
  error: domError,
  complete: domCompleted,
};

domLoads$.pipe(catchError((err) => of(err))).subscribe(domObserver);

function domSuccess(domEvent) {
  myDino = new ModernDino(0, 20);
}

function domError(error) {
  console.log(error);
}

function domCompleted() {
  console.log('completed.');
}

// SPACEBAR CLICKED
const keyboardClicks$ = fromEvent(document, 'keyup');
keyboardClicks$.pipe(catchError((e) => of(e))).subscribe((event) => {
  if (event.key === ' ') {
    if (myDino) {
      myDino.jump(dinoDiv);
    } else {
      console.log('no dino 😪');
    }
  }
});
