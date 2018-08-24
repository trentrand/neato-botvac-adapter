// const NAVIGATION_MODE = {
//   normal: 1,
//   extraCare: 2,
//   deep: 3,
// };

module.exports = {
  properties: [
    {
      name: 'cleaningMode',
      value: 'house',
      metadata: {
        type: 'string',
        name: 'cleaningMode',
        label: 'Cleaning Mode',
        enum: [
          'manual',
          'house',
          'spot',
          'map',
        ],
      },
    },
    {
      name: 'extraCare',
      value: false,
      metadata: {
        '@type': 'BooleanProperty',
        type: 'boolean',
        name: 'extraCare',
        label: 'Extra Care',
      },
    },
    {
      name: 'eco',
      value: false,
      metadata: {
        '@type': 'BooleanProperty',
        type: 'boolean',
        name: 'eco',
        label: 'Eco Mode',
      },
    },
    {
      name: 'isScheduleEnabled',
      value: false,
      metadata: {
        '@type': 'BooleanProperty',
        type: 'boolean',
        name: 'isScheduleEnabled',
        label: 'Enable Schedule',
      },
    },
  ],
  actions: [
    {
      name: 'controller',
      metadata: {
        label: 'Start',
        description: 'Clean House',
      },
    },
  ],
  events: [
  ],
};
