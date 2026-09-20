import React, { useState } from 'react';
import { useData } from '../../context/useData';
import { NotificationPanel } from './NotificationPanel';
import { 
  ShieldCheck, 
  Activity, 
  Wifi, 
  WifiOff, 
  Bell, 
  Sun, 
  Moon, 
  User, 
  RefreshCw,
  Database
} from 'lucide-react';

export const Header = () => {
  const { 
    dataMode, 
    setDataMode, 
    lastSyncTime, 
    theme, 
    toggleTheme, 
    notifications,
    isNetworkOffline,
    isFirebaseEmpty
  } = useData();

  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <>
      <header
        style={{
          minHeight: 'var(--header-height)',
          backgroundColor: 'var(--bg-header)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          padding: '0.6rem 1.5rem',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        {/* Left Branding */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              boxShadow: 'var(--shadow-glow-blue)',
              flexShrink: 0
            }}
          >
            <ShieldCheck size={24} color="#ffffff" />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <h1
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-sans)',
                  lineHeight: 1.2
                }}
              >
                AIRA WEB CENTER
              </h1>
              <span
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  padding: '0.15rem 0.5rem',
                  borderRadius: '4px',
                  backgroundColor: 'var(--status-normal-bg)',
                  color: 'var(--status-normal)',
                  border: '1px solid var(--status-normal-border)',
                  letterSpacing: '0.06em'
                }}
              >
                HAA/SHAA RELIABILITY
              </span>
            </div>
            <p style={{ fontSize: '0.73rem', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '0.1rem' }}>
              Environmental Health, Predictive Protection & Electronic Reliability Operations
            </p>
          </div>
        </div>

        {/* Right Status Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          
          {/* Mode Switcher */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '6px',
              padding: '2px'
            }}
          >
            <button
              onClick={() => setDataMode('DEMO')}
              style={{
                padding: '0.35rem 0.7rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                borderRadius: '4px',
                border: 'none',
                backgroundColor: dataMode === 'DEMO' ? 'var(--accent-blue)' : 'transparent',
                color: dataMode === 'DEMO' ? '#ffffff' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              DEMO MODE
            </button>
            <button
              onClick={() => setDataMode('LIVE')}
              style={{
                padding: '0.35rem 0.7rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                borderRadius: '4px',
                border: 'none',
                backgroundColor: dataMode === 'LIVE' ? 'var(--status-normal)' : 'transparent',
                color: dataMode === 'LIVE' ? '#ffffff' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <Database size={12} />
              LIVE DATA MODE
            </button>
          </div>

          {/* Connection Status Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '0.35rem 0.65rem',
              borderRadius: '6px',
              backgroundColor: isNetworkOffline
                ? 'var(--status-critical-bg)'
                : dataMode === 'LIVE' && isFirebaseEmpty
                ? 'var(--status-warning-bg)'
                : 'var(--status-normal-bg)',
              color: isNetworkOffline
                ? 'var(--status-critical)'
                : dataMode === 'LIVE' && isFirebaseEmpty
                ? 'var(--status-warning)'
                : 'var(--status-normal)',
              border: `1px solid ${
                isNetworkOffline
                  ? 'var(--status-critical-border)'
                  : dataMode === 'LIVE' && isFirebaseEmpty
                  ? 'var(--status-warning-border)'
                  : 'var(--status-normal-border)'
              }`
            }}
          >
            {isNetworkOffline ? (
              <>
                <WifiOff size={14} /> OFFLINE-FIRST SAFETY
              </>
            ) : dataMode === 'LIVE' && isFirebaseEmpty ? (
              <>
                <RefreshCw size={14} className="animate-pulse-subtle" /> AWAITING SENSOR DATA
              </>
            ) : (
              <>
                <Wifi size={14} /> {dataMode === 'LIVE' ? 'LIVE FIREBASE LINK' : 'SIMULATED TELEMETRY'}
              </>
            )}
          </div>

          {/* Synchronization Timestamp */}
          <div
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <Activity size={14} color="var(--accent-cyan)" />
            <span>SYNC: {lastSyncTime}</span>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Theme`}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              width: '36px',
              height: '36px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            {theme === 'dark' ? <Sun size={17} color="#fbbf24" /> : <Moon size={17} color="#6366f1" />}
          </button>

          {/* Notifications Icon */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsNotifOpen(prev => !prev)}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                width: '36px',
                height: '36px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <Bell size={17} color="var(--text-primary)" />
              {unreadCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-3px',
                    right: '-3px',
                    backgroundColor: 'var(--status-critical)',
                    color: '#ffffff',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    border: '2px solid var(--bg-primary)'
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* Admin Profile */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.65rem',
              borderRadius: '6px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-indigo)',
                display: 'flex',
                alignItems: 'center',
                justify: 'center'
              }}
            >
              <User size={14} color="#ffffff" />
            </div>
            <div style={{ fontSize: '0.75rem', lineHeight: 1.1 }}>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>OPERATOR</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>SYS-ADMIN</div>
            </div>
          </div>

        </div>
      </header>

      {/* Notification Drawer */}
      <NotificationPanel isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </>
  );
};
