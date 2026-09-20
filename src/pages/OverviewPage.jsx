import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/useData';
import { StatusBadge } from '../components/common/StatusBadge';
import { DemoScenarioBar } from '../components/common/DemoScenarioBar';
import { 
  ShieldCheck, 
  AlertTriangle, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowRight, 
  ArrowDownRight,
  CheckCircle2,
  Info
} from 'lucide-react';

export const OverviewPage = () => {
  const navigate = useNavigate();
  const { systems, activeAlerts, isFirebaseEmpty, dataMode } = useData();

  // Fleet health calculation
  const totalSystems = systems.length;
  const normalCount = systems.filter(s => s.riskLevel === 'NORMAL').length;
  const warningCount = systems.filter(s => s.riskLevel === 'WARNING').length;
  const highRiskCount = systems.filter(s => s.riskLevel === 'HIGH RISK' || s.riskLevel === 'HIGH').length;

  const fleetHealthIndex = totalSystems > 0 
    ? Math.round(systems.reduce((acc, s) => acc + (s.healthScore || 0), 0) / totalSystems)
    : 86;

  // Main showcase system
  const showcasePredictive = systems.find(s => s.id === 'HAA-07') || systems[1];

  return (
    <div>
      {/* Interactive Scenario Bar */}
      <DemoScenarioBar />

      <div className="page-container">
        
        {/* Empty State Banner if in Live Mode with empty database */}
        {dataMode === 'LIVE' && isFirebaseEmpty && (
          <div
            style={{
              padding: '1.25rem',
              borderRadius: '8px',
              backgroundColor: 'var(--status-warning-bg)',
              border: '1px solid var(--status-warning-border)',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <AlertTriangle size={24} color="var(--status-warning)" />
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--status-warning)' }}>
                Awaiting Sensor Data — Live Firebase Mode Active
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                No live sensor data available yet. Waiting for ESP32 connection or manual telemetry push via the Admin Testbench. Dashboard framework remains operational.
              </p>
            </div>
          </div>
        )}

        {/* Level 1: Fleet Health & Counts Header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem',
            marginBottom: '1.5rem'
          }}
        >
          {/* Main Fleet Health Index Card */}
          <div
            className="aira-card"
            style={{
              gridColumn: 'span 2',
              background: 'linear-gradient(135deg, rgba(17,24,39,0.9), rgba(31,41,61,0.7))',
              border: '1px solid var(--border-highlight)',
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between'
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-blue)', letterSpacing: '0.08em' }}>
                FLEET HEALTH INDEX
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.2rem' }}>
                <span style={{ fontSize: '2.75rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                  {isFirebaseEmpty ? '—' : fleetHealthIndex}
                </span>
                <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>/ 100</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--status-normal)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem' }}>
                <CheckCircle2 size={14} /> 10 Monitored High-Altitude Systems
              </span>
            </div>

            {/* Visual Ring Indicator */}
            <div
              style={{
                width: '76px',
                height: '76px',
                borderRadius: '50%',
                border: `6px solid ${fleetHealthIndex > 80 ? 'var(--status-normal)' : 'var(--status-warning)'}`,
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                boxShadow: 'var(--shadow-glow-blue)'
              }}
            >
              <ShieldCheck size={36} color="var(--accent-blue)" />
            </div>
          </div>

          {/* Breakdown Metric Cards */}
          <div className="aira-card">
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>TOTAL SYSTEMS</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
              {isFirebaseEmpty ? '0' : totalSystems}
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Zone A to Zone J</span>
          </div>

          <div className="aira-card">
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>NORMAL</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--status-normal)' }}>
              {isFirebaseEmpty ? '0' : normalCount}
            </div>
            <StatusBadge status="NORMAL" size="small" />
          </div>

          <div className="aira-card">
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>WARNING</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--status-warning)' }}>
              {isFirebaseEmpty ? '0' : warningCount}
            </div>
            <StatusBadge status="WARNING" size="small" />
          </div>

          <div className="aira-card">
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>HIGH RISK</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--status-highrisk)' }}>
              {isFirebaseEmpty ? '0' : highRiskCount}
            </div>
            <StatusBadge status="HIGH RISK" size="small" pulse={highRiskCount > 0} />
          </div>
        </div>

        {/* Level 3 & 4: Predictive Early Warning & Active Alert Center */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
          
          {/* Predictive Early Warning Card (Showcasing HAA-07) */}
          <div
            className="aira-card"
            style={{
              borderLeft: '4px solid var(--status-warning)',
              background: 'rgba(245, 158, 11, 0.04)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <TrendingUp size={20} color="var(--status-warning)" />
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  PREDICTIVE EARLY WARNING — {showcasePredictive?.id}
                </h3>
              </div>
              <StatusBadge status={showcasePredictive?.riskLevel || 'WARNING'} size="small" pulse />
            </div>

            {/* State Progression Visual */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                padding: '0.65rem',
                borderRadius: '6px',
                backgroundColor: 'var(--bg-secondary)',
                marginBottom: '0.85rem',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)'
              }}
            >
              <span style={{ color: 'var(--status-normal)', fontWeight: 600 }}>NORMAL</span>
              <ArrowRight size={14} color="var(--text-muted)" />
              <span style={{ color: 'var(--status-warning)', fontWeight: 700, padding: '0.1rem 0.4rem', background: 'var(--status-warning-bg)', borderRadius: '3px' }}>
                EARLY WARNING
              </span>
              <ArrowRight size={14} color="var(--text-muted)" />
              <span style={{ color: 'var(--status-highrisk)', opacity: 0.6 }}>HIGH RISK</span>
              <ArrowRight size={14} color="var(--text-muted)" />
              <span style={{ color: 'var(--status-critical)', opacity: 0.5 }}>CRITICAL</span>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.75rem' }}>
              <strong style={{ color: 'var(--text-primary)' }}>Reason:</strong> {showcasePredictive?.aiAnalysis?.primaryContributors?.[0] || 'Rapid temperature drop detected.'}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {showcasePredictive?.aiAnalysis?.primaryContributors?.slice(1).map((cont, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: '0.7rem',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-secondary)'
                  }}
                >
                  • {cont}
                </span>
              ))}
            </div>

            <div style={{ marginTop: '0.85rem', textAlign: 'right' }}>
              <button
                onClick={() => navigate(`/system/${showcasePredictive?.id}`)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent-blue)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.2rem'
                }}
              >
                Inspect Telemetry <ArrowUpRight size={14} />
              </button>
            </div>
          </div>

          {/* Active Alert Center */}
          <div
            className="aira-card"
            style={{
              borderLeft: '4px solid var(--status-highrisk)',
              background: 'rgba(249, 115, 22, 0.04)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={20} color="var(--status-highrisk)" />
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  ACTIVE ALERT CENTER
                </h3>
              </div>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.6rem',
                  borderRadius: '4px',
                  backgroundColor: 'var(--status-highrisk-bg)',
                  color: 'var(--status-highrisk)',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                HIGH RISK × {activeAlerts.length}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {activeAlerts.slice(0, 3).map(alert => (
                <div
                  key={alert.id}
                  style={{
                    padding: '0.65rem 0.85rem',
                    borderRadius: '6px',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                    fontSize: '0.78rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <StatusBadge status={alert.priority} size="small" />
                    <div>
                      <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                        {alert.systemId}
                      </span>
                      <span style={{ color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>
                        {alert.reason}
                      </span>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {alert.timestamp}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '0.85rem', textAlign: 'right' }}>
              <button
                onClick={() => navigate('/alerts')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent-blue)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.2rem'
                }}
              >
                View Alert Center <ArrowUpRight size={14} />
              </button>
            </div>
          </div>

        </div>

        {/* Level 2: Clickable System Fleet Table */}
        <div className="aira-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                HIGH-ALTITUDE FLEET MONITORED SYSTEMS (10 UNITS)
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Click any row to open full sensor telemetry & AI diagnosis
              </span>
            </div>
            <button
              onClick={() => navigate('/systems')}
              style={{
                padding: '0.4rem 0.85rem',
                fontSize: '0.78rem',
                fontWeight: 600,
                borderRadius: '6px',
                border: '1px solid var(--border-medium)',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                cursor: 'pointer'
              }}
            >
              Fleet Matrix View
            </button>
          </div>

          <div className="aira-table-container">
            <table className="aira-table">
              <thead>
                <tr>
                  <th>SYSTEM ID</th>
                  <th>LOCATION</th>
                  <th>EXTERNAL TEMP</th>
                  <th>HEALTH SCORE</th>
                  <th>RISK LEVEL</th>
                  <th>RISK TREND</th>
                  <th>PROTECTION</th>
                  <th>LAST UPDATE</th>
                </tr>
              </thead>
              <tbody>
                {isFirebaseEmpty ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                      <Info size={24} style={{ marginBottom: '0.5rem', display: 'block', margin: '0 auto' }} />
                      No live sensor data available yet. Connect ESP32 hardware or push test data from Admin console.
                    </td>
                  </tr>
                ) : (
                  systems.map(sys => {
                    const isHighRisk = sys.riskLevel === 'HIGH RISK' || sys.riskLevel === 'HIGH';
                    const isWarning = sys.riskLevel === 'WARNING';
                    return (
                      <tr
                        key={sys.id}
                        className="clickable-row"
                        onClick={() => navigate(`/system/${sys.id}`)}
                        style={{
                          backgroundColor: isHighRisk 
                            ? 'rgba(249, 115, 22, 0.06)' 
                            : isWarning 
                            ? 'rgba(245, 158, 11, 0.03)' 
                            : 'transparent'
                        }}
                      >
                        <td style={{ fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)' }}>
                          {sys.id}
                        </td>
                        <td style={{ color: 'var(--text-secondary)' }}>
                          {sys.location}
                        </td>
                        <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                          {sys.telemetry?.extTemp !== undefined ? `${sys.telemetry.extTemp}°C` : '—'}
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                              {sys.healthScore}
                            </span>
                            <div style={{ width: '60px', height: '6px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '3px', overflow: 'hidden' }}>
                              <div
                                style={{
                                  width: `${sys.healthScore}%`,
                                  height: '100%',
                                  backgroundColor: sys.healthScore > 80 ? 'var(--status-normal)' : sys.healthScore > 60 ? 'var(--status-warning)' : 'var(--status-highrisk)'
                                }}
                              />
                            </div>
                          </div>
                        </td>
                        <td>
                          <StatusBadge status={sys.riskLevel} size="small" pulse={isHighRisk} />
                        </td>
                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                            {sys.riskTrendDirection === '↗' ? (
                              <ArrowUpRight size={14} color="var(--status-highrisk)" />
                            ) : sys.riskTrendDirection === '↘' ? (
                              <ArrowDownRight size={14} color="var(--status-normal)" />
                            ) : (
                              <ArrowRight size={14} color="var(--text-muted)" />
                            )}
                            {sys.riskTrend}
                          </span>
                        </td>
                        <td>
                          <span
                            style={{
                              fontSize: '0.72rem',
                              padding: '0.15rem 0.5rem',
                              borderRadius: '4px',
                              backgroundColor: sys.protectionStatus === 'Active' ? 'var(--status-highrisk-bg)' : 'var(--bg-tertiary)',
                              color: sys.protectionStatus === 'Active' ? 'var(--status-highrisk)' : 'var(--text-secondary)',
                              fontWeight: 600
                            }}
                          >
                            {sys.protectionStatus}
                          </span>
                        </td>
                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {sys.lastUpdate}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
