import { forwardRef } from 'react';
import { CRUDModalProps, linkInputs } from '.';
import { HelpfulLinkAndSort, ToastState } from '@/common';
import { useToast } from '@/Context/ToastCtx';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import API from '@/api/api';
import FormModal from '../FormModal';

export const EditHelpfulLinkModal = forwardRef(function (
    { mutate, target }: CRUDModalProps<HelpfulLinkAndSort>,
    editHelpfulLinkModal: React.ForwardedRef<HTMLDialogElement>
) {
    const { toaster } = useToast();
    const updateLink: SubmitHandler<FieldValues> = async (data) => {
        const response = await API.patch(
            `helpful-links/${target?.id}/edit`,
            data
        );
        if (response.success) {
            toaster('Updated helpful link successfully', ToastState.success);
        } else {
            toaster('Error updating helpful link', ToastState.error);
        }
        await mutate();
    };
    return (
        <FormModal
            title={'Edit Helpful Link'}
            inputs={linkInputs}
            defaultValues={target ? target : undefined}
            onSubmit={updateLink}
            ref={editHelpfulLinkModal}
        />
    );
});
