'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, ChevronDown, CircleHelp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const manualSections = new Set([
  'activity',
  'ai-center',
  'bibliotheca',
  'billtrak',
  'chronos',
  'control-center',
  'control-integrations',
  'general',
  'notepad',
  'projectus',
  'resourcehub',
  'reunify',
  'scriptum',
  'security',
  'taskflow',
  'usuarios',
]);

type HelpPanelProps = {
  title: string;
  description?: string;
  tips?: string[];
  defaultCollapsed?: boolean;
  onToggle?: (isOpen: boolean) => void;
};

/**
 * Painel de ajuda rápido para orientar operadores dentro das telas.
 */
export function HelpPanel({
  title,
  description,
  tips = [],
  defaultCollapsed = true,
  onToggle,
}: HelpPanelProps) {
  const [isOpen, setIsOpen] = useState(!defaultCollapsed);
  const pathname = usePathname();
  const contentId = useId();
  const section = pathname?.match(/^\/dashboard(?:\/([^/]+))?/)?.[1];
  const manualHref = section && manualSections.has(section) ? `/manual/${section}` : '/manual';

  function handleToggle() {
    setIsOpen((prev) => {
      const next = !prev;
      onToggle?.(next);
      return next;
    });
  }

  return (
    <div className="relative">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="rounded-md border-slate-300 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
        aria-label={isOpen ? 'Fechar ajuda desta tela' : 'Abrir ajuda desta tela'}
      >
        <CircleHelp className="h-4 w-4" aria-hidden="true" />
        Ajuda
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
      </Button>
      <div
        id={contentId}
        hidden={!isOpen}
        role="region"
        aria-label={title}
        className="absolute right-0 z-30 mt-2 w-[min(22rem,calc(100vw-2rem))] rounded-md border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
      >
          <div className="font-semibold text-slate-950 dark:text-white">{title}</div>
          {description ? <p className="mt-2 leading-relaxed">{description}</p> : null}
          {tips.length > 0 ? (
            <ul className="mt-3 grid gap-2">
              {tips.map((tip) => (
                <li key={tip} className="flex items-start gap-2 leading-relaxed">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-700 dark:bg-emerald-400" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          ) : null}
          <Link
            href={manualHref}
            className="mt-4 inline-flex min-h-9 items-center gap-2 border-t border-slate-200 pt-3 font-medium text-emerald-800 hover:underline dark:border-slate-700 dark:text-emerald-300"
          >
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            Abrir documentação
          </Link>
      </div>
    </div>
  );
}
