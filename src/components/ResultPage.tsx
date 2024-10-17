import React, { useEffect, useState } from "react";
import type { LoanResult } from "../interfaces/LoanResult.interface";


const ResultPage: React.FC = () => {
  const [loanResult, setLoanResult] = useState<LoanResult | null>(null);

  useEffect(() => {
    const storedResult = localStorage.getItem("loanResult");
    if (storedResult) {
      setLoanResult(JSON.parse(storedResult));
    }
  }, []);

  if (!loanResult) return <p>Carregando...</p>;

  return (
    <div>
      {loanResult.status === "APPROVED" ? (
        <p>
          Parabéns! Seu empréstimo foi aprovado. O valor máximo é: R${" "}
          {loanResult.max_amount}
        </p>
      ) : (
        <p>Infelizmente, seu empréstimo foi negado.</p>
      )}
    </div>
  );
};

export default ResultPage;
