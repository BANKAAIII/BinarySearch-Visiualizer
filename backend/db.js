require('dotenv').config();

const { MongoNetworkError } = require('mongodb');
const mongoose = require('mongoose');
const mongo_URI = process.env.MONGO_URI;

mongoose.connect(mongo_URI)
    .then(()=>{
        console.log("Database connected successfully");
    })
    .catch((error) => {
        console.error("Database connection error", error.message)
    })


    // Schema for Database level entry

    const UserSchema = new mongoose.Schema({
        username:{
            type : String,
            required: true,
            unique: true
          
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true,
            lowerCase: true
        }
    })

    const User = mongoose.model("User",UserSchema);

    const ScoreSchema =new mongoose.Schema({
        UserId: {
            type :mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        Scores:{
            type:Number
        },
        PersonalBest:{
            type: Number
        }
        
    })

    const ScoreCard = mongoose.model("Score",ScoreSchema);

    module.exports ={
        User, ScoreCard
    }