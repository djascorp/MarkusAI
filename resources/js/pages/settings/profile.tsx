import { Form, Head, Link, usePage } from '@inertiajs/react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import DeleteUser from '@/components/delete-user';
import {
    MarkusButton,
    MarkusInput,
    MarkusInputError,
    MarkusLabel,
    MarkusSpinner,
} from '@/components/markus/markus-ui';
import { edit } from '@/routes/profile';
import { send } from '@/routes/verification';

export default function Profile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Profile settings" />

            <h1 className="sr-only">Profile settings</h1>

            <div className="space-y-6">
                <div>
                    <h3 className="text-base font-medium text-[#E0E0E1]">
                        Profile information
                    </h3>
                    <p className="text-sm text-[#6B6B76]">
                        Update your name and email address
                    </p>
                </div>

                <Form
                    {...ProfileController.update.form()}
                    options={{ preserveScroll: true }}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <MarkusLabel htmlFor="name">Name</MarkusLabel>
                                <MarkusInput
                                    id="name"
                                    defaultValue={auth.user.name}
                                    name="name"
                                    required
                                    autoComplete="name"
                                    placeholder="Full name"
                                />
                                <MarkusInputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <MarkusLabel htmlFor="email">Email address</MarkusLabel>
                                <MarkusInput
                                    id="email"
                                    type="email"
                                    defaultValue={auth.user.email}
                                    name="email"
                                    required
                                    autoComplete="username"
                                    placeholder="Email address"
                                />
                                <MarkusInputError message={errors.email} />
                            </div>

                            {mustVerifyEmail && auth.user.email_verified_at === null && (
                                <div>
                                    <p className="text-sm text-[#6B6B76]">
                                        Your email address is unverified.{' '}
                                        <Link
                                            href={send()}
                                            as="button"
                                            className="text-[#D4AF37] underline decoration-[#D4AF37]/30 underline-offset-4 hover:decoration-[#D4AF37]"
                                        >
                                            Click here to resend the verification email.
                                        </Link>
                                    </p>

                                    {status === 'verification-link-sent' && (
                                        <div className="mt-2 text-sm font-medium text-emerald-400">
                                            A new verification link has been sent to your email address.
                                        </div>
                                    )}
                                </div>
                            )}

                            <MarkusButton disabled={processing} data-test="update-profile-button">
                                {processing && <MarkusSpinner />}
                                Save
                            </MarkusButton>
                        </>
                    )}
                </Form>
            </div>

            <DeleteUser />
        </>
    );
}

Profile.layout = {
    breadcrumbs: [
        {
            title: 'Profile settings',
            href: edit(),
        },
    ],
};
