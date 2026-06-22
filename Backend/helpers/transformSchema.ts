export const normalizeToJSON = (idKey: 'uid' | 'cid' | 'eid' | 'sid') => {
  return function (this: any) {
    const { __v, _id, password, ...object } = this.toObject();
    
    // Asignamos dinámicamente el ID con el nombre que le pasemos
    object[idKey] = _id.toString();
    
    return object;
  };
};