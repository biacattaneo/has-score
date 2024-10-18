export const mockLoanAPI = async (income: number): Promise<{ status: string, max_amount?: number }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (income > 0) {
                resolve({ status: 'APPROVED', max_amount: income });
            } else {
                resolve({ status: 'DENIED' });
            }
        }, 1000);
    });
};
