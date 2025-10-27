
import { useContext, useEffect, useState } from 'react';
import { PageContext } from '../App';
import type { Expense } from '../types/Expense';
import React from 'react';
import ExpenseSorter from '../components/ExpenseSorter';
import ExpenseItem from '../components/ExpenseItem';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const defaultAlgo = (_a: Expense, _b: Expense) => 0; // Default no sorting

const List = () => {
  const { error, sendApiRequestandHandleError } = useContext(PageContext);
  const [sortingAlgo, setSortingAlgo] = React.useState<typeof defaultAlgo>(() => defaultAlgo);

  const [loading, setLoading] = useState<boolean>(false);
  const [expenses, setExpenses] = React.useState<Expense[]>([]);

  // Fetch expenses from backend
  const fetchExpenses = async () => {
    setLoading(true);
    const data = ((await sendApiRequestandHandleError('GET', 'expenses')) as Expense[]) || [];
    setExpenses(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAlgoChange = (algo: (a: Expense, b: Expense) => number) => {
    setSortingAlgo(() => algo); // Pay attention here, we're wrapping algo in a function because useState setter accept either a value or a function returning a value.
  };

  const sortedExpenses = expenses.sort(sortingAlgo);

  if (loading) {
    return <div className="text-center text-lg">Loading expenses...</div>;
  }

  return (
    <div className="w-full">
      <h1 className="text-5xl text-center mb-8">Expense List</h1>

      <div className="w-5/6 mx-auto">
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">Error: {error}</div>}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Expenses ({expenses.length})</h2>
        </div>

        {expenses.length > 0 && <ExpenseSorter setSortingAlgo={handleAlgoChange} />}

        <div className="bg-white rounded shadow-sm border overflow-hidden">
          {sortedExpenses.length === 0 ? (
            <p className="p-8 text-center text-gray-500">No expenses found.</p>
          ) : (
            <table className="w-full">
              <thead className="bg-primary/10 border-b-2 border-primary/20">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold">Id</th>
                  <th className="text-left py-3 px-4 font-semibold">Date</th>
                  <th className="text-left py-3 px-4 font-semibold">Description</th>
                  <th className="text-left py-3 px-4 font-semibold">Payer</th>
                  <th className="text-right py-3 px-4 font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {sortedExpenses.map((expense) => (
                  <ExpenseItem key={expense.id} expense={expense} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
