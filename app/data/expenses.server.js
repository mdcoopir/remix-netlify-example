import { prisma } from './database.server';

export async function addExpense(expenseData, userId) {
  try {
    return await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
        User: { connect: {id: userId}}
      },
    });
  } catch (error) {
    throw new Error('Failed to add expense');
  }
}

export async function getExpenses(userId) {
   try{
    const expenses = await prisma.expense.findMany({
      where: {userId},
      orderBy: { date: 'desc'}
    });
    return expenses;
  } catch (error) {
    throw new Error('Failed to delete expenses');
  }
}

export async function getExpense(id) {
  try {
    const expense = prisma.expense.findFirst({
      where: {id}
    });
    return expense;
  } catch (error) {
    throw new Error('Failed to get expense');
  }
}

export async function updateExpense(id, expenseData) {
  try {
    return await prisma.expense.update({
      where: {id},
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
      },
    });

  } catch(e) {
    throw new Error('Failed to update expense');
  }
}

export async function deleteExpense(id) {
  try {
    await prisma.expense.delete({
      where: {id} 
    })
  } catch (error) {
    throw new Error('Failed to delete expense');
  }
}