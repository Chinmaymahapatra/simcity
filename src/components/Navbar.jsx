import React, { useState } from "react";
import { FACTORIES, STORES } from "../materials";

const Navbar = () => {
  // Create initial state with 0s
  const initialState = {
    ...Object.keys(FACTORIES).reduce((acc, key) => ({ ...acc, [key]: 0 }), {}),
    ...Object.keys(STORES).reduce((acc, key) => ({ ...acc, [key]: 0 }), {}),
  };

  // Load saved data from localStorage on component mount
  const [fields, setFields] = useState(() => {
    const savedData = localStorage.getItem("factoryStoreData");
    return savedData ? JSON.parse(savedData) : initialState;
  });

  const handleFieldChange = (e, fieldName, maxValue) => {
    const value = Math.min(parseInt(e.target.value) || 0, maxValue);
    setFields({
      ...fields,
      [fieldName]: value,
    });
  };

  const handleSubmit = () => {
    // Save to localStorage
    localStorage.setItem("factoryStoreData", JSON.stringify(fields));

    // Create and download JSON file
    const jsonData = JSON.stringify(fields, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "factory-store-data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert("Data saved successfully!");
  };

  return (
    <nav className="w-full bg-gray-800 text-white p-4 shadow-lg">
      <div className="container mx-auto max-w-full">
        <div className="flex flex-col lg:flex-row lg:justify-between">
          {/* Factory Fields */}
          <div className="lg:w-1/5 mb-6 lg:mb-0 lg:mr-2">
            <h4 className="text-lg font-semibold mb-3">Factories</h4>
            <div className="">
              {Object.entries(FACTORIES).map(([key, factory]) => (
                <div key={key} className="space-x-2 bg-gray-700 p-2 rounded-lg">
                  <span className="min-w-[80px] text-sm">{factory.name}</span>
                  <input
                    type="text"
                    value={fields[key]}
                    onChange={(e) =>
                      handleFieldChange(e, key, factory.maxSlots)
                    }
                    className="w-12 px-1 py-0.5 text-right bg-gray-600 border border-gray-500 rounded text-white"
                  />
                  <span className="text-gray-400 text-xs">
                    /{factory.maxSlots}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Store Fields */}
          <div className="lg:w-3/4">
            <h4 className="text-lg font-semibold mb-3">Stores</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {Object.entries(STORES).map(([key, store]) => (
                <div
                  key={key}
                  className="flex items-center space-x-2 bg-gray-700 p-2 rounded-lg"
                >
                  <span className="flex-1 min-w-[100px] text-sm">
                    {store.name}
                  </span>
                  <input
                    type="text"
                    value={fields[key]}
                    onChange={(e) => handleFieldChange(e, key, store.maxSlots)}
                    className="w-12 px-1 py-0.5 text-right bg-gray-600 border border-gray-500 rounded text-white"
                  />
                  <span className="text-gray-400 text-xs">
                    /{store.maxSlots}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save Data
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
