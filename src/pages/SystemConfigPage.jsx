import React, { useState } from 'react';
import { Sliders, Save, Check } from 'lucide-react';

export const SystemConfigPage = () => {
  const [saved, setSaved] = useState(false);
  const [config, setConfig] = useState({
    tempWarningThreshold: -25,
    tempHighRiskThreshold: -30,
    voltageTripLow: 11.2,
    heaterMaxPower: 85,
    tinyMLSensitivity: 'HIGH',
    autoProtectionEnabled: true
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="page-container">
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sliders size={22} color="var(--accent-blue)" />
          SYSTEM CONFIGURATION & PROTECTION TRIP SETPOINTS
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          Adjust environmental stress thresholds, heater control power caps, and TinyML sensitivity.
        </p>
      </div>

      <form onSubmit={handleSave} className="aira-card" style={{ maxWidth: '700px' }}>
        {saved && (
          <div style={{ padding: '0.75rem', borderRadius: '6px', backgroundColor: 'var(--status-normal-bg)', color: 'var(--status-normal)', border: '1px solid var(--status-normal-border)', marginBottom: '1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Check size={16} /> Configuration thresholds saved successfully.
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
              Temperature Warning Threshold (°C)
            </label>
            <input
              type="number"
              value={config.tempWarningThreshold}
              onChange={(e) => setConfig({ ...config, tempWarningThreshold: Number(e.target.value) })}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
              Temperature High-Risk Trip Level (°C)
            </label>
            <input
              type="number"
              value={config.tempHighRiskThreshold}
              onChange={(e) => setConfig({ ...config, tempHighRiskThreshold: Number(e.target.value) })}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
              Minimum Voltage Cutoff / Trip (V)
            </label>
            <input
              type="number"
              step="0.1"
              value={config.voltageTripLow}
              onChange={(e) => setConfig({ ...config, voltageTripLow: Number(e.target.value) })}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
              Maximum Thermal Heater Output Power (%)
            </label>
            <input
              type="number"
              value={config.heaterMaxPower}
              onChange={(e) => setConfig({ ...config, heaterMaxPower: Number(e.target.value) })}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
              TinyML Classifier Sensitivity
            </label>
            <select
              value={config.tinyMLSensitivity}
              onChange={(e) => setConfig({ ...config, tinyMLSensitivity: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
            >
              <option value="LOW">LOW — Standard baseline</option>
              <option value="MEDIUM">MEDIUM — Balanced prediction</option>
              <option value="HIGH">HIGH — Aggressive early warning</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
            <input
              type="checkbox"
              id="autoProtection"
              checked={config.autoProtectionEnabled}
              onChange={(e) => setConfig({ ...config, autoProtectionEnabled: e.target.checked })}
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
            <label htmlFor="autoProtection" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer' }}>
              Enable Automatic Countermeasure Execution (MCU Autonomy)
            </label>
          </div>

          <button
            type="submit"
            style={{
              marginTop: '1rem',
              padding: '0.65rem 1.25rem',
              fontSize: '0.85rem',
              fontWeight: 700,
              borderRadius: '6px',
              border: 'none',
              backgroundColor: 'var(--accent-blue)',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              gap: '0.4rem'
            }}
          >
            <Save size={16} /> Save Configuration Setpoints
          </button>
        </div>
      </form>
    </div>
  );
};
