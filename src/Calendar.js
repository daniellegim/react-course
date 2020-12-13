import React, { useState } from 'react'
import ReactCalendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import mobiscroll from '@mobiscroll/react-lite'
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css'
import {Inject, ScheduleComponent, EventSettingsModel, Day, Week, WorkWeek, Month, Agenda} from '@syncfusion/ej2-react-schedule'
 
function Calendar() {
    const [value, onChange] = useState(new Date())
    const events = {
        dataSource: [{
            StartTime: new Date('2020-12-14'),
            EndTime: new Date('2020-12-14')           
        }]
    }
 
    return (
        <div>
            <ScheduleComponent currentView="Month" eventSettings={events}>
                <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
            </ScheduleComponent>
        {/* <ReactCalendar
            calendarType="Hebrew"
            //tileContent={({ activeStartDate, date, view }) => view === 'month' && date.getDay() === 0 ? <p>It's Sunday!</p> : null}
            onChange={onChange}
            value={value}
        /> */}
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