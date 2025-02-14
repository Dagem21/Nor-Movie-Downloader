const mongoose = require("mongoose")

export const connectMongo = () => {
    mongoose.connect('mongodb://localhost:27017/NORMD', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        family: 4,
    }).then(() => {
        return true
    }).catch(err => {
        return false
    });
}