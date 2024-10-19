import React, { useEffect, useState } from "react";
import "./ResultPage.scss"
import { useRecoilState } from "recoil";
import { formState } from "../state/formState";
import type { LoanResult } from "../interfaces/LoanResult.interface";
import { useNavigate } from "react-router-dom";



const ResultPage: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formData, setFormData] = useRecoilState<LoanResult>(formState);
  const [remainingTime, setRemainingTime] = useState(0)
  const navigate = useNavigate();


  useEffect(() => {
    const totalIntervalInSeconds = 3 * 60; // 3 min -> trocar para um tempo maior em prod

    const date = new Date(formData.date);
    const currentDate = new Date();

    const diffInMilliseconds = currentDate.getTime() - date.getTime();
    const diffInSeconds = Math.floor(Math.abs(diffInMilliseconds / 1000));

    const timeRemaining = Math.max(totalIntervalInSeconds - diffInSeconds, 0);
    setRemainingTime(timeRemaining);

    const intervalId = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev > 0) {
          return prev - 1; 
        } else {
          clearInterval(intervalId);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [formData.date]);

  if (!formData) return <p>Carregando...</p>;

  return (
    <>
      <div className="result-container">
        {formData.status === "APPROVED" ? (
          <p>
            Parabéns! Seu empréstimo foi aprovado. O valor máximo é: R${" "}
            {formData.max_amount}
          </p>
        ) : (
          <p>Infelizmente, seu empréstimo foi negado.</p>
        )}
      </div>
      <div className="result-btn">
      { remainingTime > 0 ?
        <p style={{textAlign: 'center'}}>
          Você poderá realizar uma nova simulação em {remainingTime} segundos.
        </p> 
        : 
        <button onClick={()=>{navigate("/")}}>Simular novamente</button>
      }
      </div> 
      </>
  );

};

export default ResultPage;
