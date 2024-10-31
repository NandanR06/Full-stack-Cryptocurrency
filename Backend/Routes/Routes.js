import { Router } from "express";
import cryptoCurrency from '../Models/Database.js'
import bcript from 'bcrypt'
import jwt from 'jsonwebtoken'


const router = Router();

router.post('/Register', async (req, res) => {
    const { username, password } = req.body;
    const userExist = await cryptoCurrency.findOne({ username })

    const hashPassword = await bcript.hash(password, 10);
    try {
        if (userExist) {
            return  res.json({ exists: true });
        }
        else{
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
        const token = jwt.sign({ _id: userExist._id }, process.env.JWT_PASSWORD,  { expiresIn: '1m' } );
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


export default router;