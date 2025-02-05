import { forwardRef } from 'react';
import { CRUDModalProps, FormModal, linkInputs } from '.';
import { HelpfulLinkAndSort, ToastState } from '@/common';
import { useToast } from '@/Context/ToastCtx';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import API from '@/api/api';

export const AddHelpfulLinkModal = forwardRef(function (
    { mutate }: CRUDModalProps<HelpfulLinkAndSort>,
    addLinkModal: React.ForwardedRef<HTMLDialogElement>
) {
    const { toaster } = useToast();
    const addLink: SubmitHandler<FieldValues> = async (data) => {
        const response = await API.put(`helpful-links`, data);
        if (response.success) {
            toaster('Helpful link added successfully', ToastState.success);
        } else {
            toaster(
                response.message === 'existing_helpful_link'
                    ? 'Link already exists'
                    : 'Error adding helpful link',
                ToastState.error
            );
            return new Error();
        }
        await mutate();
    };
    return (
        <FormModal
            title={'Add Helpful Link'}
            inputs={linkInputs}
            onSubmit={addLink}
            ref={addLinkModal}
        />
    );
});
