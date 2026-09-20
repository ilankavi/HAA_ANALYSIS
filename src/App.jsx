import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';

import { OverviewPage } from './pages/OverviewPage';
import { SystemsPage } from './pages/SystemsPage';
import { SystemDetailPage } from './pages/SystemDetailPage';
import { AlertsPage } from './pages/AlertsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { PredictiveRiskPage } from './pages/PredictiveRiskPage';
import { EventHistoryPage } from './pages/EventHistoryPage';
import { SystemConfigPage } from './pages/SystemConfigPage';
import { AdminPage } from './pages/AdminPage';

export function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <div className="app-layout">
          {/* Left Navigation Sidebar */}
          <Sidebar />

          {/* Main Telemetry & Command Center View */}
          <div className="main-content">
            <Header />

            <Routes>
              <Route path="/" element={<OverviewPage />} />
              <Route path="/overview" element={<Navigate to="/" replace />} />
              <Route path="/systems" element={<SystemsPage />} />
              <Route path="/system/:id" element={<SystemDetailPage />} />
              <Route path="/alerts" element={<AlertsPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/predictive" element={<PredictiveRiskPage />} />
              <Route path="/events" element={<EventHistoryPage />} />
              <Route path="/config" element={<SystemConfigPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
