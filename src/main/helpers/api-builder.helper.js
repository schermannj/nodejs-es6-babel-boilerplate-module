import {API_PREFIX, SECURE_API_PREFIX} from '../config/constants';

export function api(url) {
    return `${API_PREFIX}${url}`;
}

export function secureApi(url) {
    return `${API_PREFIX}${SECURE_API_PREFIX}${url}`
}

export function isSafe(url) {
    return !url.startsWith(`${API_PREFIX}${SECURE_API_PREFIX}`) && url.startsWith(`${API_PREFIX}`);
}