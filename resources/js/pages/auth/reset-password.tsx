import { Form, Head } from '@inertiajs/react';
import {
    MarkusButton,
    MarkusInput,
    MarkusInputError,
    MarkusLabel,
    MarkusPasswordInput,
    MarkusSpinner,
} from '@/components/markus/markus-ui';
import { update } from '@/routes/password';

type Props = {
    token: string;
    email: string;
};

export default function ResetPassword({ token, email }: Props) {
    return (
        <>
            <Head title="Reset password" />

            <Form
                {...update.form()}
                transform={(data) => ({ ...data, token, email })}
                resetOnSuccess={['password', 'password_confirmation']}
            >
                {({ processing, errors }) => (
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <MarkusLabel htmlFor="email">Email</MarkusLabel>
                            <MarkusInput
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                value={email}
                                className="mt-1 block w-full opacity-60"
                                readOnly
                            />
                            <MarkusInputError message={errors.email} />
                        </div>

                        <div className="grid gap-2">
                            <MarkusLabel htmlFor="password">Password</MarkusLabel>
                            <MarkusPasswordInput
                                id="password"
                                name="password"
                                autoComplete="new-password"
                                className="mt-1 block w-full"
                                autoFocus
                                placeholder="Password"
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
                                className="mt-1 block w-full"
                                placeholder="Confirm password"
                            />
                            <MarkusInputError message={errors.password_confirmation} />
                        </div>

                        <MarkusButton
                            type="submit"
                            className="mt-4 w-full"
                            disabled={processing}
                            data-test="reset-password-button"
                        >
                            {processing && <MarkusSpinner />}
                            Reset password
                        </MarkusButton>
                    </div>
                )}
            </Form>
        </>
    );
}

ResetPassword.layout = {
    title: 'Reset password',
    description: 'Please enter your new password below',
};
