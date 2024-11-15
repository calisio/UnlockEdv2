import { OpenContentItem } from '@/common';

export default function OpenContentCardRow({
    content
}: {
    content: OpenContentItem;
}) {
    return (
        <div className="card flex flex-row w-full gap-3 px-4 py-2">
            <div className="w-[100px]">
                <img
                    className="h-12 mx-auto object-contain"
                    src={content.thumbnail_url ?? ''}
                ></img>
            </div>
            <h3 className="my-auto w-full">{content.name ?? 'Untitled'}</h3>
        </div>
    );
}
