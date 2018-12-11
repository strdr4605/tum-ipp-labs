class GroupsInfo {
  constructor(groups){
    this.groups = groups;
  }
  
  getFieldInfo(fieldName){
    return this.groups.map(group => {
      return group[fieldName] || 'Field does not exists';
    });
  }
}

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