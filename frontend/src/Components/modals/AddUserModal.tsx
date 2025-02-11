import { forwardRef, useState } from 'react';
import { closeModal, CRUDModalProps, FormInputTypes, userInputs } from '.';
import { useToast } from '@/Context/ToastCtx';
import FormModal, { FormError } from '../FormModal';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import {
    NewUserResponse,
    ProviderPlatform,
    ToastState,
    User,
    UserRole
} from '@/common';
import API from '@/api/api';
import { useLoaderData } from 'react-router-dom';

export const AddUserModal = forwardRef(function (
    {
        mutate,
        onSuccess,
        userRole
    }: CRUDModalProps<User> & {
        onSuccess: (tempPassword: string) => void;
        userRole: UserRole;
    },
    addUserModal: React.ForwardedRef<HTMLDialogElement>
) {
    // const [selectedProviders, setSelectedProviders] = useState<number[]>([]);

    const { providerPlatforms } = useLoaderData() as {
        providerPlatforms: ProviderPlatform[];
    };
    const { toaster } = useToast();
    const [formError, setFormError] = useState<FormError>();

    const addUser: SubmitHandler<FieldValues> = async (
        data: FieldValues & { platforms?: string[] }
    ) => {
        let platformsArray: number[];
        if (!data.platforms) platformsArray = [];
        else {
            console.log(data.platforms);
            platformsArray = data.platforms.map((platform) =>
                parseInt(platform, 10)
            );
        }
        data.role = userRole;
        const response = await API.post('users', {
            user: data,
            provider_platforms: platformsArray
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
                    break;
                }
                case 'alphanum': {
                    setFormError({
                        name: 'username',
                        error: {
                            type: 'custom',
                            message:
                                'Username must contain only letters and numbers'
                        }
                    });
                    break;
                }
            }
            toaster('Failed to create user', ToastState.error);
            return;
        }
        onSuccess((response.data as NewUserResponse).temp_password);
        closeModal(addUserModal);
        toaster(
            `User created successfully with temporary password`,
            ToastState.success
        );
        await mutate();
    };

    return (
        <FormModal
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
