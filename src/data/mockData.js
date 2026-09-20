// AIRA — Complete Telemetry Mock Dataset & Simulation Presets

export const FLEET_SYSTEMS_INITIAL = [
  {
    id: 'HAA-01',
    name: 'Thermal Module Alpha',
    location: 'Zone A',
    moduleType: 'Avionics Enclosure',
    healthScore: 94,
    riskLevel: 'NORMAL',
    riskTrend: 'Stable',
    riskTrendDirection: '→',
    protectionStatus: 'Standby',
    lastUpdate: '14:32:05',
    telemetry: {
      extTemp: -18.2,
      intTemp: -12.5,
      compTemp: -8.1,
      humidity: 34,
      pressure: 82.4,
      airDensity: 0.98,
      uv: 'LOW',
      dewPoint: -24.5,
      condensationRisk: 'LOW',
      voltage: 12.4,
      current: 1.1,
      power: 13.64,
      batteryTemp: 14.2,
      batteryStatus: 'NORMAL',
      vibrationRms: 0.08,
      vibrationX: 0.04,
      vibrationY: 0.05,
      vibrationZ: 0.05,
      thermalCycles: 4,
      mechanicalStress: 'LOW'
    },
    aiAnalysis: {
      environmentalStress: 'LOW',
      riskLevel: 'NORMAL',
      riskTrend: 'Stable',
      primaryContributors: ['Nominal operating environment'],
      mlInterpretation: 'System operating within optimal parameters. Environmental stress is minimal.'
    },
    riskContributors: {
      tempTrend: 'LOW',
      humidity: 'LOW',
      powerConsumption: 'LOW',
      pressure: 'LOW',
      vibration: 'LOW'
    },
    protection: {
      thermalControl: 'STANDBY',
      heaterStatus: 'OFF',
      heaterPower: 0,
      batteryProtection: 'STANDBY',
      powerManagement: 'NOMINAL',
      nonCriticalLoads: 'NORMAL',
      protectionMode: 'AUTOMATIC'
    },
    explainableAlert: null
  },
  {
    id: 'HAA-02',
    name: 'Battery Enclosure Subsystem',
    location: 'Zone B',
    moduleType: 'Power Distribution Unit',
    healthScore: 89,
    riskLevel: 'NORMAL',
    riskTrend: 'Stable',
    riskTrendDirection: '→',
    protectionStatus: 'Standby',
    lastUpdate: '14:32:01',
    telemetry: {
      extTemp: -22.1,
      intTemp: -15.4,
      compTemp: -11.0,
      humidity: 41,
      pressure: 76.2,
      airDensity: 0.92,
      uv: 'LOW',
      dewPoint: -26.0,
      condensationRisk: 'LOW',
      voltage: 12.1,
      current: 1.4,
      power: 16.94,
      batteryTemp: 8.5,
      batteryStatus: 'NORMAL',
      vibrationRms: 0.10,
      vibrationX: 0.06,
      vibrationY: 0.07,
      vibrationZ: 0.05,
      thermalCycles: 9,
      mechanicalStress: 'LOW'
    },
    aiAnalysis: {
      environmentalStress: 'LOW',
      riskLevel: 'NORMAL',
      riskTrend: 'Stable',
      primaryContributors: ['Slight ambient temperature drop'],
      mlInterpretation: 'Electronics health is strong. No intervention required.'
    },
    riskContributors: {
      tempTrend: 'LOW',
      humidity: 'LOW',
      powerConsumption: 'LOW',
      pressure: 'LOW',
      vibration: 'LOW'
    },
    protection: {
      thermalControl: 'STANDBY',
      heaterStatus: 'OFF',
      heaterPower: 0,
      batteryProtection: 'STANDBY',
      powerManagement: 'NOMINAL',
      nonCriticalLoads: 'NORMAL',
      protectionMode: 'AUTOMATIC'
    },
    explainableAlert: null
  },
  {
    id: 'HAA-03',
    name: 'Thermal Protection Unit',
    location: 'Zone C',
    moduleType: 'Primary Sensor Stack',
    healthScore: 42,
    riskLevel: 'HIGH RISK',
    riskTrend: 'Increasing',
    riskTrendDirection: '↗',
    protectionStatus: 'Active',
    lastUpdate: '14:32:10',
    telemetry: {
      extTemp: -34.0,
      intTemp: -31.0,
      compTemp: -29.0,
      humidity: 68,
      pressure: 42.0,
      airDensity: 0.54,
      uv: 'LOW',
      dewPoint: -37.0,
      condensationRisk: 'HIGH',
      voltage: 11.7,
      current: 2.8,
      power: 32.76,
      batteryTemp: -18.0,
      batteryStatus: 'WARNING',
      vibrationRms: 0.12,
      vibrationX: 0.12,
      vibrationY: 0.09,
      vibrationZ: 0.15,
      thermalCycles: 17,
      mechanicalStress: 'MEDIUM'
    },
    aiAnalysis: {
      environmentalStress: 'CRITICAL',
      riskLevel: 'HIGH',
      riskTrend: '↗ Increasing',
      primaryContributors: [
        'Rapid temperature decrease (-34°C ambient)',
        'Increasing humidity (68% RH with frost formation risk)',
        'Elevated power consumption (32.8 W above baseline)'
      ],
      mlInterpretation: 'Environmental and electronic stress is increasing rapidly. TinyML models project impending thermal collapse without heater intervention.'
    },
    riskContributors: {
      tempTrend: 'HIGH',
      humidity: 'MEDIUM',
      powerConsumption: 'MEDIUM',
      pressure: 'LOW',
      vibration: 'LOW'
    },
    protection: {
      thermalControl: 'ACTIVE',
      heaterStatus: 'ON — 68%',
      heaterPower: 68,
      batteryProtection: 'ACTIVE',
      powerManagement: 'ACTIVE',
      nonCriticalLoads: 'REDUCED',
      protectionMode: 'AUTOMATIC'
    },
    explainableAlert: {
      title: 'WHY THIS ALERT?',
      systemId: 'HAA-03',
      factors: [
        'External temperature decreased rapidly (-34°C).',
        'Relative humidity rose to 68% at sub-zero temperatures.',
        'Current consumption (2.8 A) exceeded baseline due to battery thermal resistance.',
        'TinyML edge model detected an escalating environmental-stress trend.'
      ],
      systemResponses: [
        'Heater activated at 68% power output',
        'Thermal protection control loop engaged',
        'Battery low-temp protection enabled',
        'High-priority admin notification dispatched'
      ]
    }
  },
  {
    id: 'HAA-04',
    name: 'SHAA High-Altitude Payload',
    location: 'Zone D',
    moduleType: 'Communication Relay',
    healthScore: 91,
    riskLevel: 'NORMAL',
    riskTrend: 'Stable',
    riskTrendDirection: '→',
    protectionStatus: 'Standby',
    lastUpdate: '14:31:55',
    telemetry: {
      extTemp: -19.5,
      intTemp: -14.0,
      compTemp: -9.5,
      humidity: 38,
      pressure: 68.5,
      airDensity: 0.84,
      uv: 'MODERATE',
      dewPoint: -23.0,
      condensationRisk: 'LOW',
      voltage: 12.3,
      current: 1.0,
      power: 12.30,
      batteryTemp: 12.0,
      batteryStatus: 'NORMAL',
      vibrationRms: 0.07,
      vibrationX: 0.04,
      vibrationY: 0.04,
      vibrationZ: 0.04,
      thermalCycles: 5,
      mechanicalStress: 'LOW'
    },
    aiAnalysis: {
      environmentalStress: 'LOW',
      riskLevel: 'NORMAL',
      riskTrend: 'Stable',
      primaryContributors: ['Nominal telemetry metrics'],
      mlInterpretation: 'System health score optimal at 91/100.'
    },
    riskContributors: {
      tempTrend: 'LOW',
      humidity: 'LOW',
      powerConsumption: 'LOW',
      pressure: 'LOW',
      vibration: 'LOW'
    },
    protection: {
      thermalControl: 'STANDBY',
      heaterStatus: 'OFF',
      heaterPower: 0,
      batteryProtection: 'STANDBY',
      powerManagement: 'NOMINAL',
      nonCriticalLoads: 'NORMAL',
      protectionMode: 'AUTOMATIC'
    },
    explainableAlert: null
  },
  {
    id: 'HAA-05',
    name: 'Extreme Cold Relay Stack',
    location: 'Zone E',
    moduleType: 'Radar Control Unit',
    healthScore: 78,
    riskLevel: 'WARNING',
    riskTrend: 'Stable',
    riskTrendDirection: '→',
    protectionStatus: 'Standby',
    lastUpdate: '14:32:00',
    telemetry: {
      extTemp: -27.5,
      intTemp: -21.0,
      compTemp: -16.5,
      humidity: 55,
      pressure: 58.0,
      airDensity: 0.72,
      uv: 'LOW',
      dewPoint: -29.0,
      condensationRisk: 'MEDIUM',
      voltage: 11.9,
      current: 1.9,
      power: 22.61,
      batteryTemp: -4.0,
      batteryStatus: 'WARNING',
      vibrationRms: 0.14,
      vibrationX: 0.08,
      vibrationY: 0.09,
      vibrationZ: 0.09,
      thermalCycles: 14,
      mechanicalStress: 'MEDIUM'
    },
    aiAnalysis: {
      environmentalStress: 'MEDIUM',
      riskLevel: 'WARNING',
      riskTrend: 'Stable',
      primaryContributors: ['Low battery temperature (-4°C)', 'Elevated internal humidity'],
      mlInterpretation: 'System stress is elevated. Monitoring battery heater status closely.'
    },
    riskContributors: {
      tempTrend: 'MEDIUM',
      humidity: 'MEDIUM',
      powerConsumption: 'LOW',
      pressure: 'LOW',
      vibration: 'MEDIUM'
    },
    protection: {
      thermalControl: 'STANDBY',
      heaterStatus: 'OFF',
      heaterPower: 0,
      batteryProtection: 'MONITORING',
      powerManagement: 'NOMINAL',
      nonCriticalLoads: 'NORMAL',
      protectionMode: 'AUTOMATIC'
    },
    explainableAlert: null
  },
  {
    id: 'HAA-06',
    name: 'Cryo-Shielded Telemetry Node',
    location: 'Zone F',
    moduleType: 'Optical Payload Unit',
    healthScore: 96,
    riskLevel: 'NORMAL',
    riskTrend: 'Improving',
    riskTrendDirection: '↘',
    protectionStatus: 'Standby',
    lastUpdate: '14:32:08',
    telemetry: {
      extTemp: -15.0,
      intTemp: -8.0,
      compTemp: -4.0,
      humidity: 30,
      pressure: 92.0,
      airDensity: 1.10,
      uv: 'LOW',
      dewPoint: -22.0,
      condensationRisk: 'LOW',
      voltage: 12.5,
      current: 0.9,
      power: 11.25,
      batteryTemp: 18.0,
      batteryStatus: 'NORMAL',
      vibrationRms: 0.05,
      vibrationX: 0.03,
      vibrationY: 0.03,
      vibrationZ: 0.03,
      thermalCycles: 2,
      mechanicalStress: 'LOW'
    },
    aiAnalysis: {
      environmentalStress: 'LOW',
      riskLevel: 'NORMAL',
      riskTrend: 'Improving',
      primaryContributors: ['Favorable environmental conditions'],
      mlInterpretation: 'Peak health score 96/100. System highly stable.'
    },
    riskContributors: {
      tempTrend: 'LOW',
      humidity: 'LOW',
      powerConsumption: 'LOW',
      pressure: 'LOW',
      vibration: 'LOW'
    },
    protection: {
      thermalControl: 'STANDBY',
      heaterStatus: 'OFF',
      heaterPower: 0,
      batteryProtection: 'STANDBY',
      powerManagement: 'NOMINAL',
      nonCriticalLoads: 'NORMAL',
      protectionMode: 'AUTOMATIC'
    },
    explainableAlert: null
  },
  {
    id: 'HAA-07',
    name: 'Predictive Monitoring Sentinel',
    location: 'Zone G',
    moduleType: 'High Altitude MCU Stack',
    healthScore: 74,
    riskLevel: 'WARNING',
    riskTrend: 'Increasing',
    riskTrendDirection: '↗',
    protectionStatus: 'Monitoring',
    lastUpdate: '14:32:12',
    telemetry: {
      extTemp: -29.8,
      intTemp: -23.4,
      compTemp: -18.2,
      humidity: 62,
      pressure: 49.5,
      airDensity: 0.62,
      uv: 'LOW',
      dewPoint: -32.5,
      condensationRisk: 'MEDIUM',
      voltage: 11.8,
      current: 2.3,
      power: 27.14,
      batteryTemp: -11.0,
      batteryStatus: 'WARNING',
      vibrationRms: 0.11,
      vibrationX: 0.07,
      vibrationY: 0.07,
      vibrationZ: 0.08,
      thermalCycles: 15,
      mechanicalStress: 'MEDIUM'
    },
    aiAnalysis: {
      environmentalStress: 'HIGH',
      riskLevel: 'WARNING',
      riskTrend: '↗ Increasing',
      primaryContributors: [
        'Rapid ambient temperature drop detected (-4.2°C/hr)',
        'Increasing relative humidity (62%)',
        'Power consumption elevated above 24h baseline (+18%)'
      ],
      mlInterpretation: 'TinyML early warning classifier predicts state transition from WARNING to HIGH RISK within 30-45 minutes if thermal gradient continues.'
    },
    riskContributors: {
      tempTrend: 'HIGH',
      humidity: 'MEDIUM',
      powerConsumption: 'MEDIUM',
      pressure: 'LOW',
      vibration: 'LOW'
    },
    protection: {
      thermalControl: 'PRE-ARMED',
      heaterStatus: 'STANDBY',
      heaterPower: 0,
      batteryProtection: 'ACTIVE',
      powerManagement: 'MONITORING',
      nonCriticalLoads: 'NORMAL',
      protectionMode: 'AUTOMATIC'
    },
    explainableAlert: {
      title: 'PREDICTIVE EARLY WARNING DETECTED',
      systemId: 'HAA-07',
      factors: [
        'Rapid temperature decrease detected (-4.2°C per hour).',
        'Internal humidity rising toward dew point (-32.5°C).',
        'Power draw is 18% above nominal baseline.',
        'State progression predicted: NORMAL → WARNING → HIGH RISK → CRITICAL.'
      ],
      systemResponses: [
        'Pre-armed auxiliary thermal heater loop',
        'Initiated high-frequency telemetry logging (1-sec sampling)',
        'Triggered predictive administrator dispatch warning'
      ]
    }
  },
  {
    id: 'HAA-08',
    name: 'SHAA Solar Array Controller',
    location: 'Zone H',
    moduleType: 'Power Harvest Subsystem',
    healthScore: 92,
    riskLevel: 'NORMAL',
    riskTrend: 'Stable',
    riskTrendDirection: '→',
    protectionStatus: 'Standby',
    lastUpdate: '14:31:48',
    telemetry: {
      extTemp: -16.8,
      intTemp: -10.2,
      compTemp: -6.0,
      humidity: 32,
      pressure: 79.0,
      airDensity: 0.95,
      uv: 'HIGH',
      dewPoint: -25.0,
      condensationRisk: 'LOW',
      voltage: 12.6,
      current: 0.7,
      power: 8.82,
      batteryTemp: 16.5,
      batteryStatus: 'NORMAL',
      vibrationRms: 0.06,
      vibrationX: 0.03,
      vibrationY: 0.04,
      vibrationZ: 0.03,
      thermalCycles: 6,
      mechanicalStress: 'LOW'
    },
    aiAnalysis: {
      environmentalStress: 'LOW',
      riskLevel: 'NORMAL',
      riskTrend: 'Stable',
      primaryContributors: ['Optimal solar charging profile'],
      mlInterpretation: 'Battery and electronics health nominal.'
    },
    riskContributors: {
      tempTrend: 'LOW',
      humidity: 'LOW',
      powerConsumption: 'LOW',
      pressure: 'LOW',
      vibration: 'LOW'
    },
    protection: {
      thermalControl: 'STANDBY',
      heaterStatus: 'OFF',
      heaterPower: 0,
      batteryProtection: 'STANDBY',
      powerManagement: 'CHARGING',
      nonCriticalLoads: 'NORMAL',
      protectionMode: 'AUTOMATIC'
    },
    explainableAlert: null
  },
  {
    id: 'HAA-09',
    name: 'SHAA Low-Pressure Node',
    location: 'Zone I',
    moduleType: 'Barometric Telemetry Unit',
    healthScore: 88,
    riskLevel: 'NORMAL',
    riskTrend: 'Stable',
    riskTrendDirection: '→',
    protectionStatus: 'Standby',
    lastUpdate: '14:32:02',
    telemetry: {
      extTemp: -21.0,
      intTemp: -14.8,
      compTemp: -10.4,
      humidity: 39,
      pressure: 51.2,
      airDensity: 0.64,
      uv: 'MODERATE',
      dewPoint: -27.0,
      condensationRisk: 'LOW',
      voltage: 12.2,
      current: 1.2,
      power: 14.64,
      batteryTemp: 10.0,
      batteryStatus: 'NORMAL',
      vibrationRms: 0.09,
      vibrationX: 0.05,
      vibrationY: 0.05,
      vibrationZ: 0.06,
      thermalCycles: 11,
      mechanicalStress: 'LOW'
    },
    aiAnalysis: {
      environmentalStress: 'LOW',
      riskLevel: 'NORMAL',
      riskTrend: 'Stable',
      primaryContributors: ['Low pressure environment (~5000m equivalent)'],
      mlInterpretation: 'Air density is reduced but component temperatures remain safe.'
    },
    riskContributors: {
      tempTrend: 'LOW',
      humidity: 'LOW',
      powerConsumption: 'LOW',
      pressure: 'MEDIUM',
      vibration: 'LOW'
    },
    protection: {
      thermalControl: 'STANDBY',
      heaterStatus: 'OFF',
      heaterPower: 0,
      batteryProtection: 'STANDBY',
      powerManagement: 'NOMINAL',
      nonCriticalLoads: 'NORMAL',
      protectionMode: 'AUTOMATIC'
    },
    explainableAlert: null
  },
  {
    id: 'HAA-10',
    name: 'Autonomous Edge Gateway',
    location: 'Zone J',
    moduleType: 'Edge AI Processor',
    healthScore: 95,
    riskLevel: 'NORMAL',
    riskTrend: 'Stable',
    riskTrendDirection: '→',
    protectionStatus: 'Standby',
    lastUpdate: '14:32:14',
    telemetry: {
      extTemp: -17.0,
      intTemp: -11.0,
      compTemp: -7.0,
      humidity: 35,
      pressure: 84.0,
      airDensity: 1.01,
      uv: 'LOW',
      dewPoint: -24.0,
      condensationRisk: 'LOW',
      voltage: 12.4,
      current: 1.3,
      power: 16.12,
      batteryTemp: 15.0,
      batteryStatus: 'NORMAL',
      vibrationRms: 0.07,
      vibrationX: 0.04,
      vibrationY: 0.04,
      vibrationZ: 0.04,
      thermalCycles: 3,
      mechanicalStress: 'LOW'
    },
    aiAnalysis: {
      environmentalStress: 'LOW',
      riskLevel: 'NORMAL',
      riskTrend: 'Stable',
      primaryContributors: ['Baseline operations'],
      mlInterpretation: 'TinyML model running inference at 45ms per frame. Zero anomalies.'
    },
    riskContributors: {
      tempTrend: 'LOW',
      humidity: 'LOW',
      powerConsumption: 'LOW',
      pressure: 'LOW',
      vibration: 'LOW'
    },
    protection: {
      thermalControl: 'STANDBY',
      heaterStatus: 'OFF',
      heaterPower: 0,
      batteryProtection: 'STANDBY',
      powerManagement: 'NOMINAL',
      nonCriticalLoads: 'NORMAL',
      protectionMode: 'AUTOMATIC'
    },
    explainableAlert: null
  }
];

