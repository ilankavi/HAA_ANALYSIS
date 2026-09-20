import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/useData';
import { StatusBadge } from '../components/common/StatusBadge';
import { Search, ArrowUpRight, AlertTriangle } from 'lucide-react';

export const SystemsPage = () => {
  const navigate = useNavigate();
  const { systems, isFirebaseEmpty } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredSystems = systems.filter(sys => {
    const matchesSearch = sys.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sys.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sys.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || sys.riskLevel === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="page-container">
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            FLEET MONITORED SYSTEMS MATRIX (10 UNITS)
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Overview of logical metadata zones (Zone A to Zone J) without map/GPS dependency.
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          
          {/* Search Bar */}
          <div style={{ position: 'relative' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search ID, Name, Zone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '0.45rem 0.75rem 0.45rem 2rem',
                fontSize: '0.8rem',
                borderRadius: '6px',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-primary)',
                outline: 'none',
                width: '220px'
              }}
            />
          </div>

          {/* Status Filter Buttons */}
          <div style={{ display: 'flex', gap: '0.25rem', background: 'var(--bg-secondary)', padding: '2px', borderRadius: '6px' }}>
            {['ALL', 'NORMAL', 'WARNING', 'HIGH RISK'].map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                style={{
                  padding: '0.35rem 0.65rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  borderRadius: '4px',
                  border: 'none',
                  backgroundColor: statusFilter === st ? 'var(--accent-blue)' : 'transparent',
                  color: statusFilter === st ? '#ffffff' : 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
              >
                {st}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Systems Grid Cards */}
      {isFirebaseEmpty ? (
        <div className="aira-card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          <AlertTriangle size={32} style={{ margin: '0 auto 0.5rem', display: 'block' }} />
          Awaiting Sensor Data — Waiting for ESP32 hardware transmission in Live Mode.
        </div>
      ) : (
        <div className="grid-cols-auto-fit">
          {filteredSystems.map(sys => {
            const isHigh = sys.riskLevel === 'HIGH RISK' || sys.riskLevel === 'HIGH';
            return (
              <div
                key={sys.id}
                className="aira-card aira-card-interactive"
                onClick={() => navigate(`/system/${sys.id}`)}
                style={{
                  borderLeft: isHigh ? '4px solid var(--status-highrisk)' : '1px solid var(--border-subtle)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                  <span style={{ fontSize: '1rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)' }}>
                    {sys.id}
                  </span>
                  <StatusBadge status={sys.riskLevel} size="small" pulse={isHigh} />
                </div>

                <h4 style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                  {sys.name}
                </h4>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  Location: <strong style={{ color: 'var(--text-primary)' }}>{sys.location}</strong> | Type: {sys.moduleType}
                </div>

                {/* Telemetry Summary */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', background: 'var(--bg-secondary)', padding: '0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', marginBottom: '0.75rem' }}>
                  <div>Ext Temp: <strong>{sys.telemetry?.extTemp}°C</strong></div>
                  <div>Health: <strong>{sys.healthScore}/100</strong></div>
                  <div>Power: <strong>{sys.telemetry?.power}W</strong></div>
                  <div>Heater: <strong>{sys.protection?.heaterStatus || 'OFF'}</strong></div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  <span>Trend: {sys.riskTrend}</span>
                  <span style={{ color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', gap: '0.1rem' }}>
                    Telemetry Details <ArrowUpRight size={13} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
