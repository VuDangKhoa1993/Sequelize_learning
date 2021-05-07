const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize('sqlite::memory:', {
    logging: console.log
});

const connection = async () =>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } 
    catch(err) {
        console.log('Unable to connect to the database:' , err);
    }
}
connection();

// Using sequelize.define() method to define a model in sequelize 
// const User = sequelize.define('User', {
//     firstName: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     lastName: {
//         type: DataTypes.STRING, 
//        // allowNull: true is default options
//     }
// }, {});


// Extending Model
class User extends Model { }
User.init({
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING, 
       // allowNull: true is default options
    }
}, {
    sequelize, // we need to pass the connection instance 
    modelName: 'User', // we need to pass the model name,
    tableName: 'User'
});

var migrationModels = async () => {
    try {
        // await User.sync({ force: true }); // seperately sync User model 
        // console.log('the table for the user model has just re-created !');
        await sequelize.sync({ forcce: true });  // sync all model at the same time
    } 
    catch(err) {
        console.log(err);
    }
}  

migrationModels();


console.log(User);
console.log('--------------------');
console.log(sequelize.models.User);
