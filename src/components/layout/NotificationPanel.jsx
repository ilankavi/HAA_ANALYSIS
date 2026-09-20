import React from 'react';
import { useData } from '../../context/useData';
import { X, Bell, CheckCheck, Info, ShieldAlert } from 'lucide-react';

export const NotificationPanel = ({ isOpen, onClose }) => {
  const { notifications, markNotificationsRead } = useData();

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 'var(--header-height)',
        right: 0,
        bottom: 0,
        width: '380px',
        backgroundColor: 'var(--bg-secondary)',
        borderLeft: '1px solid var(--border-medium)',
        boxShadow: 'var(--shadow-lg)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        backdropFilter: 'blur(16px)'
      }}
    >
      {/* Panel Header */}
      <div
        style={{
          padding: '1rem 1.25rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          background: 'var(--bg-card)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Bell size={18} color="var(--accent-blue)" />
          <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            System Events & Alerts
          </h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={markNotificationsRead}
            title="Mark all as read"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem',
              fontSize: '0.75rem'
            }}
          >
            <CheckCheck size={16} /> Read
          </button>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '0.2rem'
            }}
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
        {notifications.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem 1rem' }}>
            No recent events or alerts
          </div>
        ) : (
          notifications.map(n => {
            const isHigh = n.priority === 'CRITICAL' || n.priority === 'HIGH';
            return (
              <div
                key={n.id}
                style={{
                  marginBottom: '0.75rem',
                  padding: '0.85rem',
                  borderRadius: '6px',
                  backgroundColor: n.unread ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                  border: n.unread
                    ? isHigh
                      ? '1px solid var(--status-highrisk-border)'
                      : '1px solid var(--border-highlight)'
                    : '1px solid var(--border-subtle)',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  {isHigh ? (
                    <ShieldAlert size={18} color="var(--status-highrisk)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  ) : (
                    <Info size={18} color="var(--accent-blue)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  )}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {n.title}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {n.timestamp}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      {n.message}
                    </div>
                    {n.systemId && (
                      <span
                        style={{
                          display: 'inline-block',
                          marginTop: '0.4rem',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          padding: '0.15rem 0.4rem',
                          borderRadius: '3px',
                          backgroundColor: 'var(--bg-tertiary)',
                          color: 'var(--accent-cyan)',
                          fontFamily: 'var(--font-mono)'
                        }}
                      >
                        {n.systemId}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
