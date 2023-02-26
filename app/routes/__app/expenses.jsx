import { json } from '@remix-run/node';
import { Link, Outlet, useLoaderData } from '@remix-run/react';
import { FaPlus, FaDownload } from 'react-icons/fa';

import ExpensesList from '~/components/expenses/ExpensesList';
import { getExpenses } from '~/data/expenses.server';
import { requireUserSession } from '../../data/auth.server';

export default function ExpensesLayout() {
    const expenses = useLoaderData();

    const hasExpenses = expenses && expenses.length > 0;
    return (
        <>
            <Outlet />
            <main>
                <section id="expenses-actions">
                    <Link to="add">
                        <FaPlus />
                        <span>Add expense</span>
                    </Link>
                    <a href="/expenses/raw">
                        <FaDownload />
                        <span>Load raw data</span>
                    </a>
                </section>
                {hasExpenses && <ExpensesList expenses={expenses} />}
                {!hasExpenses && <section id="no-expenses">
                    <h1>No expenses found</h1>
                    <p>
                        Start <Link to="add">adding some</Link> today.
                    </p>
                </section>
                }
            </main>
        </>

    )
}

export async function loader({ request }) {
    const userId = await requireUserSession(request);

    const expenses = await getExpenses(userId);;
    // return expenses;
    return json(expenses, {
        headers: {
            'Cache-Control': 'max-age=4',
        }
    });
}


export function headers({
    actionHeaders,
    loaderHeaders,
    parentHeaders
}) {
    console.log(loaderHeaders.get("Cache-Control"));
    return {
        'Cache-Control': loaderHeaders.get("cache-control"),
    }
}