// Active Alerts Dataset
export const ACTIVE_ALERTS_INITIAL = [
  {
    id: 'ALT-1001',
    priority: 'HIGH RISK',
    systemId: 'HAA-03',
    location: 'Zone C',
    reason: 'Extreme cold stress (-34°C) with elevated battery current draw (2.8 A)',
    currentResponse: 'Heater engaged at 68% power output; non-critical load shedding active',
    timestamp: '14:32:10',
    count: 3
  },
  {
    id: 'ALT-1002',
    priority: 'EARLY WARNING',
    systemId: 'HAA-07',
    location: 'Zone G',
    reason: 'Predictive model detected rapid temperature decline (-4.2°C/hr) & rising humidity',
    currentResponse: 'Pre-armed auxiliary thermal heater loop; increased sampling frequency',
    timestamp: '14:32:12',
    count: 1
  },
  {
    id: 'ALT-1003',
    priority: 'EARLY WARNING',
    systemId: 'HAA-05',
    location: 'Zone E',
    reason: 'Battery temperature dropped below zero (-4°C) with moderate internal dew point risk',
    currentResponse: 'Battery thermal protection system placed on active monitoring mode',
    timestamp: '14:32:00',
    count: 1
  }
];

// 24-Hour Historical Chart Data generator for individual systems
export function generate24HourHistory(systemId, baseExtTemp = -18, isHighRisk = false) {
  const hours = Array.from({ length: 24 }, (_, i) => {
    const h = i.toString().padStart(2, '0');
    return `${h}:00`;
  });

  return hours.map((time, idx) => {
    let tempDrop = 0;
    if (isHighRisk && idx > 12) {
      tempDrop = (idx - 12) * 1.5; // Progressive drop after 12:00
    }
    const extTemp = Number((baseExtTemp - tempDrop + Math.sin(idx / 3) * 1.5).toFixed(1));
    const intTemp = Number((extTemp + 4.5 + Math.cos(idx / 4) * 0.8).toFixed(1));
    const compTemp = Number((intTemp + 3.0).toFixed(1));
    const humidity = Math.min(85, Math.max(25, Math.round(35 + (isHighRisk ? idx * 1.5 : Math.sin(idx) * 5))));
    const pressure = Number((80 - (idx % 5) * 0.4).toFixed(1));
    const voltage = Number((12.4 - (isHighRisk && idx > 14 ? 0.7 : 0.1 * Math.sin(idx))).toFixed(1));
    const current = Number((1.0 + (isHighRisk && idx > 14 ? 1.8 : 0.2 * Math.cos(idx))).toFixed(1));
    const power = Number((voltage * current).toFixed(1));
    const batteryTemp = Number((intTemp + 10 - (isHighRisk && idx > 14 ? 12 : 0)).toFixed(1));
    const vibration = Number((0.08 + (idx % 4) * 0.01).toFixed(2));
    const healthScore = Math.max(30, Math.min(100, Math.round(95 - (isHighRisk && idx > 12 ? (idx - 12) * 4.5 : (idx % 3)))));

    return {
      time,
      extTemp,
      intTemp,
      compTemp,
      humidity,
      pressure,
      voltage,
      current,
      power,
      batteryTemp,
      vibration,
      healthScore,
      riskState: healthScore > 80 ? 'NORMAL' : healthScore > 60 ? 'WARNING' : 'HIGH RISK'
    };
  });
}

