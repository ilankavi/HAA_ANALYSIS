import React, { useState } from 'react';
import { useData } from '../context/useData';
import { isFirebaseConfigured } from '../firebase/config';
import { Terminal, Send, CheckCircle, Database } from 'lucide-react';

export const AdminPage = () => {
  const { updateSystemDataFromAdmin, dataMode } = useData();

  const [form, setForm] = useState({
    systemId: 'HAA-03',
    extTemp: -34.0,
    intTemp: -31.0,
    compTemp: -29.0,
    humidity: 68,
    pressure: 42.0,
    voltage: 11.7,
    current: 2.8,
    batteryTemp: -18.0,
    vibrationRms: 0.12,
    healthScore: 42,
    riskLevel: 'HIGH RISK',
    riskTrend: 'Increasing',
    heaterStatus: 'ON',
    batteryProtection: 'ACTIVE'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateSystemDataFromAdmin(form.systemId, form);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="page-container">
      
      {/* Page Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Terminal size={22} color="var(--accent-blue)" />
          ADMINISTRATOR TEST BENCH & HARDWARE INTEGRATION GUIDE
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          Manual sensor payload generator for live testing + step-by-step setup guide for ESP32 and Firebase Realtime Database.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '1.5rem' }}>
        
        {/* SECTION 1: MANUAL DATA INPUT FORM */}
        <div className="aira-card" style={{ borderLeft: '4px solid var(--accent-blue)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Send size={18} color="var(--accent-blue)" />
              MANUAL SENSOR PAYLOAD INJECTOR
            </h3>
            <span style={{ fontSize: '0.72rem', padding: '0.2rem 0.6rem', borderRadius: '4px', background: 'var(--bg-secondary)', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
              MODE: {dataMode} {isFirebaseConfigured ? '(FIREBASE CONNECTED)' : '(LOCAL STATE)'}
            </span>
          </div>

          {submitted && (
            <div style={{ padding: '0.75rem', borderRadius: '6px', backgroundColor: 'var(--status-normal-bg)', color: 'var(--status-normal)', border: '1px solid var(--status-normal-border)', marginBottom: '1rem', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle size={16} /> Telemetry payload transmitted to system {form.systemId}! Dashboard updated.
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {/* System Selection & Risk Level */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>SYSTEM ID</label>
                <select
                  value={form.systemId}
                  onChange={(e) => setForm({ ...form, systemId: e.target.value })}
                  style={{ width: '100%', padding: '0.45rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
                >
                  {Array.from({ length: 10 }, (_, i) => `HAA-${(i + 1).toString().padStart(2, '0')}`).map(sId => (
                    <option key={sId} value={sId}>{sId}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>RISK LEVEL</label>
                <select
                  value={form.riskLevel}
                  onChange={(e) => setForm({ ...form, riskLevel: e.target.value })}
                  style={{ width: '100%', padding: '0.45rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                >
                  <option value="NORMAL">NORMAL</option>
                  <option value="WARNING">WARNING</option>
                  <option value="HIGH RISK">HIGH RISK</option>
                  <option value="CRITICAL">CRITICAL</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>HEALTH SCORE</label>
                <input
                  type="number"
                  value={form.healthScore}
                  onChange={(e) => setForm({ ...form, healthScore: e.target.value })}
                  style={{ width: '100%', padding: '0.45rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
                />
              </div>
            </div>

            {/* Temperatures */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>EXT TEMP (°C)</label>
                <input
                  type="number"
                  step="0.1"
                  value={form.extTemp}
                  onChange={(e) => setForm({ ...form, extTemp: e.target.value })}
                  style={{ width: '100%', padding: '0.45rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>INT TEMP (°C)</label>
                <input
                  type="number"
                  step="0.1"
                  value={form.intTemp}
                  onChange={(e) => setForm({ ...form, intTemp: e.target.value })}
                  style={{ width: '100%', padding: '0.45rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>BATTERY TEMP (°C)</label>
                <input
                  type="number"
                  step="0.1"
                  value={form.batteryTemp}
                  onChange={(e) => setForm({ ...form, batteryTemp: e.target.value })}
                  style={{ width: '100%', padding: '0.45rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
                />
              </div>
            </div>

            {/* Electrical V/I & Humidity/Pressure */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>VOLTAGE (V)</label>
                <input
                  type="number"
                  step="0.1"
                  value={form.voltage}
                  onChange={(e) => setForm({ ...form, voltage: e.target.value })}
                  style={{ width: '100%', padding: '0.45rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>CURRENT (A)</label>
                <input
                  type="number"
                  step="0.1"
                  value={form.current}
                  onChange={(e) => setForm({ ...form, current: e.target.value })}
                  style={{ width: '100%', padding: '0.45rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>HUMIDITY (%)</label>
                <input
                  type="number"
                  value={form.humidity}
                  onChange={(e) => setForm({ ...form, humidity: e.target.value })}
                  style={{ width: '100%', padding: '0.45rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>PRESSURE (kPa)</label>
                <input
                  type="number"
                  step="0.1"
                  value={form.pressure}
                  onChange={(e) => setForm({ ...form, pressure: e.target.value })}
                  style={{ width: '100%', padding: '0.45rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
                />
              </div>
            </div>

            {/* Actuators */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>HEATER CONTROL</label>
                <select
                  value={form.heaterStatus}
                  onChange={(e) => setForm({ ...form, heaterStatus: e.target.value })}
                  style={{ width: '100%', padding: '0.45rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                >
                  <option value="OFF">HEATER OFF</option>
                  <option value="ON">HEATER ON</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>VIBRATION RMS (g)</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.vibrationRms}
                  onChange={(e) => setForm({ ...form, vibrationRms: e.target.value })}
                  style={{ width: '100%', padding: '0.45rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
                />
              </div>
            </div>

            <button
              type="submit"
              style={{
                marginTop: '0.5rem',
                padding: '0.65rem 1rem',
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
              <Send size={16} /> TRANSMIT SENSOR TELEMETRY PAYLOAD
            </button>
          </form>
        </div>

        {/* SECTION 2: FIREBASE & ESP32 HARDWARE INTEGRATION GUIDE */}
        <div className="aira-card" style={{ borderLeft: '4px solid var(--status-normal)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Database size={20} color="var(--status-normal)" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              FIREBASE & ESP32 / TINYML INTEGRATION GUIDE
            </h3>
          </div>

          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.85rem', lineHeight: 1.5 }}>
            
            <div style={{ background: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: '6px' }}>
              <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.2rem' }}>1. Create Firebase Project</strong>
              Go to <a href="https://console.firebase.google.com/" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-blue)' }}>Firebase Console</a> $\rightarrow$ Add Project $\rightarrow$ Enable Realtime Database in test mode (`".read": true, ".write": true`).
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: '6px' }}>
              <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.2rem' }}>2. Environment Variables (.env)</strong>
              Create a `.env` file in the project root with your Firebase credentials:
              <pre style={{ background: 'var(--bg-primary)', padding: '0.4rem', borderRadius: '4px', marginTop: '0.3rem', fontSize: '0.7rem', color: 'var(--accent-cyan)' }}>
{`VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_DATABASE_URL=https://your-app-default-rtdb.firebaseio.com`}
              </pre>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: '6px' }}>
              <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.2rem' }}>3. ESP32 / MCU C++ Code Snippet</strong>
              ESP32 pushes sensor readings directly via HTTP PUT:
              <pre style={{ background: 'var(--bg-primary)', padding: '0.4rem', borderRadius: '4px', marginTop: '0.3rem', fontSize: '0.7rem', color: 'var(--status-normal)', overflowX: 'auto' }}>
{`#include <HTTPClient.h>

void sendTelemetry() {
  HTTPClient http;
  String url = "https://your-app.firebaseio.com/systems/HAA-03.json";
  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  
  String json = "{\\"healthScore\\":42, \\"riskLevel\\":\\"HIGH RISK\\", \\"telemetry\\":{\\"extTemp\\":-34.0}}";
  int code = http.PUT(json);
  http.end();
}`}
              </pre>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: '6px' }}>
              <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.2rem' }}>4. TinyML & Edge AI Execution</strong>
              The TinyML model runs inference locally on the ESP32 (45ms latency). If risk exceeds threshold, MCU triggers thermal heater relays locally even if network link fails!
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
