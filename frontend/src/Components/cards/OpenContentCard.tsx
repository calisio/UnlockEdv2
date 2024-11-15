import { OpenContentItem } from '@/common';

export default function OpenContentCardRow({
    content
}: {
    content: OpenContentItem;
}) {
    return (
        <div className="card flex flex-row w-full gap-3 px-4 py-2">
            <div className="w-[75px]">
                <img
                    className="h-12 mx-auto"
                    src={content.thumbnail_url ?? ''}
                ></img>
            </div>
            <h3 className="my-auto">{content.name ?? 'Untitled'}</h3>
        </div>
    );
}
