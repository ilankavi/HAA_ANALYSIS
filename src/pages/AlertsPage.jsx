import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/useData';
import { StatusBadge } from '../components/common/StatusBadge';
import { AlertTriangle, ArrowUpRight } from 'lucide-react';

export const AlertsPage = () => {
  const navigate = useNavigate();
  const { activeAlerts } = useData();
  const [priorityFilter, setPriorityFilter] = useState('ALL');

  const filteredAlerts = activeAlerts.filter(a => 
    priorityFilter === 'ALL' || a.priority === priorityFilter
  );

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertTriangle size={22} color="var(--status-highrisk)" />
            ACTIVE ALERT CENTER & THREAT MONITOR
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Real-time environmental stress alerts requiring operator review or auto-protection validation.
          </p>
        </div>

        {/* Priority Filter */}
        <div style={{ display: 'flex', gap: '0.25rem', background: 'var(--bg-secondary)', padding: '2px', borderRadius: '6px' }}>
          {['ALL', 'HIGH RISK', 'EARLY WARNING'].map(p => (
            <button
              key={p}
              onClick={() => setPriorityFilter(p)}
              style={{
                padding: '0.4rem 0.75rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                borderRadius: '4px',
                border: 'none',
                backgroundColor: priorityFilter === p ? 'var(--accent-blue)' : 'transparent',
                color: priorityFilter === p ? '#ffffff' : 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredAlerts.map(alert => (
          <div
            key={alert.id}
            className="aira-card"
            style={{
              borderLeft: alert.priority === 'HIGH RISK' ? '4px solid var(--status-highrisk)' : '4px solid var(--status-warning)',
              background: alert.priority === 'HIGH RISK' ? 'rgba(249, 115, 22, 0.04)' : 'rgba(245, 158, 11, 0.04)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <StatusBadge status={alert.priority} size="medium" pulse />
                <span style={{ fontWeight: 800, fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--accent-blue)' }}>
                  {alert.systemId}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Location: {alert.location}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  Timestamp: {alert.timestamp}
                </span>
                <button
                  onClick={() => navigate(`/system/${alert.systemId}`)}
                  style={{
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    borderRadius: '4px',
                    border: '1px solid var(--border-medium)',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--accent-blue)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  Inspect Unit <ArrowUpRight size={14} />
                </button>
              </div>
            </div>

            <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.65rem' }}>
              <strong>Alert Reason:</strong> {alert.reason}
            </div>

            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', background: 'var(--bg-secondary)', padding: '0.65rem', borderRadius: '6px', borderLeft: '3px solid var(--status-normal)' }}>
              <strong style={{ color: 'var(--status-normal)' }}>Automated Protection Response:</strong> {alert.currentResponse}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
