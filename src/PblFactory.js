import AbstractFactory from "./AbstractFactory";
import Pbl from "./Pbl";

export default class PblFactory extends AbstractFactory {
  constructor() {
    super();
  }

  create(groupName) {
    return new Pbl(groupName);
  }
}