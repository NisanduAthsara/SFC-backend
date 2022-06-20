const mongoose = require("mongoose");

//connect to mongodb
exports.connect = () => {
	mongoose.connect(process.env.MONGO)
        .then(()=>{
            console.log("Database Connected")
        })
        .catch((err)=>{
            console.log(err)
        })
};

exports.disconnect = () => {
	mongoose.disconnect();
};