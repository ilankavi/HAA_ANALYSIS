import React from 'react';
import { useData } from '../../context/useData';
import { Play, Snowflake, Gauge, Activity, WifiOff } from 'lucide-react';

export const DemoScenarioBar = () => {
  const { activeScenario, triggerScenario, dataMode } = useData();

  const scenarios = [
    {
      key: 'NORMAL',
      label: '1. Normal Operation',
      icon: Play,
      desc: '+20°C | Nominal V/I/P | Standby Heater'
    },
    {
      key: 'EXTREME_COLD',
      label: '2. Extreme Cold',
      icon: Snowflake,
      desc: '-32°C Ext Temp | -25°C Batt | Heater Active'
    },
    {
      key: 'LOW_PRESSURE',
      label: '3. Low Pressure',
      icon: Gauge,
      desc: '54 kPa (~5000m) | Thin Air Cooling Stress'
    },
    {
      key: 'THERMAL_CYCLING',
      label: '4. Thermal Cycling',
      icon: Activity,
      desc: '+20°C ↔ -30°C Rapid Oscillation'
    },
    {
      key: 'NETWORK_FAILURE',
      label: '5. Network Failure',
      icon: WifiOff,
      desc: 'Cloud Link Offline | Edge Protection Active'
    }
  ];

  return (
    <div
      style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '0.65rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            color: 'var(--accent-blue)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase'
          }}
        >
          DEMO SIMULATION SCENARIOS:
        </span>
        <span style={{ fontSize: '0.73rem', color: 'var(--text-muted)' }}>
          (Select scenario to update fleet telemetry in real time)
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
        {scenarios.map(sc => {
          const Icon = sc.icon;
          const isActive = dataMode === 'DEMO' && activeScenario === sc.key;
          return (
            <button
              key={sc.key}
              onClick={() => triggerScenario(sc.key)}
              title={sc.desc}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.8rem',
                borderRadius: '6px',
                border: isActive
                  ? '1px solid var(--accent-blue)'
                  : '1px solid var(--border-subtle)',
                backgroundColor: isActive
                  ? 'rgba(59, 130, 246, 0.18)'
                  : 'var(--bg-card)',
                color: isActive ? 'var(--accent-blue)' : 'var(--text-secondary)',
                fontSize: '0.75rem',
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap'
              }}
            >
              <Icon size={14} color={isActive ? 'var(--accent-blue)' : 'var(--text-muted)'} />
              {sc.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
