import React, { useState } from 'react'
import ReactCalendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import mobiscroll from '@mobiscroll/react-lite'
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css'
 
function Calendar() {
    const [value, onChange] = useState(new Date())
    const [marked, setMarked] = useState([new Date("2020-12-10"), new Date("2020-12-15")])
 
    return (
        <div>
        <ReactCalendar
            calendarType="Hebrew"
            markedDates={{['2020-12-10']: {selected: true} }}
            //tileContent={({ activeStartDate, date, view }) => view === 'month' && date.getDay() === 0 ? <p>It's Sunday!</p> : null}
            onChange={onChange}
            value={value}
        />
        {/* <Datepicker
            controls={['calendar']}
            display="inline"
            touchUi={false}
        /> */}
        {/* <mobiscroll.Calendar value={value} onSet={onchange} theme='ios' placeholder={'click me'} /> */}
        </div>
    )
}

export default Calendar