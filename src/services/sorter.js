import { utils } from './utils';

class Sorter {
  localeOptions = [
    undefined,
    {
      numeric: true,
      sensitivity: 'base',
    },
  ];

  sort = (field, direction) => (data) =>
    data.sort(this.predicate(field.split('.'), Number(direction === 'desc')));

  predicate =
    (fields, isDesc) =>
    (...args) => {
      const firstValue = utils.propertyAccessor(args[isDesc], fields);
      const secondValue = utils.propertyAccessor(args[Number(!isDesc)], fields);

      return String(firstValue).localeCompare(
        String(secondValue),
        ...this.localeOptions,
      );
    };
}

export const sorter = new Sorter();
