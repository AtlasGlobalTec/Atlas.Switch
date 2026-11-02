import { cn } from "@/lib/utils"
import Link from "next/link"
import {
  CalendarClock,
  CheckSquare,
  Briefcase,
  Boxes,
  CreditCard,
  Library,
  NotebookPen,
  FilePenLine,
  Video,
  ShieldCheck,
  Brain,
  Settings,
  Shield,
  Activity,
  Users,
  Plug,
  type LucideIcon,
  BookOpen
} from "lucide-react"

type ModuleHeaderProps = {
  title: string
  description?: string
  eyebrow?: string
  className?: string
  showIcon?: boolean
}

/**
 * Cabecalho padrao para modulos com visual consistente.
 */
export function ModuleHeader({
  title,
  description,
  eyebrow = "AtlasSwitch",
  className,
  showIcon = true
}: ModuleHeaderProps) {
  const key = title.toLowerCase()
  const manualSection =
    key.includes("taskflow") ? "taskflow" :
    key.includes("chronos") ? "chronos" :
    key.includes("reunify") ? "reunify" :
    key.includes("projectus") ? "projectus" :
    key.includes("resourcehub") ? "resourcehub" :
    key.includes("billtrak") ? "billtrak" :
    key.includes("bibliotheca") ? "bibliotheca" :
    key.includes("notepad") ? "notepad" :
    key.includes("scriptum") ? "scriptum" :
    key.includes("integrações") ? "control-integrations" :
    key.includes("control center") || key.includes("controle") ? "control-center" :
    key.includes("segurança") || key.includes("seguranca") ? "security" :
    key.includes("usuários") || key.includes("usuarios") ? "usuarios" :
    key.includes("atividade") ? "activity" :
    key.includes("configurações") || key.includes("configuracoes") ? "general" :
    key.includes("ia") ? "ai-center" :
    null
  const visual =
    key.includes("taskflow")
      ? { icon: CheckSquare, accent: "bg-violet-500/10 text-violet-600 dark:text-violet-300" }
      : key.includes("chronos")
        ? { icon: CalendarClock, accent: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-300" }
        : key.includes("reunify")
          ? { icon: Video, accent: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300" }
          : key.includes("projectus")
            ? { icon: Briefcase, accent: "bg-amber-500/10 text-amber-600 dark:text-amber-300" }
            : key.includes("resourcehub")
              ? { icon: Boxes, accent: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-300" }
              : key.includes("billtrak")
                ? { icon: CreditCard, accent: "bg-rose-500/10 text-rose-600 dark:text-rose-300" }
                : key.includes("bibliotheca")
                  ? { icon: Library, accent: "bg-violet-500/10 text-violet-600 dark:text-violet-300" }
                  : key.includes("notepad")
                    ? { icon: NotebookPen, accent: "bg-sky-500/10 text-sky-600 dark:text-sky-300" }
                      : key.includes("scriptum")
                      ? { icon: FilePenLine, accent: "bg-orange-500/10 text-orange-600 dark:text-orange-300" }
                      : key.includes("integrações")
                        ? { icon: Plug, accent: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-300" }
                      : key.includes("control center")
                        ? { icon: ShieldCheck, accent: "bg-slate-500/10 text-slate-700 dark:text-slate-200" }
                        : key.includes("central de ia") || key.includes("ia")
                          ? { icon: Brain, accent: "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-300" }
                          : key.includes("configurações") || key.includes("configuracoes")
                            ? { icon: Settings, accent: "bg-slate-500/10 text-slate-700 dark:text-slate-200" }
                            : key.includes("segurança") || key.includes("seguranca")
                              ? { icon: Shield, accent: "bg-rose-500/10 text-rose-600 dark:text-rose-300" }
                              : key.includes("atividade")
                                ? { icon: Activity, accent: "bg-amber-500/10 text-amber-600 dark:text-amber-300" }
                                : key.includes("usuários") || key.includes("usuarios")
                                  ? { icon: Users, accent: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-300" }
                                  : null
  const Icon = (visual?.icon ?? null) as LucideIcon | null

  return (
    <header className={cn("flex min-w-0 items-start justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-800", className)}>
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{eyebrow}</p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-950 dark:text-white">{title}</h1>
        {description ? (
          <p className="mt-1 line-clamp-2 max-w-4xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {description}
          </p>
        ) : null}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {manualSection ? (
          <Link
            href={`/manual/${manualSection}`}
            aria-label={`Abrir documentação de ${title}`}
            title={`Documentação de ${title}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-600 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <BookOpen className="h-4 w-4" aria-hidden="true" />
          </Link>
        ) : null}
        {Icon && showIcon ? (
          <div
            className={cn("flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200", visual?.accent)}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
        ) : null}
      </div>
    </header>
  )
}
