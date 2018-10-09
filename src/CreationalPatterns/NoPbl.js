export default class NoPbl {
  constructor(groupName) {
    this.groupName = groupName;
  }

  say() {
    console.log(`I am NoPbl ${this.groupName}`);
  }
}