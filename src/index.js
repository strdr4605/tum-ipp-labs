// lab1
import SingletonPblFactory from "./CreationalPatterns/SingletonPblFactory";
import SingletonNoPblFactory from "./CreationalPatterns/SingletonNoPblFactory";
import PblPrototype from './CreationalPatterns/PblPrototype';
// lab2
import DecoratedPbl from './StructuralPatterns/DecorantedPbl';
import { AddCommand, RemoveCommand } from './BehavioralPatterns/Command';
import GroupsProxy from './StructuralPatterns/GroupsProxy';
// lab3
import { factoryMethod } from './CreationalPatterns/FactoryMethod';
import AplicantFacade from "./StructuralPatterns/AplicantFacade";
import Iterator from "./BehavioralPatterns/Iterator";
import ObserverDecoratedPbl from "./BehavioralPatterns/ObserverDecoratedPlb";

const groups = [];
const noPblFactory1 = new SingletonNoPblFactory();
const noPblFactory2 = new SingletonNoPblFactory();
const pblFactory1 = new SingletonPblFactory();
const pblFactory2 = new SingletonPblFactory();
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

const proto = pblFactory1.create('FAF-183 Prototype');
const prototype = new PblPrototype(proto);

groups.push(prototype.clone());

groups.forEach((group) => {
  group.say();
});

console.log(`\n============ Lab2, Structural Patterns + Behavioral Patterns ==============\n`);

const group = pblFactory1.create('FAF-181');
group.say();
const decoratedGroup = new DecoratedPbl(group, 'Dragos Strainu');
decoratedGroup.say();
decoratedGroup.execute(new AddCommand('Vasile Drumea'));
decoratedGroup.execute(new AddCommand('Stanislav Spatari'));
decoratedGroup.execute(new RemoveCommand('Vasile Drumea'));
decoratedGroup.execute(new AddCommand('Tudor Strainu'));
decoratedGroup.say();
groups.push(decoratedGroup);

console.log(`\nProxy\n`);
const groupProxy = new GroupsProxy(groups);
groupProxy.getFieldInfo('groupName');
groupProxy.getFieldInfo('moderator');
groupProxy.getFieldInfo('groupName');
groupProxy.getCount();

console.log(`\n============ Lab3, Creational Patterns + Structural Patterns + Behavioral Patterns ==============\n`);

const newGroup = factoryMethod('pbl', 'FAF-191');
const observerDecoratedGroup = new ObserverDecoratedPbl(newGroup, 'Dragos Strainu');
observerDecoratedGroup.execute(new AddCommand('Tudor Strainu'));
const aplicant = new AplicantFacade('Nicolae Bejan');
const result = aplicant.applyInGroup(observerDecoratedGroup.groupName);
if (result) {
  observerDecoratedGroup.execute(new AddCommand(aplicant.name));
}

const iter = new Iterator(observerDecoratedGroup.students);
iter.each(el => console.log(el));

const newStudentHandler = item => console.log(`fired: ${item}`)

observerDecoratedGroup.subscribe(newStudentHandler);
observerDecoratedGroup.fire(new AddCommand('Ion Strainu'));
observerDecoratedGroup.unsubscribe(newStudentHandler);
observerDecoratedGroup.fire(new AddCommand('Viorica Strainu'));
observerDecoratedGroup.subscribe(newStudentHandler);
observerDecoratedGroup.fire(new AddCommand('Viorel Bejan'));
