import React, { useState } from "react";
import {
  FACTORIES,
  STORES,
  REGIONAL_FACTORIES,
  REGIONAL_STORES,
} from "../materials";

const BoxSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [quantities, setQuantities] = useState({});

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

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
            type: `${storeData.name}`,
            details: `Production Time: ${details.time} minutes`,
            requirements: details.requires || {},
          });
        }
      });
    });

    setSearchResults(results);
  };

  const handleSelectMaterial = (material) => {
    setSelectedMaterials([...selectedMaterials, material]);
    setSearchResults([]);
    setSearchTerm("");
  };

  const handleQuantityChange = (materialName, value) => {
    const quantity = parseInt(value) || 0;
    setQuantities({ ...quantities, [materialName]: quantity });
  };

  const handleRemoveMaterial = (indexToRemove) => {
    const materialName = selectedMaterials[indexToRemove].name;
    setSelectedMaterials(
      selectedMaterials.filter((_, index) => index !== indexToRemove)
    );
    const newQuantities = { ...quantities };
    delete newQuantities[materialName];
    setQuantities(newQuantities);
  };

  const renderSearchResults = () => {
    return searchResults.map((result, index) => (
      <div
        key={index}
        className="mt-2 bg-white shadow border border-gray-200 rounded-lg p-3 cursor-pointer hover:bg-gray-50"
        onClick={() => handleSelectMaterial(result)}
      >
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-bold">{result.name}</h3>
            <p className="text-gray-600">Type: {result.type}</p>
          </div>
        </div>

        <div className="mt-2">
          <p className="text-sm text-gray-600 mb-2">{result.details}</p>
          <div className="mt-2">
            <p className="text-sm font-medium text-gray-700 mb-1">
              Requirements:
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(result.requirements).map(([material, amount]) => (
                <span
                  key={material}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm"
                >
                  {material}: {amount}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="p-3">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
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

        <div className="mt-4 max-h-[calc(100vh-12rem)] overflow-y-auto">
          {renderSearchResults()}
        </div>

        {selectedMaterials.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Selected Materials:</h4>
            <div className="space-y-2">
              {selectedMaterials.map((material, index) => (
                <div key={index} className="bg-gray-50 p-2 rounded-lg">
                  <div className="flex justify-between">
                    <span className="font-small">{material.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-small text-gray-600">
                        {material.type}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveMaterial(index);
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
                  <div className="space-x-2">
                    <label className="text-sm text-gray-600">Quantity:</label>
                    <input
                      type="number"
                      value={quantities[material.name] || ""}
                      onChange={(e) =>
                        handleQuantityChange(material.name, e.target.value)
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
};

export default BoxSearch;
