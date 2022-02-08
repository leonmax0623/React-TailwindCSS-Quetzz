import React from 'react'
import Component from '../../Component'
import ReactDOM from 'react-dom'

export default class Modal extends Component {
    el = this.createRoot()
    closingButtonStyle = {
        top: '1rem',
        right: '1rem',
        width: '2rem',
        height: '2rem'
    }

    createRoot() {
        const el = document.createElement('div')
        el.className = 'fixed h-full w-full inset-0 overflow-auto'
        el.style.backgroundColor = 'rgba(0,0,0,0.2)'
        el.style.zIndex = '100'
        el.onclick = e => {
            if (e.target === el) {
                this.props.onCancel()
            }
        }
        return el
    }

    componentDidMount() {
        super.componentDidMount()
        document.body.appendChild(this.el)
        document.body.style.overflow = 'hidden'
    }

    componentWillUnmount() {
        super.componentWillUnmount()
        document.body.removeChild(this.el)
        document.body.style.overflow = 'auto'
    }

    dismissButton() {
        if (this.props.dismissable !== false) {
            return <span
                className="absolute cursor-pointer text-3xl leading-none text-center"
                style={this.closingButtonStyle}
                onClick={this.props.onCancel}
            >
                ×
            </span>
        }
    }

    render() {
        const additionalClasses = this.props.className || '';
        return ReactDOM.createPortal(
            (
                <div
                    className={this.isMobile() ? `modal relative scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full ${additionalClasses}`: `modal relative scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full ${additionalClasses}`}
                    style={this.isMobile() ? {
                        position: "fixed",
                        maxHeight:"70vh",
                        overflowY: 'scroll',
                        top: "50%",
                        left: "50%",
                        width: "80%",
                        transform: "translate(-50%, -50%)",
                    } : {  
                        position: "fixed",
                        maxHeight:"70vh",
                        overflow:"auto",
                        top: "30%",
                        left: "50%",
                        width: "80%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    {this.dismissButton()}
                    {this.props.children}
                </div>
            ),
            this.el
        )
    }
}