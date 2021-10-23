class Utils {
  propertyAccessor = (obj, fields) => {
    if (obj !== Object(obj) || !Array.isArray(fields) || !fields.length) {
      return obj;
    }

    return this.propertyAccessor(obj[fields[0]], fields.slice(1));
  };
}

export const utils = new Utils();
