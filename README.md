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

## Lab3

I implemented 1 Structural Pattern (Facade), 1 Creational Pattern (Factory Method) and 2 Behavioral Patterns (Observer, Iterator) in JavaScript.  
[FactoryMethod](https://github.com/strdr4605/tum-ipp-labs/blob/master/src/CreationalPatterns/FactoryMethod.js) is a method that creates object in dependence of `type` argument.

```javascript
if (type.toLocaleLowerCase() === 'pbl') {
  group = new Pbl(groupName);
} else if (type.toLocaleLowerCase() === 'nopbl') {
  group = new noPbl(groupName);
}
```

Usage:

```javascript
const newGroup = factoryMethod('pbl', 'FAF-191');
````

[ObserverDecoratedPlb](https://github.com/strdr4605/tum-ipp-labs/blob/master/src/BehavioralPatterns/ObserverDecoratedPlb.js) is a observer that inherits [DecoratedPbl](https://github.com/strdr4605/tum-ipp-labs/blob/master/src/StructuralPatterns/DecorantedPbl.js) and can have handlers that can handle its events.

```javascript
subscribe(fn) {
  this.handlers.push(fn);
}

unsubscribe(fn) {
  this.handlers = this.handlers.filter(item => item !== fn);
}

fire(command, thisObj) {
  this.handlers.forEach(item => {
    item.call(thisObj, super.execute(command));
  });
}
```

Usage:

```javascript
const observerDecoratedGroup = new ObserverDecoratedPbl(newGroup, 'Dragos Strainu');

const newStudentHandler = item => console.log(`fired: ${item}`)
observerDecoratedGroup.subscribe(newStudentHandler);
observerDecoratedGroup.fire(new AddCommand('Ion Strainu')); // fired: add Ion Strainu
observerDecoratedGroup.unsubscribe(newStudentHandler);
observerDecoratedGroup.fire(new AddCommand('Viorica Strainu'));
observerDecoratedGroup.subscribe(newStudentHandler);
observerDecoratedGroup.fire(new AddCommand('Viorel Bejan'));  // fired: add Viorel Bejan
```

[AplicantFacade](https://github.com/strdr4605/tum-ipp-labs/blob/master/src/StructuralPatterns/AplicantFacade.js) is a facade that uses classes with complex logic and is a bridge between them and user.  

```javascript
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
```

Usage:

```javascript
const aplicant = new AplicantFacade('Nicolae Bejan');
const result = aplicant.applyInGroup(observerDecoratedGroup.groupName);
if (result) {
  observerDecoratedGroup.execute(new AddCommand(aplicant.name));
}
```

[Iterator](https://github.com/strdr4605/tum-ipp-labs/blob/master/src/BehavioralPatterns/Iterator.js) is a class that get as a parameter a list and can iterate through it.

```javascript
first() {
  this.reset();
  return this.next();
}

next() {
  return this.items[this.index++];
}

hasNext() {
  return this.index <= this.items.length;
}

reset() {
  this.index = 0;
}

each(callback) {
  for (let item = this.first(); this.hasNext(); item = this.next()) {
    callback(item);
  }
}
```

Usage:

```javascript
const iter = new Iterator(observerDecoratedGroup.students);
iter.each(el => console.log(el));
```
