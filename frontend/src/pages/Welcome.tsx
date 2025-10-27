
import { NavLink } from 'react-router';

const Welcome = () => {
  return (
    <div className="text-center">
      <h1 className="text-5xl">Welcome to the Expense Tracker</h1>
      <div className="text-center py-12">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </div>
      <div className="flex flex-row gap-4 justify-center">
        <button className="bg-primary text-white hover:bg-primary/80 rounded-full px-6 transition-colors duration-200">
          <NavLink to="/list">View Expenses</NavLink>
        </button>
        <button className="bg-secondary text-gray-800 hover:bg-secondary/80 rounded-full px-6 transition-colors duration-200">
          <NavLink to="/add">Add Expense</NavLink>
        </button>
      </div>
    </div>
  );
};

export default Welcome;
