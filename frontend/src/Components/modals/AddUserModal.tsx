import { forwardRef, useState } from 'react';
import { CRUDModalProps, FormInputTypes, userInputs } from '.';
import { useToast } from '@/Context/ToastCtx';
import NewModal, { FormError } from '../Modaltest';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { NewUserResponse, ProviderPlatform, ToastState, User } from '@/common';
import API from '@/api/api';
import { useLoaderData } from 'react-router-dom';

export const AddUserModal = forwardRef(function (
    {
        mutate,
        onSuccess
    }: CRUDModalProps<User> & {
        onSuccess: (tempPassword: string) => void;
    },
    addUserModal: React.ForwardedRef<HTMLDialogElement>
) {
    const [selectedProviders, setSelectedProviders] = useState<number[]>([]);

    const { providerPlatforms } = useLoaderData() as {
        providerPlatforms: ProviderPlatform[];
    };
    const { toaster } = useToast();
    const [formError, setFormError] = useState<FormError>();

    const addUser: SubmitHandler<FieldValues> = async (data) => {
        const response = await API.post('users', {
            user: data,
            provider_platforms: selectedProviders
        });

        if (!response.success) {
            const msg = response.message.trim();
            switch (msg) {
                case 'userexists': {
                    setFormError({
                        name: 'username',
                        error: {
                            type: 'custom',
                            message: 'Username already exists'
                        }
                    });
                }
            }
            toaster('Failed to create user', ToastState.error);
            return;
        }
        onSuccess((response.data as NewUserResponse).temp_password);
        toaster(
            `User created successfully with temporary password`,
            ToastState.success
        );
        await mutate();
    };

    // const registerRole = () => {
    //     return <input type="hidden" {...register('role')} />
    // }
    return (
        <NewModal
            title={'Add User'}
            inputs={[
                ...userInputs,
                {
                    type: FormInputTypes.MultiSelectDropdown,
                    label: 'Also create new account for user in:',
                    interfaceRef: 'platforms',
                    required: false,
                    options: providerPlatforms ? providerPlatforms : []
                }
            ]}
            onSubmit={addUser}
            error={formError}
            ref={addUserModal}
        />
    );
});
