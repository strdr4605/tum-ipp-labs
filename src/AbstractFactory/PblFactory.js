import Pbl from "./Pbl";

export default class PblFactory {
  constructor() {}

  create(groupName) {
    return new Pbl(groupName);
  }
}