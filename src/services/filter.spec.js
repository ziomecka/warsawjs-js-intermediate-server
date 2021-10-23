import { filter } from './filter';

const firstChannel = {
  text: 'foo',
};

const secondChannel = {
  text: 'boo',
};

  const thirdChannel = {
  text: 'boofoo',
};

const pointChannel = {
  text: 'a.bc',
};

const scenarios = [
  {
    description: 'filters',
    data: {
      channels: [firstChannel, secondChannel, thirdChannel],
      filterArgs: [{ text: 'foo' }],
    },
    result: [firstChannel, thirdChannel],
  },
  {
    description: 'falsy string',
    data: {
      channels: [firstChannel, secondChannel, thirdChannel],
      filterArgs: [{ text: '' }],
    },
    result: [firstChannel, secondChannel, thirdChannel],
  },
  {
    description: 'point',
    data: {
      channels: [firstChannel, secondChannel, pointChannel, thirdChannel],
      filterArgs: [{ text: '.' }],
    },
    result: [pointChannel],
  },
];

describe('Filter', () => {
  describe.each(scenarios)('', (scenario) => {
    const { description, data, result } = scenario;

    it(description, () => {
      expect(filter.filter(...data.filterArgs)(data.channels)).toEqual(result);
    });
  });
});
