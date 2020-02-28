import AxiosInstance, { delayedRequest } from '../../../axiosConfig';
import { fastSpinner } from '../../../helpers/variables';

export const updatePassword = body => {
    const { newPassword, currentPassword } = body;
    return delayedRequest(AxiosInstance.post('/auth/users/set_password/', { newPassword, currentPassword }), 2000)
        .then(data => {
            console.log(data)
            return data;
        })
}
