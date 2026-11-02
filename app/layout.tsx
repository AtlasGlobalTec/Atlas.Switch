import './globals.css';
import type { Metadata, Viewport } from 'next';
import { userForClientResponse } from '@/lib/auth/user-response';
import { getUser, getTeamForUser } from '@/lib/db/queries';
import { SWRConfig } from 'swr';

export const metadata: Metadata = {
  title: 'Next.js SaaS Starter',
  description: 'Get started quickly with Next.js, Postgres, and Stripe.'
};

export const viewport: Viewport = {
  maximumScale: 1
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const userFallback = userForClientResponse(await getUser());

  return (
    <html
      lang="pt-BR"
      className="bg-white text-black dark:bg-gray-950 dark:text-white"
    >
      <body className="min-h-[100dvh] bg-gray-50" translate="no">
        <SWRConfig
          value={{
            fallback: {
              // We do NOT await here
              // Only components that read this data will suspend
              '/api/user': userFallback,
              '/api/team': getTeamForUser()
            }
          }}
        >
          {children}
        </SWRConfig>
      </body>
    </html>
  );
}
