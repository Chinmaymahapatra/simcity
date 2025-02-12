// Factory configurations
export const FACTORIES = {
  buildingMaterials: {
    name: "Basic Factory",
    baseSlots: 2,
    maxSlots: 99,
    items: {
      metal: { time: 1 },
      wood: { time: 3 },
      plastic: { time: 9 },
      seeds: { time: 20 },
      minerals: { time: 30 },
      chemicals: { time: 120 },
      textiles: { time: 180 },
      sugar: { time: 240, level: 17 },
      glass: { time: 300, level: 19 },
      animalFeed: { time: 360, level: 23 },
      electricalComponents: { time: 420, level: 29 },
    },
  },
};

export const STORES = {
  buildingSupplies: {
    name: "Building Supplies Store",
    level: 1,
    baseSlots: 1,
    maxSlots: 11,
    activeSlots: 1,
    items: {
      nails: { time: 5, requires: { metal: 2 } },
      planks: { time: 30, requires: { wood: 2 } },
      bricks: { time: 20, requires: { minerals: 2 } },
      cement: { time: 50, requires: { minerals: 2, chemicals: 1 } },
      glue: { time: 60, requires: { plastic: 1, chemicals: 2 } },
      paint: { time: 60, requires: { metal: 2, chemicals: 2 } },
    },
  },
  hardware: {
    name: "Hardware Store",
    level: 4,
    baseSlots: 1,
    maxSlots: 11,
    activeSlots: 1,
    items: {
      hammer: { time: 14, requires: { metal: 1, wood: 1 } },
      measuringTape: { time: 20, requires: { metal: 1, plastic: 1 } },
      shovel: { time: 30, requires: { metal: 1, wood: 1, plastic: 1 } },
      cookingUtensils: { time: 45, requires: { metal: 2, wood: 2 } },
      ladder: { time: 60, requires: { metal: 2, planks: 2 } },
      drill: {
        time: 120,
        requires: { metal: 2, plastic: 2, electricalComponents: 1 },
      },
    },
  },
  farmers: {
    name: "Farmer's Market",
    baseSlots: 2,
    maxSlots: 11,
    items: {
      vegetables: { time: 20, requires: { seeds: 2 } },
      flour: { time: 30, requires: { seeds: 2, textiles: 1 } },
      cream: { time: 75, requires: { animalFeed: 1 } },
      corn: { time: 60, requires: { seeds: 4 } },
      cheese: { time: 105, requires: { animalFeed: 2 } },
      beef: { time: 150, requires: { animalFeed: 3 } },
      fruitsAndBerries: { time: 120, requires: { seeds: 2, treeSapling: 1 } },
    },
  },
  furniture: {
    name: "Furniture Store",
    baseSlots: 2,
    maxSlots: 11,
    items: {
      chair: { time: 20, requires: { wood: 2, nails: 1, hammer: 1 } },
      table: { time: 30, requires: { wood: 3, nails: 2, hammer: 1 } },
      homeTextiles: { time: 75, requires: { textiles: 2, plastic: 1 } },
      cupboard: { time: 45, requires: { wood: 2, glass: 1, nails: 2 } },
      couch: { time: 90, requires: { textiles: 3, wood: 2, nails: 2 } },
    },
  },
  gardening: {
    name: "Gardening Supplies",
    baseSlots: 2,
    maxSlots: 11,
    items: {
      grass: { time: 30, requires: { seeds: 1, shovel: 1 } },
      treeSapling: { time: 90, requires: { seeds: 2, shovel: 1 } },
      gardenFurniture: { time: 135, requires: { plastic: 2, textiles: 2 } },
      firepit: { time: 240, requires: { bricks: 2, cement: 1, shovel: 1 } },
      gardenGnomes: { time: 90, requires: { cement: 1, paint: 1 } },
      lawnMower: { time: 120, requires: { metal: 3, electricalComponents: 1 } },
    },
  },
  donut: {
    name: "Donut Shop",
    baseSlots: 2,
    maxSlots: 11,
    items: {
      donuts: { time: 45, requires: { flour: 1, sugar: 1 } },
      frozenYogurt: { time: 75, requires: { cream: 1, fruits: 1 } },
      coffee: { time: 60, requires: { seeds: 2, cream: 1 } },
      breadRoll: { time: 48, requires: { flour: 2, cream: 1 } },
      greenSmoothie: {
        time: 24,
        requires: { fruitsAndBerries: 1, vegetables: 1 },
      },
      cheeryCheeseCake: {
        time: 72,
        requires: { cheese: 1, flour: 1, fruitsAndBerries: 1 },
      },
    },
  },
  fashion: {
    name: "Fashion Store",
    baseSlots: 2,
    maxSlots: 11,
    items: {
      cap: { time: 60, requires: { textiles: 2, plastic: 1 } },
      shoes: { time: 75, requires: { plastic: 2, textiles: 2, glue: 1 } },
      watch: { time: 90, requires: { plastic: 2, glass: 1, chemicals: 1 } },
      businessSuit: { time: 210, requires: { textiles: 3, measuringTape: 1 } },
      backpack: { time: 150, requires: { textiles: 2, plastic: 2, glue: 1 } },
    },
  },
  fastFood: {
    name: "Fast Food Restaurant",
    baseSlots: 2,
    maxSlots: 11,
    items: {
      iceCreamSandwich: { time: 14, requires: { cream: 1, sugar: 1 } },
      pizza: { time: 24, requires: { flour: 1, cheese: 1, vegetables: 1 } },
      burger: { time: 35, requires: { beef: 1, bread: 1 } },
      cheeseFries: { time: 20, requires: { vegetables: 2, cheese: 1 } },
      lemonadeBottle: { time: 60, requires: { sugar: 2, glass: 1 } },
      popcorn: { time: 30, requires: { corn: 2, sugar: 1 } },
    },
  },
  homeAppliances: {
    name: "Home Appliances",
    baseSlots: 2,
    maxSlots: 11,
    items: {
      bbqGrill: { time: 90, requires: { metal: 3, electricalComponents: 1 } },
      refrigerator: {
        time: 120,
        requires: { plastic: 2, electricalComponents: 2, glass: 1 },
      },
      lightingSystem: {
        time: 60,
        requires: { glass: 2, electricalComponents: 1 },
      },
      tv: {
        time: 180,
        requires: { plastic: 2, glass: 2, electricalComponents: 2 },
      },
      microwaveOven: {
        time: 120,
        requires: { metal: 2, glass: 1, electricalComponents: 1 },
      },
    },
  },
  sportsShop: {
    name: "Sports Shop",
    level: 35,
    baseSlots: 1,
    maxSlots: 11,
    activeSlots: 1,
    items: {
      tennisRacket: { time: 90, requires: { plastic: 2, textiles: 1 } },
      sportsDrink: { time: 45, requires: { plastic: 1, chemicals: 1 } },
      footballShoes: { time: 120, requires: { textiles: 2, plastic: 1 } },
      proteinBar: { time: 60, requires: { chemicals: 1, sugar: 1 } },
      pingPongTable: { time: 180, requires: { wood: 3, plastic: 2 } },
    },
  },
  toyShop: {
    name: "Toy Shop",
    level: 40,
    baseSlots: 1,
    maxSlots: 11,
    activeSlots: 1,
    items: {
      letterBlocks: { time: 45, requires: { wood: 2, paint: 1 } },
      kite: { time: 60, requires: { plastic: 1, textiles: 2 } },
      teddyBear: { time: 90, requires: { textiles: 3, glue: 1 } },
      gameConsole: {
        time: 180,
        requires: { plastic: 2, electricalComponents: 2 },
      },
    },
  },
  dessertShop: {
    name: "Dessert Shop",
    level: 55,
    baseSlots: 1,
    maxSlots: 11,
    activeSlots: 1,
    items: {
      tiramisu: { time: 90, requires: { cream: 2, coffee: 1 } },
      churros: { time: 60, requires: { flour: 2, sugar: 1 } },
      profiterole: {
        time: 120,
        requires: { flour: 2, cream: 2, chocolate: 1 },
      },
      mochi: { time: 75, requires: { flour: 1, sugar: 2 } },
      pavlova: { time: 150, requires: { sugar: 3, cream: 2, fruit: 1 } },
    },
  },
  countryStore: {
    name: "Country Store",
    level: 50,
    baseSlots: 1,
    maxSlots: 11,
    activeSlots: 1,
    items: {
      woolShirt: { time: 120, requires: { textiles: 3, measuringTape: 1 } },
      picnicBasket: { time: 90, requires: { wood: 2, textiles: 1 } },
      appleJam: { time: 60, requires: { fruit: 2, sugar: 1, glass: 1 } },
    },
  },
  bureauOfRestoration: {
    name: "Bureau of Restoration",
    level: 45,
    baseSlots: 1,
    maxSlots: 11,
    activeSlots: 1,
    items: {
      wroughtIron: { time: 120, requires: { metal: 3, chemicals: 1 } },
      carvedWood: { time: 90, requires: { wood: 3, hammer: 1 } },
      chiseledStone: { time: 150, requires: { minerals: 3, hammer: 1 } },
      tapestry: { time: 180, requires: { textiles: 3, paint: 1 } },
      stainedGlass: { time: 240, requires: { glass: 2, paint: 2 } },
    },
  },
};

