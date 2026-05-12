import { Head } from '@inertiajs/react';
import AppearanceTabs from '@/components/appearance-tabs';
import { edit as editAppearance } from '@/routes/appearance';

export default function Appearance() {
    return (
        <>
            <Head title="Appearance settings" />

            <h1 className="sr-only">Appearance settings</h1>

            <div className="space-y-6">
                <div>
                    <h3 className="text-base font-medium text-[#E0E0E1]">
                        Appearance settings
                    </h3>
                    <p className="text-sm text-[#6B6B76]">
                        Update your account&apos;s appearance settings
                    </p>
                </div>
                <AppearanceTabs />
            </div>
        </>
    );
}

Appearance.layout = {
    breadcrumbs: [
        {
            title: 'Appearance settings',
            href: editAppearance(),
        },
    ],
};
