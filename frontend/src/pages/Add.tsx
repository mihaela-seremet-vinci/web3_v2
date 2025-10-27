import { useContext } from 'react';
import { PageContext } from '../App';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
//import { toast } from 'sonner';

type FormData = {
  description: string;
  payer: 'Alice' | 'Bob';
  amount: number;
};

const Add = () => {
  const { sendApiRequestandHandleError  } = useContext(PageContext);
  const navigate = useNavigate();
  const form = useForm<FormData>({
    defaultValues: { description: '', payer: 'Alice', amount: 0 },
  });

  const onSubmit = async ({ description, payer, amount }: FormData) => {
    const newExpenseForm = {
      description,
      payer,
      amount,
      date: new Date().toISOString(),
    };
    await sendApiRequestandHandleError('POST', 'expenses', newExpenseForm);
    //toast('Expense has been created.');
    navigate('/list');
  };

  const handleResetData = async () => {
    await sendApiRequestandHandleError('POST', 'expenses/reset');
    //toast('Expense has been reset.');
    navigate('/list');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Add New Expense</h3>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label>Description</label>
            <input
              {...form.register('description')}
              placeholder="Description"
              className="border rounded p-2 w-full"
            />
          </div>

          <div>
            <label>Payer</label>
            <select {...form.register('payer')} className="border rounded p-2 w-full">
              <option value="Alice">Alice</option>
              <option value="Bob">Bob</option>
            </select>
          </div>

          <div>
            <label>Amount</label>
            <input
              type="number"
              step={0.01}
              {...form.register('amount', { valueAsNumber: true })}
              placeholder="0.00"
              className="border rounded p-2 w-full"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition-colors duration-200"
          >
            {form.formState.isSubmitting ? 'Adding...' : 'Add'}
          </button>

          <button
            type="button"
            onClick={handleResetData}
            className="px-4 py-2 bg-secondary text-gray-800 rounded hover:bg-secondary/80 transition-colors duration-200"
          >
            Reset Data
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
