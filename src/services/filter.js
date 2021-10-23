import { utils } from './utils';

class Filter {
  replacements = [[/([\\.])/g, '\\$1']];

  filter = (filters) => {
    if (!filters || !Object.keys(filters).length) {
      return (data) => data;
    }

    return (data) =>
      Array.isArray(data) ? data.filter(this.predicate(filters)) : data;
  };

  predicate = (filters) => (item) =>
    Object(item) === item
      ? Object.entries(filters).every(([field, text]) => {
          const value = utils.propertyAccessor(item, field.split('.'));

          return typeof value === 'string'
            ? value.match(this.regexp(text))
            : false;
        })
      : false;

  replace = (text) =>
    this.replacements.reduce(
      (result, replacement) => result.replace(...replacement),
      text,
    );

  regexp = (text, modifiers = 'gi') =>
    typeof text === 'string' ? new RegExp(this.replace(text), modifiers) : null;
}

export const filter = new Filter();
