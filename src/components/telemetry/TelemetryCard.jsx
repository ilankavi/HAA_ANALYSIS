import React from 'react';
import { StatusBadge } from '../common/StatusBadge';

export const TelemetryCard = ({
  title,
  value,
  unit = '',
  subtitle,
  status,
  icon: Icon,
  trend,
  highlight = false,
  empty = false
}) => {
  return (
    <div
      className={`aira-card ${highlight ? 'aira-card-interactive' : ''}`}
      style={{
        border: highlight ? '1px solid var(--border-highlight)' : '1px solid var(--border-subtle)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justify: 'space-between',
        minHeight: '130px'
      }}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1.2 }}>
            {title}
          </span>
          {Icon && <Icon size={18} color="var(--accent-blue)" style={{ flexShrink: 0 }} />}
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', marginBottom: '0.5rem' }}>
          <span
            style={{
              fontSize: '1.6rem',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              color: empty ? 'var(--text-muted)' : 'var(--text-primary)',
              lineHeight: 1
            }}
          >
            {empty ? '—' : value}
          </span>
          {!empty && unit && (
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              {unit}
            </span>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.4rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.4rem' }}>
        {subtitle && (
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', flex: 1, minWidth: '80px' }}>
            {subtitle}
          </span>
        )}
        {status && <StatusBadge status={status} size="small" />}
        {trend && (
          <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};
