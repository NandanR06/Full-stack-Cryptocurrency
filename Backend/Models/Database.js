import mongoose from "mongoose";

const structure = new mongoose.Schema({
    username: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,
    },
    data:{
        type:Date,
        default:Date.now
    }
})

const cryptoCurrency = mongoose.model('crypto_currency', structure);

export default cryptoCurrency;
