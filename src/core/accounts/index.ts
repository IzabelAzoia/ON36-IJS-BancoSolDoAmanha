import express from 'express';
import bodyParser from 'body-parser';
import { CheckingAccount  } from '../accounts/models/checking-account.model';
import { SavingsAccount } from '../accounts/models/savings-account.model';

const app = express();
app.use(bodyParser.json());

app.post('/accounts', (req, res) => {
    const { id, clientId, type, balance, monthlyYield } = req.body;

    let newAccount;
    if (type === 'checking') {
        newAccount = new CheckingAccount(id, clientId, balance);
    } else if (type === 'savings') {
        newAccount = new SavingsAccount(id, clientId, balance, monthlyYield);
    } else {
        return res.status(400).send('Invalid account type');
    }

    // Here you can add the logic to save the new account to a database or data structure

    res.status(201).send(newAccount);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
