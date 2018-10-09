import Pbl from './Pbl';

export default class PblPrototype {
  constructor(proto){
    this.proto = proto;
  }

  clone(){
    let pbl = new Pbl();
    pbl.groupName = this.proto.groupName;

    return pbl;
  }
}