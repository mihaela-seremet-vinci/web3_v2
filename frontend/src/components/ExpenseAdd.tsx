import type { ExpenseInput } from '../types/Expense';
import { useForm } from 'react-hook-form';

interface ExpenseAddProps {
  addExpense: (expense: ExpenseInput) => void;
}

type FormData = {
  description: string;
  payer: 'Alice' | 'Bob';
  amount: number;
};

export default function ExpenseAdd({ addExpense }: ExpenseAddProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = ({ description, payer, amount }: FormData) => {
    addExpense({
      description,
      payer,
      amount,
      date: new Date().toISOString(),
    });
  };

  const isSubmitDisabled = isSubmitting;

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <input type="text" placeholder="Description" {...register('description', { required: true, minLength: 3, maxLength: 200 })} />
      {errors.description && <span>Description must be between 3 and 200 characters</span>}

      <select {...register('payer', { required: true })}>
        <option value="Alice">Alice</option>
        <option value="Bob">Bob</option>
      </select>
      {errors.payer && <span>Payer is required</span>}

      <input type="number" {...register('amount', { required: true, min: 0.01 })} placeholder="Enter amount" step={0.01} />
      {errors.amount && <span>Amount must be positive</span>}

      <button type="submit" disabled={isSubmitDisabled}>
        {isSubmitting ? 'Adding...' : 'Add'}
      </button>
    </form>
  );
}
