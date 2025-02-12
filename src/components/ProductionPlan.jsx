import React, { useState, useEffect } from "react";

const ProductionPlan = ({
  factorySlots,
  storeSlots,
  houseRequirements,
  shipmentRequirements,
}) => {
  const [productionPlan, setProductionPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProductionPlan = async () => {
    setLoading(true);
    try {
      // Get factory and store data from localStorage
      const factoryStoreData = JSON.parse(
        localStorage.getItem("factoryStoreData") || "{}"
      );
      console.log("Factory Store Data:", factoryStoreData);

      // Format factory slots - use actual values from factoryStoreData
      const formattedFactorySlots = {
        buildingMaterials: parseInt(factoryStoreData.buildingMaterials) || 0,
      };

      // Format store slots - use actual values from factoryStoreData
      const formattedStoreSlots = {
        buildingSupplies: parseInt(factoryStoreData.buildingSupplies) || 0,
        hardware: parseInt(factoryStoreData.hardware) || 0,
        farmers: parseInt(factoryStoreData.farmers) || 0,
        furniture: parseInt(factoryStoreData.furniture) || 0,
        gardening: parseInt(factoryStoreData.gardening) || 0,
        donut: parseInt(factoryStoreData.donut) || 0,
        fashion: parseInt(factoryStoreData.fashion) || 0,
        fastFood: parseInt(factoryStoreData.fastFood) || 0,
        homeAppliances: parseInt(factoryStoreData.homeAppliances) || 0,
        sportsShop: parseInt(factoryStoreData.sportsShop) || 0,
        toyShop: parseInt(factoryStoreData.toyShop) || 0,
        dessertShop: parseInt(factoryStoreData.dessertShop) || 0,
        countryStore: parseInt(factoryStoreData.countryStore) || 0,
        bureauOfRestoration:
          parseInt(factoryStoreData.bureauOfRestoration) || 0,
      };

      // Format house requirements from HouseUpgrades component
      const houseData = JSON.parse(
        localStorage.getItem("houseUpgrades") || "[]"
      );
      console.log("House Data:", houseData);

      const formattedHouseRequirements = houseData.map((house, index) => ({
        id: `house${index + 1}`,
        items: house.materials.reduce((acc, material) => {
          const quantity =
            parseInt(house.quantities[`${house.name}-${material.name}`]) || 0;
          if (quantity > 0) {
            acc[material.name] = quantity;
          }
          return acc;
        }, {}),
      }));

      // Format shipment requirements from Shipment component
      const shipmentData = JSON.parse(
        localStorage.getItem("shipments") || "[]"
      );
      console.log("Shipment Data:", shipmentData);

      const formattedShipmentRequirements = shipmentData.map(
        (shipment, index) => ({
          id: `ship${index + 1}`,
          items: shipment.materials.reduce((acc, material) => {
            const quantity =
              parseInt(
                shipment.quantities[`${shipment.name}-${material.name}`]
              ) || 0;
            if (quantity > 0) {
              acc[material.name] = quantity;
            }
            return acc;
          }, {}),
        })
      );

      // Get regional data from localStorage
      const regionalData = JSON.parse(
        localStorage.getItem("regionalData") ||
          '{"factories":{"greenValley":2,"sunnyIsles":2},"stores":{"greenValley":1,"sunnyIsles":1}}'
      );

      // Get inventory data from localStorage
      const inventoryData = JSON.parse(
        localStorage.getItem("inventoryData") ||
          '{"metal":0,"wood":0,"plastic":0,"nails":0,"planks":0}'
      );

      const data = {
        factorySlots: formattedFactorySlots,
        storeSlots: formattedStoreSlots,
        regionalFactorySlots: regionalData.factories,
        regionalStoreSlots: regionalData.stores,
        inventory: inventoryData,
        houseRequirements: formattedHouseRequirements,
        shipmentRequirements: formattedShipmentRequirements,
      };

      console.log("Final API Request Data:", data);

      try {
        const response = await fetch(
          "https://api.onlinecodechalao.in/api/simcity/production-plan",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Add CORS headers if needed
              Accept: "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("API Error Response:", errorText);
          throw new Error(
            `Failed to fetch production plan: ${response.status} ${errorText}`
          );
        }

        const result = await response.json();
        console.log("API Response:", result);
        setProductionPlan(result);
      } catch (fetchError) {
        console.error("Fetch error:", fetchError);
        throw new Error(`Network error: ${fetchError.message}`);
      }
    } catch (err) {
      console.error("Error in fetchProductionPlan:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderProductionSteps = () => {
    console.log("Rendering production steps with data:", productionPlan);
    if (!productionPlan || !productionPlan.productionPlan) {
      return null;
    }

    const plan = productionPlan.productionPlan;

    return (
      <div className="space-y-6">
        {/* Timeline View */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4 text-blue-600">
            Production Timeline
          </h3>
          <div className="space-y-4">
            {plan.map((step, index) => (
              <div key={index} className="border p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">
                    Time: {step.startTime} minutes
                  </span>
                </div>

                {/* Parallel Tasks */}
                {step.parallel && step.parallel.length > 0 && (
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-700 mb-2">
                      Parallel Tasks:
                    </h4>
                    {step.parallel.map((task, taskIndex) => (
                      <div key={taskIndex}>
                        {task.type === "factories" && task.productions ? (
                          <div className="ml-4">
                            <span className="font-medium">
                              Factories producing:
                            </span>
                            <ul className="list-none space-y-1 mt-1">
                              {task.productions.map((prod, prodIndex) => (
                                <li
                                  key={`${taskIndex}-${prodIndex}`}
                                  className="flex items-center space-x-2"
                                >
                                  <input
                                    type="checkbox"
                                    className="form-checkbox h-4 w-4 text-blue-600"
                                    checked={prod.isCompleted || false}
                                    onChange={(e) => {
                                      const updatedPlan = [
                                        ...productionPlan.productionPlan,
                                      ];
                                      const stepIndex = updatedPlan.findIndex(
                                        (s) => s.startTime === step.startTime
                                      );
                                      if (stepIndex !== -1) {
                                        // Mark the specific production item as completed
                                        updatedPlan[stepIndex].parallel[
                                          taskIndex
                                        ].productions[prodIndex] = {
                                          ...prod,
                                          isCompleted: e.target.checked,
                                        };
                                        setProductionPlan({
                                          ...productionPlan,
                                          productionPlan: updatedPlan,
                                        });
                                      }
                                    }}
                                  />
                                  <span
                                    className={
                                      prod.isCompleted
                                        ? "line-through text-gray-400"
                                        : ""
                                    }
                                  >
                                    {`${prod.quantity}x ${prod.item}${
                                      prod.forTask ? ` for ${prod.forTask}` : ""
                                    }`}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : task.type === "store" ? (
                          <div className="ml-4">
                            <span className="font-medium">
                              Store producing:
                            </span>
                            <div className="flex items-center space-x-2 mt-1">
                              <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-blue-600"
                                checked={task.production.isCompleted || false}
                                onChange={(e) => {
                                  const updatedPlan = [
                                    ...productionPlan.productionPlan,
                                  ];
                                  const stepIndex = updatedPlan.findIndex(
                                    (s) => s.startTime === step.startTime
                                  );
                                  if (stepIndex !== -1) {
                                    updatedPlan[stepIndex].parallel[
                                      taskIndex
                                    ].production = {
                                      ...task.production,
                                      isCompleted: e.target.checked,
                                    };
                                    setProductionPlan({
                                      ...productionPlan,
                                      productionPlan: updatedPlan,
                                    });
                                  }
                                }}
                              />
                              <span
                                className={
                                  task.production.isCompleted
                                    ? "line-through text-gray-400"
                                    : ""
                                }
                              >
                                {`${task.production.quantity}x ${
                                  task.production.item
                                }${
                                  task.production.forTask
                                    ? ` for ${task.production.forTask}`
                                    : ""
                                }`}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="ml-4">{`Unknown task: ${task.type}`}</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Completed Tasks */}
                {step.completedTask && (
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-700 mb-2">
                      Completed:
                    </h4>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      <span className="text-gray-600">
                        {step.completedTask.type === "house"
                          ? "House Upgrade"
                          : "Shipment"}
                        : {step.completedTask.id}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4 text-green-600">
            Production Summary
          </h3>
          <div className="space-y-2">
            <p className="text-gray-700">
              Total Time: {plan[plan.length - 1]?.startTime || 0} minutes
            </p>
            <p className="text-gray-700">
              Completed Tasks:{" "}
              {plan.filter((step) => step.completedTask).length}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-4">
      {!productionPlan ? (
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Production Plan</h2>
          <button
            onClick={fetchProductionPlan}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
          >
            <span>Generate Plan</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Production Plan Results
            </h2>
            <button
              onClick={() => setProductionPlan(null)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
            >
              Back
            </button>
          </div>
          {renderProductionSteps()}
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          Error: {error}
        </div>
      )}
    </div>
  );
};

export default ProductionPlan;
