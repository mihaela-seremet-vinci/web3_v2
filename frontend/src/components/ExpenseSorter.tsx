import { useState } from 'react';
import type { Expense } from '../types/Expense';

type SortOption = 'date-newest' | 'date-oldest' | 'amount-highest' | 'amount-lowest';
type SortingAlgo = (a: Expense, b: Expense) => number;

interface ExpenseSorterProps {
  setSortingAlgo: (algo: SortingAlgo) => void;
}

const dateNewestAlgo: SortingAlgo = (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime();
const dateOldestAlgo: SortingAlgo = (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime();
const amountHighestAlgo: SortingAlgo = (a, b) => b.amount - a.amount;
const amountLowestAlgo: SortingAlgo = (a, b) => a.amount - b.amount;

export default function ExpenseSorter({ setSortingAlgo }: ExpenseSorterProps) {
  const [sortBy, setSortBy] = useState<SortOption>('date-newest');

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOption = event.target.value as SortOption;
    setSortBy(newSortOption);

    switch (newSortOption) {
      case 'date-newest':
        setSortingAlgo(dateNewestAlgo);
        break;
      case 'date-oldest':
        setSortingAlgo(dateOldestAlgo);
        break;
      case 'amount-highest':
        setSortingAlgo(amountHighestAlgo);
        break;
      case 'amount-lowest':
        setSortingAlgo(amountLowestAlgo);
        break;
    }
  };

  return (
    <div className="mb-4 flex items-center gap-2">
      <label htmlFor="sort-select" className="font-medium">Sort by:</label>
      <select 
        id="sort-select" 
        value={sortBy} 
        onChange={handleSortChange}
        className="border border-gray-300 rounded p-2 bg-white hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors duration-200"
      >
        <option value="date-newest">Date (Newest First)</option>
        <option value="date-oldest">Date (Oldest First)</option>
        <option value="amount-highest">Amount (Highest First)</option>
        <option value="amount-lowest">Amount (Lowest First)</option>
      </select>
    </div>
  );
}