// 5 Preset Scenarios Data Generators
export const SIMULATION_SCENARIOS = {
  NORMAL: {
    id: 'NORMAL',
    title: 'NORMAL OPERATION',
    description: 'System operating within standard environmental parameters.',
    apply: (systems) => systems.map(sys => ({
      ...sys,
      healthScore: sys.id === 'HAA-03' ? 88 : 95,
      riskLevel: 'NORMAL',
      riskTrend: 'Stable',
      riskTrendDirection: '→',
      protectionStatus: 'Standby',
      telemetry: {
        ...sys.telemetry,
        extTemp: 20.0,
        intTemp: 24.5,
        compTemp: 28.0,
        humidity: 35,
        pressure: 1013.0,
        airDensity: 1.22,
        voltage: 12.1,
        current: 0.8,
        power: 9.68,
        batteryTemp: 22.0,
        batteryStatus: 'NORMAL',
        vibrationRms: 0.10
      },
      aiAnalysis: {
        environmentalStress: 'LOW',
        riskLevel: 'NORMAL',
        riskTrend: 'Stable',
        primaryContributors: ['Nominal temperature and pressure'],
        mlInterpretation: 'System operating within normal parameters. Environmental stress is LOW.'
      },
      protection: {
        thermalControl: 'STANDBY',
        heaterStatus: 'OFF',
        heaterPower: 0,
        batteryProtection: 'STANDBY',
        powerManagement: 'NOMINAL',
        nonCriticalLoads: 'NORMAL',
        protectionMode: 'AUTOMATIC'
      }
    }))
  },

  EXTREME_COLD: {
    id: 'EXTREME_COLD',
    title: 'EXTREME COLD',
    description: 'Ambient temperature drops to -32°C. Thermal stress triggers active heating.',
    apply: (systems) => systems.map(sys => {
      const isTarget = sys.id === 'HAA-03' || sys.id === 'HAA-07';
      return {
        ...sys,
        healthScore: isTarget ? 45 : 72,
        riskLevel: isTarget ? 'HIGH RISK' : 'WARNING',
        riskTrend: 'Increasing',
        riskTrendDirection: '↗',
        protectionStatus: 'Active',
        telemetry: {
          ...sys.telemetry,
          extTemp: -32.0,
          intTemp: -28.5,
          compTemp: -24.0,
          humidity: 45,
          voltage: 10.9,
          current: 1.9,
          power: 20.71,
          batteryTemp: -25.0,
          batteryStatus: 'WARNING'
        },
        aiAnalysis: {
          environmentalStress: 'HIGH',
          riskLevel: isTarget ? 'HIGH' : 'WARNING',
          riskTrend: '↗ Increasing',
          primaryContributors: ['Extreme ambient cold (-32°C)', 'Low battery cell temperature (-25°C)'],
          mlInterpretation: 'Extreme cold is increasing environmental and battery stress. Auto-protection active.'
        },
        protection: {
          thermalControl: 'ACTIVE',
          heaterStatus: 'ON — 85%',
          heaterPower: 85,
          batteryProtection: 'ACTIVE',
          powerManagement: 'ACTIVE',
          nonCriticalLoads: 'REDUCED',
          protectionMode: 'AUTOMATIC'
        }
      };
    })
  },

  LOW_PRESSURE: {
    id: 'LOW_PRESSURE',
    title: 'LOW PRESSURE (~5000m)',
    description: 'Simulates ~5000m altitude pressure (540 hPa) with reduced air cooling efficiency.',
    apply: (systems) => systems.map(sys => ({
      ...sys,
      healthScore: sys.id === 'HAA-03' ? 52 : 78,
      riskLevel: sys.id === 'HAA-03' ? 'HIGH RISK' : 'WARNING',
      riskTrend: 'Stable',
      riskTrendDirection: '→',
      protectionStatus: 'Active',
      telemetry: {
        ...sys.telemetry,
        pressure: 54.0, // 54.0 kPa (~540 hPa)
        airDensity: 0.61,
        compTemp: sys.telemetry.compTemp + 8,
        humidity: 28
      },
      aiAnalysis: {
        environmentalStress: 'HIGH',
        riskLevel: sys.id === 'HAA-03' ? 'HIGH' : 'WARNING',
        riskTrend: 'Stable',
        primaryContributors: ['Low pressure (54 kPa / ~5000m equivalent)', 'Reduced convective air cooling efficiency'],
        mlInterpretation: 'Cooling efficiency reduced due to thin air density. Thermal stress HIGH.'
      },
      protection: {
        thermalControl: 'ACTIVE',
        heaterStatus: 'OFF',
        heaterPower: 0,
        batteryProtection: 'MONITORING',
        powerManagement: 'COOLING ASSIST',
        nonCriticalLoads: 'REDUCED',
        protectionMode: 'AUTOMATIC'
      }
    }))
  },

  THERMAL_CYCLING: {
    id: 'THERMAL_CYCLING',
    title: 'THERMAL CYCLING',
    description: 'Rapid oscillation (+20°C → -30°C → +15°C → -25°C → +20°C) inducing mechanical stress.',
    apply: (systems) => systems.map(sys => ({
      ...sys,
      healthScore: 64,
      riskLevel: 'WARNING',
      riskTrend: 'Increasing',
      riskTrendDirection: '↗',
      protectionStatus: 'Monitoring',
      telemetry: {
        ...sys.telemetry,
        thermalCycles: sys.telemetry.thermalCycles + 8,
        mechanicalStress: 'HIGH',
        vibrationRms: 0.22
      },
      aiAnalysis: {
        environmentalStress: 'HIGH',
        riskLevel: 'WARNING',
        riskTrend: '↗ Increasing',
        primaryContributors: ['Thermal cycles detected (8 cycles/6hr)', 'Expansion/contraction stress on solder joints'],
        mlInterpretation: 'Rapid thermal cycling detected (+20°C ↔ -30°C). Predictive risk increasing.'
      },
      protection: {
        thermalControl: 'ACTIVE',
        heaterStatus: 'MODULATING',
        heaterPower: 40,
        batteryProtection: 'MONITORING',
        powerManagement: 'NOMINAL',
        nonCriticalLoads: 'NORMAL',
        protectionMode: 'AUTOMATIC'
      }
    }))
  },

  NETWORK_FAILURE: {
    id: 'NETWORK_FAILURE',
    title: 'NETWORK FAILURE',
    description: 'Cloud connection offline. Edge MCU runs local safety & thermal protection autonomously.',
    apply: (systems) => systems.map(sys => ({
      ...sys,
      protectionStatus: 'Offline Safety Mode',
      protection: {
        ...sys.protection,
        protectionMode: 'OFFLINE-FIRST AUTOMATIC'
      },
      aiAnalysis: {
        ...sys.aiAnalysis,
        primaryContributors: ['Cloud telemetry link offline', 'Edge processing active locally'],
        mlInterpretation: 'Cloud connectivity lost. Local ESP32 edge intelligence maintaining safety loops.'
      }
    }))
  }
};
