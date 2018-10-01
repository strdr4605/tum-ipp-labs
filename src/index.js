import SingletonPblFactory from "./AbstractFactory/SingletonPblFactory";
import SingletonNoPblFactory from "./AbstractFactory/SingletonNoPblFactory";

let groups = [];
let noPblFactory1 = new SingletonNoPblFactory();
let noPblFactory2 = new SingletonNoPblFactory();
let pblFactory1 = new SingletonPblFactory();
let pblFactory2 = new SingletonPblFactory();

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

groups.forEach((group) => {
  group.say();
});