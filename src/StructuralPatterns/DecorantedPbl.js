export default class DecoratedPbl {
  constructor(pbl, moderator) {
    this.pbl = pbl;
    this.groupName = pbl.groupName;
    this.students = [moderator];
    this.moderator = moderator;
  }

  say() {
    console.log(`\nI am Decorated Pbl ${this.groupName},
Moderator: ${this.moderator},
Students: ${this.students}`);
  }

  action(command) {
    let name = command.execute.toString().substr(9, 3);
    return name;
  }

  execute(command) {
    this.students = command.execute(this.students, command.value);
    console.log(this.action(command), command.value);
  }
}