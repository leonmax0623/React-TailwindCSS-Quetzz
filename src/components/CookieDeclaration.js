import React from 'react'
import Info from './Info'

export default class DeclarationCookie extends Info {
    iframe = React.createRef()

    title() {
        return 'Dichiarazione Cookie'
    }
    width() {
        if (window.innerWidth >= 630) {
            return 100
        }
        return 0.000878564 * window.innerWidth * window.innerWidth - 1.18201 * window.innerWidth + 500.26
    }
    scale() {
        if (window.innerWidth >= 630) {
            return 1
        }
        return 1 - (630 - window.innerWidth) / 600
    }
    body() {
        return <script id="CookieDeclaration" src="https://consent.cookiebot.com/ca2c9c25-f884-4991-a975-bf38fb78d5ad/cd.js" type="text/javascript" defer></script>
    }
}