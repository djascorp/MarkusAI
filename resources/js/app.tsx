import { createInertiaApp } from '@inertiajs/react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import MarkusLayout from '@/layouts/markus-layout';
import SettingsLayout from '@/layouts/settings/layout';

const appName = import.meta.env.VITE_APP_NAME || 'MarkusAI';

const MARKUS_PAGES = [
    'dashboard',
    'agents/',
    'content/',
    'analytics/',
    'onboarding/',
];

const isMarkusPage = (name: string) =>
    MARKUS_PAGES.some((prefix) => name === prefix || name.startsWith(prefix));

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        switch (true) {
            case name === 'welcome':
                return null;
            case name.startsWith('auth/'):
                return AuthLayout;
            case name.startsWith('settings/'):
                return [AppLayout, SettingsLayout];
            case isMarkusPage(name):
                return MarkusLayout;
            default:
                return AppLayout;
        }
    },
    strictMode: true,
    withApp(app) {
        return (
            <TooltipProvider delayDuration={0}>
                {app}
                <Toaster />
            </TooltipProvider>
        );
    },
    progress: {
        color: '#D4AF37',
    },
});

// This will set light / dark mode on load...
initializeTheme();
