import type { Expense } from '../types/Expense';

interface ExpenseItemProps {
  expense: Expense;
}

export default function ExpenseItem({ expense }: ExpenseItemProps) {
  return (
    <tr className="border-b hover:bg-primary/10 transition-colors duration-150">
      <td className="py-2 px-4">{expense.id}</td>
      <td className="py-2 px-4">{new Date(expense.date).toLocaleDateString()}</td>
      <td className="py-2 px-4">{expense.description}</td>
      <td className="py-2 px-4">{expense.payer}</td>
      <td className="py-2 px-4 text-right">${expense.amount.toFixed(2)}</td>
    </tr>
  );
}
