import React from 'react';
import moment from 'moment';

import '../../public/styles.css';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weekDays: moment.weekdaysShort(),
      firstDayOfMonth: moment(),
      daysInMonth: moment(),
      currentDay: moment(),
    };
  }

  firstDayOfMonth() {
    const dateObj = this.state.firstDayOfMonth;
    const firstDay = moment(dateObj).startOf('month').format('d');
    return firstDay;
  }

  daysInMonth() {
    const dateObj = this.state.daysInMonth;
    const monthDays = moment(dateObj).daysInMonth();
    // may need to change to find # of days in current month
    // moment("2012-01", "YYYY-MM").daysInMonth() // 31
    return monthDays;
  }

  currentDay() {
    return this.state.currentDay.format('D');
  }

  render() {
    // refactor blanks to get prev month last days to insert before 1st day of current month
    const blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(
        <td key={`blank: ${i}`} className="calendar-day-res-empty">{''}</td>,
      );
    }

    const daysInMonth = [];
    for (let d = 1; d <= this.daysInMonth(); d++) {
      const currentDay = d == this.currentDay() ? 'today' : '';
      daysInMonth.push(
        <td key={d} className={`calendar-day-res${currentDay}`}>
          {d}
        </td>,
      );
    }

    const totalSlots = [...blanks, ...daysInMonth];
    const rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        rows.push(cells);
      }
    });

    return (
      <table className="reservations-calendar">
        <thead>
          <tr>
            {this.state.weekDays.map((day) => {
              return <th key={day} className="week-day-res">
                {day}
              </th>;
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((d, i) => {
            return <tr key={i} >{d}</tr>;
          })}
        </tbody>
      </table>
    );
  }
}

export default Calendar;