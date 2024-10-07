import {
    Library,
    OpenContentProvider,
    ServerResponse,
    Tab,
    ToastProps,
    ToastState
} from '@/common';
import DropdownControl from '@/Components/inputs/DropdownControl';
import SearchBar from '@/Components/inputs/SearchBar';
import LibraryCard from '@/Components/LibraryCard';
import TabView from '@/Components/TabView';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useMemo, useState } from 'react';
import useSWR from 'swr';
import Toast from '@/Components/Toast';

const tabs = [
    { name: 'All Libraries', value: 'all' },
    { name: 'Kiwix', value: 1 }
];

enum FilterLibraries {
    'All Libraries' = '',
    'Visible' = '&visibility=visible',
    'Hidden' = '&visibility=hidden'
}

export default function OpenContentManagement() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filterLibraries, setFilterLibraries] = useState<FilterLibraries>(
        FilterLibraries['All Libraries']
    );
    const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);
    const [toast, setToast] = useState<ToastProps>({
        state: ToastState.null,
        message: ''
    });

    const { data: libraries, mutate: mutateLibraries } = useSWR<
        ServerResponse<Library[]>
    >(`/api/libraries?${filterLibraries}&search=${searchTerm}`);
    const { data: openContentProviders } =
        useSWR<ServerResponse<OpenContentProvider[]>>('/api/open-content');

    const openContentTabs = useMemo(() => {
        return [
            { name: 'All', value: 'all' },
            ...(openContentProviders?.data?.map((provider) => ({
                name: provider.name,
                value: provider.id
            })) ?? [])
        ];
    }, [openContentProviders]);

    return (
        <AuthenticatedLayout
            title="Open Content Management"
            path={['Open Content Management']}
        >
            <div className="px-8 pb-4">
                <h1>Open Content Management</h1>
                <div className="pt-6 space-y-6">
                    <TabView
                        tabs={openContentTabs}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                    <div className="flex flex-row gap-4">
                        <SearchBar
                            searchTerm={searchTerm}
                            changeCallback={setSearchTerm}
                        />
                        <DropdownControl
                            label="Filter by"
                            enumType={FilterLibraries}
                            callback={setFilterLibraries}
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-6">
                        {libraries?.data.map((library) => (
                            <LibraryCard
                                key={library.id}
                                library={library}
                                setToast={setToast}
                                mutate={mutateLibraries}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {/* Toasts */}
            {toast.state !== ToastState.null && (
                <Toast
                    state={toast.state}
                    message={toast.message}
                    reset={() =>
                        setToast({ state: ToastState.null, message: '' })
                    }
                />
            )}
        </AuthenticatedLayout>
    );
}
