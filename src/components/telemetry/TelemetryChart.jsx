import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useData } from '../../context/useData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const TelemetryChart = ({
  title,
  dataPoints = [],
  dataKey = 'extTemp',
  unit = '°C',
  lineColor = '#3b82f6',
  fillColor = 'rgba(59, 130, 246, 0.12)'
}) => {
  const [timeRange, setTimeRange] = useState('24H');
  const { theme } = useData();

  const isLight = theme === 'light';

  // Filter data according to selected time range
  const filterData = () => {
    if (!dataPoints || dataPoints.length === 0) return [];
    if (timeRange === '1H') return dataPoints.slice(-2);
    if (timeRange === '6H') return dataPoints.slice(-6);
    if (timeRange === '7D') return dataPoints;
    return dataPoints;
  };

  const filtered = filterData();

  const labels = filtered.map(d => d.time || d.label);
  const values = filtered.map(d => d[dataKey] !== undefined ? d[dataKey] : d.value);

  const chartData = {
    labels,
    datasets: [
      {
        label: `${title} (${unit})`,
        data: values,
        borderColor: lineColor,
        backgroundColor: fillColor,
        fill: true,
        tension: 0.3,
        pointRadius: filtered.length > 15 ? 2 : 4,
        pointHoverRadius: 6,
        pointBackgroundColor: lineColor,
        borderWidth: 2
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: isLight ? 'rgba(255, 255, 255, 0.96)' : 'rgba(7, 9, 14, 0.95)',
        titleColor: isLight ? '#0f172a' : '#f8fafc',
        bodyColor: isLight ? '#334155' : '#94a3b8',
        borderColor: isLight ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.12)',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (context) => {
            const raw = context.raw;
            const item = filtered[context.dataIndex];
            const risk = item?.riskState ? ` | Risk: ${item.riskState}` : '';
            return `${title}: ${raw} ${unit}${risk}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: isLight ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.05)'
        },
        ticks: {
          color: isLight ? '#475569' : '#64748b',
          font: { size: 10 }
        }
      },
      y: {
        grid: {
          color: isLight ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.05)'
        },
        ticks: {
          color: isLight ? '#475569' : '#64748b',
          font: { size: 10 }
        }
      }
    }
  };

  return (
    <div className="aira-card" style={{ height: '320px', display: 'flex', flexDirection: 'column' }}>
      {/* Header with Title and Range Selectors */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {title}
          </h4>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            Historical Telemetry Stream
          </span>
        </div>

        {/* Range Buttons */}
        <div style={{ display: 'flex', gap: '0.25rem', background: 'var(--bg-secondary)', padding: '2px', borderRadius: '4px' }}>
          {['1H', '6H', '24H', '7D'].map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              style={{
                fontSize: '0.7rem',
                padding: '0.2rem 0.55rem',
                border: 'none',
                borderRadius: '3px',
                backgroundColor: timeRange === range ? 'var(--accent-blue)' : 'transparent',
                color: timeRange === range ? '#ffffff' : 'var(--text-muted)',
                cursor: 'pointer',
                fontWeight: timeRange === range ? 700 : 500
              }}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Canvas Container */}
      <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>
        {filtered.length === 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            No historical telemetry points available
          </div>
        ) : (
          <Line data={chartData} options={options} />
        )}
      </div>
    </div>
  );
};
