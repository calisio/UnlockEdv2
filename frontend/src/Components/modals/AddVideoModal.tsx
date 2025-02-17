import { forwardRef } from 'react';
import { closeModal, CRUDModalProps, FormModal, videoInputs } from '.';
import { ToastState, Video } from '@/common';
import { useToast } from '@/Context/ToastCtx';
import API from '@/api/api';
import { FieldValues, SubmitHandler } from 'react-hook-form';

export const AddVideoModal = forwardRef(function (
    { mutate }: CRUDModalProps<Video>,
    addVideoModal: React.ForwardedRef<HTMLDialogElement>
) {
    const { toaster } = useToast();

    const addVideos: SubmitHandler<FieldValues> = async (data) => {
        const videoURLsArray =
            typeof data.videoURLs === 'string'
                ? data.videoURLs.split(',').map((url: string) => url.trim())
                : [];
        const response = await API.post('videos', {
            video_urls: videoURLsArray
        });
        if (!response.success) {
            toaster('Error downloading videos', ToastState.error);
        }
        toaster(
            'Video downloading in progress, this may take several minutes',
            ToastState.success
        );
        closeModal(addVideoModal);
        await mutate();
    };

    return (
        <FormModal
            ref={addVideoModal}
            title={'Add Videos'}
            inputs={videoInputs}
            onSubmit={addVideos}
        />
    );
});
