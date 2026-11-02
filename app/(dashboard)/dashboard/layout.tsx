'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FloatingFeedbackProvider } from '@/components/ui/floating-feedback';
import { Button } from '@/components/ui/button';
import { ChevronDown, Menu } from 'lucide-react';
import useSWR from 'swr';
import {
  canInviteToTeam,
  getRoleDisplayLabel,
  hasPermission,
  type Role,
} from '@/lib/auth/permissions';
import { getMenuGroups } from '@/lib/menu-config';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const { data: user } = useSWR<{ role?: Role }>('/api/user', fetcher);

  const role = (user?.role || 'member') as Role;
  const menuGroups = getMenuGroups((p) => hasPermission(role, p), {
    showUsuariosNav: canInviteToTeam(role) || hasPermission(role, 'users.manage'),
  });

  const roleLabel = user?.role ? getRoleDisplayLabel(user.role) : '…';

  return (
    <div className="mx-auto flex min-h-0 w-full max-w-[1800px] flex-1 flex-col">
      {/* Mobile header */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950 lg:hidden">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">Menu</span>
          <span className="text-[10px] uppercase tracking-wider text-violet-600 dark:text-violet-300">
            {roleLabel}
          </span>
        </div>
        <Button
          className="-mr-3 rounded-full"
          variant="ghost"
          aria-expanded={isSidebarOpen}
          aria-controls="atlas-dashboard-navigation"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Alternar menu</span>
        </Button>
      </div>

      <div className="relative flex min-h-0 flex-1 overflow-hidden bg-slate-50 dark:bg-slate-950">
        {isSidebarOpen ? (
          <button
            type="button"
            aria-label="Fechar menu"
            className="fixed inset-0 z-30 bg-slate-950/50 backdrop-blur-sm lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        ) : null}
        {/* Sidebar - agrupado por módulo */}
        <aside
          id="atlas-dashboard-navigation"
          aria-label="Navegação principal"
          className={`absolute inset-y-0 left-0 z-40 flex max-h-[100dvh] w-[17rem] shrink-0 flex-col transform border-r border-slate-200 bg-white text-slate-900 shadow-xl transition-transform duration-200 ease-out dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 lg:relative lg:max-h-none lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } ${isSidebarOpen ? 'flex' : 'hidden'} lg:flex`}
        >
          <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <div className="mb-4 border-b border-slate-200 px-2 pb-4 dark:border-slate-700">
              <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">Módulos</p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Acesso conforme seu perfil: {roleLabel}</p>
            </div>

            {menuGroups.map((group) => {
              const isExpanded = expandedGroups[group.key] ?? group.items.some((item) => pathname === item.href);
              const groupId = `navigation-group-${group.key}`;

              return (
                <div key={group.key} className="mb-2">
                  <button
                    type="button"
                    className="flex min-h-9 w-full items-center justify-between rounded-md px-2 text-left text-xs font-semibold text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                    aria-expanded={isExpanded}
                    aria-controls={groupId}
                    onClick={() => setExpandedGroups((current) => ({ ...current, [group.key]: !isExpanded }))}
                  >
                    <span>{group.label}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                  <div id={groupId} hidden={!isExpanded} className="mt-1 space-y-0.5">
                    {group.items.map((item) => {
                      const isActive = pathname === item.href;

                      return (
                        <Button
                          key={item.href}
                          asChild
                          variant="ghost"
                          className={`h-9 w-full justify-start rounded-md border-l-2 border-transparent px-3 text-sm font-medium text-slate-600 shadow-none hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white ${isActive ? 'border-l-emerald-700 bg-emerald-50 text-slate-950 dark:border-l-emerald-400 dark:bg-emerald-950/40 dark:text-white' : ''}`}
                        >
                          <Link
                            href={item.href}
                            aria-current={isActive ? 'page' : undefined}
                            onClick={() => setIsSidebarOpen(false)}
                          >
                            <item.icon className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />
                            {item.label}
                          </Link>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-y-contain px-4 pb-8 pt-4 sm:px-6 lg:p-8">
          <FloatingFeedbackProvider>{children}</FloatingFeedbackProvider>
        </main>
      </div>
    </div>
  );
}
