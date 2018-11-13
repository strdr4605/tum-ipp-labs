import SingletonPblFactory from "./CreationalPatterns/SingletonPblFactory";
import SingletonNoPblFactory from "./CreationalPatterns/SingletonNoPblFactory";
import PblPrototype from './CreationalPatterns/PblPrototype';
import DecoratedPbl from './StructuralPatterns/DecorantedPbl';
import { AddCommand, RemoveCommand } from './BehavioralPatterns/Command';

let groups = [];
let noPblFactory1 = new SingletonNoPblFactory();
let noPblFactory2 = new SingletonNoPblFactory();
let pblFactory1 = new SingletonPblFactory();
let pblFactory2 = new SingletonPblFactory();
console.log(`\n============ Lab1, Creational Patterns ==============\n`);

console.log(`pblFactory1 === pblFactory2 ${pblFactory1 === pblFactory2}`);
console.log(`noPblFactory1 === noPblFactory2 ${noPblFactory1 === noPblFactory2}`);

groups.push(pblFactory1.create('FAF-181'));
groups.push(pblFactory1.create('FAF-182'));
groups.push(pblFactory2.create('FAF-171'));
groups.push(pblFactory2.create('FAF-172'));
groups.push(noPblFactory1.create('TI-151'));
groups.push(noPblFactory1.create('TI-151'));
groups.push(noPblFactory2.create('TI-151'));
groups.push(noPblFactory2.create('TI-151'));

let proto = pblFactory1.create('FAF-183 Prototype');
let prototype = new PblPrototype(proto);

groups.push(prototype.clone());

groups.forEach((group) => {
  group.say();
});

console.log(`\n============ Lab2, Structural Patterns + Behavioral Patterns ==============\n`);

let group = pblFactory1.create('FAF-181');
group.say();
let decoratedGroup = new DecoratedPbl(group, `Dragos Strainu`);
decoratedGroup.say();
decoratedGroup.execute(new AddCommand('Vasile Drumea'));
decoratedGroup.execute(new AddCommand('Stanislav Spatari'));
decoratedGroup.execute(new RemoveCommand('Vasile Drumea'));
decoratedGroup.execute(new AddCommand('Tudor Strainu'));
decoratedGroup.say();