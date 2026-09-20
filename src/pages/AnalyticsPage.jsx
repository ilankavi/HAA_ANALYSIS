import React, { useState } from 'react';
import { useData } from '../context/useData';
import { BarChart3 } from 'lucide-react';
import { TelemetryChart } from '../components/telemetry/TelemetryChart';

export const AnalyticsPage = () => {
  const { systems, generate24HourHistory } = useData();
  const [analyticsTimeRange, setAnalyticsTimeRange] = useState('24H');

  const fleetAvgHealth = systems.length > 0 
    ? Math.round(systems.reduce((a, s) => a + s.healthScore, 0) / systems.length)
    : 86;

  const fleetAvgPower = systems.length > 0
    ? (systems.reduce((a, s) => a + (s.telemetry?.power || 0), 0) / systems.length).toFixed(1)
    : 18.4;

  const fleetAvgExtTemp = systems.length > 0
    ? (systems.reduce((a, s) => a + (s.telemetry?.extTemp || 0), 0) / systems.length).toFixed(1)
    : -22.5;

  const sampleHistory = generate24HourHistory('FLEET_AVG', -22.5, false);

  return (
    <div className="page-container">
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BarChart3 size={22} color="var(--accent-blue)" />
            FLEET-LEVEL RELIABILITY ANALYTICS & INTELLIGENCE
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Comparative telemetry, thermal stress distribution, and component degradation metrics.
          </p>
        </div>

        {/* Range Selectors */}
        <div style={{ display: 'flex', gap: '0.25rem', background: 'var(--bg-secondary)', padding: '2px', borderRadius: '6px' }}>
          {['24H', '7D', '30D'].map(t => (
            <button
              key={t}
              onClick={() => setAnalyticsTimeRange(t)}
              style={{
                padding: '0.4rem 0.75rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                borderRadius: '4px',
                border: 'none',
                backgroundColor: analyticsTimeRange === t ? 'var(--accent-blue)' : 'transparent',
                color: analyticsTimeRange === t ? '#ffffff' : 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Summary KPI Row */}
      <div className="grid-cols-auto-fit" style={{ marginBottom: '1.5rem' }}>
        <div className="aira-card">
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>AVG FLEET HEALTH</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--status-normal)' }}>
            {fleetAvgHealth} / 100
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Stable across 10 zones</span>
        </div>

        <div className="aira-card">
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>AVG FLEET EXT TEMP</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)' }}>
            {fleetAvgExtTemp}°C
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Min: -34°C (Zone C)</span>
        </div>

        <div className="aira-card">
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>AVG POWER DRAW</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>
            {fleetAvgPower} W
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Total Fleet Load: {(fleetAvgPower * 10).toFixed(1)}W</span>
        </div>

        <div className="aira-card">
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>PROTECTION ACTIVATIONS</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--status-highrisk)' }}>
            14
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Heater cycles in past 24h</span>
        </div>
      </div>

      {/* Analytics Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        <TelemetryChart
          title="FLEET AVERAGE TEMPERATURE STRESS"
          dataPoints={sampleHistory}
          dataKey="extTemp"
          unit="°C"
          lineColor="#3b82f6"
        />
        <TelemetryChart
          title="FLEET POWER CONSUMPTION TRAJECTORY"
          dataPoints={sampleHistory}
          dataKey="power"
          unit="W"
          lineColor="#f97316"
        />
      </div>

      {/* System Comparative Bar Table */}
      <div className="aira-card">
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
          SYSTEM-BY-SYSTEM COMPARATIVE MATRIX
        </h3>
        <div className="aira-table-container">
          <table className="aira-table">
            <thead>
              <tr>
                <th>SYSTEM ID</th>
                <th>LOCATION</th>
                <th>EXT TEMP</th>
                <th>HEALTH</th>
                <th>POWER (W)</th>
                <th>VIBRATION (g)</th>
                <th>HEATER STATUS</th>
              </tr>
            </thead>
            <tbody>
              {systems.map(s => (
                <tr key={s.id}>
                  <td style={{ fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)' }}>{s.id}</td>
                  <td>{s.location}</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{s.telemetry?.extTemp}°C</td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{s.healthScore}</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{s.telemetry?.power}W</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{s.telemetry?.vibrationRms}g</td>
                  <td>
                    <span style={{ fontSize: '0.72rem', padding: '0.15rem 0.5rem', borderRadius: '4px', background: s.protection?.heaterStatus !== 'OFF' ? 'var(--status-highrisk-bg)' : 'var(--bg-tertiary)', color: s.protection?.heaterStatus !== 'OFF' ? 'var(--status-highrisk)' : 'var(--text-muted)' }}>
                      {s.protection?.heaterStatus || 'OFF'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
