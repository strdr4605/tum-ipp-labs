import NoPbl from "./NoPbl";

let instance = null;

export default class NoPblFactory {
  constructor() {
    if (!instance) {
      instance = this;
    }

    return instance;
  }

  create(groupName) {
    return new NoPbl(groupName);
  }
}