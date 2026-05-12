import { Form, Head } from '@inertiajs/react';
import { ShieldCheck } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import SecurityController from '@/actions/App/Http/Controllers/Settings/SecurityController';
import TwoFactorRecoveryCodes from '@/components/two-factor-recovery-codes';
import TwoFactorSetupModal from '@/components/two-factor-setup-modal';
import {
    MarkusButton,
    MarkusInputError,
    MarkusLabel,
    MarkusPasswordInput,
    MarkusSpinner,
} from '@/components/markus/markus-ui';
import { useTwoFactorAuth } from '@/hooks/use-two-factor-auth';
import { edit } from '@/routes/security';
import { disable, enable } from '@/routes/two-factor';

type Props = {
    canManageTwoFactor?: boolean;
    requiresConfirmation?: boolean;
    twoFactorEnabled?: boolean;
};

export default function Security({
    canManageTwoFactor = false,
    requiresConfirmation = false,
    twoFactorEnabled = false,
}: Props) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const {
        qrCodeSvg,
        hasSetupData,
        manualSetupKey,
        clearSetupData,
        clearTwoFactorAuthData,
        fetchSetupData,
        recoveryCodesList,
        fetchRecoveryCodes,
        errors,
    } = useTwoFactorAuth();
    const [showSetupModal, setShowSetupModal] = useState(false);
    const prevTwoFactorEnabled = useRef(twoFactorEnabled);

    useEffect(() => {
        if (prevTwoFactorEnabled.current && !twoFactorEnabled) {
            clearTwoFactorAuthData();
        }
        prevTwoFactorEnabled.current = twoFactorEnabled;
    }, [twoFactorEnabled, clearTwoFactorAuthData]);

    return (
        <>
            <Head title="Security settings" />

            <h1 className="sr-only">Security settings</h1>

            <div className="space-y-6">
                <div>
                    <h3 className="text-base font-medium text-[#E0E0E1]">
                        Update password
                    </h3>
                    <p className="text-sm text-[#6B6B76]">
                        Ensure your account is using a long, random password to stay secure
                    </p>
                </div>

                <Form
                    {...SecurityController.update.form()}
                    options={{ preserveScroll: true }}
                    resetOnError={['password', 'password_confirmation', 'current_password']}
                    resetOnSuccess
                    onError={(errors) => {
                        if (errors.password) passwordInput.current?.focus();
                        if (errors.current_password) currentPasswordInput.current?.focus();
                    }}
                    className="space-y-6"
                >
                    {({ errors, processing }) => (
                        <>
                            <div className="grid gap-2">
                                <MarkusLabel htmlFor="current_password">Current password</MarkusLabel>
                                <MarkusPasswordInput
                                    id="current_password"
                                    ref={currentPasswordInput}
                                    name="current_password"
                                    autoComplete="current-password"
                                    placeholder="Current password"
                                />
                                <MarkusInputError message={errors.current_password} />
                            </div>

                            <div className="grid gap-2">
                                <MarkusLabel htmlFor="password">New password</MarkusLabel>
                                <MarkusPasswordInput
                                    id="password"
                                    ref={passwordInput}
                                    name="password"
                                    autoComplete="new-password"
                                    placeholder="New password"
                                />
                                <MarkusInputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <MarkusLabel htmlFor="password_confirmation">
                                    Confirm password
                                </MarkusLabel>
                                <MarkusPasswordInput
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    autoComplete="new-password"
                                    placeholder="Confirm password"
                                />
                                <MarkusInputError message={errors.password_confirmation} />
                            </div>

                            <MarkusButton disabled={processing} data-test="update-password-button">
                                {processing && <MarkusSpinner />}
                                Save password
                            </MarkusButton>
                        </>
                    )}
                </Form>
            </div>

            {canManageTwoFactor && (
                <div className="space-y-6">
                    <div>
                        <h3 className="text-base font-medium text-[#E0E0E1]">
                            Two-factor authentication
                        </h3>
                        <p className="text-sm text-[#6B6B76]">
                            Manage your two-factor authentication settings
                        </p>
                    </div>

                    {twoFactorEnabled ? (
                        <div className="flex flex-col items-start justify-start space-y-4">
                            <p className="text-sm text-[#9A9A9E]">
                                You will be prompted for a secure, random pin during login,
                                which you can retrieve from the TOTP-supported application on your phone.
                            </p>

                            <Form {...disable.form()}>
                                {({ processing }) => (
                                    <MarkusButton variant="destructive" type="submit" disabled={processing}>
                                        Disable 2FA
                                    </MarkusButton>
                                )}
                            </Form>

                            <TwoFactorRecoveryCodes
                                recoveryCodesList={recoveryCodesList}
                                fetchRecoveryCodes={fetchRecoveryCodes}
                                errors={errors}
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col items-start justify-start space-y-4">
                            <p className="text-sm text-[#9A9A9E]">
                                When you enable two-factor authentication, you will be prompted for a
                                secure pin during login. This pin can be retrieved from a TOTP-supported
                                application on your phone.
                            </p>

                            <div>
                                {hasSetupData ? (
                                    <MarkusButton onClick={() => setShowSetupModal(true)}>
                                        <ShieldCheck className="mr-2 h-4 w-4" />
                                        Continue setup
                                    </MarkusButton>
                                ) : (
                                    <Form
                                        {...enable.form()}
                                        onSuccess={() => setShowSetupModal(true)}
                                    >
                                        {({ processing }) => (
                                            <MarkusButton type="submit" disabled={processing}>
                                                Enable 2FA
                                            </MarkusButton>
                                        )}
                                    </Form>
                                )}
                            </div>
                        </div>
                    )}

                    <TwoFactorSetupModal
                        isOpen={showSetupModal}
                        onClose={() => setShowSetupModal(false)}
                        requiresConfirmation={requiresConfirmation}
                        twoFactorEnabled={twoFactorEnabled}
                        qrCodeSvg={qrCodeSvg}
                        manualSetupKey={manualSetupKey}
                        clearSetupData={clearSetupData}
                        fetchSetupData={fetchSetupData}
                        errors={errors}
                    />
                </div>
            )}
        </>
    );
}

Security.layout = {
    breadcrumbs: [
        {
            title: 'Security settings',
            href: edit(),
        },
    ],
};
