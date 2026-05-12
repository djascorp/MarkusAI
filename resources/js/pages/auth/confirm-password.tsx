import { Form, Head } from '@inertiajs/react';
import {
    MarkusButton,
    MarkusInputError,
    MarkusLabel,
    MarkusPasswordInput,
    MarkusSpinner,
} from '@/components/markus/markus-ui';
import { store } from '@/routes/password/confirm';

export default function ConfirmPassword() {
    return (
        <>
            <Head title="Confirm password" />

            <Form {...store.form()} resetOnSuccess={['password']}>
                {({ processing, errors }) => (
                    <div className="space-y-6">
                        <div className="grid gap-2">
                            <MarkusLabel htmlFor="password">Password</MarkusLabel>
                            <MarkusPasswordInput
                                id="password"
                                name="password"
                                placeholder="Password"
                                autoComplete="current-password"
                                autoFocus
                            />
                            <MarkusInputError message={errors.password} />
                        </div>

                        <MarkusButton
                            className="w-full"
                            disabled={processing}
                            data-test="confirm-password-button"
                        >
                            {processing && <MarkusSpinner />}
                            Confirm password
                        </MarkusButton>
                    </div>
                )}
            </Form>
        </>
    );
}

ConfirmPassword.layout = {
    title: 'Confirm your password',
    description:
        'This is a secure area of the application. Please confirm your password before continuing.',
};
