import Pbl from "./Pbl";

let instance = null;

export default class PblFactory {
  constructor() {
    if (!instance) {
      instance = this;
    }

    return instance;
  }

  create(groupName) {
    return new Pbl(groupName);
  }
}