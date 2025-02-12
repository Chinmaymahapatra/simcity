import React from "react";
import { useState, useEffect } from "react";
import { FACTORIES } from "./materials.js";
import Navbar from "./components/Navbar";
import BoxSearch from "./components/BoxSearch";
import HouseUpgrades from "./components/HouseUpgrades";
import Shipment from "./components/Shipment";
import ProductionPlan from "./components/ProductionPlan";
import RegionalData from "./components/RegionalData";
import Inventory from "./components/Inventory";

function App() {
  const [selectedFactory, setSelectedFactory] = useState("buildingMaterials");
  const [basicFactoryCount, setBasicFactoryCount] = useState(1);
  const [customText, setCustomText] = useState("");

  // Add new state for tracking slots and requirements
  const [factorySlots, setFactorySlots] = useState({});
  const [storeSlots, setStoreSlots] = useState({});
  const [houseRequirements, setHouseRequirements] = useState([]);
  const [shipmentRequirements, setShipmentRequirements] = useState([]);

  // Function to format requirements from HouseUpgrades and Shipment components
  const formatRequirements = (materials, prefix) => {
    if (!materials) return [];

    return Object.entries(materials).map(([houseName, items]) => ({
      id: `${prefix}_${houseName}`,
      items: items.reduce((acc, item) => {
        const quantity = item.quantity || 1;
        acc[item.name] = quantity;
        return acc;
      }, {}),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        selectedFactory={selectedFactory}
        onFactorySelect={setSelectedFactory}
        basicFactoryCount={basicFactoryCount}
        onBasicFactoryCountChange={setBasicFactoryCount}
        customText={customText}
        onCustomTextChange={setCustomText}
        onSlotsChange={(factory, store) => {
          setFactorySlots(factory);
          setStoreSlots(store);
        }}
      />
      <div className="container mx-auto px-4 py-8 space-y-6">
        <RegionalData />
        <Inventory />
        <HouseUpgrades
          onRequirementsChange={(materials) => {
            setHouseRequirements(formatRequirements(materials, "house"));
          }}
        />
        <Shipment
          onRequirementsChange={(materials) => {
            setShipmentRequirements(formatRequirements(materials, "shipment"));
          }}
        />
        <ProductionPlan
          factorySlots={factorySlots}
          storeSlots={storeSlots}
          houseRequirements={houseRequirements}
          shipmentRequirements={shipmentRequirements}
        />
      </div>
    </div>
  );
}

export default App;
