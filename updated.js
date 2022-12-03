const { interval, take, of, catchError, fromEvent } = rxjs;

const dinoDiv = document.getElementById('dino');
const gridDiv = document.getElementById('grid');

let myDino;

class ModernDino {
  constructor(yLocation, maxYLocation) {
    this.maxYLocation = maxYLocation;
    this.yLocation = yLocation;
  }

  jump() {
    const jumpInterval$ = interval(20);
    jumpInterval$.pipe(catchError((err) => of(err))).subscribe((x) => {
      if (this.yLocation < this.maxYLocation) {
        this.yLocation += 20;
      }
    });
  }

  descend() {
    const descendInterval$ = interval(20);
    descendInterval$.pipe(catchError((err) => of(err))).subscribe((x) => {
      if (this.yLocation >= this.maxYLocation) {
        this.yLocation -= 20;
      }
    });
  }
}

const domLoaded$ = fromEvent(document, 'DOMContentLoaded');
const domObserver = {
  next: domSuccess,
  error: domError,
  complete: domCompleted,
};

domLoaded$.pipe(catchError((err) => of(err))).subscribe(domObserver);

function domSuccess(evtDom) {
  myDino = new ModernDino(600);
}

function domError(error) {
  console.log(error);
}

function domCompleted() {
  console.log('completed.');
}
