import PblFactory from "./PblFactory";
import NoPblFactory from "./NoPblFactory";

let groups = [];
let noPblFactory = new NoPblFactory();
let pblFactory = new PblFactory();

groups.push(pblFactory.create('FAF-181'));
groups.push(pblFactory.create('FAF-182'));
groups.push(pblFactory.create('FAF-171'));
groups.push(pblFactory.create('FAF-172'));
groups.push(noPblFactory.create('TI-151'));
groups.push(noPblFactory.create('TI-151'));
groups.push(noPblFactory.create('TI-151'));
groups.push(noPblFactory.create('TI-151'));

groups.forEach((group) => {
  group.say();
});