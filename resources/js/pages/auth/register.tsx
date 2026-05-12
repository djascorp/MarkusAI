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
import { login } from '@/routes';
import { store } from '@/routes/register';

export default function Register() {
    return (
        <>
            <Head title="Register" />

            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <MarkusLabel htmlFor="name">Name</MarkusLabel>
                                <MarkusInput
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Full name"
                                />
                                <MarkusInputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <MarkusLabel htmlFor="email">Email address</MarkusLabel>
                                <MarkusInput
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="email@example.com"
                                />
                                <MarkusInputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <MarkusLabel htmlFor="password">Password</MarkusLabel>
                                <MarkusPasswordInput
                                    id="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    name="password"
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
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Confirm password"
                                />
                                <MarkusInputError message={errors.password_confirmation} />
                            </div>

                            <MarkusButton
                                type="submit"
                                className="mt-2 w-full"
                                tabIndex={5}
                                data-test="register-user-button"
                            >
                                {processing && <MarkusSpinner />}
                                Create account
                            </MarkusButton>
                        </div>

                        <div className="text-center text-sm text-[#6B6B76]">
                            Already have an account?{' '}
                            <MarkusTextLink href={login()} tabIndex={6}>
                                Log in
                            </MarkusTextLink>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

Register.layout = {
    title: 'Create an account',
    description: 'Enter your details below to create your account',
};
