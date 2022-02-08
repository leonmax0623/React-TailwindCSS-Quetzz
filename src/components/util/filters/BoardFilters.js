import React from 'react'
import Datepicker from '../Datepicker'
import Filters from './Filters'
import { debounce } from '../../../baseHelpers'
import { requestStatuses, optional } from '../../../helpers'
import clsx from 'clsx'

export default class BoardFilters extends Filters {
    componentDidMount() {
        super.componentDidMount()
        this.setState({statuses: [
            {id: 0, name: 'Status'},
            ...requestStatuses
        ]})
    }

    updateQuery = debounce(q => this.updateFilter('query', q), 100)

    mobileRender() {
        const filterWrapperClass = "flex items-center w-1/2 pr-2"
        const filterRowClass = "flex justify-start flex-wrap pl-4 pr-2"
        const filterClass = "mb-2 flex items-center p-4 bg-gray rounded-lg w-full"
        return <div className="mb-16">
            <div className="bg-white mb-6 pt-6 pb-2">
                <div className={filterRowClass}>
                    <div className={filterWrapperClass}>
                        <span className={`text-gray-500 ${filterClass}`}>
                            <i className="text-gray fas fa-th-large mr-4"></i>
                            <button onClick={this.pickCategory}>
                                {optional(this.state.filters, 'category.name', 'Categoria')}
                            </button>
                            <i
                                className={clsx("fas fa-times cursor-pointer text-black pl-2", {hidden: !optional(this.state.filters, 'category.name')})}
                                onClick={() => {
                                    this.updateFilter('category', null)
                                    setTimeout(() => this.updateFilter('subcategory', null), 0)
                                }}
                            >
                            </i>
                        </span>
                    </div>
                    <div className={clsx(filterWrapperClass, {invisible: !optional(this.state.filters, 'category.name')})}>
                        <span className={`text-gray-500 ${filterClass}`}>
                            <img className="mr-4" style={{height: '1.5rem'}} src="/img/icon_subcategory.png"/>
                            <button onClick={this.pickSubcategory}>
                                {optional(this.state.filters, 'subcategory.name', 'Sottocategoria')}
                            </button>
                            <i
                                className={clsx("fas fa-times cursor-pointer text-black pl-2", {hidden: !optional(this.state.filters, 'subcategory.name')})}
                                onClick={() => this.updateFilter('subcategory', null)}
                            >
                            </i>
                        </span>
                    </div>
                    <div className={filterWrapperClass}>
                        <Datepicker
                            fullWidth
                            shortcuts
                            range={[optional(this.state.filters, 'minDate'), optional(this.state.filters, 'maxDate')].filter(i => i)}
                            onSelect={range => this.props.onUpdate(this.cleanFilters({
                                ...this.state.filters,
                                minDate: range[0],
                                maxDate: range[1]
                            }))}
                            className={`${filterClass} z-15`}
                        />
                    </div>
                    <div className={filterWrapperClass}>
                        <p className={`text-gray-500 ${filterClass}`}>
                            <img className="mr-4" style={{height: '1.5rem'}} src="/img/icon_country.png"/>
                            Friuli Venezia Giulia
                        </p>
                    </div>
                    <div className={filterWrapperClass}>
                        <span className={`text-gray-500 ${filterClass}`}>
                            <img className="mr-4" style={{height: '1.5rem'}} src="/img/icon_province.png"/>
                            <button onClick={this.pickProvince}>
                                {optional(this.state.filters, 'province.name', 'Provincia')}
                            </button>
                            <i
                                className={clsx("fas fa-times cursor-pointer text-black pl-2", {hidden: !optional(this.state.filters, 'province.name')})}
                                onClick={() => {
                                    this.updateFilter('province', null)
                                    setTimeout(() => this.updateFilter('city', null), 0)
                                }}
                            >
                            </i>
                        </span>
                    </div>
                    <div className={filterWrapperClass}>
                        <span className={`text-gray-500 ${filterClass}`}>
                            <img className="mr-4" style={{height: '1.5rem'}} src="/img/icon_city.png"/>
                            <button onClick={this.pickCity}>
                                {optional(this.state.filters, 'city.name', 'Città')}
                            </button>
                            <i
                                className={clsx("fas fa-times cursor-pointer text-black pl-2", {hidden: !optional(this.state.filters, 'city.name')})}
                                onClick={() => this.updateFilter('city', null)}
                            >
                            </i>
                        </span>
                    </div>
                </div>
                <div className="p-4">
                    <p className="text-center mb-4">Ricerca Testuale</p>
                    <input
                        type="text"
                        className="mb-4 p-4 border-turquoise border-2 rounded-lg max-w-160 w-full mx-auto block"
                        defaultValue={optional(this.state.filters, 'query', '')}
                        onChange={e => this.setState({searchString: e.target.value})}
                    />
                    <button
                        className="bg-turquoise text-white rounded-lg block mx-auto px-4 py-1"
                        onClick={() => this.updateQuery(this.state.searchString)}
                    >
                        Cerca
                    </button>
                </div>
            </div>
        </div>
    }

