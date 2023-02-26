import ExpenseForm from '~/components/expenses/ExpenseForm';
import { useNavigate } from '@remix-run/react';
import Modal from '~/components/util/Modal';
import { deleteExpense, updateExpense } from '../../../data/expenses.server';
import { validateExpenseInput } from '../../../data/validation.server';
import { redirect } from '@remix-run/node';
// import { getExpense } from '../../../data/expenses.server';

export default function ExpensesUpdatePage() {
    const navigate = useNavigate();

    function closeHandler() {
        navigate('..');
    }

    return (
        <Modal onClose={closeHandler}>
            <ExpenseForm />
        </Modal>
    )
}

export async function action({params, request}) {
    const expenseId = params.id;

    if(request.method === 'PATCH') {
        const formData = await request.formData();
        const expenseData = Object.fromEntries(formData);
    
        try {
            validateExpenseInput(expenseData);
        } catch (error) {
            return error;
        }
    
        await updateExpense(expenseId, expenseData);
        return redirect('/expenses');
    } else if (request.method === 'DELETE') {
        await deleteExpense(expenseId);
        return redirect('/expenses');
    }
    

}

export function meta({params, location, data, parentsData}) {
    const expense = parentsData['routes/__app/expenses'].find(expense => expense.id === params.id);
    return {
      title: `RE: ${expense.title}`,
      description: 'Update Expense'
    }
  }