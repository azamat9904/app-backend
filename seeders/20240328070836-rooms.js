const rooms = [
  {
    name: '№5',
    description: '1 комната',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: '№6',
    description: '1 комната',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: '№7',
    description: '1 комната',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: '№8',
    description: '1 комната',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: '№9',
    description: 'VIP',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: '№10',
    description: 'VIP',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: '№11',
    description: 'без сан.узла',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: '№12',
    description: 'VIP',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: '№13',
    description: 'VIP',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: '№14',
    description: 'VIP',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: '№15',
    description: 'VIP',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: '№16',
    description: 'VIP',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: '№17',
    description: 'VIP',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: '№18',
    description: 'VIP',
    createdAt: new Date(),
    updatedAt: new Date()
  },
]

module.exports = {
  async up (queryInterface) {
    return queryInterface.bulkInsert('Rooms', rooms)
  },

  async down (queryInterface) {
    return queryInterface.bulkDelete('Rooms', null, {});
  }
};
