import { forwardRef } from 'react';
import { closeModal, CRUDModalProps, userInputs } from '.';
import { useToast } from '@/Context/ToastCtx';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { ToastState, User } from '@/common';
import API from '@/api/api';
import FormModal from '../FormModal';

export const EditUserModal = forwardRef(function (
    { mutate, target }: CRUDModalProps<User>,
    editUserModal: React.ForwardedRef<HTMLDialogElement>
) {
    const { toaster } = useToast();
    const editUser: SubmitHandler<FieldValues> = async (data) => {
        const resp = await API.patch(`users/${target?.id}`, data);
        if (!resp.success) {
            toaster('Unable to modify user', ToastState.error);
            return;
        }
        closeModal(editUserModal);
        await mutate();
    };
    return (
        <FormModal
            title={'Edit User'}
            inputs={userInputs}
            defaultValues={target}
            onSubmit={editUser}
            ref={editUserModal}
        />
    );
});
