# tum-ipp-labs

Lab work for Software Engineering (Design Patterns)

## Lab1

I implemented 3 Creational Patterns (Abstract Factory, Singleton, Prototype) in JavaScript.  
[SingletonPblFactory](https://github.com/strdr4605/tum-ipp-labs/blob/master/src/CreationalPatterns/SingletonPblFactory.js) is a Singleton class Factory that creates objects of concrete type [Pbl](https://github.com/strdr4605/tum-ipp-labs/blob/master/src/CreationalPatterns/Pbl.js).  

```javascript
let groups = [];
let pblFactory1 = new SingletonPblFactory();
let pblFactory2 = new SingletonPblFactory();

console.log(`pblFactory1 === pblFactory2 ${pblFactory1 === pblFactory2}`); 
// pblFactory1 === pblFactory2 true

groups.push(pblFactory1.create('FAF-181'));
```

[PblPrototype](https://github.com/strdr4605/tum-ipp-labs/blob/master/src/CreationalPatterns/PblPrototype.js) is class that has a prototype on creation and creates clones of [Pbl](https://github.com/strdr4605/tum-ipp-labs/blob/master/src/CreationalPatterns/Pbl.js).

```javascript
let proto = pblFactory1.create('FAF-183 Prototype');
let prototype = new PblPrototype(proto);

groups.push(prototype.clone());
```

## Lab2

I implemented 2 Structural Patterns (Decorator, Proxy) and 1 Behavioral Pattern (Commnad) in JavaScript.  
[DecoratedPbl](https://github.com/strdr4605/tum-ipp-labs/blob/master/src/StructuralPatterns/DecorantedPbl.js) decorates [Pbl](https://github.com/strdr4605/tum-ipp-labs/blob/master/src/CreationalPatterns/Pbl.js) class with new properties and methods.

```javascript
export default class DecoratedPbl {
  constructor(pbl, moderator) {
    this.pbl = pbl;
    this.groupName = pbl.groupName;
    this.students = [moderator];
    this.moderator = moderator;
  }
  /*...*/
```

Usage:

```javascript
let group = pblFactory1.create('FAF-181');
group.say(); // I am Pbl FAF-181
let decoratedGroup = new DecoratedPbl(group, `Dragos Strainu`);
decoratedGroup.say();
// I am Decorated Pbl FAF-181,
// Moderator: Dragos Strainu,
// Students:  [ 'Dragos Strainu' ]
```

[Command](https://github.com/strdr4605/tum-ipp-labs/blob/master/src/BehavioralPatterns/Command.js) has to classes that execute add or remove commands that are executed in [DecoratedPbl](https://github.com/strdr4605/tum-ipp-labs/blob/master/src/StructuralPatterns/DecorantedPbl.js). 

```javascript
export default class DecoratedPbl {
  /*...*/
  
  action(command) {
    let name = command.execute.toString().substr(9, 3);
    return name;
  }

  execute(command) {
    this.students = command.execute(this.students, command.value);
    console.log(this.action(command), command.value);
  }
}
```

example with addCommand:

```javascript
export class AddCommand {
  constructor(value){
    return new Command(add, value);
  }
}

class Command {
  constructor(execute, value){
    this.execute = execute;
    this.value = value;
  }
}

function add(array, string){
  let newArray = array.slice(0);
  newArray.push(string);
  return newArray;
}
```

Usage:

```javascript
decoratedGroup.execute(new AddCommand('Stanislav Spatari')); // add Stanislav Spatari
decoratedGroup.say();
// I am Decorated Pbl FAF-181,
// Moderator: Dragos Strainu,
// Students:  [ 'Dragos Strainu', 'Stanislav Spatari' ]
```

[GroupsProxy](https://github.com/strdr4605/tum-ipp-labs/blob/master/src/StructuralPatterns/GroupsProxy.js) has 2 classes, `GroupInfo` and `InfoProxy`.  
`InfoProxy` has a instance of `GroupInfo` and a `infoCache` object that store all requests to proxy and if request is repeated it does not create a new connection but use old request from cache.

```javascript
export default class InfoProxy {
  constructor(groups){
    this.groupsInfo = new GroupsInfo(groups);
    this.infoCache = {}
  }

  getFieldInfo(fieldName){
    if(!this.infoCache[fieldName]){
      this.infoCache[fieldName] = this.groupsInfo.getFieldInfo(fieldName);
    }
    console.log(fieldName, this.infoCache[fieldName]);
  }

  getCount(){
    let count = 0;
    for (let code in this.infoCache) { count++; }
    console.log(`Cache size: ${count}`);
  }
}
```

Usage:

```javascript
/*...*/
let groupProxy = new GroupsProxy(groups);
groupProxy.getFieldInfo('groupName');
// groupName: FAF-181,FAF-182,FAF-171,FAF-172,TI-151,TI-151,TI-151,TI-151,FAF-183 Prototype,FAF-181
groupProxy.getFieldInfo('moderator');
// NOTE: ONLY DECORATEDGROUP (LAST GROUP) HAS 'moderator' FIELD
// moderator: Field does not exists,Field does not exists,Field does not exists,Field does not exists,
// Field does not exists,Field does not exists,Field does not exists,Field does not exists,
// Field does not exists,Dragos Strainu
groupProxy.getFieldInfo('groupName');
// groupName: FAF-181,FAF-182,FAF-171,FAF-172,TI-151,TI-151,TI-151,TI-151,FAF-183 Prototype,FAF-181
groupProxy.getCount(); // Cache size: 2
```
