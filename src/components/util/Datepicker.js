import React from 'react'
import Component from '../../Component'
import DropdownArrow from './DropdownArrow'
import moment from 'moment'
import clsx from 'clsx'
import { withRouter } from 'react-router-dom'

class DropdownMenu extends Component {
    state = {
        hover: null,
        thisMonth: moment(),
        nextMonth: moment().add(1, 'month'),
        selectMode: false,
        selected: this.props.range || [],
        show: false
    }

    lastFocus = null

    wrapperRef = React.createRef()
    datepickerPosition = React.createRef()

    toggle = e => {
        e.stopPropagation()
        e.preventDefault()
        if ((new Date()).getTime() - this.lastFocus > 300) {
            this.wrapperRef.current.blur()
        }
    }

    componentDidMount() {
        super.componentDidMount()
        this.props.history.listen(() => this.wrapperRef.current && this.wrapperRef.current.blur())
    }

    componentDidUpdate(prevProps) {
        if (!this.dateCmp(prevProps.range, this.props.range)) {
            this.setState({selected: this.props.range || []})
        }
    }

    selectedDateRange() {
        const r = this.props.range
        const classes = clsx({
            'mr-4 pl-4': true,
            'py-4': !this.isMobile(),
            'text-gray-500': !this.hasValue(),
            'flex-1': this.props.fullWidth,
        })
        const text = !this.hasValue() ?
            (this.isMobile() ? "Data" : "Seleziona Data Da - A") :
            `${r[0].format('L')} - ${r[1].format('L')}`

        return <span className={classes}>{text}</span>
    }

    daysHeading() {
        const days = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']
            .map((i, index) => <span key={index} className="text-gray-500 text-xs p-2 w-10 inline-block">{i}</span>)
        return <div className="whitespace-no-wrap">{days}</div>
    }

    days(month, year) {
        const daysOfWeek = [6, 0, 1, 2, 3, 4, 5]
        const momentMonth = moment({month, year})
        let daysArray = [...Array(momentMonth.daysInMonth()).keys()]
            .map(i => i+1)
        const fillStartOfMonth = [...Array(daysOfWeek[momentMonth.day()]).fill(null)]
        daysArray.unshift(...fillStartOfMonth)
        daysArray = this.chunk(daysArray, 7)

        return daysArray.map((week, weekIndex) =>
            <div key={weekIndex} className="whitespace-no-wrap">{week.map((day, index) => this.renderDay(day, month, year, index))}</div>
        )
    }

    dateSort(arr) {
        if (arr[0].isAfter(arr[1])) {
            return [arr[1], arr[0]]
        }
        return arr
    }

    dateCmp(arr1, arr2) {
        return arr1.length === arr2.length &&
            arr1[0] === arr2[0] &&
            arr1[1] === arr2[1]
    }

    renderDay(day, month, year, index) {
        const standardClasses = `
            text-center
            w-10
            inline-block
            p-2
        `
        const selectedClasses = standardClasses + `
            bg-turquoise
            rounded-full
            text-white
        `
        const hoverClasses = selectedClasses + `
            opacity-50
        `
        const rangeClasses = standardClasses + `
            bg-turquoise-100
        `
        if (!day) {
            return <span key={index} className={standardClasses}></span>
        }
        const date = moment({day, month, year})
        const selectMode = this.state.selectMode
        let selected = [...this.state.selected]
        let classes
        if (
            (selected[0] && date.isSame(selected[0], 'day')) ||
            (selected[1] && date.isSame(selected[1], 'day'))
        ) {
            classes = selectedClasses
        }
        else if (date.isSame(this.state.hover, 'day')) {
            classes = hoverClasses
        }
        else if (
            selectMode && this.state.hover && selected[0] &&
            date.isBetween(...this.dateSort([this.state.hover, selected[0]]), 'day')
        ) {
            classes = rangeClasses
        }
        else if (
            !selectMode && selected[0] && selected[1] &&
            date.isBetween(...selected, 'day')
        ) {
            classes = rangeClasses
        }
        else {
            classes = standardClasses
        }

        return (
            <span
                key={index}
                className={classes}
                onMouseEnter={() => this.setState({hover: date})}
                onClick={() => {
                    if (selectMode) {
                        selected = this.dateSort([...selected, date])
                    }
                    else {
                        selected = [date]
                    }
                    this.setState({
                        selectMode: !selectMode,
                        selected
                    })
                }}
            >
                {day}
            </span>
        )
    }

    chunk(array, size) {
        const t = []
        for (let i = 0; i < array.length; i += size) {
            t.push(array.slice(i, i + size))
        }
        return t
    }

    nextPage = () => this.movePage(2)

    previousPage = () => this.movePage(-2)

    movePage(inc) {
        this.setState({
            thisMonth: this.state.thisMonth.clone().add(inc, 'month'),
            nextMonth: this.state.nextMonth.clone().add(inc, 'month'),
        })
    }

