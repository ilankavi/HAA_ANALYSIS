import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/useData';
import { StatusBadge } from '../components/common/StatusBadge';
import { TelemetryCard } from '../components/telemetry/TelemetryCard';
import { TelemetryChart } from '../components/telemetry/TelemetryChart';
import {
  generateExternalTemperature,
  generateInternalTemperature,
  generateBatteryTemperature,
  generateHumidity,
  generatePressure
} from '../services/virtualSensors';
import { 
  ArrowLeft, 
  Thermometer, 
  Zap, 
  Activity, 
  Cpu, 
  ShieldCheck, 
  HelpCircle, 
  CheckCircle2, 
  Gauge, 
  Droplets,
  Radio
} from 'lucide-react';

export const SystemDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { systems, generate24HourHistory, isFirebaseEmpty } = useData();

  // Find system from context dataset
  const baseSystem = systems.find(s => s.id === id) || systems[0];

  // Local state holding current live telemetry instance
  const [liveSystem, setLiveSystem] = useState(baseSystem);
  const [prevBase, setPrevBase] = useState(baseSystem);
  const [chartMetric, setChartMetric] = useState('extTemp');

  // Keep liveSystem in sync when baseSystem changes from route or scenario navigation
  if (baseSystem !== prevBase) {
    setPrevBase(baseSystem);
    setLiveSystem(baseSystem);
  }

  // Virtual Sensor Simulation Engine (2000ms polling sequence)
  useEffect(() => {
    if (!baseSystem) return;

    const interval = setInterval(() => {
      setLiveSystem(prevSystem => {
        if (!prevSystem) return prevSystem;

        const prevTel = prevSystem.telemetry || {};

        // Sequential Virtual Sensor Chained Generation
        // 1. External Temperature
        const newExtTemp = generateExternalTemperature(prevTel.extTemp ?? -34);
        
        // 2. Internal Electronics Temperature (depends on newExtTemp)
        const newIntTemp = generateInternalTemperature(newExtTemp, prevTel.intTemp ?? -31);

        // 3. Battery Temperature (depends on newIntTemp)
        const newBatteryTemp = generateBatteryTemperature(newIntTemp, prevTel.batteryTemp ?? -28);

        // 4. Humidity (depends on newExtTemp)
        const newHumidity = generateHumidity(newExtTemp, prevTel.humidity ?? 68);

        // 5. Atmospheric Pressure (independent slowly changing pressure)
        const newPressure = generatePressure(prevTel.pressure ?? 42);

        // Derived physical calculations
        const newAirDensity = Number((newPressure * 0.012).toFixed(2));
        const newDewPoint = Number((newExtTemp - (100 - newHumidity) / 5).toFixed(1));
        const newCondensationRisk = newHumidity > 60 ? 'HIGH' : 'LOW';
        const newTimestamp = new Date().toLocaleTimeString();

        // Return updated system state preserving all existing properties
        return {
          ...prevSystem,
          lastUpdate: newTimestamp,
          telemetry: {
            ...prevTel,
            extTemp: newExtTemp,
            intTemp: newIntTemp,
            batteryTemp: newBatteryTemp,
            humidity: newHumidity,
            pressure: newPressure,
            airDensity: newAirDensity,
            dewPoint: newDewPoint,
            condensationRisk: newCondensationRisk
          }
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [id, baseSystem]);

  const system = liveSystem || baseSystem;

  const historyData = generate24HourHistory(
    system?.id || 'HAA-03',
    system?.telemetry?.extTemp || -34,
    system?.riskLevel === 'HIGH RISK'
  );

  if (!system && isFirebaseEmpty) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2 style={{ color: 'var(--text-secondary)' }}>Awaiting Live Sensor Data</h2>
        <p style={{ color: 'var(--text-muted)' }}>No telemetry available for system {id} yet.</p>
        <button onClick={() => navigate('/')} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>Return to Overview</button>
      </div>
    );
  }

  const tel = system?.telemetry || {};
  const ai = system?.aiAnalysis || {};
  const prot = system?.protection || {};
  const explain = system?.explainableAlert;
  const isHighRisk = system?.riskLevel === 'HIGH RISK' || system?.riskLevel === 'HIGH';

  return (
    <div className="page-container">
      
      {/* Top Navigation Back Button & Title Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              padding: '0.45rem 0.85rem',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.8rem',
              fontWeight: 600
            }}
          >
            <ArrowLeft size={16} /> Back
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                {system?.id}
              </h2>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                {system?.name} ({system?.location})
              </span>
              <StatusBadge status={system?.riskLevel} size="medium" pulse={isHighRisk} />
              
              {/* Virtual Sensor Live Heartbeat Pill */}
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.5rem',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(6, 182, 212, 0.15)',
                  color: 'var(--accent-cyan)',
                  border: '1px solid rgba(6, 182, 212, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                <Radio size={12} className="animate-pulse-subtle" /> VIRTUAL SENSORS LIVE (2s)
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
              Subsystem Module: {system?.moduleType} | Last Telemetry Pulse: <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>{system?.lastUpdate}</span>
            </p>
          </div>
        </div>

        {/* Health Score Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '0.6rem 1.2rem',
            borderRadius: '8px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-medium)'
          }}
        >
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block', fontWeight: 700 }}>
              HEALTH SCORE
            </span>
            <span style={{ fontSize: '1.6rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: system?.healthScore > 80 ? 'var(--status-normal)' : 'var(--status-highrisk)' }}>
              {system?.healthScore} / 100
            </span>
          </div>
        </div>
      </div>

      {/* Grid Layout Section 1: AI Diagnosis & Explainable Alert Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        
        {/* AI SYSTEM DIAGNOSIS */}
        <div className="aira-card" style={{ borderLeft: '4px solid var(--accent-blue)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Cpu size={20} color="var(--accent-blue)" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                AI / TINYML SYSTEM DIAGNOSIS
              </h3>
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
              MODEL CONFIDENCE: 98.4%
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.85rem' }}>
            <div style={{ background: 'var(--bg-secondary)', padding: '0.6rem', borderRadius: '6px' }}>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block' }}>ENVIRONMENTAL STRESS</span>
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: ai.environmentalStress === 'CRITICAL' ? 'var(--status-highrisk)' : 'var(--status-normal)' }}>
                {ai.environmentalStress || 'LOW'}
              </span>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: '0.6rem', borderRadius: '6px' }}>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block' }}>RISK TREND</span>
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                {ai.riskTrend || 'Stable'}
              </span>
            </div>
          </div>

          <div style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>PRIMARY CONTRIBUTORS:</span>
            <ul style={{ margin: '0.35rem 0 0 1.1rem', fontSize: '0.78rem', color: 'var(--text-primary)' }}>
              {ai.primaryContributors?.map((item, idx) => (
                <li key={idx} style={{ marginBottom: '0.2rem' }}>{item}</li>
              ))}
            </ul>
          </div>

          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', background: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: '6px', borderLeft: '3px solid var(--accent-indigo)' }}>
            <strong style={{ color: 'var(--text-primary)' }}>ML Interpretation:</strong> {ai.mlInterpretation}
          </div>
        </div>

        {/* WHY AM I SEEING THIS ALERT? (Explainable AI Panel) */}
        <div className="aira-card" style={{ borderLeft: '4px solid var(--status-warning)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <HelpCircle size={20} color="var(--status-warning)" />
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              WHY AM I SEEING THIS ALERT?
            </h3>
          </div>

          {explain ? (
            <div>
              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--status-warning)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  RISK INCREASE FACTORS:
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.35rem' }}>
                  {explain.factors.map((f, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.78rem', color: 'var(--text-primary)' }}>
                      <span style={{ fontWeight: 800, color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)' }}>0{i+1}</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--status-normal)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  AUTOMATED SYSTEM RESPONSE:
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', marginTop: '0.35rem' }}>
                  {explain.systemResponses.map((r, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.73rem', color: 'var(--text-secondary)', background: 'var(--bg-secondary)', padding: '0.35rem 0.5rem', borderRadius: '4px' }}>
                      <CheckCircle2 size={13} color="var(--status-normal)" /> {r}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
              <ShieldCheck size={28} color="var(--status-normal)" style={{ margin: '0 auto 0.5rem' }} />
              System operating within safe baseline parameters. No risk escalation explanations triggered.
            </div>
          )}
        </div>

      </div>

      {/* Section 2: Environmental Telemetry */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Thermometer size={18} color="var(--accent-blue)" />
          1. ENVIRONMENTAL TELEMETRY (LIVE VIRTUAL STREAM)
        </h3>

        <div className="grid-cols-auto-fit">
          <TelemetryCard
            title="External Temperature"
            value={tel.extTemp !== undefined ? `${tel.extTemp}` : '—'}
            unit="°C"
            subtitle="Virtual Sensor #1 (Live)"
            status={tel.extTemp < -30 ? 'CRITICAL' : tel.extTemp < -20 ? 'WARNING' : 'NORMAL'}
            icon={Thermometer}
            highlight
          />
          <TelemetryCard
            title="Internal Temperature"
            value={tel.intTemp !== undefined ? `${tel.intTemp}` : '—'}
            unit="°C"
            subtitle="Virtual Sensor #2 (Ext+3°C)"
            status={tel.intTemp < -25 ? 'WARNING' : 'NORMAL'}
            icon={Thermometer}
          />
          <TelemetryCard
            title="Component Temperature"
            value={tel.compTemp !== undefined ? `${tel.compTemp}` : '—'}
            unit="°C"
            subtitle="MCU / IC Junction"
            status="NORMAL"
            icon={Cpu}
          />
          <TelemetryCard
            title="Relative Humidity"
            value={tel.humidity !== undefined ? `${tel.humidity}` : '—'}
            unit="%"
            subtitle="Virtual Sensor #4 (Live)"
            status={tel.humidity > 60 ? 'WARNING' : 'NORMAL'}
            icon={Droplets}
          />
          <TelemetryCard
            title="Atmospheric Pressure"
            value={tel.pressure !== undefined ? `${tel.pressure}` : '—'}
            unit="kPa"
            subtitle="Virtual Sensor #5 (Live)"
            status={tel.pressure < 50 ? 'WARNING' : 'NORMAL'}
            icon={Gauge}
          />
          <TelemetryCard
            title="Air Density"
            value={tel.airDensity !== undefined ? `${tel.airDensity}` : '—'}
            unit="kg/m³"
            subtitle="Cooling Efficiency"
            status="NORMAL"
          />
          <TelemetryCard
            title="Dew Point"
            value={tel.dewPoint !== undefined ? `${tel.dewPoint}` : '—'}
            unit="°C"
            subtitle="Condensation Temp"
          />
          <TelemetryCard
            title="Condensation Risk"
            value={tel.condensationRisk || 'LOW'}
            subtitle="Frost/Moisture Warning"
            status={tel.condensationRisk === 'HIGH' ? 'HIGH RISK' : 'NORMAL'}
          />
        </div>
      </div>

      {/* Section 3: Electrical & Battery Health */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Zap size={18} color="var(--accent-cyan)" />
          2. ELECTRICAL & BATTERY HEALTH MONITORING
        </h3>

        <div className="grid-cols-auto-fit">
          <TelemetryCard
            title="DC System Voltage"
            value={tel.voltage !== undefined ? `${tel.voltage}` : '—'}
            unit="V"
            subtitle="Nominal 12.0V"
            status={tel.voltage < 11.5 ? 'WARNING' : 'NORMAL'}
            icon={Zap}
          />
          <TelemetryCard
            title="Current Draw"
            value={tel.current !== undefined ? `${tel.current}` : '—'}
            unit="A"
            subtitle="Power Bus Load"
            status={tel.current > 2.5 ? 'WARNING' : 'NORMAL'}
            icon={Zap}
          />
          <TelemetryCard
            title="Total Power (P = V × I)"
            value={tel.power !== undefined ? `${tel.power}` : '—'}
            unit="W"
            subtitle="Calculated Consumption"
            status={tel.power > 30 ? 'HIGH RISK' : 'NORMAL'}
            icon={Zap}
            highlight
          />
          <TelemetryCard
            title="Battery Core Temp"
            value={tel.batteryTemp !== undefined ? `${tel.batteryTemp}` : '—'}
            unit="°C"
            subtitle="Virtual Sensor #3 (Int+2°C)"
            status={tel.batteryTemp < -15 ? 'HIGH RISK' : tel.batteryTemp < 0 ? 'WARNING' : 'NORMAL'}
            icon={Thermometer}
          />
          <TelemetryCard
            title="Battery Protection Status"
            value={tel.batteryStatus || 'NORMAL'}
            subtitle="Thermal Blanket Loop"
            status={tel.batteryStatus || 'NORMAL'}
          />
        </div>
      </div>

      {/* Section 4: Mechanical Health & Protection Status */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        
        {/* MECHANICAL HEALTH */}
        <div className="aira-card">
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={18} color="var(--accent-purple)" />
            3. MECHANICAL & VIBRATION HEALTH
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.85rem' }}>
            <div style={{ background: 'var(--bg-secondary)', padding: '0.65rem', borderRadius: '6px' }}>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>VIBRATION RMS</span>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                {tel.vibrationRms} g
              </div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: '0.65rem', borderRadius: '6px' }}>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>THERMAL CYCLES</span>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                {tel.thermalCycles}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', background: 'var(--bg-secondary)', padding: '0.65rem', borderRadius: '6px', fontFamily: 'var(--font-mono)' }}>
            <span>X-AXIS: {tel.vibrationX} g</span>
            <span>Y-AXIS: {tel.vibrationY} g</span>
            <span>Z-AXIS: {tel.vibrationZ} g</span>
          </div>
        </div>

        {/* AUTOMATIC PROTECTION COUNTERMEASURES STATUS */}
        <div className="aira-card" style={{ borderLeft: '4px solid var(--status-normal)' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={18} color="var(--status-normal)" />
            4. AUTOMATIC PROTECTION COUNTERMEASURES
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', fontSize: '0.78rem' }}>
            <div style={{ background: 'var(--bg-secondary)', padding: '0.5rem 0.65rem', borderRadius: '6px' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>THERMAL CONTROL</span>
              <strong style={{ color: 'var(--status-normal)' }}>{prot.thermalControl}</strong>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: '0.5rem 0.65rem', borderRadius: '6px' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>HEATER OUTPUT</span>
              <strong style={{ color: prot.heaterPower > 0 ? 'var(--status-warning)' : 'var(--text-secondary)' }}>{prot.heaterStatus}</strong>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: '0.5rem 0.65rem', borderRadius: '6px' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>BATTERY PROTECTION</span>
              <strong>{prot.batteryProtection}</strong>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: '0.5rem 0.65rem', borderRadius: '6px' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>NON-CRITICAL LOADS</span>
              <strong>{prot.nonCriticalLoads}</strong>
            </div>
          </div>
        </div>

      </div>

      {/* Section 5: Interactive Telemetry Charts */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            HISTORICAL TELEMETRY TRENDS & CHARTS
          </h3>

          {/* Metric selector */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {[
              { key: 'extTemp', label: 'Ext Temp', unit: '°C' },
              { key: 'intTemp', label: 'Int Temp', unit: '°C' },
              { key: 'voltage', label: 'Voltage', unit: 'V' },
              { key: 'power', label: 'Power', unit: 'W' },
              { key: 'healthScore', label: 'Health Score', unit: '' }
            ].map(m => (
              <button
                key={m.key}
                onClick={() => setChartMetric(m.key)}
                style={{
                  padding: '0.3rem 0.6rem',
                  fontSize: '0.75rem',
                  borderRadius: '4px',
                  border: chartMetric === m.key ? '1px solid var(--accent-blue)' : '1px solid var(--border-subtle)',
                  backgroundColor: chartMetric === m.key ? 'rgba(59, 130, 246, 0.2)' : 'var(--bg-card)',
                  color: chartMetric === m.key ? 'var(--text-primary)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontWeight: chartMetric === m.key ? 700 : 500
                }}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <TelemetryChart
          title={chartMetric.toUpperCase()}
          dataPoints={historyData}
          dataKey={chartMetric}
          unit={chartMetric.includes('Temp') ? '°C' : chartMetric === 'voltage' ? 'V' : chartMetric === 'power' ? 'W' : ''}
          lineColor={chartMetric === 'extTemp' ? '#3b82f6' : chartMetric === 'power' ? '#f97316' : '#10b981'}
        />
      </div>

    </div>
  );
};
