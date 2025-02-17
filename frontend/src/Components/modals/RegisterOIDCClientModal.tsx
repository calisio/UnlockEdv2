import { forwardRef } from 'react';
import {
    closeModal,
    CRUDModalProps,
    FormInputTypes,
    FormModal,
    registerProviderInputs
} from '.';
import { OidcClient, ProviderPlatform, ToastState } from '@/common';
import { useToast } from '@/Context/ToastCtx';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import API from '@/api/api';

export const RegisterOIDCClientModal = forwardRef(function (
    {
        mutate,
        target,
        onSuccess
    }: CRUDModalProps<ProviderPlatform> & {
        onSuccess: (oidcClient: OidcClient) => void;
    },
    registerProviderModal: React.ForwardedRef<HTMLDialogElement>
) {
    const { toaster } = useToast();
    const registerProvider: SubmitHandler<FieldValues> = async (data) => {
        data.provider_platform_id = target?.id;
        const response = await API.post<OidcClient, FieldValues>(
            'oidc/clients',
            data
        );
        if (!response.success) {
            toaster('Failed to register OIDC client.', ToastState.error);
            return;
        }
        onSuccess(response.data as OidcClient);
        toaster('Successfully registered OIDC client', ToastState.success);
        await mutate();
        closeModal(registerProviderModal);
    };

    const OIDCWarning = () => {
        return (
            <>
                <p className="body text-error pb-2">
                    If you do not choose to auto register, you must manually
                    setup authentication for UnlockEd the provider platform's
                    settings.
                </p>
                <p className="body">
                    If you are unsure about the redirect URL, leave it blank.
                </p>
            </>
        );
    };

    return (
        <FormModal
            ref={registerProviderModal}
            title={'Register Provider'}
            inputs={[
                {
                    type: FormInputTypes.Unique,
                    label: '',
                    interfaceRef: '',
                    required: false,
                    uniqueComponent: <OIDCWarning />
                },
                ...registerProviderInputs
            ]}
            onSubmit={registerProvider}
        />
    );
});
