import {
    DefaultValues,
    FieldError,
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';
import {
    CloseX,
    DropdownInput,
    MultiSelectDropdownInput,
    SubmitButton,
    TextAreaInput,
    TextInput
} from '../inputs';
import { forwardRef, useEffect } from 'react';
import { FormInputTypes, Input, InputWithOptions } from '.';

interface FormModalProps<T extends FieldValues> {
    title: string;
    inputs: Input[];
    defaultValues?: DefaultValues<T>;
    error?: FormError;
    onSubmit: SubmitHandler<T>;
}

export interface FormError {
    name: string;
    error: FieldError;
}

export const FormModal = forwardRef(function FormModal<T extends FieldValues>(
    { title, inputs, onSubmit, defaultValues, error }: FormModalProps<T>,
    ref: React.ForwardedRef<HTMLDialogElement>
) {
    const {
        register,
        reset,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<T>({ defaultValues: defaultValues });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    useEffect(() => {
        if (error) {
            setError(error.name as 'root' | `root.${string}`, error.error);
        }
    }, [error, setError]);

    const onSubmitHandler: SubmitHandler<T> = async (data) => {
        const response = await onSubmit(data);
        console.log(response);
        if (response instanceof Error) return;
        else reset();
    };

    return (
        <dialog ref={ref} className="modal relative">
            <div className="modal-box">
                <CloseX close={() => void reset()} />
                <div className="flex flex-col">
                    <span className="text-3xl font-semibold pb-6 text-neutral">
                        {title}
                    </span>
                    <form
                        onSubmit={(e) => {
                            void handleSubmit(onSubmitHandler)(e);
                        }}
                    >
                        {inputs.map(
                            (input: Input | InputWithOptions<T>, index) => {
                                if (input.type === FormInputTypes.Text) {
                                    return (
                                        <TextInput
                                            key={index}
                                            label={input.label}
                                            interfaceRef={input.interfaceRef}
                                            required={input.required}
                                            length={input.length}
                                            errors={errors}
                                            register={register}
                                            validate={input.validate}
                                        />
                                    );
                                }
                                if (input.type === FormInputTypes.Dropdown) {
                                    if (!input.enumType) return;
                                    return (
                                        <DropdownInput
                                            key={index}
                                            label={input.label}
                                            interfaceRef={input.interfaceRef}
                                            required={input.required}
                                            errors={errors}
                                            register={register}
                                            enumType={input.enumType}
                                        />
                                    );
                                }
                                if (input.type === FormInputTypes.TextArea) {
                                    return (
                                        <TextAreaInput
                                            key={index}
                                            label={input.label}
                                            interfaceRef={input.interfaceRef}
                                            required={input.required}
                                            length={input.length}
                                            errors={errors}
                                            register={register}
                                            validate={input.validate}
                                        />
                                    );
                                }
                                if (
                                    input.type ===
                                        FormInputTypes.MultiSelectDropdown &&
                                    'options' in input
                                ) {
                                    return (
                                        <MultiSelectDropdownInput
                                            key={index}
                                            label={input.label}
                                            options={input.options ?? []}
                                            interfaceRef={'platforms'}
                                            required={false}
                                            errors={errors}
                                            register={register}
                                        />
                                    );
                                }
                                return;
                            }
                        )}
                        <SubmitButton />
                    </form>
                </div>
            </div>
        </dialog>
    );
});
export default FormModal;
