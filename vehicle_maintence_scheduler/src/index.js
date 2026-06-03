const fs = require("fs");
const { fetchDepots, fetchVehicles } = require("./api");
const optimizeSchedule = require("./scheduler");

async function main() {
  try {
    const depots = await fetchDepots();
    const vehicles = await fetchVehicles();

    const results = [];

    for (const depot of depots) {
      const result = optimizeSchedule(
        vehicles,
        depot.MechanicHours
      );

      results.push({
        depotId: depot.ID,
        mechanicHours: depot.MechanicHours,
        totalImpact: result.totalImpact,
        tasksSelected: result.selectedTasks.length,
        selectedTasks: result.selectedTasks
      });

      console.log("\n====================");
      console.log(`Depot ${depot.ID}`);
      console.log(`Hours: ${depot.MechanicHours}`);
      console.log(`Total Impact: ${result.totalImpact}`);
      console.log(`Tasks Selected: ${result.selectedTasks.length}`);
    }

    fs.writeFileSync(
      "./output/results.json",
      JSON.stringify(results, null, 2)
    );

    console.log("\nResults saved to output/results.json");
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}

main();
