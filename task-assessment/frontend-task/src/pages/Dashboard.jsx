import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import {
  FiArrowUpRight,
  FiTrendingUp,
  FiUsers,
  FiHome,
  FiDollarSign,
  FiAlertCircle,
  FiInbox,
  FiLayout,
  FiList,
  FiPieChart,
  FiSun,
  FiMoon,
  FiMenu,
  FiX,
  FiBell,
  FiSearch,
  FiExternalLink,
} from 'react-icons/fi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

const KPIS = [
  { key: 'aum', label: 'Assets under management', value: '$4.2M', change: '+12.4%', up: true, icon: FiDollarSign },
  { key: 'investors', label: 'Active investors', value: '1,284', change: '+86 this month', up: true, icon: FiUsers },
  { key: 'listings', label: 'Live listings', value: '18', change: '3 closing soon', up: false, icon: FiHome },
  { key: 'yield', label: 'Avg. annual yield', value: '7.1%', change: '+0.3 pts', up: true, icon: FiTrendingUp },
];

const PROPERTIES = [
  { id: 1, title: 'Luxury Downtown Apartment', city: 'Miami, FL', funded: 89, roi: '7.2%', status: 'Active', price: '$850k' },
  { id: 2, title: 'Modern Tech District Complex', city: 'Austin, TX', funded: 95, roi: '6.8%', status: 'Almost funded', price: '$1.2M' },
  { id: 3, title: 'Waterfront Commercial Space', city: 'Seattle, WA', funded: 45, roi: '7.5%', status: 'New', price: '$2.1M' },
  { id: 4, title: 'Midtown Mixed-Use', city: 'New York, NY', funded: 62, roi: '6.4%', status: 'Active', price: '$1.8M' },
];

const ACTIVITY = [
  { who: 'Sarah J.', action: 'invested $2,400', where: 'Miami listing', time: '12m ago' },
  { who: 'Michael C.', action: 'completed KYC', where: 'identity check', time: '41m ago' },
  { who: 'David R.', action: 'listed a property', where: 'Austin, TX', time: '2h ago' },
  { who: 'System', action: 'payout processed', where: '142 investors', time: '5h ago' },
];

const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

function statusClass(status) {
  if (status === 'Almost funded') return 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300';
  if (status === 'New') return 'bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300';
  return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300';
}

