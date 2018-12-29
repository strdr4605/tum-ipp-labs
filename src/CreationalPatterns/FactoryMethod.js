import Pbl from './Pbl';
import noPbl from './NoPbl';

export function factoryMethod(type, groupName) {
  let group;

  if (typeof type == 'string') {
    if (type.toLocaleLowerCase() === 'pbl') {
      group = new Pbl(groupName);
    } else if (type.toLocaleLowerCase() === 'nopbl') {
      group = new noPbl(groupName);
    }
  }

  return group;
}