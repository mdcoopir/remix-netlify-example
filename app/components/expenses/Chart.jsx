import ChartBar from './ChartBar';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';

import { RiArrowDropDownFill } from "react-icons/ri";

function Chart({ expenses, year, index, length }) {
  const chartDataPoints = [
    { label: 'Jan', value: 0 },
    { label: 'Feb', value: 0 },
    { label: 'Mar', value: 0 },
    { label: 'Apr', value: 0 },
    { label: 'May', value: 0 },
    { label: 'Jun', value: 0 },
    { label: 'Jul', value: 0 },
    { label: 'Aug', value: 0 },
    { label: 'Sep', value: 0 },
    { label: 'Oct', value: 0 },
    { label: 'Nov', value: 0 },
    { label: 'Dec', value: 0 },
  ];

  for (const expense of expenses) {
    const expenseMonth = new Date(expense.date).getMonth(); // starting at 0 => January => 0
    chartDataPoints[expenseMonth].value += expense.amount;
  }

  const dataPointValues = chartDataPoints.map((dataPoint) => dataPoint.value);
  const totalMaximum = Math.max(...dataPointValues);

  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a id={year}>
      <section>
        <h2 >
          Monthly Expenses for {year}
          {index < length - 1 && <a href={`#${parseInt(year) + 1}`}><FaCaretDown /></a>}
          {index >= length - 1 && <span>&nbsp;&nbsp;&nbsp;</span>}
          {index !== 0 && <a href={`#${parseInt(year) - 1}`}><FaCaretUp /></a>}
        </h2>
        <ol className='chart'>
          {chartDataPoints.map((dataPoint) => (
            <ChartBar
              key={dataPoint.label}
              value={dataPoint.value}
              maxValue={totalMaximum}
              label={dataPoint.label}
            />
          ))}
        </ol>
      </section>
    </a>
  );
}

export default Chart;
