export default class DecoratedPbl {
  constructor(pbl, studentCount, moderator) {
    this.pbl = pbl;
    this.groupName = pbl.groupName;
    this.studentCount = studentCount;
    this.moderator = moderator;
  }

  say() {
    console.log(`\nI am Decorated Pbl ${this.groupName},
Number of students: ${this.studentCount},
Moderator: ${this.moderator}`);
  }
}