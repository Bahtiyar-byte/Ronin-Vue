import { useRouter } from 'vue-router';

export const redirectToLoginPageIfNotAuthenticated = (): void => {
    const router = useRouter();
    const accessToken = useCookie('accessToken').value;

    // Проверяем, аутентифицирован ли пользователь
    if ((accessToken == void(0) || accessToken.length === 0) && router.currentRoute.value.name !== 'login') {
        router.push({
            name: 'login',
            state: {
                withoutToken: true,
            }
        });
    }
};

/**
 *
 * @param router Vue router instance
 * @returns {Promise<{result, isLoading, errors}>}
 */
// export const logout = async (router) => {
//     const { result, errors, isLoading } = await useUser().logout();
//
//     useCookie('accessToken').value = null;
//     router.push({ name: 'login' });
//
//     return { result, errors, isLoading };
// };
