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

function OverviewDash({ chartData, chartOptions, themeKey, colors: c }) {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase text-primary-600 mb-2">Overview</p>
        <h2 className={`text-3xl font-bold leading-tight ${c.cardTitle}`}>
          Portfolio at a glance
        </h2>
        <p className={`mt-2 max-w-xl ${c.cardMuted}`}>
          High-level health of listings, capital, and investors. One primary action per card.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {KPIS.map((k) => (
          <div
            key={k.key}
            className={`rounded-2xl border p-5 shadow-sm transition-colors duration-300 ${c.card}`}
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center bg-[#edf9ff]">
                <k.icon className="text-primary-600" size={18} />
              </div>
              <span className={`text-xs font-medium ${k.up ? 'text-emerald-500' : 'text-amber-500'}`}>
                {k.change}
              </span>
            </div>
            <p className={`mt-6 text-sm ${c.cardMuted}`}>{k.label}</p>
            <p className={`mt-1 text-2xl font-bold ${c.cardTitle}`}>{k.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className={`lg:col-span-3 rounded-2xl border p-5 shadow-sm transition-colors duration-300 ${c.card}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-semibold ${c.cardTitle}`}>Monthly inflows</h3>
            <span className={`text-xs ${c.cardMuted}`}>USD · last 6 months</span>
          </div>
          <div className="h-56">
            <Line key={themeKey} data={chartData} options={chartOptions} />
          </div>
        </div>
        <div className={`lg:col-span-2 rounded-2xl border p-5 shadow-sm transition-colors duration-300 ${c.card}`}>
          <h3 className={`font-semibold mb-4 ${c.cardTitle}`}>Live activity</h3>
          <ul className="space-y-4">
            {ACTIVITY.map((a) => (
              <li key={a.time + a.who} className="flex gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${c.sidebarPanel} ${c.cardTitle}`}>
                  {a.who.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className={`text-sm ${c.cardTitle}`}>
                    <span className="font-medium">{a.who}</span> {a.action}
                  </p>
                  <p className={`text-xs ${c.cardMuted}`}>{a.where} · {a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`font-semibold ${c.cardTitle}`}>Featured listings</h3>
          <Link to="/properties" className="text-sm text-primary-600 hover:text-primary-700 inline-flex items-center gap-1">
            View all <FiArrowUpRight />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROPERTIES.slice(0, 4).map((p) => (
            <Link
              key={p.id}
              to={`/properties/${p.id}`}
              className={`rounded-2xl border p-5 shadow-sm transition-colors duration-300 ${c.card}`}
            >
              <div className="flex justify-between gap-3">
                <div>
                  <p className={`font-semibold ${c.cardTitle}`}>{p.title}</p>
                  <p className={`text-sm mt-1 ${c.cardMuted}`}>{p.city}</p>
                </div>
                <span className={`h-fit text-xs px-2 py-1 rounded-full ${statusClass(p.status)}`}>{p.status}</span>
              </div>
              <div className="mt-4">
                <div className={`flex justify-between text-xs mb-1 ${c.cardMuted}`}>
                  <span>Funded</span>
                  <span>{p.funded}%</span>
                </div>
                <div className={`h-2 rounded-full overflow-hidden ${c.progressBg}`}>
                  <div className="h-full bg-primary-600 rounded-full" style={{ width: `${p.funded}%` }} />
                </div>
              </div>
              <div className="mt-4 flex justify-between text-sm">
                <span className={c.cardMuted}>Target {p.price}</span>
                <span className="font-medium text-emerald-500">{p.roi} ROI</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function OperationsDash({ colors: c }) {
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
          <h2 className={`text-2xl font-bold ${c.cardTitle}`}>Listing pipeline</h2>
          <p className={`text-sm mt-1 ${c.cardMuted}`}>Dense view for daily review, search, and status.</p>
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filter by name or city"
          className={`w-full sm:w-64 rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 ${c.input}`}
        />
      </div>

      <div className={`rounded-xl border overflow-hidden transition-colors duration-300 ${c.card}`}>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className={`text-left text-xs uppercase tracking-wide ${c.tableHead}`}>
              <tr>
                <th className="px-4 py-3 font-semibold">Listing</th>
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-4 py-3 font-semibold">Target</th>
                <th className="px-4 py-3 font-semibold">Funded</th>
                <th className="px-4 py-3 font-semibold">ROI</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${c.tableBorder}`}>
              {rows.map((p) => (
                <tr key={p.id} className={c.tableRow}>
                  <td className={`px-4 py-3 font-medium ${c.cardTitle}`}>{p.title}</td>
                  <td className={`px-4 py-3 ${c.cardMuted}`}>{p.city}</td>
                  <td className={`px-4 py-3 ${c.cardTitle}`}>{p.price}</td>
                  <td className={`px-4 py-3 ${c.cardTitle}`}>
                    <div className="flex items-center gap-2">
                      <div className={`w-16 h-1.5 rounded-full overflow-hidden ${c.progressBg}`}>
                        <div className="h-full bg-primary-600" style={{ width: `${p.funded}%` }} />
                      </div>
                      <span className="tabular-nums">{p.funded}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-emerald-500 font-medium">{p.roi}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusClass(p.status)}`}>{p.status}</span>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className={`px-4 py-8 text-center ${c.cardMuted}`}>
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

function InsightsDash({ barData, barOptions, insightState, setInsightState, themeKey, colors: c }) {
  if (insightState === 'loading') {
    return (
      <div className="space-y-4">
        <StateToggle insightState={insightState} setInsightState={setInsightState} colors={c} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`h-28 rounded-2xl animate-pulse ${c.skeleton}`} />
          ))}
        </div>
        <div className={`h-64 rounded-2xl animate-pulse ${c.skeleton}`} />
      </div>
    );
  }

  if (insightState === 'empty') {
    return (
      <div className="space-y-4">
        <StateToggle insightState={insightState} setInsightState={setInsightState} colors={c} />
        <div className={`rounded-2xl border border-dashed py-16 px-6 text-center ${c.empty}`}>
          <FiInbox className={`mx-auto mb-3 ${c.cardMuted}`} size={36} />
          <h3 className={`text-lg font-semibold ${c.cardTitle}`}>No analytics yet</h3>
          <p className={`mt-2 text-sm max-w-md mx-auto ${c.cardMuted}`}>
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
        <StateToggle insightState={insightState} setInsightState={setInsightState} colors={c} />
        <div className={`rounded-2xl border p-4 flex gap-3 ${c.alert}`}>
          <FiAlertCircle className="text-amber-500 shrink-0 mt-0.5" size={20} />
          <div>
            <p className="font-semibold">Funding lag on 2 listings</p>
            <p className={`text-sm mt-1 ${c.alertSub}`}>
              Seattle Waterfront is 45% funded with 8 days left. Review pricing or push to the investor list.
            </p>
          </div>
        </div>
        <div className={`rounded-2xl border p-5 h-64 transition-colors duration-300 ${c.card}`}>
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
          <h2 className={`text-2xl font-bold ${c.cardTitle}`}>City funding mix</h2>
          <p className={`text-sm mt-1 ${c.cardMuted}`}>Compare volume by market. Switch states to preview empty, loading, and alert.</p>
        </div>
        <StateToggle insightState={insightState} setInsightState={setInsightState} colors={c} />
      </div>
      <div className={`rounded-2xl border p-5 h-72 transition-colors duration-300 ${c.card}`}>
        <Bar key={`data-${themeKey}`} data={barData} options={barOptions} />
      </div>
    </div>
  );
}

function StateToggle({ insightState, setInsightState, colors: c }) {
  const states = [
    { id: 'data', label: 'Populated' },
    { id: 'loading', label: 'Loading' },
    { id: 'empty', label: 'Empty' },
    { id: 'alert', label: 'Alert' },
  ];
  return (
    <div className={`flex flex-wrap gap-1 p-1 rounded-lg ${c.stateWrap}`}>
      {states.map((s) => (
        <button
          key={s.id}
          type="button"
          onClick={() => setInsightState(s.id)}
          className={`px-3 py-1.5 text-xs font-medium rounded-md ${
            insightState === s.id ? c.stateActive : c.stateIdle
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
  const themeKey = isDark ? 'dark' : 'light';

  const c = isDark
    ? {
        page: 'bg-[#020617]',
        sidebar: 'bg-[#0f172a] border-[#1e293b] text-white',
        sidebarBorder: 'border-[#1e293b]',
        sidebarMuted: 'text-[#94a3b8]',
        sidebarHint: 'text-[#64748b]',
        sidebarHover: 'text-[#cbd5e1] hover:bg-white/5 hover:text-white',
        sidebarPanel: 'bg-white/5',
        header: 'bg-[#0f172a] border-[#1e293b]',
        title: 'text-white',
        sub: 'text-[#94a3b8]',
        search: 'bg-[#1e293b] border-[#334155] text-white placeholder:text-[#64748b]',
        iconBtn: 'text-[#cbd5e1] hover:bg-[#1e293b] border-[#334155]',
        main: 'bg-[#020617]',
        card: 'bg-[#0f172a] border-[#1e293b]',
        cardTitle: 'text-white',
        cardMuted: 'text-[#94a3b8]',
        tableHead: 'bg-[#020617] text-[#94a3b8]',
        tableRow: 'hover:bg-[#1e293b]/40',
        tableBorder: 'divide-[#1e293b]',
        input: 'border-[#334155] bg-[#1e293b] text-white',
        switchTrack: 'bg-[#0682ff]',
        overlay: 'bg-black/50',
        empty: 'border-[#334155] bg-[#0f172a]',
        alert: 'border-amber-800 bg-amber-900/20 text-amber-200',
        alertSub: 'text-amber-300',
        skeleton: 'bg-[#1e293b]',
        stateWrap: 'bg-[#1e293b]',
        stateActive: 'bg-[#0f172a] text-white shadow-sm',
        stateIdle: 'text-[#94a3b8]',
        progressBg: 'bg-[#334155]',
      }
    : {
        page: 'bg-[#f1f5f9]',
        sidebar: 'bg-white border-[#e2e8f0] text-[#0f172a]',
        sidebarBorder: 'border-[#e2e8f0]',
        sidebarMuted: 'text-[#64748b]',
        sidebarHint: 'text-[#94a3b8]',
        sidebarHover: 'text-[#475569] hover:bg-[#f8fafc] hover:text-[#0f172a]',
        sidebarPanel: 'bg-[#f8fafc]',
        header: 'bg-white border-[#e2e8f0]',
        title: 'text-[#0f172a]',
        sub: 'text-[#64748b]',
        search: 'bg-[#f8fafc] border-[#e2e8f0] text-[#0f172a] placeholder:text-[#94a3b8]',
        iconBtn: 'text-[#475569] hover:bg-[#f1f5f9] border-[#e2e8f0]',
        main: 'bg-[#f1f5f9]',
        card: 'bg-white border-[#e2e8f0]',
        cardTitle: 'text-[#0f172a]',
        cardMuted: 'text-[#64748b]',
        tableHead: 'bg-[#f8fafc] text-[#64748b]',
        tableRow: 'hover:bg-[#f8fafc]',
        tableBorder: 'divide-[#f1f5f9]',
        input: 'border-[#e2e8f0] bg-white text-[#0f172a]',
        switchTrack: 'bg-[#cbd5e1]',
        overlay: 'bg-black/40',
        empty: 'border-[#cbd5e1] bg-white',
        alert: 'border-amber-200 bg-amber-50 text-amber-900',
        alertSub: 'text-amber-800',
        skeleton: 'bg-[#e2e8f0]',
        stateWrap: 'bg-[#f1f5f9]',
        stateActive: 'bg-white text-[#0f172a] shadow-sm',
        stateIdle: 'text-[#64748b]',
        progressBg: 'bg-[#e2e8f0]',
      };

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

  const lineData = useMemo(
    () => ({
      labels: months,
      datasets: [
        {
          data: [180, 220, 195, 310, 280, 360],
          borderColor: '#0682ff',
          backgroundColor: isDark ? 'rgba(6, 130, 255, 0.18)' : 'rgba(6, 130, 255, 0.12)',
          fill: true,
          tension: 0.35,
          pointRadius: 3,
          pointBackgroundColor: '#0682ff',
        },
      ],
    }),
    [isDark]
  );

  const barData = useMemo(
    () => ({
      labels: ['Miami', 'Austin', 'Seattle', 'NYC'],
      datasets: [
        {
          label: 'Funded %',
          data: [89, 95, 45, 62],
          backgroundColor: isDark
            ? ['#3b9eff', '#0682ff', '#48c2ff', '#1e6fd9']
            : ['#0682ff', '#006eff', '#48c2ff', '#0854c5'],
          borderRadius: 6,
        },
      ],
    }),
    [isDark]
  );

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
    setDarkMode(!isDark);
  };

  return (
    <div className={`h-full min-h-0 flex transition-colors duration-300 ${c.page}`}>
      {sidebarOpen && (
        <button
          type="button"
          className={`fixed inset-0 z-30 lg:hidden ${c.overlay}`}
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 shrink-0 flex flex-col border-r transition-colors duration-300 ${c.sidebar} ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className={`h-16 px-5 flex items-center justify-between border-b ${c.sidebarBorder}`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center text-sm font-bold">R</div>
            <div>
              <p className="font-semibold leading-tight">RoyalCity</p>
              <p className={`text-[11px] ${c.sidebarMuted}`}>Investor console</p>
            </div>
          </div>
          <button type="button" className={`lg:hidden ${c.sidebarMuted}`} onClick={() => setSidebarOpen(false)}>
            <FiX size={20} />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          <p className={`px-3 py-2 text-[11px] uppercase tracking-wider ${c.sidebarHint}`}>Views</p>
          {navItems.map((item) => {
            const active = variant === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => selectVariant(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                  active ? 'bg-primary-600 text-white' : c.sidebarHover
                }`}
              >
                <item.icon size={18} className="shrink-0" />
                <span className="min-w-0">
                  <span className="block text-sm font-medium">{item.label}</span>
                  <span className={`block text-[11px] ${active ? 'text-primary-100' : c.sidebarHint}`}>
                    {item.hint}
                  </span>
                </span>
              </button>
            );
          })}
        </nav>

        <div className={`p-3 space-y-2 border-t ${c.sidebarBorder}`}>
          <div className={`flex items-center justify-between px-3 py-2.5 rounded-lg ${c.sidebarPanel}`}>
            <span className={`inline-flex items-center gap-2 text-sm ${c.title}`}>
              {isDark ? <FiMoon size={16} /> : <FiSun size={16} className="text-amber-500" />}
              {isDark ? 'Dark' : 'Light'}
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={isDark}
              onClick={toggleTheme}
              className={`relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                isDark ? 'bg-primary-600' : c.switchTrack
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${
                  isDark ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
          <Link to="/" className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors ${c.sidebarHover}`}>
            <FiExternalLink size={16} />
            Back to website
          </Link>
        </div>
      </aside>

      <div className="flex-1 min-w-0 min-h-0 flex flex-col">
        <header className={`h-16 shrink-0 px-4 sm:px-6 flex items-center gap-3 border-b transition-colors duration-300 ${c.header}`}>
          <button
            type="button"
            className={`lg:hidden p-2 rounded-lg ${c.iconBtn}`}
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu size={20} />
          </button>

          <div className="min-w-0 flex-1">
            <h1 className={`text-base sm:text-lg font-semibold truncate ${c.title}`}>{titles[variant].title}</h1>
            <p className={`text-xs truncate hidden sm:block ${c.sub}`}>{titles[variant].sub}</p>
          </div>

          <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border w-52 ${c.search}`}>
            <FiSearch size={14} className="text-[#94a3b8] shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm w-full focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className={`p-2.5 rounded-lg border transition-colors duration-300 ${c.iconBtn}`}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <FiSun size={18} className="text-yellow-400" /> : <FiMoon size={18} />}
          </button>

          <button type="button" className={`relative p-2 rounded-lg ${c.iconBtn}`}>
            <FiBell size={18} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary-500" />
          </button>

          <div className="flex items-center gap-2 pl-1">
            <div className="w-8 h-8 rounded-full bg-primary-600 text-white text-xs font-semibold flex items-center justify-center">
              AJ
            </div>
            <div className="hidden sm:block leading-tight">
              <p className={`text-sm font-medium ${c.title}`}>Alex J.</p>
              <p className={`text-[11px] ${c.sub}`}>Admin</p>
            </div>
          </div>
        </header>

        <main className={`flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 lg:p-8 transition-colors duration-300 ${c.main}`}>
          <div className="max-w-6xl mx-auto" key={themeKey}>
            {variant === 'overview' && (
              <OverviewDash chartData={lineData} chartOptions={chartOptions} themeKey={themeKey} colors={c} />
            )}
            {variant === 'ops' && <OperationsDash colors={c} />}
            {variant === 'insights' && (
              <InsightsDash
                barData={barData}
                barOptions={chartOptions}
                insightState={insightState}
                setInsightState={setInsightState}
                themeKey={themeKey}
                colors={c}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
