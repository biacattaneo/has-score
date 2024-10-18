export const mockLoanAPI = async (income: number): Promise<{ status: string, date: Date, max_amount?: number }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (income > 3000) {
                resolve({ status: 'APPROVED', max_amount: income, date: new Date()});
            } else {
                resolve({ status: 'DENIED', date: new Date() });
            }
        }, 1000);
    });
};
