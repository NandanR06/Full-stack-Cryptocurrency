import { Router } from "express";
import cryptoCurrency from '../Models/Database.js'
import axios from 'axios'
import bcript from 'bcrypt'
import jwt from 'jsonwebtoken'


const router = Router();

router.post('/Register', async (req, res) => {
    const { username, password } = req.body;
    const userExist = await cryptoCurrency.findOne({ username })

    const hashPassword = await bcript.hash(password, 10);
    try {
        if (userExist) {
            return res.json({ exists: true });
        }
        else {
            const data = new cryptoCurrency({ username: username, password: hashPassword })
            const save = await data.save();
            res.status(200).json(save);
        }

    } catch (error) {
        res.status(500).json({ message: error })
    }
})

router.post('/Login', async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password)
    const userExist = await cryptoCurrency.findOne({ username })
    try {
        const psw = await bcript.compare(password, userExist.password);
        if (!userExist) {
            return res.status(400).json({ message: "invalid user name" });
        }
        if (!psw) {
            return res.status(400).json({ message: "invalid password" });
        }
        const token = jwt.sign({ _id: userExist._id }, process.env.JWT_PASSWORD, { expiresIn: '1m' });
        res.status(200).json({ token: token })

    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: 'Access denied' });  //verify the token
    jwt.verify(token, process.env.JWT_PASSWORD, (err, decoded) => {
        if (err)
            return res.status(403).json({ message: 'Invalid token' });
        res.json({ message: `Welcome, ${decoded.username}!` });  //decode content of the info
    });
});


router.get('/coin/:id', async (req, res) => {
    const coinId = req.params.id;
    const options1 = {
        method: 'GET',
        url: `https://api.coingecko.com/api/v3/coins/${coinId}`,
        headers: {
            accept: 'application/json',
            'x-cg-pro-api-key': 'CG-cmPC3gxeJkbcDMLdvp7Y8g2w'
        }
    };

    const options2 = {
        method: 'GET',
        url: `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=10`,
        headers: { accept: 'application/json', 'x-cg-pro-api-key': 'CG-cmPC3gxeJkbcDMLdvp7Y8g2w' }
    };

    try {
        const [coinInof, days] = await Promise.all([
         axios.request(options1),
         axios.request(options2)
        ]);
        const combainData = {
            info1: coinInof.data,
            info2: days.data
        }
        res.json(combainData)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/login', async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd',
        headers: { accept: 'application/json', 'x-cg-pro-api-key': 'CG-cmPC3gxeJkbcDMLdvp7Y8g2w' }
    };
    try {
        const responce = await axios.request(options);
        res.json(responce.data)

    } catch (error) {
        res.status(500).json({ message: 'Error fetching data from CoinGecko' });
    }

})

export default router;






