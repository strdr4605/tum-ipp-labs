import DecoratedPbl from "../StructuralPatterns/DecorantedPbl";

export default class ObserverDecoratedPbl extends DecoratedPbl {
  constructor(pbl, moderator) {
    super(pbl, moderator);
    this.handlers = [];
  }

  subscribe(fn) {
    this.handlers.push(fn);
  }

  unsubscribe(fn) {
    this.handlers = this.handlers.filter(item => item !== fn);
  }

  fire(command, thisObj) {
    this.handlers.forEach(item => {
      item.call(thisObj, super.execute(command));
    });
  }

}