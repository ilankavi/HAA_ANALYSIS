import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/useData';
import { StatusBadge } from '../components/common/StatusBadge';
import { TrendingUp, ArrowRight, ArrowUpRight } from 'lucide-react';

export const PredictiveRiskPage = () => {
  const navigate = useNavigate();
  const { systems } = useData();

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <TrendingUp size={22} color="var(--accent-blue)" />
          FLEET PREDICTIVE RISK RADAR & TINYML FORECASTING
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          Continuous environmental stress classification predicting failure state transitions before physical degradation occurs.
        </p>
      </div>

      {/* Predictive Systems Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {systems.map(sys => {
          const isHigh = sys.riskLevel === 'HIGH RISK' || sys.riskLevel === 'HIGH';
          const isWarning = sys.riskLevel === 'WARNING';
          const predictedState = isHigh 
            ? 'CRITICAL' 
            : isWarning || sys.id === 'HAA-07' 
            ? 'HIGH RISK' 
            : 'NORMAL';

          const primaryDriver = sys.aiAnalysis?.primaryContributors?.[0] || 'Nominal operating environment';

          return (
            <div
              key={sys.id}
              className="aira-card"
              style={{
                borderLeft: isHigh ? '4px solid var(--status-highrisk)' : isWarning ? '4px solid var(--status-warning)' : '4px solid var(--status-normal)',
                background: isHigh ? 'rgba(249, 115, 22, 0.03)' : 'var(--bg-card)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                
                {/* System ID & Location */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)' }}>
                    {sys.id}
                  </span>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>{sys.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Location: {sys.location}</div>
                  </div>
                </div>

                {/* State Progression Visual */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    background: 'var(--bg-secondary)',
                    padding: '0.45rem 0.85rem',
                    borderRadius: '6px',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>CURRENT STATE</span>
                    <StatusBadge status={sys.riskLevel} size="small" />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                      {sys.riskTrendDirection} {sys.riskTrend}
                    </span>
                    <ArrowRight size={16} color="var(--text-muted)" />
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>PREDICTED STATE</span>
                    <StatusBadge status={predictedState} size="small" pulse={predictedState === 'HIGH RISK' || predictedState === 'CRITICAL'} />
                  </div>
                </div>

                {/* Primary Driver */}
                <div style={{ flex: 1, minWidth: '250px', padding: '0 0.5rem' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    PRIMARY RISK DRIVER:
                  </span>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', marginTop: '0.1rem' }}>
                    {primaryDriver}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => navigate(`/system/${sys.id}`)}
                  style={{
                    padding: '0.4rem 0.85rem',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    borderRadius: '6px',
                    border: '1px solid var(--border-medium)',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--accent-blue)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  Inspect <ArrowUpRight size={14} />
                </button>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
