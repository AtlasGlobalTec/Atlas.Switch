'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Activity,
  ArrowUpRight,
  Bell,
  Briefcase,
  CalendarClock,
  Check,
  CheckSquare,
  ChevronDown,
  CircleHelp,
  Clock3,
  CreditCard,
  LayoutDashboard,
  Menu,
  Plus,
  Search,
  Settings,
  Users,
  X,
} from 'lucide-react';

const navigationGroups = [
  {
    label: 'Visão geral',
    items: [{ label: 'Painel', href: '/preview', icon: LayoutDashboard }],
  },
  {
    label: 'Operação',
    items: [
      { label: 'Taskflow', href: '/dashboard/taskflow', icon: CheckSquare },
      { label: 'Chronos', href: '/dashboard/chronos', icon: CalendarClock },
      { label: 'Reunify', href: '/dashboard/reunify', icon: Activity },
      { label: 'Projectus', href: '/dashboard/projectus', icon: Briefcase },
    ],
  },
  {
    label: 'Gestão',
    items: [
      { label: 'Equipe', href: '/dashboard/usuarios', icon: Users },
      { label: 'Financeiro', href: '/dashboard/billtrak', icon: CreditCard },
      { label: 'Configurações', href: '/dashboard/general', icon: Settings },
    ],
  },
];

const tasks = [
  { title: 'Revisar proposta comercial', owner: 'Marina Costa', due: 'Hoje, 14:30', status: 'Prioridade alta', tone: 'rose' },
  { title: 'Validar cronograma do projeto', owner: 'Rafael Lima', due: 'Hoje, 16:00', status: 'Em andamento', tone: 'amber' },
  { title: 'Consolidar pauta da reunião', owner: 'Ana Martins', due: 'Amanhã, 10:00', status: 'Aguardando', tone: 'slate' },
];

const agenda = [
  { time: '09:00', title: 'Reunião de operação', detail: 'Sala de planejamento', done: true },
  { time: '11:30', title: 'Revisão de indicadores', detail: 'Equipe de gestão', done: false },
  { time: '15:00', title: 'Alinhamento do projeto', detail: 'Projeto Atlas', done: false },
];

const capacity = [
  { name: 'Marina Costa', role: 'Operações', percent: 86, tone: 'bg-emerald-700' },
  { name: 'Rafael Lima', role: 'Projetos', percent: 68, tone: 'bg-sky-700' },
  { name: 'Ana Martins', role: 'Financeiro', percent: 43, tone: 'bg-amber-600' },
];

type DashboardPeriod = 'Hoje' | '7 dias' | '30 dias';

const metricsByPeriod: Record<DashboardPeriod, Array<{ label: string; value: string; detail: string; tone: string }>> = {
  Hoje: [
    { label: 'Tarefas em aberto', value: '24', detail: '6 vencem hoje', tone: 'text-emerald-800 dark:text-emerald-300' },
    { label: 'Reuniões hoje', value: '3', detail: 'Próxima às 11:30', tone: 'text-sky-800 dark:text-sky-300' },
    { label: 'Projetos ativos', value: '8', detail: '2 exigem atenção', tone: 'text-amber-800 dark:text-amber-300' },
    { label: 'Capacidade do time', value: '72%', detail: 'Dentro do planejado', tone: 'text-slate-900 dark:text-slate-100' },
  ],
  '7 dias': [
    { label: 'Tarefas em aberto', value: '31', detail: '4 vencem nesta semana', tone: 'text-emerald-800 dark:text-emerald-300' },
    { label: 'Reuniões agendadas', value: '12', detail: '3 concluídas', tone: 'text-sky-800 dark:text-sky-300' },
    { label: 'Projetos ativos', value: '8', detail: '2 exigem atenção', tone: 'text-amber-800 dark:text-amber-300' },
    { label: 'Capacidade do time', value: '76%', detail: '4 pontos acima da média', tone: 'text-slate-900 dark:text-slate-100' },
  ],
  '30 dias': [
    { label: 'Tarefas em aberto', value: '42', detail: '12 vencem no período', tone: 'text-emerald-800 dark:text-emerald-300' },
    { label: 'Reuniões agendadas', value: '38', detail: '31 concluídas', tone: 'text-sky-800 dark:text-sky-300' },
    { label: 'Projetos ativos', value: '9', detail: '1 concluído no período', tone: 'text-amber-800 dark:text-amber-300' },
    { label: 'Capacidade do time', value: '72%', detail: 'Estável no período', tone: 'text-slate-900 dark:text-slate-100' },
  ],
};

const statusTone: Record<string, string> = {
  rose: 'bg-rose-50 text-rose-800 ring-rose-200 dark:bg-rose-950/40 dark:text-rose-200 dark:ring-rose-900',
  amber: 'bg-amber-50 text-amber-800 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-200 dark:ring-amber-900',
  slate: 'bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700',
};

