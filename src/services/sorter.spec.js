import { sorter } from './sorter';

const firstChannel = {
  text: 'foo',
  value: 1,
  count: 2,
};

const secondChannel = {
  text: 'boo',
  value: 3,
  count: 1,
};

const thirdChannel = {
  text: 'moo',
  value: 2,
  count: 3,
};

const scenarios = [
  {
    description: 'desc string',
    data: {
      channels: [firstChannel, secondChannel, thirdChannel],
      sorterArgs: ['text', 'desc'],
    },
    result: [thirdChannel, firstChannel, secondChannel],
  },
  {
    description: 'desc number',
    data: {
      channels: [firstChannel, secondChannel, thirdChannel],
      sorterArgs: ['value', 'desc'],
    },
    result: [secondChannel, thirdChannel, firstChannel],
  },
  {
    description: 'desc number',
    data: {
      channels: [firstChannel, secondChannel, thirdChannel],
      sorterArgs: ['count', 'desc'],
    },
    result: [thirdChannel, firstChannel, secondChannel],
  },
];

describe('Sorter', () => {
  describe.each(scenarios)('', (scenario) => {
    const { description, data, result } = scenario;

    it(description, () => {
      expect(sorter.sort(...data.sorterArgs)(data.channels)).toEqual(result);
    });
  });
});