// Regional factories and stores
export const REGIONAL_FACTORIES = {
  greenValley: {
    name: "Green Factory",
    baseSlots: 5,
    maxSlots: 5,
    items: {
      recycledFabric: { time: 6 },
    },
  },
  sunnyIsles: {
    name: "Coconut Farm",
    baseSlots: 5,
    maxSlots: 5,
    items: {
      coconuts: { time: 6 },
    },
  },
  cactusCanyon: {
    name: "Oil Plant",
    baseSlots: 5,
    maxSlots: 5,
    items: {
      crudeOil: { time: 6 },
    },
  },
  limestoneCliffs: {
    name: "Mulberry Grove",
    baseSlots: 5,
    maxSlots: 5,
    items: {
      silk: { time: 6 },
    },
  },
  frostyFjords: {
    name: "Fishery",
    baseSlots: 5,
    maxSlots: 5,
    items: {
      fish: { time: 6 },
    },
  },
};

export const REGIONAL_STORES = {
  greenValley: {
    name: "Green Valley Shop",
    baseSlots: 2,
    maxSlots: 11,
    items: {
      reusableBag: { time: 16, requires: { recycledFabric: 2 } },
      solarPanels: {
        time: 90,
        requires: { recycledFabric: 2, glass: 2, electricalComponents: 1 },
      },
      windTurbines: {
        time: 120,
        requires: { recycledFabric: 1, metal: 2, electricalComponents: 2 },
      },
    },
  },
  sunnyIsles: {
    name: "Sunny Isles Shop",
    baseSlots: 2,
    maxSlots: 11,
    items: {
      coconutOil: { time: 16, requires: { coconuts: 2 } },
      faceCream: { time: 72, requires: { coconutOil: 2, chemicals: 2 } },
      tropicalDrink: {
        time: 200,
        requires: { coconuts: 2, fruitsAndBerries: 2, sugar: 1 },
      },
    },
  },
  cactusCanyon: {
    name: "Cactus Canyon Shop",
    baseSlots: 2,
    maxSlots: 11,
    items: {
      gasoline: { time: 60, requires: { crudeOil: 2 } },
      plasticPellets: { time: 90, requires: { crudeOil: 3 } },
      industrialMaterials: {
        time: 120,
        requires: { crudeOil: 2, chemicals: 2 },
      },
    },
  },
  limestoneCliffs: {
    name: "Limestone Cliffs Shop",
    baseSlots: 2,
    maxSlots: 11,
    items: {
      silkFabric: { time: 45, requires: { silk: 2 } },
      silkRobes: { time: 90, requires: { silk: 3, textiles: 1 } },
      designerClothing: {
        time: 150,
        requires: { silk: 2, textiles: 2, measuringTape: 1 },
      },
    },
  },
  frostyFjords: {
    name: "Frosty Fjords Shop",
    baseSlots: 2,
    maxSlots: 11,
    items: {
      fishFillet: { time: 30, requires: { fish: 2 } },
      fishSoup: { time: 60, requires: { fish: 2, vegetables: 1 } },
      fishAndChips: {
        time: 90,
        requires: { fish: 2, vegetables: 2, flour: 1 },
      },
    },
  },
};
