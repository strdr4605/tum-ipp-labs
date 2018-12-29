export default class AplicantFacade {
  constructor(name) {
    this.name = name;
  }

  applyInGroup(groupName) {
    let result = true;
    if (!new Diploma().get(this.name)) {
      result = false;
    } else if (!new BAC().verify(this.name)) {
      result = false;
    } else if (!new Group().available(groupName)) {
      result = false;
    }

    return result;
  }
}

class Diploma {
  constructor() {}
  
  get(studentName) {
    // complex logic
    return true;
  }
}

class BAC {
  constructor() {}
  
  verify(studentName) {
    // complex logic
    return true;
  }
}

class Group {
  constructor() {}
  
  available(groupName) {
    // complex logic
    return true;
  }
}