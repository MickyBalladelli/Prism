import { component, computed, keyed, onMount, resource, signal } from '@mickyballadelli/matrix'
import { Alert, Badge, Button, Card, Progress, Select, Table, Tag } from '@mickyballadelli/prism'
import { ExamplePageShell } from '../example-page-shell.jsx'

const defaultDashboard = {
  metrics: [
    { id: 'revenue', label: 'Revenue', value: '$24,680', change: '+12.4%', tone: 'positive', detail: 'vs last period' },
    { id: 'users', label: 'Active users', value: '8,421', change: '+8.1%', tone: 'positive', detail: 'steady growth' },
    { id: 'latency', label: 'API latency', value: '142 ms', change: '-18.2%', tone: 'positive', detail: 'p95 response time' },
    { id: 'errors', label: 'Error rate', value: '0.18%', change: '+0.02%', tone: 'warning', detail: 'needs attention' }
  ],
  trend: [38, 52, 48, 64, 58, 76, 70],
  activity: [
    { id: 'a-1', actor: 'Ada', action: 'deployed checkout', status: 'success', time: '2m ago' },
    { id: 'a-2', actor: 'Boudica', action: 'updated billing settings', status: 'success', time: '18m ago' },
    { id: 'a-3', actor: 'Cato', action: 'reported an API timeout', status: 'error', time: '42m ago' },
    { id: 'a-4', actor: 'Dido', action: 'invited a teammate', status: 'success', time: '1h ago' },
    { id: 'a-5', actor: 'Enki', action: 'rotated a service key', status: 'success', time: '2h ago' }
  ]
}

function wait(milliseconds, abortSignal) {
  return new Promise((resolve, reject) => {
    if (abortSignal?.aborted) {
      reject(new Error('Request aborted'))
      return
    }
    const timer = setTimeout(resolve, milliseconds)
    abortSignal?.addEventListener('abort', () => {
      clearTimeout(timer)
      reject(new Error('Request aborted'))
    }, { once: true })
  })
}

function createDashboardApi() {
  return {
    async load(range, abortSignal) {
      await wait(180, abortSignal)
      return {
        range,
        metrics: defaultDashboard.metrics.map(metric => ({ ...metric })),
        trend: [...defaultDashboard.trend],
        activity: defaultDashboard.activity.map(item => ({ ...item }))
      }
    }
  }
}

function createPerformanceTimeline() {
  let recording = false
  const entries = []

  return {
    get size() {
      return entries.length
    },
    start() {
      recording = true
      entries.push({ point: 'start', at: globalThis.performance?.now?.() ?? Date.now() })
    },
    stop() {
      if (!recording) return
      recording = false
      entries.push({ point: 'stop', at: globalThis.performance?.now?.() ?? Date.now() })
    },
    dispose() {
      entries.length = 0
      recording = false
    }
  }
}

function DashboardMetric({ metric }) {
  return (
    <li class={`dashboard-metric dashboard-metric-${metric.tone}`}>
      <span class="dashboard-metric-label">{metric.label}</span>
      <strong>{metric.value}</strong>
      <span class="dashboard-metric-change">{metric.change}</span>
      <small>{metric.detail}</small>
    </li>
  )
}

function TrendBar({ value, index }) {
  return <span class="dashboard-trend-bar" style={`height: ${value}%`} title={`${value}%`} aria-label={`${value}% traffic on day ${index + 1}`}></span>
}

