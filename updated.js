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
    const jumpInterval$ = interval(20);
    const descendInterval$ = interval(20);
    jumpInterval$
      .pipe(
        map((integer) => {
          this.yLocation += integer * 20;
          element.style.bottom = `${this.yLocation}px`;
          console.log(this.yLocation);
        }),
        takeWhile(() => this.yLocation < this.maxYLocation),
        concatWith(
          descendInterval$.pipe(
            map((integer) => {
              this.yLocation -= integer * 20;
              element.style.bottom = `${this.yLocation}px`;
            }),
            takeWhile(() => this.yLocation > 0)
          )
        ),
        catchError((err) => of(err))
      )
      .subscribe(console.log);
  }

  descend(element) {
    if (!element) {
      console.log('no element in descend();');
      return;
    }
    const descendInterval$ = interval(20);
    descendInterval$.pipe(catchError((err) => of(err))).subscribe((x) => {
      if (this.yLocation >= this.maxYLocation) {
        this.yLocation -= 20;
        this.yLocation += 20;
        element.style.bottom = `${this.yLocation}px`;
      }
    });
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
  myDino = new ModernDino(0, 200);
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
