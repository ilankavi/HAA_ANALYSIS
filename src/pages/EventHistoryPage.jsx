import React, { useState } from 'react';
import { useData } from '../context/useData';
import { History, ShieldAlert, ShieldCheck, Flame, Clock, Info } from 'lucide-react';

export const EventHistoryPage = () => {
  const { notifications } = useData();
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const staticEvents = [
    { id: 'ev-1', category: 'ALERTS', time: '14:32:10', systemId: 'HAA-03', title: 'HIGH RISK ALERT', desc: 'Environmental stress increased (-34°C). Battery current draw reached 2.8A.', icon: ShieldAlert, color: 'var(--status-highrisk)' },
    { id: 'ev-2', category: 'ALERTS', time: '14:29:45', systemId: 'HAA-07', title: 'EARLY WARNING', desc: 'Rapid temperature decline (-4.2°C/hr) detected by TinyML classifier.', icon: Clock, color: 'var(--status-warning)' },
    { id: 'ev-3', category: 'PROTECTION', time: '14:15:20', systemId: 'HAA-03', title: 'PROTECTION ENGAGED', desc: 'Thermal heater activated at 68% power output. Non-critical loads reduced.', icon: Flame, color: 'var(--accent-blue)' },
    { id: 'ev-4', category: 'SYSTEM', time: '13:48:00', systemId: 'HAA-01', title: 'NORMAL OPERATION', desc: 'System operating normally within standard thermal thresholds.', icon: ShieldCheck, color: 'var(--status-normal)' },
    { id: 'ev-5', category: 'PROTECTION', time: '12:30:10', systemId: 'HAA-05', title: 'BATTERY HEATER STANDBY', desc: 'Battery enclosure temperature dropped to -4°C. Monitoring loop engaged.', icon: Clock, color: 'var(--status-warning)' }
  ];

  // Convert live notifications to event log format
  const liveEventLogs = notifications.map(n => ({
    id: n.id,
    category: n.priority === 'HIGH' || n.priority === 'CRITICAL' ? 'ALERTS' : 'SYSTEM',
    time: n.timestamp,
    systemId: n.systemId || 'FLEET',
    title: n.title,
    desc: n.message,
    icon: n.priority === 'HIGH' || n.priority === 'CRITICAL' ? ShieldAlert : Info,
    color: n.priority === 'HIGH' || n.priority === 'CRITICAL' ? 'var(--status-highrisk)' : 'var(--accent-blue)'
  }));

  // Combine and deduplicate events
  const allEvents = [...liveEventLogs, ...staticEvents];

  const filteredEvents = allEvents.filter(ev => {
    if (categoryFilter === 'ALL') return true;
    return ev.category === categoryFilter;
  });

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <History size={22} color="var(--accent-blue)" />
            GLOBAL FLEET EVENT HISTORY & TRANSITION LOGS
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Chronological record of risk state transitions, automated countermeasure activations, and network events.
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div style={{ display: 'flex', gap: '0.25rem', background: 'var(--bg-secondary)', padding: '2px', borderRadius: '6px' }}>
          {['ALL', 'ALERTS', 'PROTECTION', 'SYSTEM'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              style={{
                padding: '0.4rem 0.75rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                borderRadius: '4px',
                border: 'none',
                backgroundColor: categoryFilter === cat ? 'var(--accent-blue)' : 'transparent',
                color: categoryFilter === cat ? '#ffffff' : 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline List */}
      <div className="aira-card">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative', paddingLeft: '1.5rem' }}>
          
          {/* Vertical Timeline Line */}
          <div
            style={{
              position: 'absolute',
              left: '20px',
              top: '10px',
              bottom: '10px',
              width: '2px',
              backgroundColor: 'var(--border-medium)'
            }}
          />

          {filteredEvents.map(ev => {
            const Icon = ev.icon;
            return (
              <div key={ev.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', position: 'relative' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-secondary)',
                    border: `2px solid ${ev.color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    zIndex: 2,
                    flexShrink: 0
                  }}
                >
                  <Icon size={16} color={ev.color} />
                </div>

                <div style={{ flex: 1, background: 'var(--bg-secondary)', padding: '0.85rem 1rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{ev.title}</span>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, fontFamily: 'var(--font-mono)', padding: '0.1rem 0.4rem', borderRadius: '3px', background: 'var(--bg-tertiary)', color: 'var(--accent-cyan)' }}>
                        {ev.systemId}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{ev.time}</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    {ev.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
