import React from 'react';

export const StatusBadge = ({ status, size = 'medium', pulse = false }) => {
  const getColors = () => {
    switch (status?.toUpperCase()) {
      case 'NORMAL':
      case 'STANDBY':
      case 'LOW':
      case 'STABLE':
        return {
          bg: 'var(--status-normal-bg)',
          color: 'var(--status-normal)',
          border: 'var(--status-normal-border)',
          dot: 'var(--status-normal)'
        };
      case 'WARNING':
      case 'EARLY WARNING':
      case 'MEDIUM':
      case 'MONITORING':
        return {
          bg: 'var(--status-warning-bg)',
          color: 'var(--status-warning)',
          border: 'var(--status-warning-border)',
          dot: 'var(--status-warning)'
        };
      case 'HIGH RISK':
      case 'HIGH':
      case 'ACTIVE':
      case 'INCREASING':
        return {
          bg: 'var(--status-highrisk-bg)',
          color: 'var(--status-highrisk)',
          border: 'var(--status-highrisk-border)',
          dot: 'var(--status-highrisk)'
        };
      case 'CRITICAL':
        return {
          bg: 'var(--status-critical-bg)',
          color: 'var(--status-critical)',
          border: 'var(--status-critical-border)',
          dot: 'var(--status-critical)'
        };
      case 'OFFLINE':
      case 'OFFLINE SAFETY MODE':
      default:
        return {
          bg: 'var(--status-offline-bg)',
          color: 'var(--status-offline)',
          border: 'var(--status-offline-border)',
          dot: 'var(--status-offline)'
        };
    }
  };

  const colors = getColors();

  const paddingClass = size === 'small' ? '0.2rem 0.55rem' : size === 'large' ? '0.4rem 0.85rem' : '0.25rem 0.65rem';
  const fontSize = size === 'small' ? '0.68rem' : size === 'large' ? '0.85rem' : '0.73rem';

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: paddingClass,
        borderRadius: '4px',
        backgroundColor: colors.bg,
        color: colors.color,
        border: `1px solid ${colors.border}`,
        fontSize,
        fontWeight: 700,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        fontFamily: 'var(--font-sans)',
        whiteSpace: 'nowrap'
      }}
    >
      <span
        className={pulse ? 'animate-pulse-subtle' : ''}
        style={{
          width: size === 'small' ? '6px' : '8px',
          height: size === 'small' ? '6px' : '8px',
          borderRadius: '50%',
          backgroundColor: colors.dot,
          boxShadow: pulse ? `0 0 8px ${colors.dot}` : 'none',
          flexShrink: 0
        }}
      />
      {status}
    </span>
  );
};
