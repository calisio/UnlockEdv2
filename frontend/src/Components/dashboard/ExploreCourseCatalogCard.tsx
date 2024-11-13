import {
    ArrowRightIcon,
    BuildingStorefrontIcon
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
const ExploreCourseCatalogCard = () => {
    const navigate = useNavigate();

    return (
        <div className="card card-compact bg-inner-background relative">
            <figure className="h-[124px] bg-teal-3">
                <BuildingStorefrontIcon className="h-20 text-background" />
            </figure>
            <div className="card-body gap-0.5">
                <h3 className="card-title text-sm">Explore Course Catalog</h3>
                <p className="body-small line-clamp-4">
                    Looking for more content to engage with? Browse courses
                    offered at your facility.
                </p>
                <a
                    className="flex flex-row gap-1 body-small text-teal-3 mt-2"
                    onClick={() => navigate(`/course-catalog`)}
                >
                    Explore courses
                    <ArrowRightIcon className="w-4" />
                </a>
            </div>
        </div>
    );
};

export default ExploreCourseCatalogCard;