    selectLast(unit) {
        this.setState({
            selectMode: false,
            selected: [
                moment().subtract(1, unit),
                moment()
            ]
        })
    }

    selectYesterday = () => this.selectLast('day')

    selectLastWeek = () => this.selectLast('week')

    selectLastMonth = () => this.selectLast('month')

    selectLastYear = () => this.selectLast('year')

    selectedDays() {
        const s = this.state.selected
        if (s.length === 2) {
            return [
                <span className="text-gray-500 desktop">Hai selezionato </span>,
                <span className="mr-4">{s[1].diff(s[0], 'days')} giorni</span>
            ]
        }
    }

    cancel = async () => {
        await this.setState({selected: [], selectMode: false})
        this.save()
    }

    save = () => {
        const range = []
        if (this.state.selected[0]) {
            range.push(this.state.selected[0].startOf('day'))
        }
        if (this.state.selected[1]) {
            range.push(this.state.selected[1].endOf('day'))
        }
        this.props.onSelect(range)
        this.wrapperRef.current.blur()
    }

    hasValue() {
        return (this.props.range || []).length === 2
    }

    getLeft() {
        if (!this.wrapperRef.current || !this.datepickerPosition.current) {
            return 0
        }
        return Math.min(window.innerWidth - this.wrapperRef.current.getBoundingClientRect().x - this.datepickerPosition.current.getBoundingClientRect().width, 0) + "px"
    }

    render() {
        return (
        <div
            tabIndex="0"
            className={`
                relative
                bg-white
                inline-block
                cursor-pointer
                outline-none
                z-10
                ${this.props.className || ''}
            `}
            onFocus={() => {
                this.setState({show: true}, () => this.forceUpdate())
                this.lastFocus = (new Date()).getTime()
            }}
            onBlur={() => this.setState({show: false})}
            ref={this.wrapperRef}
        >
            <i className="text-gray far fa-calendar-alt"></i>
            {this.selectedDateRange()}
            <DropdownArrow active={this.state.show} onClick={this.toggle}/>
            <i
                className={clsx("fas fa-times cursor-pointer text-black pl-2", {hidden: !this.hasValue()})}
                onClick={() => this.props.onSelect([])}
            >
            </i>
            <div
                style={{
                    top: '100%',
                    left: this.getLeft(),
                    display: this.state.show ? 'block' : 'none',
                }}
                className="absolute bg-white dropdown-menu-list"
                ref={this.datepickerPosition}
            >
                <div className="flex">
                    <div className="flex flex-wrap justify-center md:flex-no-wrap border p-4" onMouseLeave={() => this.setState({hover: null})}>
                        <div className="mx-auto md:mr-12">
                            <p className="text-center">
                                <i
                                    className="fas fa-angle-left fa-lg leading-none float-left pl-2"
                                    onClick={this.previousPage}
                                ></i>
                                {this.state.thisMonth.format('MMMM YYYY')}
                            </p>
                            <div>
                                {this.daysHeading()}
                                {this.days(this.state.thisMonth.month(), this.state.thisMonth.year())}
                            </div>
                        </div>
                        <div>
                            <p className="text-center">
                                {this.state.nextMonth.format('MMMM YYYY')}
                                <i
                                    className="fas fa-angle-right fa-lg leading-none float-right pr-2"
                                    onClick={this.nextPage}
                                ></i>
                            </p>
                            <div>
                                {this.daysHeading()}
                                {this.days(this.state.nextMonth.month(), this.state.nextMonth.year())}
                            </div>
                        </div>
                    </div>
                    {this.props.shortcuts ?
                        <div className="border border-l-0 p-4 desktop">
                            <p className="text-xs text-gray-500 mt-6 p-2 whitespace-no-wrap">Periodi di tempo predefiniti</p>
                            <div>
                                <p className="p-2" onClick={this.selectYesterday}>Ieri</p>
                                <p className="p-2" onClick={this.selectLastWeek}>Ultima settimana</p>
                                <p className="p-2" onClick={this.selectLastMonth}>Ultimo mese</p>
                                {/*<p className="p-2" onClick={this.selectLastYear}>Ultimo anno</p>*/}
                            </div>
                        </div> :
                        null
                    }
                </div>
                <div className="flex justify-between align-middle border border-t-0 rounded-b-lg px-4 py-2">
                    <div>
                        <span className="py-2" onClick={this.cancel}>Annulla</span>
                    </div>
                    <div>
                        {this.selectedDays()}
                        <span
                            className="bg-turquoise text-white px-4 py-2 rounded"
                            onClick={this.save}
                        >
                            Conferma
                        </span>
                    </div>
                </div>
            </div>
        </div>
        )
    }
    
}

export default withRouter(DropdownMenu)