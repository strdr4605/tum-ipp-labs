# tum-ipp-labs
Lab work for Software Engineering (Design Patterns)

## Creational Patterns
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
