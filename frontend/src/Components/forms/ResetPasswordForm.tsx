import { ResetPasswordResponse, ServerResponseOne, User } from '@/common';
import { CloseX } from '../inputs/CloseX';
import API from '@/api/api';
import { isAdministrator } from '@/useAuth';

interface ResetPasswordFormProps {
    onCancel: (message: string, is_err: boolean) => void;
    onSuccess: (psw: string) => void;
    user: User | undefined;
}
interface Form {
    user_id: number;
}
export default function ResetPasswordForm({
    user,
    onSuccess,
    onCancel
}: ResetPasswordFormProps) {
    const getTempPassword = async () => {
        const response = (await API.post<ResetPasswordResponse, Form>(
            'users/student-password',
            {
                user_id: user!.id
            }
        )) as ServerResponseOne<ResetPasswordResponse>;
        if (!response.success) {
            onCancel('Failed to reset password', true);
            return;
        }
        onSuccess(response.data.temp_password);
        return;
    };
    return (
        <div>
            <CloseX close={() => onCancel('', false)} />
            {isAdministrator(user) ? (
                <p className="font-bold text-error py-4 pb-8">
                    You may only reset the password for non-administrator
                    accounts.
                </p>
            ) : (
                <div>
                    <p>
                        Are you sure you would like to reset {user?.name_first}{' '}
                        {user?.name_last}'s password?
                    </p>
                    <p className="py-4"></p>
                    <div className="flex flex-row justify-between">
                        <button
                            className="btn"
                            onClick={() => onCancel('', false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn btn-error"
                            onClick={() => {
                                void getTempPassword();
                            }}
                        >
                            Reset Password
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
