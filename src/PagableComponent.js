import { UrlDependentComponent } from './UrlDependentComponent'
import { objectFromParams } from './resources/util'

export class PagableComponent extends UrlDependentComponent {
    onUrlChange() {
        const page = objectFromParams(window.location.search).page || 0
        this.setState({page})
        this.onPageChange(page)
    }
}