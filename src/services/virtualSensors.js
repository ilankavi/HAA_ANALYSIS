// ==========================================
// VIRTUAL SENSOR SIMULATION SERVICE
// Sensors:
// 1. External Temperature
// 2. Internal Electronics Temperature
// 3. Battery Temperature
// 4. Humidity
// 5. Atmospheric Pressure
// ==========================================


// ------------------------------------------
// SENSOR 1: EXTERNAL TEMPERATURE
// ------------------------------------------
export function generateExternalTemperature(
  previousTemperature = -34
) {
  // Small natural temperature fluctuation
  const fluctuation = (Math.random() - 0.5) * 1.2;

  // Gradual temperature change
  const newTemperature =
    previousTemperature + fluctuation;

  // Simulated high-altitude temperature range
  return Number(
    Math.max(-60, Math.min(-15, newTemperature)).toFixed(1)
  );
}


// ------------------------------------------
// SENSOR 2: INTERNAL ELECTRONICS TEMPERATURE
// ------------------------------------------
export function generateInternalTemperature(
  externalTemperature,
  previousTemperature = -31
) {
  // Electronics enclosure is normally warmer
  // than the outside environment
  const targetTemperature =
    externalTemperature + 3;

  // Gradually move toward target temperature
  const adjustment =
    (targetTemperature - previousTemperature) * 0.15;

  // Small sensor fluctuation
  const fluctuation =
    (Math.random() - 0.5) * 0.6;

  const newTemperature =
    previousTemperature +
    adjustment +
    fluctuation;

  // Simulated HAA temperature range
  return Number(
    Math.max(-50, Math.min(-10, newTemperature)).toFixed(1)
  );
}


// ------------------------------------------
// SENSOR 3: BATTERY TEMPERATURE
// ------------------------------------------
export function generateBatteryTemperature(
  internalTemperature,
  previousTemperature = -28
) {
  // Battery temperature follows
  // internal electronics temperature
  const targetTemperature =
    internalTemperature + 2;

  // Gradual response
  const adjustment =
    (targetTemperature - previousTemperature) * 0.12;

  // Small natural fluctuation
  const fluctuation =
    (Math.random() - 0.5) * 0.5;

  const newTemperature =
    previousTemperature +
    adjustment +
    fluctuation;

  // Realistic battery temperature range
  return Number(
    Math.max(-45, Math.min(0, newTemperature)).toFixed(1)
  );
}


// ------------------------------------------
// SENSOR 4: HUMIDITY
// ------------------------------------------
export function generateHumidity(
  externalTemperature,
  previousHumidity = 68
) {
  // Colder conditions can increase
  // relative humidity in the environment
  const coldEffect =
    Math.max(
      0,
      (-externalTemperature - 25) * 0.08
    );

  // Small natural fluctuation
  const fluctuation =
    (Math.random() - 0.5) * 1.2;

  const newHumidity =
    previousHumidity +
    fluctuation +
    coldEffect * 0.05;

  // Keep humidity realistic
  return Number(
    Math.max(20, Math.min(95, newHumidity)).toFixed(1)
  );
}


// ------------------------------------------
// SENSOR 5: ATMOSPHERIC PRESSURE
// ------------------------------------------
export function generatePressure(
  previousPressure = 42
) {
  // Small natural atmospheric fluctuation
  const fluctuation =
    (Math.random() - 0.5) * 0.8;

  const newPressure =
    previousPressure +
    fluctuation;

  // High-altitude demonstration range
  return Number(
    Math.max(30, Math.min(60, newPressure)).toFixed(1)
  );
}
