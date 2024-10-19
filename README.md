
# Has Score

Este projeto faz uma simulação de aprovação de empréstimo com base nos dados inseridos, e qual o valor máximo de empréstimo que você pode pedir se for aprovado.
 


## Run Locally

Clonar o projeto

```bash
  git clone https://github.com/biacattaneo/has-score
```

Entrar no diretorio do projeto

```bash
  cd has-score
```

Instalar as dependencias

```bash
  npm install
```

Iniciar Servidor

```bash
  npm run dev
```
### Documentation

O tempo padrão de espera para uma nova simulação é de 3 minutos.

------------------------------------------------------

Este projeto funciona com uma API de retorno Mockado. Para se conectar com um backend real é necessário fazer uma conexão com a API utilizando como fetch ou axios. Exemplo utilizando axios:

```
import axios from 'axios';

export const loanAPI = async (income: number): Promise<{ status: string, date: string, max_amount?: number }> => {
    try {
        const response = await axios.post('https://your-backend-url.com/api/loan-validation', { income });

        return {
            status: response.data.status,
            max_amount: response.data.max_amount,
            date: response.data.date,
        };
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
};


````

A requisição pode variar de acordo com o contrato e validação de seu backend. Atualize conforme a sua necessidade. 

## Authors

- [@biacattaneo](https://github.com/biacattaneo)
