import clsx from 'clsx'
import React from 'react'
import Component from '../../Component'

export default class UploadArea extends Component {
    state = {
        drag: false
    }

    uploadButton = React.createRef()

    validDrag = e => e.dataTransfer.files?.length > 0 || e.dataTransfer.items?.length > 0

    onDragOver = e => {
        e.preventDefault()
        e.stopPropagation()
    }

    onDragEnter = e => {
        e.preventDefault()
        e.stopPropagation()
        if (this.validDrag(e)) {
            this.setState({drag: true})
        }
    }

    onDragLeave = e => {
        e.preventDefault()
        e.stopPropagation()
        this.setState({drag: false})
    }

    onDrop = e => {
        e.preventDefault()
        e.stopPropagation()
        this.setState({drag: false})
        if (this.validDrag(e)) {
            this.props.handleDrop(e.dataTransfer.files[0])
            e.dataTransfer.clearData()
        }
    }

    loadFile = e => {
        this.props.handleDrop(e.target.files[0])
        e.target.value = ''
    }

    render() {
        return <div
            onDragEnter={this.onDragEnter}
            onDragLeave={this.onDragLeave}
            onDragOver={this.onDragOver}
            onDrop={this.onDrop}
            className={clsx(
                "relative",
                this.props.className
            )}
            onClick={() => this.uploadButton.current.click()}
        >
            {this.state.drag ? 'Drop here' : 'Click or drag to upload'}
            <input
                className="absolute"
                style={{top: -1000000}}
                type="file"
                accept="image/*,audio/*,video/*"
                onChange={e => this.loadFile(e)}
                ref={this.uploadButton}
            />
        </div>
    }
}