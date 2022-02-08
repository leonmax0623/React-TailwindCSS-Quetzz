import { get } from './util'

export const avatarAPI = {
    get: () => get.cached('/avatars'),
}