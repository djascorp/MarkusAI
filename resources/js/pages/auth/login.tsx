import { Form, Head } from '@inertiajs/react';
import {
    MarkusButton,
    MarkusInput,
    MarkusInputError,
    MarkusLabel,
    MarkusPasswordInput,
    MarkusSpinner,
    MarkusTextLink,
} from '@/components/markus/markus-ui';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({ status, canResetPassword, canRegister }: Props) {
    return (
        <>
            <Head title="Log in" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <MarkusLabel htmlFor="email">Email address</MarkusLabel>
                                <MarkusInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="email@example.com"
                                />
                                <MarkusInputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <MarkusLabel htmlFor="password">Password</MarkusLabel>
                                    {canResetPassword && (
                                        <MarkusTextLink
                                            href={request()}
                                            className="text-xs"
                                            tabIndex={5}
                                        >
                                            Forgot password?
                                        </MarkusTextLink>
                                    )}
                                </div>
                                <MarkusPasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Password"
                                />
                                <MarkusInputError message={errors.password} />
                            </div>

                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                    className="h-4 w-4 rounded border-[#1F1F23] bg-[#0E0E11] text-[#D4AF37] focus:ring-[#D4AF37]"
                                />
                                <span className="text-sm text-[#9A9A9E]">Remember me</span>
                            </label>

                            <MarkusButton
                                type="submit"
                                className="mt-4 w-full"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && <MarkusSpinner />}
                                Log in
                            </MarkusButton>
                        </div>

                        {canRegister && (
                            <div className="text-center text-sm text-[#6B6B76]">
                                Don&apos;t have an account?{' '}
                                <MarkusTextLink href={register()} tabIndex={5}>
                                    Sign up
                                </MarkusTextLink>
                            </div>
                        )}
                    </>
                )}
            </Form>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-emerald-400">
                    {status}
                </div>
            )}
        </>
    );
}

Login.layout = {
    title: 'Log in to your account',
    description: 'Enter your email and password below to log in',
};
