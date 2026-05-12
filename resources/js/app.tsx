import { createInertiaApp } from '@inertiajs/react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import MarkusAuthLayout from '@/layouts/markus-auth-layout';
import MarkusLayout from '@/layouts/markus-layout';
import MarkusSettingsLayout from '@/layouts/markus-settings-layout';

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
                return MarkusAuthLayout;
            case name.startsWith('settings/'):
                return [MarkusLayout, MarkusSettingsLayout];
            case isMarkusPage(name):
                return MarkusLayout;
            default:
                return MarkusLayout;
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
