import React, { useState, useEffect } from "react";

const Inventory = () => {
  const [inventory, setInventory] = useState(() => {
    const savedData = localStorage.getItem("inventoryData");
    return savedData ? JSON.parse(savedData) : {};
  });

  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const handleChange = (item, value) => {
    const parsedValue = Math.max(0, parseInt(value) || 0);
    setInventory((prev) => ({
      ...prev,
      [item]: parsedValue,
    }));
  };

  useEffect(() => {
    localStorage.setItem("inventoryData", JSON.stringify(inventory));
  }, [inventory]);

  const inventoryItems = [
    // Basic Factory Items
    { id: "metal", label: "Metal" },
    { id: "wood", label: "Wood" },
    { id: "plastic", label: "Plastic" },
    { id: "seeds", label: "Seeds" },
    { id: "minerals", label: "Minerals" },
    { id: "chemicals", label: "Chemicals" },
    { id: "textiles", label: "Textiles" },
    { id: "sugar", label: "Sugar" },
    { id: "glass", label: "Glass" },
    { id: "animalFeed", label: "Animal Feed" },
    { id: "electricalComponents", label: "Electrical Components" },

    // Building Supplies Store Items
    { id: "nails", label: "Nails" },
    { id: "planks", label: "Planks" },
    { id: "bricks", label: "Bricks" },
    { id: "cement", label: "Cement" },
    { id: "glue", label: "Glue" },
    { id: "paint", label: "Paint" },

    // Hardware Store Items
    { id: "hammer", label: "Hammer" },
    { id: "measuringTape", label: "Measuring Tape" },
    { id: "shovel", label: "Shovel" },
    { id: "cookingUtensils", label: "Cooking Utensils" },
    { id: "ladder", label: "Ladder" },
    { id: "drill", label: "Drill" },

    // Farmer's Market Items
    { id: "vegetables", label: "Vegetables" },
    { id: "flour", label: "Flour" },
    { id: "cream", label: "Cream" },
    { id: "corn", label: "Corn" },
    { id: "cheese", label: "Cheese" },
    { id: "beef", label: "Beef" },
    { id: "fruitsAndBerries", label: "Fruits and Berries" },

    // Furniture Store Items
    { id: "chair", label: "Chair" },
    { id: "table", label: "Table" },
    { id: "homeTextiles", label: "Home Textiles" },
    { id: "cupboard", label: "Cupboard" },
    { id: "couch", label: "Couch" },

    // Gardening Supplies Items
    { id: "grass", label: "Grass" },
    { id: "treeSapling", label: "Tree Sapling" },
    { id: "gardenFurniture", label: "Garden Furniture" },
    { id: "firepit", label: "Fire Pit" },
    { id: "gardenGnomes", label: "Garden Gnomes" },
    { id: "lawnMower", label: "Lawn Mower" },

    // Donut Shop Items
    { id: "donuts", label: "Donuts" },
    { id: "frozenYogurt", label: "Frozen Yogurt" },
    { id: "coffee", label: "Coffee" },
    { id: "breadRoll", label: "Bread Roll" },
    { id: "greenSmoothie", label: "Green Smoothie" },
    { id: "cheeryCheeseCake", label: "Cheery Cheese Cake" },

    // Fashion Store Items
    { id: "cap", label: "Cap" },
    { id: "shoes", label: "Shoes" },
    { id: "watch", label: "Watch" },
    { id: "businessSuit", label: "Business Suit" },
    { id: "backpack", label: "Backpack" },

    // Fast Food Restaurant Items
    { id: "iceCreamSandwich", label: "Ice Cream Sandwich" },
    { id: "pizza", label: "Pizza" },
    { id: "burger", label: "Burger" },
    { id: "cheeseFries", label: "Cheese Fries" },
    { id: "lemonadeBottle", label: "Lemonade Bottle" },
    { id: "popcorn", label: "Popcorn" },

    // Home Appliances Items
    { id: "bbqGrill", label: "BBQ Grill" },
    { id: "refrigerator", label: "Refrigerator" },
    { id: "lightingSystem", label: "Lighting System" },
    { id: "tv", label: "TV" },
    { id: "microwaveOven", label: "Microwave Oven" },

    // Sports Shop Items
    { id: "tennisRacket", label: "Tennis Racket" },
    { id: "sportsDrink", label: "Sports Drink" },
    { id: "footballShoes", label: "Football Shoes" },
    { id: "proteinBar", label: "Protein Bar" },
    { id: "pingPongTable", label: "Ping Pong Table" },

    // Toy Shop Items
    { id: "letterBlocks", label: "Letter Blocks" },
    { id: "kite", label: "Kite" },
    { id: "teddyBear", label: "Teddy Bear" },
    { id: "gameConsole", label: "Game Console" },

    // Dessert Shop Items
    { id: "tiramisu", label: "Tiramisu" },
    { id: "churros", label: "Churros" },
    { id: "profiterole", label: "Profiterole" },
    { id: "mochi", label: "Mochi" },
    { id: "pavlova", label: "Pavlova" },

    // Country Store Items
    { id: "woolShirt", label: "Wool Shirt" },
    { id: "picnicBasket", label: "Picnic Basket" },
    { id: "appleJam", label: "Apple Jam" },

    // Bureau of Restoration Items
    { id: "wroughtIron", label: "Wrought Iron" },
    { id: "carvedWood", label: "Carved Wood" },
    { id: "chiseledStone", label: "Chiseled Stone" },
    { id: "tapestry", label: "Tapestry" },
    { id: "stainedGlass", label: "Stained Glass" },

    // Regional Items
    { id: "recycledFabric", label: "Recycled Fabric" },
    { id: "coconuts", label: "Coconuts" },
    { id: "coconutOil", label: "Coconut Oil" },
    { id: "faceCream", label: "Face Cream" },
    { id: "tropicalDrink", label: "Tropical Drink" },
    { id: "crudeOil", label: "Crude Oil" },
    { id: "gasoline", label: "Gasoline" },
    { id: "plasticPellets", label: "Plastic Pellets" },
    { id: "industrialMaterials", label: "Industrial Materials" },
    { id: "silk", label: "Silk" },
    { id: "silkFabric", label: "Silk Fabric" },
    { id: "silkRobes", label: "Silk Robes" },
    { id: "designerClothing", label: "Designer Clothing" },
    { id: "fish", label: "Fish" },
    { id: "fishFillet", label: "Fish Fillet" },
    { id: "fishSoup", label: "Fish Soup" },
    { id: "fishAndChips", label: "Fish and Chips" },
  ];

  const filteredItems = inventoryItems.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setSearch("");
  };

  const handleRemoveItem = (itemId) => {
    setInventory((prev) => {
      const newInventory = { ...prev };
      delete newInventory[itemId];
      return newInventory;
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Current Inventory</h2>

      {/* Search Input */}
      <div className="relative mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search items..."
          className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />

        {/* Search Results Dropdown */}
        {search && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemSelect(item)}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected Item Input */}
      {selectedItem && (
        <div className="flex items-center space-x-4 mb-2">
          <span className="text-gray-700 font-medium">
            {selectedItem.label}:
          </span>
          <input
            type="number"
            min="0"
            value={inventory[selectedItem.id] || 0}
            onChange={(e) => handleChange(selectedItem.id, e.target.value)}
            className="w-32 px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}

      {/* Display Current Inventory */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Object.entries(inventory)
          .sort(([aId, _a], [bId, _b]) => {
            const itemA = inventoryItems.find((i) => i.id === aId)?.label || "";
            const itemB = inventoryItems.find((i) => i.id === bId)?.label || "";
            return itemA.localeCompare(itemB);
          })
          .map(([itemId, quantity]) => {
            const item = inventoryItems.find((i) => i.id === itemId);
            if (!item || quantity === 0) return null;
            return (
              <div
                key={itemId}
                className="bg-gray-50 p-3 rounded-lg shadow-sm flex items-center justify-between"
              >
                <div className="flex flex-col">
                  <span className="text-gray-700 font-medium">
                    {item.label}
                  </span>
                  <span className="text-gray-600">{quantity}</span>
                </div>
                <button
                  onClick={() => handleRemoveItem(itemId)}
                  className="text-red-500 hover:text-red-700 p-1"
                  title="Remove item"
                >
                  ✕
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Inventory;
