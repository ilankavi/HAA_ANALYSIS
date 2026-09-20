import React, { useState, useEffect } from 'react';
import { DataContext } from './DataContextObject';
import { 
  FLEET_SYSTEMS_INITIAL, 
  ACTIVE_ALERTS_INITIAL, 
  SIMULATION_SCENARIOS, 
  generate24HourHistory 
} from '../data/mockData';
import { db, ref, onValue, set, isFirebaseConfigured } from '../firebase/config';

export const DataProvider = ({ children }) => {
  const [dataMode, setDataMode] = useState('DEMO'); // 'DEMO' | 'LIVE'
  const [activeScenario, setActiveScenario] = useState('NORMAL');
  const [systems, setSystems] = useState(FLEET_SYSTEMS_INITIAL);
  const [activeAlerts] = useState(ACTIVE_ALERTS_INITIAL);
  const [theme, setTheme] = useState(() => localStorage.getItem('aira_theme') || 'dark');
  const [isNetworkOffline, setIsNetworkOffline] = useState(false);
  const [isFirebaseEmpty, setIsFirebaseEmpty] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(new Date().toLocaleTimeString());
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'High Risk Thermal Stress',
      systemId: 'HAA-03',
      message: 'External temperature reached -34°C. Heater activated at 68%.',
      timestamp: '14:32:10',
      unread: true,
      priority: 'HIGH'
    },
    {
      id: 'notif-2',
      title: 'Predictive Early Warning',
      systemId: 'HAA-07',
      message: 'Rapid temperature decline detected (-4.2°C/hr). Pre-armed heater loop.',
      timestamp: '14:32:12',
      unread: true,
      priority: 'MEDIUM'
    },
    {
      id: 'notif-3',
      title: 'Battery Low Temp Warning',
      systemId: 'HAA-05',
      message: 'Battery enclosure temperature dropped to -4°C.',
      timestamp: '14:32:00',
      unread: false,
      priority: 'MEDIUM'
    }
  ]);

  // Apply theme class to <html> element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('aira_theme', theme);
  }, [theme]);

  // Live Firebase Realtime Database Listener
  useEffect(() => {
    if (dataMode === 'LIVE' && isFirebaseConfigured && db) {
      const systemsRef = ref(db, 'systems');
      return onValue(systemsRef, (snapshot) => {
        const val = snapshot.val();
        if (val) {
          setIsFirebaseEmpty(false);
          const firebaseList = Array.isArray(val) ? val : Object.values(val);
          setSystems(firebaseList);
          setLastSyncTime(new Date().toLocaleTimeString());
        } else {
          setIsFirebaseEmpty(true);
          setSystems([]);
        }
      }, (err) => {
        console.error('Firebase listen error:', err);
        setIsFirebaseEmpty(true);
      });
    }
  }, [dataMode]);

  const effectiveIsFirebaseEmpty = dataMode === 'LIVE' && !isFirebaseConfigured ? true : isFirebaseEmpty;

  // Handle Scenario Switching in Demo Mode
  const triggerScenario = (scenarioKey) => {
    if (dataMode !== 'DEMO') {
      setDataMode('DEMO');
    }

    setActiveScenario(scenarioKey);
    const scenario = SIMULATION_SCENARIOS[scenarioKey];
    if (!scenario) return;

    if (scenarioKey === 'NETWORK_FAILURE') {
      setIsNetworkOffline(true);
      setSystems(prev => scenario.apply(prev));
      addNotification({
        title: 'Cloud Connection Lost',
        systemId: 'ALL FLEET',
        message: 'Network link offline. Offline-First protection mode activated on edge controllers.',
        priority: 'CRITICAL'
      });
    } else {
      setIsNetworkOffline(false);
      setSystems(scenario.apply(FLEET_SYSTEMS_INITIAL));
      addNotification({
        title: `Simulation: ${scenario.title}`,
        systemId: 'FLEET SIMULATION',
        message: scenario.description,
        priority: scenarioKey === 'EXTREME_COLD' ? 'HIGH' : 'LOW'
      });
    }
    setLastSyncTime(new Date().toLocaleTimeString());
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const addNotification = (notif) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      unread: true,
      ...notif
    };
    setNotifications(prev => [newNotif, ...prev.slice(0, 15)]);
  };

  const markNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  // Write manual data from Admin Test Bench
  const updateSystemDataFromAdmin = async (systemId, payload) => {
    const timeStr = new Date().toLocaleTimeString();
    
    // Calculate basic power if not provided
    const power = Number((payload.voltage * payload.current).toFixed(2));
    
    const updatedSystemData = {
      id: systemId,
      name: payload.name || `System ${systemId}`,
      location: payload.location || 'Zone Admin',
      moduleType: payload.moduleType || 'Custom Test Module',
      healthScore: Number(payload.healthScore),
      riskLevel: payload.riskLevel,
      riskTrend: payload.riskTrend || 'Stable',
      riskTrendDirection: payload.riskTrend === 'Increasing' ? '↗' : payload.riskTrend === 'Improving' ? '↘' : '→',
      protectionStatus: payload.heaterStatus === 'ON' ? 'Active' : 'Standby',
      lastUpdate: timeStr,
      telemetry: {
        extTemp: Number(payload.extTemp),
        intTemp: Number(payload.intTemp),
        compTemp: Number(payload.compTemp),
        humidity: Number(payload.humidity),
        pressure: Number(payload.pressure),
        airDensity: Number((payload.pressure * 0.012).toFixed(2)),
        uv: 'LOW',
        dewPoint: Number((payload.extTemp - (100 - payload.humidity) / 5).toFixed(1)),
        condensationRisk: payload.humidity > 60 ? 'HIGH' : 'LOW',
        voltage: Number(payload.voltage),
        current: Number(payload.current),
        power,
        batteryTemp: Number(payload.batteryTemp),
        batteryStatus: payload.batteryTemp < 0 ? 'WARNING' : 'NORMAL',
        vibrationRms: Number(payload.vibrationRms),
        vibrationX: Number((payload.vibrationRms * 0.6).toFixed(2)),
        vibrationY: Number((payload.vibrationRms * 0.5).toFixed(2)),
        vibrationZ: Number((payload.vibrationRms * 0.7).toFixed(2)),
        thermalCycles: 12,
        mechanicalStress: payload.vibrationRms > 0.15 ? 'HIGH' : 'LOW'
      },
      aiAnalysis: {
        environmentalStress: payload.riskLevel === 'HIGH RISK' ? 'CRITICAL' : 'LOW',
        riskLevel: payload.riskLevel,
        riskTrend: payload.riskTrend || 'Stable',
        primaryContributors: [
          `Ext Temp: ${payload.extTemp}°C`,
          `Battery Temp: ${payload.batteryTemp}°C`,
          `Power Draw: ${power}W`
        ],
        mlInterpretation: payload.mlInterpretation || 'Manual sensor payload pushed from admin console.'
      },
      riskContributors: {
        tempTrend: payload.extTemp < -25 ? 'HIGH' : 'LOW',
        humidity: payload.humidity > 60 ? 'MEDIUM' : 'LOW',
        powerConsumption: power > 25 ? 'MEDIUM' : 'LOW',
        pressure: payload.pressure < 60 ? 'MEDIUM' : 'LOW',
        vibration: payload.vibrationRms > 0.15 ? 'HIGH' : 'LOW'
      },
      protection: {
        thermalControl: payload.heaterStatus === 'ON' ? 'ACTIVE' : 'STANDBY',
        heaterStatus: payload.heaterStatus === 'ON' ? 'ON — 75%' : 'OFF',
        heaterPower: payload.heaterStatus === 'ON' ? 75 : 0,
        batteryProtection: payload.batteryProtection || 'STANDBY',
        powerManagement: 'NOMINAL',
        nonCriticalLoads: payload.riskLevel === 'HIGH RISK' ? 'REDUCED' : 'NORMAL',
        protectionMode: 'AUTOMATIC'
      },
      explainableAlert: payload.riskLevel === 'HIGH RISK' ? {
        title: 'WHY THIS ALERT?',
        systemId,
        factors: [
          `Manual temperature override set to ${payload.extTemp}°C.`,
          `Battery temperature degraded to ${payload.batteryTemp}°C.`,
          `Current consumption reading ${payload.current} A.`
        ],
        systemResponses: [
          'Thermal protection circuit triggered',
          'Admin telemetry payload updated'
        ]
      } : null
    };

    if (dataMode === 'LIVE' && isFirebaseConfigured && db) {
      try {
        const sysRef = ref(db, `systems/${systemId}`);
        await set(sysRef, updatedSystemData);
        console.log(`Pushed system ${systemId} data to Firebase successfully.`);
      } catch (err) {
        console.error('Failed pushing data to Firebase:', err);
      }
    } else {
      // In Demo Mode or unconfigured Firebase, update local state
      setSystems(prev => prev.map(s => s.id === systemId ? updatedSystemData : s));
      setIsFirebaseEmpty(false);
    }

    addNotification({
      title: `Telemetry Updated: ${systemId}`,
      systemId,
      message: `Ext Temp: ${payload.extTemp}°C | Health Score: ${payload.healthScore}`,
      priority: payload.riskLevel === 'HIGH RISK' ? 'HIGH' : 'LOW'
    });

    setLastSyncTime(new Date().toLocaleTimeString());
  };

  return (
    <DataContext.Provider value={{
      dataMode,
      setDataMode,
      activeScenario,
      systems,
      activeAlerts,
      notifications,
      theme,
      isNetworkOffline,
      isFirebaseEmpty: effectiveIsFirebaseEmpty,
      lastSyncTime,
      triggerScenario,
      toggleTheme,
      markNotificationsRead,
      updateSystemDataFromAdmin,
      generate24HourHistory
    }}>
      {children}
    </DataContext.Provider>
  );
};
