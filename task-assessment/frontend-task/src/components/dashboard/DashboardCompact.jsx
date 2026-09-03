import { FiChevronRight, FiMoreHorizontal } from 'react-icons/fi';
import { stats, recentProperties, activity } from '../../data/dashboardData';

function DashboardCompact() {
  return (
    <div className="min-h-screen bg-white dark:bg-secondary-900 transition-colors duration-300 pb-20 sm:pb-8">
      <div className="max-w-lg mx-auto px-4 py-5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs text-secondary-500 dark:text-secondary-400">Thursday, Sep 3</p>
            <h1 className="text-xl font-bold dark:text-white">My Dashboard</h1>
          </div>
          <button type="button" className="p-2 rounded-full bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-300">
            <FiMoreHorizontal size={20} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.slice(0, 4).map((s) => (
            <div
              key={s.label}
              className="p-4 rounded-2xl border border-secondary-200 dark:border-secondary-700 bg-secondary-50 dark:bg-secondary-800"
            >
              <p className="text-xs text-secondary-500 dark:text-secondary-400 truncate">{s.label}</p>
              <p className="text-lg font-bold dark:text-white mt-1">{s.value}</p>
              <p className={`text-[10px] mt-1 font-semibold ${s.up ? 'text-green-600' : 'text-red-500'}`}>
                {s.change}
              </p>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold dark:text-white">Properties</h2>
            <button type="button" className="text-xs text-primary-600 dark:text-primary-400 font-medium">See all</button>
          </div>
          <div className="space-y-2">
            {recentProperties.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 p-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 active:scale-[0.98] transition-transform"
              >
                <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-primary-600 dark:text-primary-400 text-xs font-bold">
                  #{p.id}
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-sm font-medium dark:text-white truncate">{p.name}</p>
                  <p className="text-xs text-secondary-500 dark:text-secondary-400">{p.city} · {p.roi}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold dark:text-white">{p.price}</p>
                  <FiChevronRight className="text-secondary-400 ml-auto mt-0.5" size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold dark:text-white mb-3">Activity</h2>
          <div className="rounded-xl border border-secondary-200 dark:border-secondary-700 divide-y divide-secondary-100 dark:divide-secondary-700 overflow-hidden">
            {activity.map((a) => (
              <div key={a.id} className="px-4 py-3 bg-white dark:bg-secondary-800">
                <p className="text-sm dark:text-secondary-200">{a.text}</p>
                <p className="text-xs text-secondary-400 mt-0.5">{a.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 sm:hidden bg-white dark:bg-secondary-800 border-t border-secondary-200 dark:border-secondary-700 px-6 py-3 flex justify-around">
        {['Home', 'Stats', 'List', 'More'].map((label, i) => (
          <button
            key={label}
            type="button"
            className={`text-xs font-medium ${i === 0 ? 'text-primary-600' : 'text-secondary-400'}`}
          >
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default DashboardCompact;
