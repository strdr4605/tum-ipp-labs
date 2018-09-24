import AbstractFactory from "./AbstractFactory";
import NoPbl from "./NoPbl";

export default class NoPblFactory extends AbstractFactory {
  constructor() {
    super();
  }

  create(groupName) {
    return new NoPbl(groupName);
  }
}