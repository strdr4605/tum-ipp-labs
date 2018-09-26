import NoPbl from "./NoPbl";

export default class NoPblFactory {
  constructor() {}

  create(groupName) {
    return new NoPbl(groupName);
  }
}