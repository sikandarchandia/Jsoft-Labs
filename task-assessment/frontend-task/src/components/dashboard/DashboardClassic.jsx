import { FiBell, FiSearch } from 'react-icons/fi';
import { stats, recentProperties, activity, chartBars } from '../../data/dashboardData';

function DashboardClassic() {
  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 transition-colors duration-300">
      <div className="flex">
        <aside className="hidden lg:flex w-64 flex-col bg-white dark:bg-secondary-800 border-r border-secondary-200 dark:border-secondary-700 min-h-screen shrink-0">
          <div className="p-6 border-b border-secondary-100 dark:border-secondary-700">
            <span className="text-xl font-bold text-primary-600">RoyalCity</span>
            <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-1">Investor Dashboard</p>
          </div>
          <nav className="p-4 space-y-1">
            {['Overview', 'Properties', 'Investors', 'Reports', 'Settings'].map((item, i) => (
              <button
                key={item}
                type="button"
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  i === 0
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                    : 'text-secondary-600 dark:text-secondary-400 hover:bg-secondary-50 dark:hover:bg-secondary-700'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </aside>

        <div className="flex-grow min-w-0">
          <header className="bg-white dark:bg-secondary-800 border-b border-secondary-200 dark:border-secondary-700 px-6 py-4 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold dark:text-white">Overview</h1>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">Welcome back — here is your portfolio snapshot</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden sm:block">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400" size={16} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-9 pr-4 py-2 text-sm rounded-lg border border-secondary-200 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 w-48"
                />
              </div>
              <button type="button" className="p-2 rounded-lg text-secondary-500 hover:bg-secondary-100 dark:hover:bg-secondary-700">
                <FiBell size={20} />
              </button>
              <div className="w-9 h-9 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-semibold">
                RC
              </div>
            </div>
          </header>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-white dark:bg-secondary-800 rounded-xl p-5 border border-secondary-100 dark:border-secondary-700 shadow-sm">
                  <p className="text-sm text-secondary-500 dark:text-secondary-400">{s.label}</p>
                  <p className="text-2xl font-bold dark:text-white mt-1">{s.value}</p>
                  <p className={`text-xs mt-2 font-medium ${s.up ? 'text-green-600' : 'text-red-500'}`}>
                    {s.change} vs last month
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 bg-white dark:bg-secondary-800 rounded-xl p-6 border border-secondary-100 dark:border-secondary-700 shadow-sm">
                <h2 className="text-lg font-semibold dark:text-white mb-4">Revenue Trend</h2>
                <div className="flex items-end gap-2 h-40">
                  {chartBars.map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-primary-200 dark:bg-primary-800 rounded-t-md transition-all hover:bg-primary-400 dark:hover:bg-primary-600"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-3 text-xs text-secondary-400">
                  <span>Jan</span><span>Jun</span><span>Dec</span>
                </div>
              </div>

              <div className="bg-white dark:bg-secondary-800 rounded-xl p-6 border border-secondary-100 dark:border-secondary-700 shadow-sm">
                <h2 className="text-lg font-semibold dark:text-white mb-4">Recent Activity</h2>
                <ul className="space-y-4">
                  {activity.map((a) => (
                    <li key={a.id} className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 shrink-0" />
                      <div>
                        <p className="text-sm dark:text-secondary-200">{a.text}</p>
                        <p className="text-xs text-secondary-400 mt-0.5">{a.time}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white dark:bg-secondary-800 rounded-xl border border-secondary-100 dark:border-secondary-700 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-secondary-100 dark:border-secondary-700">
                <h2 className="text-lg font-semibold dark:text-white">Recent Properties</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-secondary-50 dark:bg-secondary-900/50 text-secondary-500 dark:text-secondary-400">
                    <tr>
                      <th className="text-left px-6 py-3 font-medium">Property</th>
                      <th className="text-left px-6 py-3 font-medium hidden md:table-cell">Location</th>
                      <th className="text-left px-6 py-3 font-medium">Price</th>
                      <th className="text-left px-6 py-3 font-medium">ROI</th>
                      <th className="text-left px-6 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-secondary-100 dark:divide-secondary-700">
                    {recentProperties.map((p) => (
                      <tr key={p.id} className="hover:bg-secondary-50 dark:hover:bg-secondary-700/50">
                        <td className="px-6 py-4 font-medium dark:text-white">{p.name}</td>
                        <td className="px-6 py-4 text-secondary-600 dark:text-secondary-400 hidden md:table-cell">{p.city}</td>
                        <td className="px-6 py-4 dark:text-secondary-200">{p.price}</td>
                        <td className="px-6 py-4 text-green-600 font-medium">{p.roi}</td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary-50 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300">
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardClassic;
