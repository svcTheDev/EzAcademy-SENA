type IdKey = "uid" | "cid" | "eid" | "sid";

type SerializableDocument = {
  toObject(): {
    _id: { toString(): string };
    __v?: unknown;
    password?: unknown;
    [key: string]: unknown;
  };
};

export const normalizeToJSON = (idKey: IdKey) => {
  return function (this: SerializableDocument) {
    const { __v, _id, password, ...object } = this.toObject();

    object[idKey] = _id.toString();

    return object;
  };
};
