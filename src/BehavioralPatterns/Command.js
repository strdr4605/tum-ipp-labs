function add(array, string){
  let newArray = array.slice(0);
  newArray.push(string);
  return newArray;
}

function remove(array, string){
  let newArray = array.slice(0);
  newArray.splice(newArray.indexOf(string), 1);
  return newArray;
}

class Command {
  constructor(execute, value){
    this.execute = execute;
    this.value = value;
  }
}

export class AddCommand {
  constructor(value){
    return new Command(add, value);
  }
}

export class RemoveCommand {
  constructor(value){
    return new Command(remove, value);
  }
}