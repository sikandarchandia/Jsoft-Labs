import { FiHome, FiUsers, FiDollarSign, FiTrendingUp, FiActivity } from 'react-icons/fi';
import { stats, recentProperties, activity, chartBars } from '../../data/dashboardData';

const icons = [FiHome, FiUsers, FiDollarSign, FiTrendingUp];

function DashboardModern() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-900 via-secondary-900 to-primary-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-primary-400 text-sm font-medium tracking-wide uppercase">RoyalCity Analytics</p>
            <h1 className="text-3xl sm:text-4xl font-bold mt-1">Portfolio Command</h1>
          </div>
          <div className="flex gap-2">
            <button type="button" className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-sm font-medium backdrop-blur border border-white/10">
              Export
            </button>
            <button type="button" className="px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-400 text-sm font-medium">
              + Add Property
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => {
            const Icon = icons[i];
            return (
              <div
                key={s.label}
                className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-5 hover:border-primary-500/40 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center">
                    <Icon className="text-primary-400" size={20} />
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.up ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {s.change}
                  </span>
                </div>
                <p className="text-2xl font-bold mt-4">{s.value}</p>
                <p className="text-sm text-white/50 mt-1">{s.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          <div className="lg:col-span-3 rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Performance</h2>
              <span className="text-xs text-white/40">Last 12 months</span>
            </div>
            <div className="flex items-end gap-1.5 h-44">
              {chartBars.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end group">
                  <div
                    className="w-full rounded-t bg-gradient-to-t from-primary-600 to-primary-400 opacity-80 group-hover:opacity-100 transition-opacity"
                    style={{ height: `${h}%` }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-6">
            <div className="flex items-center gap-2 mb-5">
              <FiActivity className="text-primary-400" />
              <h2 className="text-lg font-semibold">Live Feed</h2>
            </div>
            <div className="space-y-4">
              {activity.map((a) => (
                <div key={a.id} className="flex gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-1 rounded-full bg-primary-500 shrink-0" />
                  <div>
                    <p className="text-sm text-white/90">{a.text}</p>
                    <p className="text-xs text-white/40 mt-1">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Top Listings</h2>
            <span className="text-xs text-white/40">{recentProperties.length} properties</span>
          </div>
          <div className="divide-y divide-white/5">
            {recentProperties.map((p) => (
              <div key={p.id} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 hover:bg-white/5 transition-colors">
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-sm text-white/50">{p.city}</p>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <span className="text-white/70">{p.price}</span>
                  <span className="text-green-400 font-semibold">{p.roi}</span>
                  <span className="px-3 py-1 rounded-full bg-primary-500/20 text-primary-300 text-xs">{p.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardModern;
