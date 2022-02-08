import Component from '../../../Component'
import moment from 'moment'
import { createLoaderModal, createModal, optional, equals } from '../../../helpers'
import { filtersAPI } from '../../../resources/filters'
import OptionsModal from '../modals/OptionsModal'

export default class Filters extends Component {
    categoriesLoaded = null
    subcategoriesLoaded = null
    provincesLoaded = null
    citiesLoaded = null

    state = {
        statuses: [],
        categories: [],
        regions: [],
        provinces: [],
        cities: [],
        filters: {},
        searchString: '',
    }

    filtersMapping = {
        category: 'categories',
        subcategory: 'subcategories',
        status: 'statuses',
        region: 'regions',
        province: 'provinces',
        city: 'cities',
    }

    pickCategory = () => createLoaderModal(this.categoriesLoaded)
        .then(() => createModal(OptionsModal, {options: this.state.categories.sort(function(a, b) {
            if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;
           })}))
        .then(category => {
            this.updateFilter('category', category)
            setTimeout(() => this.updateFilter('subcategory', null), 0)
        })
        .catch(() => null)

    pickSubcategory = () => {
        if (this.categoriesLoaded !== null && optional(this.state.filters, 'category.id')) {
            return createLoaderModal(this.subcategoriesLoaded)
                .then(() => createModal(OptionsModal, {options: this.state.subcategories.sort(function(a, b) {
                    if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                    if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                    return 0;
                   })}))
                .then(subcategory => this.updateFilter('subcategory', subcategory))
                .catch(() => null)
        }
    }

    pickProvince = () => createLoaderModal(this.provincesLoaded)
        .then(() => createModal(OptionsModal, {options: this.state.provinces}))
        .then(province => {
            this.updateFilter('province', province)
            setTimeout(() => this.updateFilter('city', null), 0)
            this.citiesLoaded = filtersAPI.cities(province.id).then(cities => this.setState({cities}))
        })
        .catch(() => null)

    pickCity = () => {
        if (this.citiesLoaded !== null && optional(this.state.filters, 'province.id')) {
            return createLoaderModal(this.citiesLoaded)
                .then(() => createModal(OptionsModal, {options: this.state.cities}))
                .then(city => this.updateFilter('city', city))
                .catch(() => null)
        }
    }

    componentDidMount() {
        super.componentDidMount()
        this.categoriesLoaded = filtersAPI.categories().then(categories => this.setState({categories}))
        this.provincesLoaded = filtersAPI.provinces()
            .then(provinces => this.setState({provinces}))

        Promise.all([this.categoriesLoaded, this.provincesLoaded])
            .then(() => this.state.filters = this.convertFiltersToObj(this.props.filters))
    }

    componentDidUpdate(prevProps) {
        if (!equals(prevProps.filters, this.props.filters)) {
            this.setState({filters: this.convertFiltersToObj(this.props.filters)})
            const provinceId = optional(this.props.filters, 'province')
            if (provinceId) {
                this.provincesLoaded.then(() => this.citiesLoaded = filtersAPI.cities(provinceId))
                    .then(cities => this.setState({cities}))
            }
            const categoryId = optional(this.props.filters, 'category')
            if (categoryId) {
                this.categoriesLoaded.then(() => this.subcategoriesLoaded = filtersAPI.subcategories(categoryId))
                    .then(subcategories => this.setState({subcategories}))
            }
        }
    }

    convertFiltersToObj(initialFilters) {
        const filters = {}

        Object.keys(this.filtersMapping)
            .forEach(key => {
                if (!initialFilters[key]) {
                    initialFilters[key] = null
                }
            })

        Object.entries(initialFilters)
            .forEach(([key, value]) => {
                const filterList = this.state[this.filtersMapping[key]]
                if (filterList) {
                    if (value) {
                        const id = typeof value === 'object' ? value.id : value
                        filters[key] = filterList.find(i => i.id == id)
                    }
                    else if (!['category', 'subcategory', 'province', 'city'].includes(key)) {
                        filters[key] = filterList[0] || {id: 0, name: null}
                    }
                }
                else {
                    filters[key] = value
                }
            })
        if ('query' in initialFilters) {
            filters.query = initialFilters.query
        }
        return filters
    }

    cleanFilters(obj) {
        const newFilters = {}
        for (let [key, val] of Object.entries(obj)) {
            if (key && val) {
                if (moment.isMoment(val)) {
                    newFilters[key] = val.format()
                }
                else if (val && val.id && val.id != 0) {
                    newFilters[key] = val.id
                }
                else if (typeof val === "string") {
                    newFilters[key] = val
                }
            }
        }
        return newFilters
    }

    updateFilter = (name, value) => {
        if (value && value.id === 0) {
            switch (name) {
                case 'region':
                    this.state.filters.province = this.state.provinces[0]
                    this.state.filters.city = this.state.cities[0]
                    break;
                case 'province':
                    this.state.filters.city = this.state.cities[0]
                    break;
            }
        }
        this.props.onUpdate(
            this.cleanFilters({...this.state.filters, [name]: value})
        )
    }
}