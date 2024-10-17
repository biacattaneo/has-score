export const mockLoanAPI = async (income: number): Promise<{ status: string, max_amount?: number }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (income > 3000) {
                resolve({ status: 'APPROVED', max_amount: 10000 });
            } else {
                resolve({ status: 'DENIED' });
            }
        }, 1000);
    });
};
