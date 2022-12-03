const { interval, take, of, catchError, fromEvent } = rxjs;

class ModernDino {
  constructor(jumpHeight) {
    this.jumpHeight = jumpHeight;
  }

  jump() {}
}

const domLoaded$ = fromEvent(document, 'DOMContentLoaded');

domLoaded$.subscribe((evtDom) => {
  const myNumber$ = interval(1000);
  myNumber$
    .pipe(
      take(10),
      catchError((error) => of(error))
    )
    .subscribe(console.log);
});
