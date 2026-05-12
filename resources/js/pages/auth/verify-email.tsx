import { Form, Head } from '@inertiajs/react';
import {
    MarkusButton,
    MarkusSpinner,
    MarkusTextLink,
} from '@/components/markus/markus-ui';
import { logout } from '@/routes';
import { send } from '@/routes/verification';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <>
            <Head title="Email verification" />

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-center text-sm font-medium text-emerald-400">
                    A new verification link has been sent to the email address
                    you provided during registration.
                </div>
            )}

            <Form {...send.form()} className="space-y-6 text-center">
                {({ processing }) => (
                    <>
                        <MarkusButton disabled={processing} variant="secondary" className="w-full">
                            {processing && <MarkusSpinner />}
                            Resend verification email
                        </MarkusButton>

                        <MarkusTextLink
                            href={logout()}
                            className="mx-auto block text-sm"
                        >
                            Log out
                        </MarkusTextLink>
                    </>
                )}
            </Form>
        </>
    );
}

VerifyEmail.layout = {
    title: 'Verify email',
    description:
        'Please verify your email address by clicking on the link we just emailed to you.',
};
