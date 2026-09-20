import React from 'react';
import { NavLink } from 'react-router-dom';
import { useData } from '../../context/useData';
import { 
  LayoutDashboard, 
  Cpu, 
  AlertTriangle, 
  BarChart3, 
  TrendingUp, 
  History, 
  Sliders, 
  Terminal,
  ShieldCheck
} from 'lucide-react';

export const Sidebar = () => {
  const { activeAlerts, systems } = useData();

  const highRiskCount = systems.filter(s => s.riskLevel === 'HIGH RISK' || s.riskLevel === 'HIGH').length;

  const navItems = [
    { path: '/', label: 'Overview', icon: LayoutDashboard },
    { path: '/systems', label: 'Systems', icon: Cpu },
    { path: '/alerts', label: 'Alerts', icon: AlertTriangle, badge: activeAlerts.length },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/predictive', label: 'Predictive Risk', icon: TrendingUp, highlight: highRiskCount > 0 },
    { path: '/events', label: 'Event History', icon: History },
    { path: '/config', label: 'System Config', icon: Sliders },
    { path: '/admin', label: 'Admin & Testbench', icon: Terminal }
  ];

  return (
    <aside
      style={{
        width: 'var(--sidebar-width)',
        backgroundColor: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        zIndex: 101,
        paddingTop: '1rem'
      }}
    >
      {/* Sidebar Header Logo */}
      <div
        style={{
          padding: '0 1.25rem 1.25rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem'
        }}
      >
        <ShieldCheck size={26} color="var(--accent-blue)" />
        <div>
          <span style={{ fontSize: '1.05rem', fontWeight: 800, letterSpacing: '0.06em', color: 'var(--text-primary)' }}>
            AIRA WEB CENTER
          </span>
          <span style={{ fontSize: '0.65rem', display: 'block', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
            HAA/SHAA RELIABILITY
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <nav style={{ flex: 1, padding: '1rem 0.75rem', overflowY: 'auto' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.1em', padding: '0 0.5rem 0.5rem' }}>
          NAVIGATION CENTER
        </div>
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                padding: '0.65rem 0.85rem',
                marginBottom: '0.35rem',
                borderRadius: '6px',
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                backgroundColor: isActive ? 'rgba(59, 130, 246, 0.18)' : 'transparent',
                border: isActive ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid transparent',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: isActive ? 600 : 500,
                transition: 'all 0.15s ease'
              })}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Icon size={18} color="currentColor" />
                <span>{item.label}</span>
              </div>

              {item.badge !== undefined && item.badge > 0 && (
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    padding: '0.1rem 0.45rem',
                    borderRadius: '10px',
                    backgroundColor: 'var(--status-highrisk-bg)',
                    color: 'var(--status-highrisk)',
                    border: '1px solid var(--status-highrisk-border)'
                  }}
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Sidebar Footer Philosophy */}
      <div
        style={{
          padding: '1rem',
          borderTop: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-card)',
          fontSize: '0.7rem'
        }}
      >
        <div style={{ fontWeight: 700, color: 'var(--accent-blue)', marginBottom: '0.2rem', letterSpacing: '0.05em' }}>
          MONITOR → ANALYZE → PREDICT → PROTECT
        </div>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.35, fontSize: '0.68rem' }}>
          Autonomous stress monitoring & automatic countermeasure trigger.
        </p>
      </div>
    </aside>
  );
};
