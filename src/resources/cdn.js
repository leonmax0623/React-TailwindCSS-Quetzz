import { post, withoutJsonEncode } from './util'

export const cdnAPI = {
    upload: file => {
        const formData = new FormData()
        formData.append('file', file)
        return withoutJsonEncode(() => post('/cdn/upload', {}, formData, {}, null))
    },
}