    desktopRender() {
        const filterWrapperClass = "md:w-auto flex items-center w-1/2"
        const filterRowClass = "flex justify-start flex-wrap pl-4 pr-2 md:px-10"
        const filterClass = "mb-10 flex items-center bg-white rounded-lg w-full"
        const categoryName = optional(this.state.filters, 'category.name')
        const subcategoryName = optional(this.state.filters, 'subcategory.name')
        const provinceName = optional(this.state.filters, 'province.name')
        const cityName = optional(this.state.filters, 'city.name')
        return <div className="mb-16 md:mb-0 md:text-17">
            <div className="bg-white mb-6 pt-6 md:pt-10 pb-2 md:pb-0">
                <div className={filterRowClass}>
                    <div className={filterWrapperClass}>
                        <span className={(categoryName ? 'text-black' : 'text-gray-500') + ` mr-16 ${filterClass}`}>
                            <i className="text-gray fas fa-th-large mr-4"></i>
                            <button onClick={this.pickCategory}>
                                {categoryName || 'Categoria'}
                            </button>
                            <i
                                className={clsx("fas fa-times cursor-pointer text-black pl-2", {hidden: !optional(this.state.filters, 'category.name')})}
                                onClick={() => {
                                    this.updateFilter('category', null)
                                    setTimeout(() => this.updateFilter('subcategory', null), 0)
                                }}
                            >
                            </i>
                        </span>
                    </div>
                    <div className={filterWrapperClass}>
                        <span className={clsx(`mr-16 ${filterClass}`, {'text-gray-500': !subcategoryName, 'text-black': subcategoryName, hidden: !optional(this.state.filters, 'category.name')})}>
                            <img className="mr-4" style={{height: '1.5rem'}} src="/img/icon_subcategory.png"/>
                            <button onClick={this.pickSubcategory}>
                                {subcategoryName || 'Sottocategoria'}
                            </button>
                            <i
                                className={clsx("fas fa-times cursor-pointer text-black pl-2", {hidden: !optional(this.state.filters, 'subcategory.name')})}
                                onClick={() => this.updateFilter('subcategory', null)}
                            >
                            </i>
                        </span>
                    </div>
                    <div className={`${filterWrapperClass} pr-8`}>
                        <Datepicker
                            shortcuts
                            range={[optional(this.state.filters, 'minDate'), optional(this.state.filters, 'maxDate')].filter(i => i)}
                            onSelect={range => this.props.onUpdate(this.cleanFilters({
                                ...this.state.filters,
                                minDate: range[0],
                                maxDate: range[1]
                            }))}
                            className={`${filterClass} z-15`}
                        />
                    </div>
                    <span className="flex-1"></span>
                    <div>
                        <p>Cerca Testo</p>
                        <input
                            type="text"
                            className="mb-4 p-4 border-turquoise border-2 rounded-lg max-w-160 w-full mx-auto block h-8"
                            defaultValue={optional(this.state.filters, 'query', '')}
                            onChange={e => this.setState({searchString: e.target.value})}
                        />
                    </div>
                </div>
                <div className={filterRowClass}>
                    <div className={filterWrapperClass}>
                        <p className={`text-black mr-16 ${filterClass}`}>
                            <img className="mr-4" style={{height: '1.5rem'}} src="/img/icon_country.png"/>
                            Friuli Venezia Giulia
                        </p>
                    </div>
                    <div className={filterWrapperClass}>
                        <span className={(provinceName ? 'text-black' : 'text-gray-500') + ` mr-16 ${filterClass}`}>
                            <img className="mr-4" style={{height: '1.5rem'}} src="/img/icon_province.png"/>
                            <button onClick={this.pickProvince}>
                                {provinceName || 'Provincia'}
                            </button>
                            <i
                                className={clsx("fas fa-times cursor-pointer text-black pl-2", {hidden: !optional(this.state.filters, 'province.name')})}
                                onClick={() => {
                                    this.updateFilter('province', null)
                                    setTimeout(() => this.updateFilter('city', null), 0)
                                }}
                            >
                            </i>
                        </span>
                    </div>
                    <div className={filterWrapperClass}>
                        <span className={(cityName ? 'text-black' : 'text-gray-500') + ` ${filterClass}`}>
                            <img className="mr-4" style={{height: '1.5rem'}} src="/img/icon_city.png"/>
                            <button onClick={this.pickCity}>
                                {cityName || 'Comune'}
                            </button>
                            <i
                                className={clsx("fas fa-times cursor-pointer text-black pl-2", {hidden: !optional(this.state.filters, 'city.name')})}
                                onClick={() => this.updateFilter('city', null)}
                            >
                            </i>
                        </span>
                    </div>
                    <span className="flex-1"></span>
                    <div>
                        <button
                            className="bg-turquoise text-white rounded-lg block mx-auto px-4 py-1"
                            onClick={() => this.updateQuery(this.state.searchString)}
                        >
                            Cerca
                            <img className="inline" style={{height: '1.5rem'}} src="/img/icon_search.png"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    }
}