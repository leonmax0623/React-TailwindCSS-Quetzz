import React from 'react'
import Info from './Info'

export default class WorkSupport extends Info {
    title() {
        return 'Work with us'
    }
    body() {
        return <>
            <p className="text-20 mb-8">
                Work with us
            </p>
        </>
    }
}