import { useState } from 'react';
import DashboardClassic from '../components/dashboard/DashboardClassic';
import DashboardModern from '../components/dashboard/DashboardModern';
import DashboardCompact from '../components/dashboard/DashboardCompact';

const variations = [
  { id: 'classic', label: 'Classic', desc: 'Sidebar layout · light cards · data table' },
  { id: 'modern', label: 'Modern', desc: 'Dark glass · gradients · command center' },
  { id: 'compact', label: 'Compact', desc: 'Mobile-first · stacked cards · bottom nav' },
];

function Dashboard() {
  const [active, setActive] = useState('classic');

  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-16 z-30 bg-white/95 dark:bg-secondary-900/95 backdrop-blur border-b border-secondary-200 dark:border-secondary-700 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-lg font-bold dark:text-white">Dashboard Designs</h1>
            <p className="text-xs text-secondary-500 dark:text-secondary-400">3 variations — switch to compare styles</p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
            {variations.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setActive(v.id)}
                className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active === v.id
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
        <p className="max-w-7xl mx-auto text-xs text-secondary-400 dark:text-secondary-500 mt-2 hidden sm:block">
          {variations.find((v) => v.id === active)?.desc}
        </p>
      </div>

      <div className="flex-grow">
        {active === 'classic' && <DashboardClassic />}
        {active === 'modern' && <DashboardModern />}
        {active === 'compact' && <DashboardCompact />}
      </div>
    </div>
  );
}

export default Dashboard;
