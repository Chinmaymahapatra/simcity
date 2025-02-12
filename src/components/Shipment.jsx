import React, { useState, useEffect } from "react";
import {
  FACTORIES,
  STORES,
  REGIONAL_FACTORIES,
  REGIONAL_STORES,
} from "../materials";

const Shipment = () => {
  const [selectedHouses, setSelectedHouses] = useState([]);
  const [removingHouses, setRemovingHouses] = useState(new Set());
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState({});
  const [quantities, setQuantities] = useState({});

  const createNewHouse = () => {
    const houseNumber = selectedHouses.length + 1;
    const newHouse = {
      name: `Shipment ${houseNumber}`,
      materials: [],
    };
    setSelectedHouses([...selectedHouses, newHouse]);
    setSelectedMaterials({ ...selectedMaterials, [newHouse.name]: [] });
  };

  const handleSearch = (houseName, searchTerm) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const searchTermLower = searchTerm.toLowerCase();
    const results = [];

    // Search in FACTORIES
    Object.entries(FACTORIES.buildingMaterials.items).forEach(
      ([itemName, details]) => {
        if (itemName.toLowerCase().includes(searchTermLower)) {
          results.push({
            name: itemName,
            type: "Factory Material",
            details: `Production Time: ${details.time} minutes`,
            requirements: {},
          });
        }
      }
    );

    // Search in STORES
    Object.entries(STORES).forEach(([storeName, storeData]) => {
      Object.entries(storeData.items).forEach(([itemName, details]) => {
        if (itemName.toLowerCase().includes(searchTermLower)) {
          results.push({
            name: itemName,
            type: `${storeData.name} Item`,
            details: `Production Time: ${details.time} minutes`,
            requirements: details.requires || {},
          });
        }
      });
    });

    setSearchResults(results);
  };

  const handleSelectMaterial = (houseName, material) => {
    setSelectedMaterials((prev) => ({
      ...prev,
      [houseName]: [...(prev[houseName] || []), material],
    }));
    setQuantities((prev) => ({
      ...prev,
      [`${houseName}-${material.name}`]: "",
    }));
    setSearchResults([]);
  };

  const handleQuantityChange = (houseName, materialName, value) => {
    if (value === "") {
      setQuantities((prev) => ({
        ...prev,
        [`${houseName}-${materialName}`]: "",
      }));
      return;
    }
    const quantity = Math.max(1, parseInt(value) || 1);
    setQuantities((prev) => ({
      ...prev,
      [`${houseName}-${materialName}`]: quantity,
    }));
  };

  const handleRemoveMaterial = (houseName, indexToRemove) => {
    const materialName = selectedMaterials[houseName][indexToRemove].name;
    setSelectedMaterials((prev) => ({
      ...prev,
      [houseName]: prev[houseName].filter(
        (_, index) => index !== indexToRemove
      ),
    }));

    // Remove the quantity entry
    setQuantities((prev) => {
      const newQuantities = { ...prev };
      delete newQuantities[`${houseName}-${materialName}`];
      return newQuantities;
    });
  };

  const handleRemoveHouse = (house) => {
    setRemovingHouses((prev) => new Set([...prev, house.name]));
    setTimeout(() => {
      setSelectedHouses(selectedHouses.filter((h) => h.name !== house.name));
      setRemovingHouses((prev) => {
        const newSet = new Set(prev);
        newSet.delete(house.name);
        return newSet;
      });
      // Clean up selected materials for removed house
      const newSelectedMaterials = { ...selectedMaterials };
      delete newSelectedMaterials[house.name];
      setSelectedMaterials(newSelectedMaterials);
    }, 800);
  };

  const renderHouseCards = () => {
    return selectedHouses.map((house) => {
      const isRemoving = removingHouses.has(house.name);

      return (
        <div
          key={house.name}
          className={`mt-6 bg-white shadow-lg rounded-lg p-6 transition-opacity duration-800 ${
            isRemoving ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3
                className={`text-xl font-bold transition-all duration-300 ${
                  isRemoving ? "line-through" : ""
                }`}
              >
                {house.name}
              </h3>
            </div>
            <div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                  onChange={() => handleRemoveHouse(house)}
                />
                <span className="ml-2 text-gray-600">Done</span>
              </label>
            </div>
          </div>

          <div className="mt-4">
            <div className="relative">
              <input
                type="text"
                onChange={(e) => handleSearch(house.name, e.target.value)}
                placeholder="Search for materials..."
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Search Results */}
            <div className="mt-4 max-h-[calc(100vh-12rem)] overflow-y-auto">
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  className="mt-2 bg-white shadow border border-gray-200 rounded-lg p-3 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSelectMaterial(house.name, result)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{result.name}</h3>
                      <p className="text-sm text-gray-600">{result.type}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Materials List */}
            {selectedMaterials[house.name] &&
              selectedMaterials[house.name].length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Selected Materials:</h4>
                  <div className="space-y-2">
                    {selectedMaterials[house.name].map((material, index) => (
                      <div key={index} className="bg-gray-50 p-2 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{material.name}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">
                              {material.type}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveMaterial(house.name, index);
                              }}
                              className="text-gray-500 hover:text-red-500"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="space-x-2 mt-2">
                          <label className="text-sm text-gray-600">
                            Quantity:
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={
                              quantities[`${house.name}-${material.name}`] ?? ""
                            }
                            onChange={(e) =>
                              handleQuantityChange(
                                house.name,
                                material.name,
                                e.target.value
                              )
                            }
                            className="w-20 p-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                        {Object.keys(material.requirements).length > 0 && (
                          <div className="mt-1 text-sm text-gray-600">
                            Requirements:{" "}
                            {Object.entries(material.requirements)
                              .map(([key, value]) => `${key}: ${value}`)
                              .join(", ")}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    // Save to localStorage whenever selectedHouses, selectedMaterials, or quantities change
    const shipmentData = selectedHouses.map((shipment) => ({
      name: shipment.name,
      materials: selectedMaterials[shipment.name] || [],
      quantities: Object.keys(quantities)
        .filter((key) => key.startsWith(shipment.name))
        .reduce((acc, key) => {
          acc[key] = quantities[key];
          return acc;
        }, {}),
    }));

    localStorage.setItem("shipments", JSON.stringify(shipmentData));
  }, [selectedHouses, selectedMaterials, quantities]);

  return (
    <div className="flex-1 min-h-screen bg-white">
      <div className="p-6 w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Shipments</h2>
          <button
            onClick={createNewHouse}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center"
          >
            <span className="text-xl">+</span>
          </button>
        </div>
        {renderHouseCards()}
      </div>
    </div>
  );
};

export default Shipment;
