export default class Pbl {
  constructor(groupName) {
    this.groupName = groupName;
  }

  say() {
    console.log(`I am Pbl ${this.groupName}`);
  }
}