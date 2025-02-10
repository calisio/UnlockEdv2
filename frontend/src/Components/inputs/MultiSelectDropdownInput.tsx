import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface MultiSelectDropdownProps<T> {
    label: string;
    options: T[];
    interfaceRef: string;
    required: boolean;
    errors: FieldErrors<any>; // eslint-disable-line
    register: UseFormRegister<any>; // eslint-disable-line
}

export function MultiSelectDropdownInput<T>({
    label,
    options,
    interfaceRef,
    required,
    errors,
    register
}: MultiSelectDropdownProps<T>) {
    return (
        <label className="form-control w-full">
            <div className="label">
                <span className="label-text">{label}</span>
            </div>
            {options.map((option: T, index) =>
                typeof option === 'object' &&
                option !== null &&
                option !== undefined &&
                'id' in option &&
                'name' in option ? (
                    <div key={index}>
                        <input
                            {...register(interfaceRef, { required })}
                            type="checkbox"
                            value={option.id as number}
                        />
                        <span>{option.name as string}</span>
                    </div>
                ) : null
            )}
            <div className="text-error text-sm">
                {errors[interfaceRef]?.message as string}
            </div>
        </label>
    );
}
