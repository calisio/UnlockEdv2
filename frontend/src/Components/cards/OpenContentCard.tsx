import { Library, Video } from '@/common';

export default function OpenContentCardRow({
    content
}: {
    content: Library | Video;
}) {
    return (
        <div className="card flex flex-row w-full gap-3 px-4 py-2">
            <img className="h-12" src={content.thumbnail_url ?? ''}></img>
            <h3 className="my-auto">{content.title ?? 'Untitled'}</h3>
        </div>
    );
}
