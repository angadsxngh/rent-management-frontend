/**
 * Calculates total payments for current and previous month
 * @param {Array} payments - array of payment objects with date and amount
 * @returns {Object} - { thisMonthTotal, lastMonthTotal }
 */
export function calculateMonthlyPaymentTotals(payments) {

  const now = new Date();

  const currentMonth = now.getMonth(); // 0-indexed
  const currentYear = now.getFullYear();

  const lastMonthDate = new Date(currentYear, currentMonth - 1, 1);
  const lastMonth = lastMonthDate.getMonth();
  const lastMonthYear = lastMonthDate.getFullYear();

  let thisMonthTotal = 0;
  let lastMonthTotal = 0;

  for (const payment of payments) {
    const paymentDate = new Date(payment.date);
    const month = paymentDate.getMonth();
    const year = paymentDate.getFullYear();

    if (month === currentMonth && year === currentYear) {
      thisMonthTotal += payment.amount;
    } else if (month === lastMonth && year === lastMonthYear) {
      lastMonthTotal += payment.amount;
    }
  }

  return { thisMonthTotal, lastMonthTotal };
}
