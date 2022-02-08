import RequestItem from './RequestItem'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class BoardRequestItem extends RequestItem {
    link = () => this.props.request.postingNickname === this.props.user.nickname ?
        `/my-requests/${this.props.request.id}` :
        `/requests/${this.props.request.id}`

    getLeftInfoItems() {
        return [["Autore", "Pubblicata"], ["Categoria", "Sottocategoria"]]
    }

    getRightInfoItems() {
        return ["Visualizzazioni", "Offerte"]
    }

    renderActionButtons() {
        return null
    }

    shouldDisplayBadge() {
        return false
    }

    renderDeleteButton() {
        return null
    }

    mobileTopItems() {
        return ["Autore", "Categoria", "Sottocategoria"]
    }

    mobileBottomItems() {
        return ["Visualizzazioni", "Offerte"]
    }

    renderMobileActionButtons() {
        return null
    }
}

const mapStateToProps = state => ({
    user: state.user,
})

export default connect(mapStateToProps, {})(withRouter(BoardRequestItem))