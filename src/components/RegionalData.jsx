import React, { useState, useEffect } from "react";

const RegionalData = () => {
  const [regionalData, setRegionalData] = useState(() => {
    const savedData = localStorage.getItem("regionalData");
    return savedData
      ? JSON.parse(savedData)
      : {
          factories: {
            greenValley: 2,
            sunnyIsles: 2,
          },
          stores: {
            greenValley: 1,
            sunnyIsles: 1,
          },
        };
  });

  const handleChange = (type, region, value) => {
    const parsedValue = Math.max(0, parseInt(value) || 0);
    setRegionalData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [region]: parsedValue,
      },
    }));
  };

  useEffect(() => {
    localStorage.setItem("regionalData", JSON.stringify(regionalData));
  }, [regionalData]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Regional Distribution</h2>

      {/* Factories Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Regional Factories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <label className="text-gray-700">Green Valley:</label>
            <input
              type="number"
              min="0"
              value={regionalData.factories.greenValley}
              onChange={(e) =>
                handleChange("factories", "greenValley", e.target.value)
              }
              className="w-20 px-2 py-1 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-gray-700">Sunny Isles:</label>
            <input
              type="number"
              min="0"
              value={regionalData.factories.sunnyIsles}
              onChange={(e) =>
                handleChange("factories", "sunnyIsles", e.target.value)
              }
              className="w-20 px-2 py-1 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Stores Section */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Regional Stores</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <label className="text-gray-700">Green Valley:</label>
            <input
              type="number"
              min="0"
              value={regionalData.stores.greenValley}
              onChange={(e) =>
                handleChange("stores", "greenValley", e.target.value)
              }
              className="w-20 px-2 py-1 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-gray-700">Sunny Isles:</label>
            <input
              type="number"
              min="0"
              value={regionalData.stores.sunnyIsles}
              onChange={(e) =>
                handleChange("stores", "sunnyIsles", e.target.value)
              }
              className="w-20 px-2 py-1 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionalData;