export function DashboardPage({ example, link, navigateTo }) {
  const api = createDashboardApi()
  const range = signal('7d')
  const activityFilter = signal('all')
  const recording = signal(false)
  const timeline = createPerformanceTimeline({ maxEntries: 300, redact: false })
  const data = resource((_range, abortSignal) => api.load(_range, abortSignal), { initialValue: defaultDashboard })

  const filteredActivity = computed(() => (data.data.value?.activity ?? []).filter(item => activityFilter.value === 'all' || item.status === activityFilter.value))
  const metricViews = computed(() => keyed((data.data.value?.metrics ?? []).map(metric => component(DashboardMetric, { metric }, metric.id)), item => item.props.metric.id))
  const trendViews = computed(() => keyed((data.data.value?.trend ?? []).map((value, index) => component(TrendBar, { value, index }, index)), item => item.props.index))
  const dashboardStatus = computed(() => data.loading.value
    ? Alert({ tone: 'info', title: 'Refreshing metrics', children: `Loading the ${range.value} view…` })
    : data.error.value
      ? Alert({ tone: 'error', title: 'Metrics unavailable', children: 'Try refreshing the dashboard.' })
      : null)
  const activityRows = computed(() => filteredActivity.value)
  const activityColumns = [
    { key: 'actor', header: 'Actor', width: 140 },
    { key: 'action', header: 'Activity', width: 260 },
    { key: 'status', header: 'State', width: 120, render: status => Tag({ tone: status === 'error' ? 'error' : 'success', children: status === 'error' ? 'Needs review' : 'Complete' }) },
    { key: 'time', header: 'When', width: 100, align: 'end' }
  ]

  function reload() {
    return data.reload(range.value).catch(() => undefined)
  }

  function toggleRecording() {
    if (recording.value) {
      timeline.stop()
      recording.value = false
    } else {
      timeline.start()
      recording.value = true
    }
  }

  onMount(() => {
    reload()
    return () => {
      timeline.stop()
      timeline.dispose()
    }
  })

  return (
    <ExamplePageShell example={example} link={link} navigateTo={navigateTo}>
      <section class="example-window dashboard-window" aria-label="Prism operations dashboard">
        <header class="dashboard-app-header">
          <div><p class="eyebrow">Operations / Control room</p><h2>Signal health</h2><p>Live view of the systems that keep your workspace moving.</p></div>
          <div class="dashboard-header-actions"><Tag tone="success">All systems normal</Tag><Button variant={computed(() => recording.value ? 'error' : 'secondary')} pressed={recording} onClick={toggleRecording}>{computed(() => recording.value ? 'Stop recording' : 'Record timeline')}</Button></div>
        </header>
        <div class="dashboard-controls">
          <div class="dashboard-control-copy"><span>Window</span><strong>{computed(() => range.value === '24h' ? 'Last 24 hours' : range.value === '30d' ? 'Last 30 days' : 'Last 7 days')}</strong></div>
          <div class="dashboard-control-actions"><Select value={range} ariaLabel="Dashboard time range" options={[{ value: '24h', label: 'Last 24 hours' }, { value: '7d', label: 'Last 7 days' }, { value: '30d', label: 'Last 30 days' }]} onChange={reload} /><Select value={activityFilter} ariaLabel="Activity filter" options={[{ value: 'all', label: 'All activity' }, { value: 'success', label: 'Success only' }, { value: 'error', label: 'Errors only' }]} /></div>
        </div>
        <div class="dashboard-status">{dashboardStatus}</div>
        <ul class="dashboard-metric-grid">{metricViews}</ul>
        <div class="dashboard-main-grid">
          <Card class="dashboard-trend-card">
            <div class="dashboard-card-heading"><div><p class="eyebrow">Traffic</p><h3>Steady upward motion.</h3></div><Badge value="+16.8%" tone="success" /></div>
            <div class="dashboard-chart-meta"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
            <div class="dashboard-trend-chart" aria-label="Traffic trend chart">{trendViews}</div>
            <div class="dashboard-progress"><Progress value={78} max={100} showValue label="Weekly reliability target" tone="success" /><span>Target is 90% by Friday</span></div>
          </Card>
          <Card class="dashboard-focus-card">
            <div class="dashboard-card-heading"><div><p class="eyebrow">Focus area</p><h3>Keep the core quiet.</h3></div><span class="dashboard-focus-mark" aria-hidden="true">↗</span></div>
            <p>Latency improved after the latest cache pass. One error spike needs a closer look before the next deploy.</p>
            <div class="dashboard-focus-list"><div><strong>142 ms</strong><span>p95 latency</span></div><div><strong>99.82%</strong><span>availability</span></div><div><strong>4 min</strong><span>to deploy</span></div></div>
            <Button variant="secondary" onClick={() => activityFilter.value = 'error'}>Review errors</Button>
          </Card>
        </div>
        <Card class="dashboard-activity-card">
          <div class="dashboard-card-heading"><div><p class="eyebrow">Recent activity</p><h3>What changed.</h3></div><span>{computed(() => `${filteredActivity.value.length} events`)}</span></div>
          <Table rows={activityRows} columns={activityColumns} rowKey="id" searchable={false} sortable={false} resizable={false} reorderable={false} selectable={false} paginated={false} showSettings={false} exportable={false} title="Recent activity" ariaLabel="Recent dashboard activity" emptyMessage="No activity in this filter" />
        </Card>
      </section>
    </ExamplePageShell>
  )
}
