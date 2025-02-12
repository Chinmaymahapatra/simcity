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
    { id: "metal", label: "Metal" },
    { id: "wood", label: "Wood" },
    { id: "plastic", label: "Plastic" },
    { id: "nails", label: "Nails" },
    { id: "planks", label: "Planks" },
    { id: "bricks", label: "Bricks" },
    { id: "cement", label: "Cement" },
    { id: "glue", label: "Glue" },
    { id: "paint", label: "Paint" },
    { id: "chemicals", label: "Chemicals" },
    { id: "minerals", label: "Minerals" },
    { id: "seeds", label: "Seeds" },
    { id: "measuringTape", label: "Measuring Tape" },
    { id: "table", label: "Table" },
    { id: "sugar", label: "Sugar" },
    { id: "chair", label: "Chair" },
    { id: "hammer", label: "Hammer" },
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