export default function DashboardPreviewPage() {
  const [period, setPeriod] = useState<DashboardPeriod>('Hoje');
  const [search, setSearch] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const visibleGroups = navigationGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => item.label.toLowerCase().includes(search.toLowerCase())),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-900 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
            aria-label={isMenuOpen ? 'Fechar navegação' : 'Abrir navegação'}
            aria-expanded={isMenuOpen}
            aria-controls="preview-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link href="/preview" className="flex min-w-0 items-center gap-2 font-semibold">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-emerald-800 text-sm font-bold text-white">A</span>
            <span className="truncate">AtlasSwitch</span>
            <span className="hidden border-l border-slate-200 pl-3 text-xs font-normal text-slate-500 dark:border-slate-700 dark:text-slate-400 sm:inline">Painel operacional</span>
          </Link>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <button type="button" className="hidden h-9 items-center gap-2 rounded-md border border-slate-200 px-3 text-sm text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 sm:flex">
            Integra Brasil <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </button>
          <div className="relative">
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-md text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label={isHelpOpen ? 'Fechar ajuda' : 'Abrir ajuda'}
              aria-expanded={isHelpOpen}
              aria-controls="preview-help"
              onClick={() => setIsHelpOpen((open) => !open)}
            >
              <CircleHelp className="h-4 w-4" aria-hidden="true" />
            </button>
            {isHelpOpen ? (
              <div id="preview-help" role="region" aria-label="Ajuda do painel" className="absolute right-0 z-40 mt-2 w-[min(20rem,calc(100vw-2rem))] rounded-md border border-slate-200 bg-white p-4 text-sm shadow-lg dark:border-slate-700 dark:bg-slate-900">
                <p className="font-semibold text-slate-950 dark:text-white">Ajuda deste painel</p>
                <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">Acompanhe prioridades, agenda e capacidade do time. Use os filtros para ajustar o período dos indicadores.</p>
                <Link href="/manual" className="mt-3 inline-flex min-h-9 items-center gap-2 border-t border-slate-200 pt-3 font-medium text-emerald-800 hover:underline dark:border-slate-700 dark:text-emerald-300">
                  <CircleHelp className="h-4 w-4" aria-hidden="true" />
                  Abrir documentação
                </Link>
              </div>
            ) : null}
          </div>
          <button type="button" className="relative grid h-9 w-9 place-items-center rounded-md text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 dark:text-slate-300 dark:hover:bg-slate-800" aria-label="Notificações, 3 não lidas">
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-600 ring-2 ring-white dark:ring-slate-900" />
          </button>
          <button type="button" className="grid h-9 w-9 place-items-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 dark:bg-slate-700 dark:text-slate-100" aria-label="Perfil de Alex Martins">
            AM
          </button>
        </div>
      </header>

      <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-[1600px]">
        {isMenuOpen ? <button type="button" className="fixed inset-14 z-10 bg-slate-950/30 lg:hidden" aria-label="Fechar navegação" onClick={() => setIsMenuOpen(false)} /> : null}
        <aside
          id="preview-navigation"
          className={`${isMenuOpen ? 'flex' : 'hidden'} fixed inset-y-14 left-0 z-20 w-64 flex-col border-r border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:top-14 lg:flex lg:h-[calc(100vh-3.5rem)] lg:shrink-0`}
          aria-label="Navegação principal"
        >
          <label className="relative mb-4 block">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" aria-hidden="true" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar módulo"
              aria-label="Buscar módulo"
              className="h-9 w-full rounded-md border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none placeholder:text-slate-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15 dark:border-slate-700 dark:bg-slate-950"
            />
          </label>
          <nav className="min-h-0 flex-1 space-y-5 overflow-y-auto" aria-label="Módulos">
            {visibleGroups.map((group) => (
              <section key={group.label}>
                <h2 className="mb-1 px-2 text-xs font-semibold text-slate-500 dark:text-slate-400">{group.label}</h2>
                <ul className="space-y-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = item.href === '/preview';

                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          aria-current={isActive ? 'page' : undefined}
                          className={`flex h-9 items-center gap-2 rounded-md border-l-2 px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 ${isActive ? 'border-emerald-800 bg-emerald-50 text-emerald-950 dark:border-emerald-400 dark:bg-emerald-950/40 dark:text-emerald-100' : 'border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'}`}
                        >
                          <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </nav>
          <div className="mt-3 border-t border-slate-200 pt-3 text-xs leading-relaxed text-slate-500 dark:border-slate-700 dark:text-slate-400">
            Prévia independente · dados fictícios
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1240px] space-y-6">
            <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 dark:border-slate-800 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">SEGUNDA-FEIRA, 02 DE NOVEMBRO</p>
                <h1 className="mt-1 text-2xl font-semibold tracking-normal text-slate-950 dark:text-white">Visão do time</h1>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Bom dia, Alex. Aqui está o que precisa da sua atenção.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link href="/dashboard/taskflow" className="inline-flex h-9 items-center gap-2 rounded-md bg-emerald-800 px-3 text-sm font-medium text-white hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2">
                  <Plus className="h-4 w-4" aria-hidden="true" /> Nova tarefa
                </Link>
                <Link href="/dashboard/chronos" className="inline-flex h-9 items-center gap-2 rounded-md border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
                  <CalendarClock className="h-4 w-4" aria-hidden="true" /> Agenda
                </Link>
              </div>
            </div>

            <section aria-label="Indicadores do período">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Indicadores principais</h2>
                <div className="inline-flex rounded-md border border-slate-200 bg-white p-0.5 dark:border-slate-700 dark:bg-slate-900" role="group" aria-label="Período dos indicadores">
                  {(Object.keys(metricsByPeriod) as DashboardPeriod[]).map((option) => (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={period === option}
                      onClick={() => setPeriod(option)}
                      className={`h-7 rounded px-2 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 ${period === option ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-4">
                {metricsByPeriod[period].map((metric, index) => (
                  <article key={metric.label} className={`min-w-0 px-4 py-4 ${index > 0 ? 'border-l border-slate-200 dark:border-slate-800' : ''}`}>
                    <p className="truncate text-xs font-medium text-slate-600 dark:text-slate-400">{metric.label}</p>
                    <p className={`mt-2 text-2xl font-semibold tabular-nums ${metric.tone}`}>{metric.value}</p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{metric.detail}</p>
                  </article>
                ))}
              </div>
            </section>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.85fr)]">
              <section aria-labelledby="priorities-heading" className="min-w-0">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <h2 id="priorities-heading" className="text-base font-semibold text-slate-950 dark:text-white">Prioridades</h2>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Itens que pedem acompanhamento.</p>
                  </div>
                  <Link href="/dashboard/taskflow" className="inline-flex items-center gap-1 text-sm font-medium text-emerald-800 hover:underline dark:text-emerald-300">
                    Ver todas <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
                <div className="divide-y divide-slate-200 border-y border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
                  {tasks.map((task) => (
                    <Link key={task.title} href="/dashboard/taskflow" className="flex min-w-0 flex-col gap-2 px-4 py-4 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-700 dark:hover:bg-slate-800/60 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">{task.title}</p>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{task.owner} · {task.due}</p>
                      </div>
                      <span className={`w-fit shrink-0 rounded px-2 py-1 text-xs font-medium ring-1 ring-inset ${statusTone[task.tone]}`}>{task.status}</span>
                    </Link>
                  ))}
                </div>
              </section>

              <section aria-labelledby="agenda-heading">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <h2 id="agenda-heading" className="text-base font-semibold text-slate-950 dark:text-white">Agenda de hoje</h2>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Seus próximos compromissos.</p>
                  </div>
                  <Link href="/dashboard/chronos" aria-label="Abrir agenda completa" className="grid h-8 w-8 place-items-center rounded-md text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 dark:hover:bg-slate-800">
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="space-y-0 border-y border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-900">
                  {agenda.map((item) => (
                    <div key={item.time} className="flex gap-3 border-b border-slate-100 py-4 last:border-b-0 dark:border-slate-800">
                      <span className="w-12 shrink-0 pt-0.5 font-mono text-xs tabular-nums text-slate-500 dark:text-slate-400">{item.time}</span>
                      <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ring-1 ${item.done ? 'bg-emerald-700 text-white ring-emerald-700' : 'bg-white text-slate-400 ring-slate-300 dark:bg-slate-900 dark:ring-slate-600'}`}>
                        {item.done ? <Check className="h-3 w-3" aria-hidden="true" /> : <Clock3 className="h-3 w-3" aria-hidden="true" />}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{item.title}</p>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <section aria-labelledby="capacity-heading" className="border-t border-slate-200 pt-5 dark:border-slate-800">
              <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 id="capacity-heading" className="text-base font-semibold text-slate-950 dark:text-white">Capacidade do time</h2>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Distribuição planejada para esta semana.</p>
                </div>
                <Link href="/dashboard/resourcehub" className="inline-flex items-center gap-1 text-sm font-medium text-emerald-800 hover:underline dark:text-emerald-300">
                  Ver equipe <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <div className="grid gap-x-8 gap-y-4 sm:grid-cols-3">
                {capacity.map((person) => (
                  <div key={person.name}>
                    <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                      <div className="min-w-0">
                        <p className="truncate font-medium text-slate-800 dark:text-slate-200">{person.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{person.role}</p>
                      </div>
                      <span className="shrink-0 font-mono text-xs tabular-nums text-slate-600 dark:text-slate-300">{person.percent}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800" role="progressbar" aria-label={`Capacidade de ${person.name}`} aria-valuenow={person.percent} aria-valuemin={0} aria-valuemax={100}>
                      <div className={`h-full rounded-full ${person.tone}`} style={{ width: `${person.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}