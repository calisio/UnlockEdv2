import { OpenContentItem, ResourceCategory } from '@/common';
import OpenContentCard from '@/Components/cards/OpenContentCard';
import ResourcesCategoryCard from '@/Components/ResourcesCategoryCard';
import { useAuth } from '@/useAuth';
import { useLoaderData } from 'react-router-dom';

const favorites: OpenContentItem[] = [
    {
        name: 'Math',
        url: 'https://example.com/math',
        thumbnail_url:
            'https://static.vecteezy.com/system/resources/thumbnails/013/115/384/small_2x/cartoon-maths-elements-background-education-logo-vector.jpg',
        open_content_provider_id: 1,
        content_id: 1
    },
    {
        name: 'English',
        url: 'https://example.com/english',
        thumbnail_url:
            'https://static.vecteezy.com/system/resources/previews/017/300/766/non_2x/learning-english-doodle-set-language-school-in-sketch-style-online-language-education-course-hand-drawn-illustration-isolated-on-white-background-vector.jpg',
        open_content_provider_id: 1,
        content_id: 2
    }
];

export default function OpenContentLevelDashboard() {
    const { user } = useAuth();
    const { resources, topUserContent, topFacilityContent } =
        useLoaderData() as {
            resources: ResourceCategory[];
            topUserContent: OpenContentItem[];
            topFacilityContent: OpenContentItem[];
        };

    console.log(topUserContent);

    return (
        <div className="flex flex-row h-full">
            {/* main section */}
            <div className="w-full flex flex-col gap-6 px-6 pb-4">
                <h1 className="text-5xl">
                    Hi, {user?.name_first ?? 'Student'}!
                </h1>
                <h2> Pick Up Where You Left Off</h2>
                <div className="grid grid-cols-2 gap-6">
                    <div className="card card-row-padding flex flex-col gap-3">
                        <h2>Your Top Open Content</h2>
                        {topUserContent.map((item: OpenContentItem) => {
                            return (
                                <OpenContentCard
                                    key={item.content_id}
                                    content={item}
                                />
                            );
                        })}
                    </div>
                    <div className="card card-row-padding flex flex-col gap-3">
                        <h2>Popular Open Content</h2>
                        {topFacilityContent.map((item: OpenContentItem) => {
                            return (
                                <OpenContentCard
                                    key={item.content_id}
                                    content={item}
                                />
                            );
                        })}
                    </div>
                </div>
                <h2>Resources</h2>
                <div className="card card-row-padding overflow-x-scroll">
                    {resources.map((resource: ResourceCategory) => (
                        <div key={resource.id} className="w-[252px]">
                            <ResourcesCategoryCard category={resource} />
                        </div>
                    ))}
                </div>
            </div>
            {/* right sidebar */}
            <div className="min-w-[300px] border-l border-grey-1 flex flex-col gap-6 px-6 py-4">
                <h2>Favorites</h2>
                <div className="space-y-3 w-full">
                    {favorites.map((favorite) => {
                        return (
                            <OpenContentCard
                                key={favorite.content_id}
                                content={favorite}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
