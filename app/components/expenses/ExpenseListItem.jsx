import { Link, useFetcher } from '@remix-run/react';

function ExpenseListItem({ expense, id, title, amount }) {
  const fetcher = useFetcher();
  function deleteExpenseItemHandler() {
    const proceed = confirm(`Are you sure you want to delte this item? - ${id}`);
    
    if(!proceed) {
      return;
    }

    fetcher.submit(null, {
      method: 'delete',
      action: `/expenses/${id}`
    });
  }

  if(fetcher.state !== 'idle') {
    return (
      <article className='expense-item locked'>
        <p>Deleting...</p>
      </article>
    )
  }

  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{expense.title}</h2>
        <p className="expense-amount">${expense.amount.toFixed(2)}</p>
        <p className="expense-date">{expense.date}</p>
      </div>
      <menu className="expense-actions">
        <button onClick={deleteExpenseItemHandler}>Delete</button>
        <Link to={id}>Edit</Link>
      </menu>
    </article>
  );
}

export default ExpenseListItem;
