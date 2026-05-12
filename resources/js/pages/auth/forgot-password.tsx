import { Form, Head } from '@inertiajs/react';
import {
    MarkusButton,
    MarkusInput,
    MarkusInputError,
    MarkusLabel,
    MarkusSpinner,
    MarkusTextLink,
} from '@/components/markus/markus-ui';
import { login } from '@/routes';
import { email } from '@/routes/password';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title="Forgot password" />

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-emerald-400">
                    {status}
                </div>
            )}

            <div className="space-y-6">
                <Form {...email.form()}>
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <MarkusLabel htmlFor="email">Email address</MarkusLabel>
                                <MarkusInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="off"
                                    autoFocus
                                    placeholder="email@example.com"
                                />
                                <MarkusInputError message={errors.email} />
                            </div>

                            <div className="my-6 flex items-center justify-start">
                                <MarkusButton
                                    className="w-full"
                                    disabled={processing}
                                    data-test="email-password-reset-link-button"
                                >
                                    {processing && <MarkusSpinner />}
                                    Email password reset link
                                </MarkusButton>
                            </div>
                        </>
                    )}
                </Form>

                <div className="text-center text-sm text-[#6B6B76]">
                    Or, return to{' '}
                    <MarkusTextLink href={login()}>log in</MarkusTextLink>
                </div>
            </div>
        </>
    );
}

ForgotPassword.layout = {
    title: 'Forgot password',
    description: 'Enter your email to receive a password reset link',
};
