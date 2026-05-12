import { Form, Head, setLayoutProps } from '@inertiajs/react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useMemo, useState } from 'react';
import {
    MarkusButton,
    MarkusInput,
    MarkusInputError,
} from '@/components/markus/markus-ui';
import { OTP_MAX_LENGTH } from '@/hooks/use-two-factor-auth';
import { store } from '@/routes/two-factor/login';

export default function TwoFactorChallenge() {
    const [showRecoveryInput, setShowRecoveryInput] = useState(false);
    const [code, setCode] = useState('');

    const config = useMemo(() => {
        if (showRecoveryInput) {
            return {
                title: 'Recovery code',
                description:
                    'Please confirm access to your account by entering one of your emergency recovery codes.',
                toggleText: 'login using an authentication code',
            };
        }

        return {
            title: 'Authentication code',
            description:
                'Enter the authentication code provided by your authenticator application.',
            toggleText: 'login using a recovery code',
        };
    }, [showRecoveryInput]);

    setLayoutProps({ title: config.title, description: config.description });

    const toggleRecoveryMode = (clearErrors: () => void): void => {
        setShowRecoveryInput((v) => !v);
        clearErrors();
        setCode('');
    };

    return (
        <>
            <Head title="Two-factor authentication" />

            <div className="space-y-6">
                <Form
                    {...store.form()}
                    className="space-y-4"
                    resetOnError
                    resetOnSuccess={!showRecoveryInput}
                >
                    {({ errors, processing, clearErrors }) => (
                        <>
                            {showRecoveryInput ? (
                                <div className="space-y-2">
                                    <MarkusInput
                                        name="recovery_code"
                                        type="text"
                                        placeholder="Enter recovery code"
                                        autoFocus={showRecoveryInput}
                                        required
                                    />
                                    <MarkusInputError message={errors.recovery_code} />
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center space-y-3 text-center">
                                    <div className="flex w-full items-center justify-center gap-2">
                                        {Array.from({ length: OTP_MAX_LENGTH }, (_, i) => (
                                            <MarkusInput
                                                key={i}
                                                className="h-12 w-12 text-center text-lg font-mono"
                                                maxLength={1}
                                                value={code[i] ?? ''}
                                                onChange={(e) => {
                                                    const val = e.target.value.replace(/\D/g, '');
                                                    setCode(
                                                        (prev) =>
                                                            prev.slice(0, i) +
                                                            val.slice(-1) +
                                                            prev.slice(i + 1),
                                                    );
                                                }}
                                                disabled={processing}
                                                autoFocus={i === 0}
                                            />
                                        ))}
                                    </div>
                                    <MarkusInputError message={errors.code} />
                                </div>
                            )}

                            <MarkusButton
                                type="submit"
                                className="w-full"
                                disabled={processing}
                            >
                                Continue
                            </MarkusButton>

                            <div className="text-center text-sm text-[#6B6B76]">
                                <span>or you can </span>
                                <button
                                    type="button"
                                    className="cursor-pointer text-[#D4AF37] underline decoration-[#D4AF37]/30 underline-offset-4 transition-colors hover:decoration-[#D4AF37]"
                                    onClick={() => toggleRecoveryMode(clearErrors)}
                                >
                                    {config.toggleText}
                                </button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}
