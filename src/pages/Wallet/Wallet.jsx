import React, { useState, useEffect } from "react";
import Pagination from "../../components/Pagination/Pagination";
import { FaWallet, FaPlus } from "react-icons/fa";
import QrCode from "../../assets/website/UPIqrCode.png";
const Wallet = () => {
  const [balance, setBalance] = useState(1000); // Example balance
  const [transactions, setTransactions] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [transactionsPerPage] = useState(5);
  const [filterDates, setFilterDates] = useState({ from: "", to: "" });
  const [filterType, setFilterType] = useState("all");
  const [filterAmounts, setFilterAmounts] = useState({ min: "", max: "" });
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [addMoneyForm, setAddMoneyForm] = useState({
    amount: "",
    transactionId: "",
    proofImage: null,
  });

  useEffect(() => {
    // Mock API fetch
    const mockTransactions = [
      {
        _id: "1",
        Transaction_Type: "Credit",
        Amount: 500,
        Date: new Date(),
        Description: "Deposit",
        Transaction_ID: "TXN001",
        Status: "Completed",
        Balance: 1500,
      },
      {
        _id: "2",
        Transaction_Type: "Debit",
        Amount: 200,
        Date: new Date(),
        Description: "Withdrawal",
        Transaction_ID: "TXN002",
        Status: "Pending",
        Balance: 1300,
      },
      {
        _id: "3",
        Transaction_Type: "Credit",
        Amount: 1000,
        Date: new Date(),
        Description: "Refund",
        Transaction_ID: "TXN003",
        Status: "Completed",
        Balance: 2300,
      },
      {
        _id: "4",
        Transaction_Type: "Debit",
        Amount: 300,
        Date: new Date(),
        Description: "Purchase",
        Transaction_ID: "TXN004",
        Status: "Declined",
        Balance: 2000,
      },
      {
        _id: "5",
        Transaction_Type: "Credit",
        Amount: 250,
        Date: new Date(),
        Description: "Cashback",
        Transaction_ID: "TXN005",
        Status: "Completed",
        Balance: 2250,
      },
    ];
    setTransactions(mockTransactions);
  }, []);

  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.Date);
    const fromDate = filterDates.from ? new Date(filterDates.from) : null;
    const toDate = filterDates.to ? new Date(filterDates.to) : null;

    const withinDateRange =
      (!fromDate || transactionDate >= fromDate) &&
      (!toDate || transactionDate <= toDate);

    const withinAmountRange =
      (!filterAmounts.min ||
        transaction.Amount >= parseFloat(filterAmounts.min)) &&
      (!filterAmounts.max ||
        transaction.Amount <= parseFloat(filterAmounts.max));

    const typeMatches =
      filterType === "all" ||
      transaction.Transaction_Type.toLowerCase() === filterType;

    return withinDateRange && withinAmountRange && typeMatches;
  });

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const handleAddMoneySubmit = (e) => {
    e.preventDefault();
    console.log("Add money form submitted:", addMoneyForm);
    setShowAddMoney(false);
    setAddMoneyForm({ amount: "", transactionId: "", proofImage: null });
  };

  const handleFileChange = (e) => {
    setAddMoneyForm({ ...addMoneyForm, proofImage: e.target.files[0] });
  };

  const resetFilters = () => {
    setFilterDates({ from: "", to: "" });
    setFilterType("all");
    setFilterAmounts({ min: "", max: "" });
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const totalPages = Math.ceil(totalTransactions / rowsPerPage);

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900 dark:text-white">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 bg-blue-600 text-white dark:bg-blue-700">
          <h1 className="text-3xl font-bold flex items-center">
            <FaWallet className="mr-2" /> My Wallet
          </h1>
          <p className="text-xl mt-2">Current Balance: ₹{balance.toFixed(2)}</p>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center gap-4">
            <button
              onClick={() => setShowAddMoney(!showAddMoney)}
              className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center hover:bg-green-600 transition duration-300"
            >
              <FaPlus className="mr-2" /> Add Money
            </button>
            <div className="flex items-center space-x-2">
              <label
                htmlFor="rowsPerPage"
                className="text-gray-700 font-semibold dark:text-white"
              >
                Rows per page:
              </label>
              <select
                id="rowsPerPage"
                className="border border-gray-300 rounded px-2 py-1 dark:text-dark"
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={40}>40</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>

          {showAddMoney && (
  <div className="relative mt-4 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg  shadow-lg">
    <form onSubmit={handleAddMoneySubmit}>

      <div className="flex flex-col items-center">
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 max-w-lg">
        Add Money
      </h3>
      
      {/* UPI Payment Section */}
      <div className="mb-6 max-w-lg">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
          UPI Payment
        </h4>
        <div className="flex items-center space-x-4">
          <img
            src={QrCode}
            alt="UPI QR Code"
            className="w-32 h-32 rounded-lg border border-gray-300 dark:border-gray-600"
          />
          <div>
            <p className="text-gray-800 dark:text-gray-300 text-sm">
              <strong>UPI ID:</strong> example@upi
            </p>
            <p className="text-gray-800 dark:text-gray-300 text-sm">
              Scan the QR code or use the UPI ID to make the payment.
            </p>
          </div>
        </div>
      </div>

      {/* Bank Transfer Section */}
      <div className="mb-6 max-w-lg">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
          Bank Transfer
        </h4>
        <ul className="text-gray-800 dark:text-gray-300 text-sm space-y-1">
          <li>
            <strong>Account Name:</strong> John Doe
          </li>
          <li>
            <strong>Account Number:</strong> 1234567890
          </li>
          <li>
            <strong>IFSC Code:</strong> ABCD0123456
          </li>
          <li>
            <strong>Bank Name:</strong> Example Bank
          </li>
        </ul>
      </div>

      </div>

      {/* Amount Input */}
      <div className="mb-4">
        <label
          className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2"
          htmlFor="amount"
        >
          Amount (Min ₹100 - Max ₹10,000)
        </label>
        <input
          type="number"
          id="amount"
          min="100"
          max="10000"
          value={addMoneyForm.amount}
          onChange={(e) =>
            setAddMoneyForm({
              ...addMoneyForm,
              amount: e.target.value,
            })
          }
          className="w-full px-4 py-2 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
          placeholder="Enter amount"
          required
        />
      </div>

      {/* Transaction ID Input */}
      <div className="mb-4">
        <label
          className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2"
          htmlFor="transactionId"
        >
          Transaction ID
        </label>
        <input
          type="text"
          id="transactionId"
          autoComplete="off"
          value={addMoneyForm.transactionId}
          onChange={(e) =>
            setAddMoneyForm({
              ...addMoneyForm,
              transactionId: e.target.value,
            })
          }
          className="w-full px-4 py-2 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
          placeholder="Enter transaction ID"
          required
        />
      </div>

      {/* Proof of Payment Input */}
      <div className="mb-4">
        <label
          className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2"
          htmlFor="proofImage"
        >
          Proof of Payment (Image)
        </label>
        <input
          type="file"
          id="proofImage"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full px-4 py-2 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
          required
        />
      </div>

      {/* Form Buttons */}
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={() => setShowAddMoney(false)}
          className="px-4 py-2 bg-gray-500 dark:bg-gray-600 text-white rounded-lg hover:bg-gray-600 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
)}


          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
            <div className="flex flex-wrap -mx-2 mb-4">
              <div className="w-full md:w-1/6 px-2 mb-4">
                <input
                  type="date"
                  value={filterDates.from}
                  onChange={(e) =>
                    setFilterDates({ ...filterDates, from: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="From Date"
                />
              </div>
              <div className="w-full md:w-1/6 px-2 mb-4">
                <input
                  type="date"
                  value={filterDates.to}
                  onChange={(e) =>
                    setFilterDates({ ...filterDates, to: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="To Date"
                />
              </div>
              <div className="w-full md:w-1/6 px-2 mb-4">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="all">All Transactions</option>
                  <option value="credit">Credit</option>
                  <option value="debit">Debit</option>
                  <option value="Pending">Pending</option>
                  <option value="Declined">Declined</option>
                </select>
              </div>
              <div className="w-full md:w-1/6 px-2 mb-4">
                <input
                  type="number"
                  value={filterAmounts.min}
                  onChange={(e) =>
                    setFilterAmounts({ ...filterAmounts, min: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Min Amount"
                />
              </div>
              <div className="w-full md:w-1/6 px-2 mb-4">
                <input
                  type="number"
                  value={filterAmounts.max}
                  onChange={(e) =>
                    setFilterAmounts({ ...filterAmounts, max: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Max Amount"
                />
              </div>
              <div className="w-full md:w-1/6 px-2 mb-4">
                <div className="flex gap-2">
                  {filterDates.from ||
                  filterDates.to ||
                  filterType !== "all" ||
                  filterAmounts.min ||
                  filterAmounts.max ? (
                    <>
                      <button
                        onClick={resetFilters}
                        className="bg-green-400 text-white w-full py-2 px-3 rounded-full hover:bg-gray-600 transition duration-300"
                      >
                        Filters
                      </button>
                      <button
                        onClick={resetFilters}
                        className="bg-red-400 text-white w-full py-2 px-3 rounded-full hover:bg-gray-600 transition duration-300"
                      >
                        Reset
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={resetFilters}
                      className="bg-green-400 text-white w-full py-2 px-3 rounded-full hover:bg-gray-600 transition duration-300"
                    >
                      Filters
                    </button>
                  )}
                </div>
              </div>
            </div>

            {currentTransactions.map((transaction) => (
              <div
                key={transaction._id}
                className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mb-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <span
                    className={`font-bold ${
                      transaction.Transaction_Type === "Credit"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.Transaction_Type === "Credit" ? "+" : "-"}₹
                    {transaction.Amount.toFixed(2)}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      transaction.Status === "Completed"
                        ? "bg-green-200 text-green-800"
                        : transaction.Status === "Pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {transaction.Status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {transaction.Description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Date: {new Date(transaction.Date).toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Transaction ID: {transaction.Transaction_ID}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Balance: ₹{transaction.Balance.toFixed(2)}
                </p>
              </div>
            ))}

            <div className="mt-4 mb-4 flex justify-between items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <div>
                <span className="text-gray-600 dark:text-gray-500">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-500">
                  Showing {indexOfFirstRow + 1} to{" "}
                  {Math.min(indexOfLastRow, totalTransactions)} of{" "}
                  {totalTransactions} entries
                </span>
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
