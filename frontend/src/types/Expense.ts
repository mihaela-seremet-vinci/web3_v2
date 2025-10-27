export interface ExpenseInput {
  description: string;
  payer: string;
  amount: number;
  date: string; // ISO string
}
export interface Expense extends ExpenseInput {
  id: string;
}