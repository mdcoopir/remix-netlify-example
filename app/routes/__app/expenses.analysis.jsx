import { Link, Outlet, useLoaderData } from '@remix-run/react';
import ExpenseStatistics from '~/components/expenses/ExpenseStatistics';
import Chart from '~/components/expenses/Chart';
import { getExpenses } from '../../data/expenses.server';
import { requireUserSession } from '../../data/auth.server';

function getYears(expenses) {
    const expenseYears = expenses.length >0 ? expenses.map((expense) => expense.date.slice(0,4)): [];
    const years = expenseYears && expenseYears.length > 0 ? [... new Set(expenseYears)].sort((a, b) => a - b ): [];
    if(years.length<=0) {
        return [];
    }
    const yearData = years.map((year) => {
        const yearData = {"year": year, data: expenses.filter((exp) => exp.date.slice(0,4)===year)}
        return yearData;
    })
    return yearData;
}

export default function ExpensesAnalysisPage() {
    const expenses = useLoaderData();
    const hasExpenses = expenses && expenses.length > 0;
    const yearData = hasExpenses ? getYears(expenses): [];
    const divStyle = {
        height: '32em',
        'overflow-y': 'auto',
        margin: 0,
        padding: 0
    };
    const chartContainerStyle = {
        margin: 0,
        padding: 0
    }
    return (
        <main>
           <div style={divStyle} >
                {yearData.length<=0 && <section id="no-expenses">
                    <h1>No expenses found</h1>
                    <p>
                        Return to  <Link to="/expenses">expenses page</Link>.
                    </p>
                </section>}
                {yearData.length>0 && yearData.map((year, index) => (
                    <div key={year.year} style={chartContainerStyle}>
                        <Chart expenses={year.data} year={year.year} index={index} length={yearData.length}/>
                        <ExpenseStatistics expenses={year.data}/>
                    </div>
                ))}
                </div>
        </main>
    )
}

export async function loader({request}) {
    const userId = await requireUserSession(request)

    const expenses = await getExpenses(userId);
    
    return expenses;
}