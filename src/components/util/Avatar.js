import React from 'react'
import Component from '../../Component'
import { extractInfo, isExtractable, optional } from '../../helpers'

export default class Avatar extends Component {
    render() {
        let photo = optional(this.props.user, 'photo')
        let photoUrl = null
        if (photo) {
            if (isExtractable(photo)) {
                photo = extractInfo(photo)
                if (!photo) {
                    photo = {url: "https://quetzz.s3.eu-central-1.amazonaws.com/deleted_user.png"}
                }
            }
            photoUrl = optional(photo, 'url')
        }
        const avatarUrl = optional(this.props.user, 'avatar.url')
        const backgroundImage = photoUrl || avatarUrl || this.props.fallback
        if (backgroundImage) {
            return <span
                style={{
                    height: `${this.props.size}em`,
                    width: `${this.props.size}em`,
                    backgroundImage: `url('${backgroundImage}')`
                }}
                className={
                    `${this.props.className}
                    rounded-full bg-cover bg-center bg-no-repeat`
                }
            ></span>
        }
        return null
    }
}