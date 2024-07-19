const bcrypt = require("bcrypt");
const { userCollection } = require("../model/user.model");
const JWT = require("jsonwebtoken");
const dotENV = require("dotenv");
dotENV.config();
const KEY = process.env.secretKey;


// User registration controller
const userRegister = async (request, response) => {
    try {
        let { email, fullName, role, password } = request.body;

        const findUser = await userCollection.findOne({ email });

        if (findUser) {
            return response.status(409).json({
                success: false,
                resMsg: "User already exists."
            })
        }
        // hashing password using bcrypt
        password = bcrypt.hashSync(password, 15);

        // saving new user in database
        const registredResult = await userCollection.create({
            email: email,
            fullName: fullName,
            role: role,
            password: password,
            profile: "",
        });
        if (registredResult) {
            return response.status(201).json({ success: true, resMsg: "User Registred Successfully" });
        } else {
            return response.send({ success: false, resMsg: "Something Went Wrong, Try Again" });
        }

    } catch (error) {
        return response.status(500).json({
            success: false,
            resMsg: `Server failed to load ! Try again.`
        })
    }

};


// User sign in controller
const userLogin = async (request, response) => {
    try {
        const { email, password, role } = request.body;
       
        const isUserExists = await userCollection.findOne({email, role})

        if (!isUserExists) {
            return response.send({
                success: false,
                resMsg: `User not registered with ${email} for ${role} role`,
            });
        }
        // matching Password
        const userAuthenticaticated = bcrypt.compareSync(
            password,
            isUserExists.password
        );

        if (userAuthenticaticated) {
            // creating json token
            const generatedToken = JWT.sign({ USER: isUserExists._id }, KEY, {
                expiresIn: "72h",
            });
            isUserExists.password = undefined;
            await userCollection.updateOne({email}, {
                updatedAt : Date.now(),
                token : generatedToken
            })
            return response.send({
                success: true,
                UserDetails: isUserExists,
                resMsg: `${isUserExists.fullName} login successfully` ,
                TOKEN: generatedToken,
            });
        } else {
            return response.send({ success: false, resMsg: "Wrong Password" });
        }
    } catch (error) {
        return response.status(500).json({
            success: false,
            resMsg: `Server failed to load ! Try again.`
        })
    }
}



module.exports = {
    userRegister,
    userLogin
};
