import {
    ProviderPlatform,
    ProviderPlatformState,
    ProviderPlatformType,
    ServerResponseMany,
    ServerResponseOne,
    Timezones
} from '@/common';
import { KeyedMutator } from 'swr';
import { Validate } from 'react-hook-form';
import React from 'react';

export enum CRUDActions {
    Add,
    Edit,
    Delete,
    Reset
}
export interface CRUDModalProps<T> {
    mutate:
        | KeyedMutator<ServerResponseMany<T>>
        | KeyedMutator<ServerResponseOne<T>>;
    target?: T;
}

export enum FormInputTypes {
    Text,
    Dropdown,
    TextArea,
    MultiSelectDropdown
}

export interface Input {
    type: FormInputTypes;
    label: string;
    interfaceRef: string;
    required: boolean;
    enumType?: Record<string, string>;
    length?: number;
    pattern?: Pattern;
    validate?:
        | Validate<any, any> // eslint-disable-line
        | Record<string, Validate<any, any>>; // eslint-disable-line
    uniqueComponent?: JSX.Element;
}

export interface InputWithOptions<T> extends Input {
    options?: T[];
}

export interface Pattern {
    value: RegExp;
    message: string;
}

export function closeModal(ref: React.ForwardedRef<HTMLDialogElement>) {
    if (ref && 'current' in ref && ref.current) {
        ref.current.close();
    }
    return null;
}

export function showModal(ref: React.ForwardedRef<HTMLDialogElement>) {
    if (ref && 'current' in ref && ref.current) {
        ref.current.showModal();
    }
    return null;
}

export interface TargetItem<T> {
    action: CRUDActions;
    target: T;
}

// Facility Exports
export const facilityInputs: Input[] = [
    {
        type: FormInputTypes.Text,
        label: 'Name',
        interfaceRef: 'name',
        required: true
    },
    {
        type: FormInputTypes.Dropdown,
        label: 'Timezone',
        interfaceRef: 'timezone',
        required: true,
        enumType: Timezones
    }
];
export { AddFacilityModal } from './AddFacilityModal';
export { EditFacilityModal } from './EditFacilityModal';

// Provider Platform Exports
export const providerInputs: Input[] = [
    {
        type: FormInputTypes.Text,
        label: 'Name',
        interfaceRef: 'name',
        required: true,
        length: 25
    },
    {
        type: FormInputTypes.Dropdown,
        label: 'Type',
        interfaceRef: 'type',
        enumType: ProviderPlatformType,
        required: true
    },
    {
        type: FormInputTypes.Dropdown,
        label: 'State',
        interfaceRef: 'state',
        enumType: ProviderPlatformState,
        required: true
    },
    {
        type: FormInputTypes.Text,
        label: 'Base URL',
        interfaceRef: 'base_url',
        required: true
    },
    {
        type: FormInputTypes.Text,
        label: 'Account Id',
        interfaceRef: 'account_id',
        required: true
    },
    {
        type: FormInputTypes.Text,
        label: 'Access Key',
        interfaceRef: 'access_key',
        required: true
    }
];
export { AddProviderModal } from './AddProviderModal';

// Helpful Links Exports
export const linkInputs: Input[] = [
    {
        type: FormInputTypes.Text,
        label: 'Title',
        interfaceRef: 'title',
        required: true,
        length: 25
    },
    {
        type: FormInputTypes.Text,
        label: 'URL',
        interfaceRef: 'url',
        required: true
    },
    {
        type: FormInputTypes.TextArea,
        label: 'Description',
        interfaceRef: 'description',
        required: false,
        length: 255
    }
];
export { AddHelpfulLinkModal } from './AddHelpfulLinkModal';
export { EditHelpfulLinkModal } from './EditHelpfulLinkModal';

// User Exports
export const checkOnlyLettersAndSpaces: Validate<string, string | boolean> = (
    input: string
) => {
    if (!/^[A-Za-z\s]+$/.test(input)) {
        return 'Input should only contain letters and spaces';
    }
    return true;
};
export const checkOnlyLettersAndNumbers: Validate<string, string | boolean> = (
    input: string
) => {
    if (!/^[A-Za-z0-9]+$/.test(input)) {
        return 'Input should only contain letters and numbers';
    }
    return true;
};
export const userInputs: InputWithOptions<ProviderPlatform>[] = [
    {
        type: FormInputTypes.Text,
        label: 'First Name',
        interfaceRef: 'name_first',
        required: true,
        length: 25,
        validate: checkOnlyLettersAndSpaces
    },
    {
        type: FormInputTypes.Text,
        label: 'Last Name',
        interfaceRef: 'name_last',
        required: true,
        length: 25,
        validate: checkOnlyLettersAndSpaces
    },
    {
        type: FormInputTypes.Text,
        label: 'Username',
        interfaceRef: 'username',
        required: true,
        length: 50,
        pattern: {
            value: /^[A-Za-z0-9]+$/,
            message:
                'Username can only contain letters and numbers without spaces'
        }
    },
    {
        type: FormInputTypes.Text,
        label: 'Email (optional)',
        interfaceRef: 'email',
        required: false,
        length: 50
    }
];
export { AddUserModal } from './AddUserModal';
export { EditUserModal } from './EditUserModal';
