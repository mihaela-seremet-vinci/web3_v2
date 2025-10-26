export interface ExpenseInput {
  description: string;
  payer: string;
  amount: number;
  date: string; // ISO string
}