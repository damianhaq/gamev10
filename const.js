export const data = {
  map: [],
  pickedBuildingId: null,
};

export const items = {
  raspberry: {
    name: "raspberry",
    description: "Raspberry fruit",
  },
};

export const buildings = [
  {
    id: 1,
    pickKey: 49,
    name: "house",
  },
  {
    id: 2,
    pickKey: 50,
    name: "herbalistHut",
  },
  {
    id: 3,
    pickKey: 51,
    name: "raspberryBush",
  },
];

export const spritesheetData = {
  worker: {
    idle: {
      x: 0,
      y: 0,
      width: 16,
      height: 16,
    },
  },
  backpackWorker: {
    idle: {
      x: 3 * 16,
      y: 0,
      width: 16,
      height: 16,
    },
  },

  buildings: {
    house: {
      id: 1,
      x: 0,
      y: 16,
      width: 16 * 3,
      height: 16 * 2,
    },
    herbalistHut: {
      id: 2,
      x: 16 * 3,
      y: 16,
      width: 16 * 3,
      height: 16 * 2,
    },
    raspberryBush: {
      id: 3,
      x: 0,
      y: 16 * 3,
      width: 16,
      height: 16,
    },
  },

  resource: {
    emptyBush: {
      x: 0,
      y: 16 * 4,
      width: 16,
      height: 16,
    },
    raspberryBush: {
      x: 0,
      y: 16 * 3,
      width: 16,
      height: 16,
    },
  },
};