function OverviewDash({ chartData, chartOptions, themeKey }) {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase text-primary-600 mb-2">Overview</p>
        <h2 className="text-3xl font-bold text-secondary-900 dark:text-white leading-tight">
          Portfolio at a glance
        </h2>
        <p className="mt-2 text-secondary-500 dark:text-secondary-400 max-w-xl">
          High-level health of listings, capital, and investors. One primary action per card.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {KPIS.map((k) => (
          <div
            key={k.key}
            className="rounded-2xl bg-white dark:bg-secondary-800 border border-secondary-100 dark:border-secondary-700 p-5 shadow-sm transition-colors duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
                <k.icon className="text-primary-600" size={18} />
              </div>
              <span className={`text-xs font-medium ${k.up ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                {k.change}
              </span>
            </div>
            <p className="mt-6 text-sm text-secondary-500 dark:text-secondary-400">{k.label}</p>
            <p className="mt-1 text-2xl font-bold text-secondary-900 dark:text-white">{k.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 rounded-2xl bg-white dark:bg-secondary-800 border border-secondary-100 dark:border-secondary-700 p-5 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-secondary-900 dark:text-white">Monthly inflows</h3>
            <span className="text-xs text-secondary-400">USD · last 6 months</span>
          </div>
          <div className="h-56">
            <Line key={themeKey} data={chartData} options={chartOptions} />
          </div>
        </div>
        <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-secondary-800 border border-secondary-100 dark:border-secondary-700 p-5 shadow-sm transition-colors duration-300">
          <h3 className="font-semibold text-secondary-900 dark:text-white mb-4">Live activity</h3>
          <ul className="space-y-4">
            {ACTIVITY.map((a) => (
              <li key={a.time + a.who} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary-100 dark:bg-secondary-700 flex items-center justify-center text-xs font-semibold text-secondary-600 dark:text-secondary-200">
                  {a.who.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-secondary-800 dark:text-secondary-100">
                    <span className="font-medium">{a.who}</span> {a.action}
                  </p>
                  <p className="text-xs text-secondary-400">{a.where} · {a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-secondary-900 dark:text-white">Featured listings</h3>
          <Link to="/properties" className="text-sm text-primary-600 hover:text-primary-700 inline-flex items-center gap-1">
            View all <FiArrowUpRight />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROPERTIES.slice(0, 4).map((p) => (
            <Link
              key={p.id}
              to={`/properties/${p.id}`}
              className="rounded-2xl bg-white dark:bg-secondary-800 border border-secondary-100 dark:border-secondary-700 p-5 shadow-sm hover:border-primary-200 dark:hover:border-primary-700 transition-colors duration-300"
            >
              <div className="flex justify-between gap-3">
                <div>
                  <p className="font-semibold text-secondary-900 dark:text-white">{p.title}</p>
                  <p className="text-sm text-secondary-500 dark:text-secondary-400 mt-1">{p.city}</p>
                </div>
                <span className={`h-fit text-xs px-2 py-1 rounded-full ${statusClass(p.status)}`}>{p.status}</span>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs text-secondary-500 dark:text-secondary-400 mb-1">
                  <span>Funded</span>
                  <span>{p.funded}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary-100 dark:bg-secondary-700 overflow-hidden">
                  <div className="h-full bg-primary-600 rounded-full" style={{ width: `${p.funded}%` }} />
                </div>
              </div>
              <div className="mt-4 flex justify-between text-sm">
                <span className="text-secondary-500 dark:text-secondary-400">Target {p.price}</span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">{p.roi} ROI</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function OperationsDash() {
  const [q, setQ] = useState('');
  const rows = PROPERTIES.filter(
    (p) =>
      p.title.toLowerCase().includes(q.toLowerCase()) ||
      p.city.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-primary-600 mb-1">Operations</p>
          <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">Listing pipeline</h2>
          <p className="text-sm text-secondary-500 mt-1">Dense view for daily review, search, and status.</p>
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filter by name or city"
          className="w-full sm:w-64 rounded-lg border border-secondary-200 dark:border-secondary-600 dark:bg-secondary-800 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div className="rounded-xl border border-secondary-200 dark:border-secondary-700 overflow-hidden bg-white dark:bg-secondary-800 transition-colors duration-300">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-secondary-50 dark:bg-secondary-900/60 text-left text-xs uppercase tracking-wide text-secondary-500 dark:text-secondary-400">
              <tr>
                <th className="px-4 py-3 font-semibold">Listing</th>
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-4 py-3 font-semibold">Target</th>
                <th className="px-4 py-3 font-semibold">Funded</th>
                <th className="px-4 py-3 font-semibold">ROI</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-100 dark:divide-secondary-700">
              {rows.map((p) => (
                <tr key={p.id} className="hover:bg-secondary-50 dark:hover:bg-secondary-700/40">
                  <td className="px-4 py-3 font-medium text-secondary-900 dark:text-white">{p.title}</td>
                  <td className="px-4 py-3 text-secondary-500 dark:text-secondary-400">{p.city}</td>
                  <td className="px-4 py-3 text-secondary-800 dark:text-secondary-200">{p.price}</td>
                  <td className="px-4 py-3 text-secondary-800 dark:text-secondary-200">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-secondary-200 dark:bg-secondary-600 overflow-hidden">
                        <div className="h-full bg-primary-600" style={{ width: `${p.funded}%` }} />
                      </div>
                      <span className="tabular-nums">{p.funded}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-medium">{p.roi}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusClass(p.status)}`}>{p.status}</span>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-secondary-400">
                    No listings match “{q}”.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function InsightsDash({ barData, barOptions, insightState, setInsightState, themeKey }) {
  if (insightState === 'loading') {
    return (
      <div className="space-y-4">
        <StateToggle insightState={insightState} setInsightState={setInsightState} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 rounded-2xl bg-secondary-200 dark:bg-secondary-700 animate-pulse" />
          ))}
        </div>
        <div className="h-64 rounded-2xl bg-secondary-200 dark:bg-secondary-700 animate-pulse" />
      </div>
    );
  }

  if (insightState === 'empty') {
    return (
      <div className="space-y-4">
        <StateToggle insightState={insightState} setInsightState={setInsightState} />
        <div className="rounded-2xl border border-dashed border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-800 py-16 px-6 text-center">
          <FiInbox className="mx-auto text-secondary-300 mb-3" size={36} />
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">No analytics yet</h3>
          <p className="mt-2 text-sm text-secondary-500 max-w-md mx-auto">
            Insights appear after the first successful funding round. Connect a listing to start tracking inflows.
          </p>
          <Link to="/properties" className="btn mt-6">Browse listings</Link>
        </div>
      </div>
    );
  }

  if (insightState === 'alert') {
    return (
      <div className="space-y-4">
        <StateToggle insightState={insightState} setInsightState={setInsightState} />
        <div className="rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4 flex gap-3">
          <FiAlertCircle className="text-amber-600 shrink-0 mt-0.5" size={20} />
          <div>
            <p className="font-semibold text-amber-900 dark:text-amber-200">Funding lag on 2 listings</p>
            <p className="text-sm text-amber-800 dark:text-amber-300 mt-1">
              Seattle Waterfront is 45% funded with 8 days left. Review pricing or push to the investor list.
            </p>
          </div>
        </div>
        <div className="rounded-2xl bg-white dark:bg-secondary-800 border border-secondary-100 dark:border-secondary-700 p-5 h-64 transition-colors duration-300">
          <Bar key={`alert-${themeKey}`} data={barData} options={barOptions} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-primary-600 mb-1">Insights</p>
          <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">City funding mix</h2>
          <p className="text-sm text-secondary-500 mt-1">Compare volume by market. Switch states to preview empty, loading, and alert.</p>
        </div>
        <StateToggle insightState={insightState} setInsightState={setInsightState} />
      </div>
      <div className="rounded-2xl bg-white dark:bg-secondary-800 border border-secondary-100 dark:border-secondary-700 p-5 h-72 transition-colors duration-300">
        <Bar key={`data-${themeKey}`} data={barData} options={barOptions} />
      </div>
    </div>
  );
}

function StateToggle({ insightState, setInsightState }) {
  const states = [
    { id: 'data', label: 'Populated' },
    { id: 'loading', label: 'Loading' },
    { id: 'empty', label: 'Empty' },
    { id: 'alert', label: 'Alert' },
  ];
  return (
    <div className="flex flex-wrap gap-1 p-1 rounded-lg bg-secondary-100 dark:bg-secondary-800">
      {states.map((s) => (
        <button
          key={s.id}
          type="button"
          onClick={() => setInsightState(s.id)}
          className={`px-3 py-1.5 text-xs font-medium rounded-md ${
            insightState === s.id
              ? 'bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white shadow-sm'
              : 'text-secondary-500'
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}

function Dashboard({ darkMode, setDarkMode }) {
  const [variant, setVariant] = useState('overview');
  const [insightState, setInsightState] = useState('data');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isDark = !!darkMode;
  const tick = isDark ? '#94a3b8' : '#64748b';
  const grid = isDark ? 'rgba(148,163,184,0.15)' : 'rgba(148,163,184,0.25)';

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: tick }, grid: { display: false } },
        y: { ticks: { color: tick }, grid: { color: grid } },
      },
    }),
    [tick, grid]
  );

  const lineData = {
    labels: months,
    datasets: [
      {
        data: [180, 220, 195, 310, 280, 360],
        borderColor: '#0682ff',
        backgroundColor: 'rgba(6, 130, 255, 0.12)',
        fill: true,
        tension: 0.35,
        pointRadius: 3,
      },
    ],
  };

  const barData = {
    labels: ['Miami', 'Austin', 'Seattle', 'NYC'],
    datasets: [
      {
        label: 'Funded %',
        data: [89, 95, 45, 62],
        backgroundColor: ['#0682ff', '#006eff', '#48c2ff', '#0854c5'],
        borderRadius: 6,
      },
    ],
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: FiLayout, hint: 'KPIs & activity' },
    { id: 'ops', label: 'Operations', icon: FiList, hint: 'Listing pipeline' },
    { id: 'insights', label: 'Insights', icon: FiPieChart, hint: 'Charts & states' },
  ];

  const titles = {
    overview: { title: 'Overview', sub: 'Portfolio health and recent activity' },
    ops: { title: 'Operations', sub: 'Review and filter live listings' },
    insights: { title: 'Insights', sub: 'Funding mix and dashboard states' },
  };

  const selectVariant = (id) => {
    setVariant(id);
    setSidebarOpen(false);
  };

  const toggleTheme = () => {
    if (typeof setDarkMode === 'function') {
      setDarkMode((prev) => !prev);
    }
  };

  const themeKey = darkMode ? 'dark' : 'light';

  return (
    <div className="h-full min-h-0 flex bg-secondary-100 dark:bg-secondary-950 transition-colors duration-300">
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 shrink-0 flex flex-col transition-colors duration-300 ${
          darkMode
            ? 'bg-secondary-900 text-white border-r border-secondary-800'
            : 'bg-white text-secondary-900 border-r border-secondary-200'
        } ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className={`h-16 px-5 flex items-center justify-between ${darkMode ? 'border-b border-white/10' : 'border-b border-secondary-200'}`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center text-sm font-bold">R</div>
            <div>
              <p className="font-semibold leading-tight">RoyalCity</p>
              <p className={`text-[11px] ${darkMode ? 'text-secondary-400' : 'text-secondary-500'}`}>Investor console</p>
            </div>
          </div>
          <button
            type="button"
            className={`lg:hidden ${darkMode ? 'text-secondary-400' : 'text-secondary-500'}`}
            onClick={() => setSidebarOpen(false)}
          >
            <FiX size={20} />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          <p className={`px-3 py-2 text-[11px] uppercase tracking-wider ${darkMode ? 'text-secondary-500' : 'text-secondary-400'}`}>
            Views
          </p>
          {navItems.map((item) => {
            const active = variant === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => selectVariant(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                  active
                    ? 'bg-primary-600 text-white'
                    : darkMode
                      ? 'text-secondary-300 hover:bg-white/5 hover:text-white'
                      : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
                }`}
              >
                <item.icon size={18} className="shrink-0" />
                <span className="min-w-0">
                  <span className="block text-sm font-medium">{item.label}</span>
                  <span className={`block text-[11px] ${active ? 'text-primary-100' : darkMode ? 'text-secondary-500' : 'text-secondary-400'}`}>
                    {item.hint}
                  </span>
                </span>
              </button>
            );
          })}
        </nav>

        <div className={`p-3 space-y-2 ${darkMode ? 'border-t border-white/10' : 'border-t border-secondary-200'}`}>
          <button
            type="button"
            onClick={toggleTheme}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
              darkMode ? 'text-secondary-300 hover:bg-white/5 hover:text-white' : 'text-secondary-600 hover:bg-secondary-50'
            }`}
          >
            <span className="inline-flex items-center gap-2">
              {darkMode ? <FiSun size={16} className="text-yellow-400" /> : <FiMoon size={16} />}
              {darkMode ? 'Light mode' : 'Dark mode'}
            </span>
            <span className={`text-[11px] px-2 py-0.5 rounded-full ${darkMode ? 'bg-white/10' : 'bg-secondary-100'}`}>
              {darkMode ? 'Dark' : 'Light'}
            </span>
          </button>
          <Link
            to="/"
            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              darkMode ? 'text-secondary-300 hover:bg-white/5 hover:text-white' : 'text-secondary-600 hover:bg-secondary-50'
            }`}
          >
            <FiExternalLink size={16} />
            Back to website
          </Link>
        </div>
      </aside>

      <div className="flex-1 min-w-0 min-h-0 flex flex-col">
        <header className="h-16 shrink-0 px-4 sm:px-6 flex items-center gap-3 border-b border-secondary-200 dark:border-secondary-800 bg-white dark:bg-secondary-900 transition-colors duration-300">
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg text-secondary-600 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu size={20} />
          </button>

          <div className="min-w-0 flex-1">
            <h1 className="text-base sm:text-lg font-semibold text-secondary-900 dark:text-white truncate">
              {titles[variant].title}
            </h1>
            <p className="text-xs text-secondary-500 dark:text-secondary-400 truncate hidden sm:block">
              {titles[variant].sub}
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary-50 dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 w-52 transition-colors duration-300">
            <FiSearch size={14} className="text-secondary-400 shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm w-full focus:outline-none dark:text-white placeholder:text-secondary-400"
            />
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border border-secondary-200 dark:border-secondary-700 text-secondary-700 dark:text-secondary-200 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors duration-300"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <FiSun size={16} className="text-yellow-400" /> : <FiMoon size={16} />}
            <span className="hidden sm:inline">{darkMode ? 'Light' : 'Dark'}</span>
          </button>

          <button
            type="button"
            className="relative p-2 rounded-lg text-secondary-600 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800"
          >
            <FiBell size={18} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary-500" />
          </button>

          <div className="flex items-center gap-2 pl-1">
            <div className="w-8 h-8 rounded-full bg-primary-600 text-white text-xs font-semibold flex items-center justify-center">
              AJ
            </div>
            <div className="hidden sm:block leading-tight">
              <p className="text-sm font-medium text-secondary-900 dark:text-white">Alex J.</p>
              <p className="text-[11px] text-secondary-500">Admin</p>
            </div>
          </div>
        </header>

        <main className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 lg:p-8 transition-colors duration-300">
          <div className="max-w-6xl mx-auto">
            {variant === 'overview' && (
              <OverviewDash chartData={lineData} chartOptions={chartOptions} themeKey={themeKey} />
            )}
            {variant === 'ops' && <OperationsDash />}
            {variant === 'insights' && (
              <InsightsDash
                barData={barData}
                barOptions={chartOptions}
                insightState={insightState}
                setInsightState={setInsightState}
                themeKey={themeKey}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
