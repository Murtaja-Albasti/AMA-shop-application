const mongoose = require('mongoose');

const Product = require('./Product.js')

const { isEmail } = require('validator')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: isEmail,
            message: props => `${props.value} is not a valid email`
        }
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    Password: {
        type: String, required: [true, 'Password is required'], validate: {
            validator: function (value) {
                return value.length >= 6
            }
        },
    },
    phoneNumbers: {
        type: String,
        minlength: 9,
        validate: {
            validator: function (Number) {
                return Number.length >= 9
            },
            message: "You must provide more than 10 numbers."
        }
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;