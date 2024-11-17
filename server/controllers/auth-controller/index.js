
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = async(req,res)=> {
    const {userName, userEmail, password, role} = req.body;

    const exitingUser = await User.findOne({userEmail});

    if(exitingUser) {
        return res.status(400).json({
            success : false,
            message : 'User Email already exists'
        })
    }

    const hashPassword = await bcrypt.hash(password , 10);
    const newUser = new User({userName, userEmail, role, password : hashPassword})
    
    await newUser.save()

    return res.status(201).json({
        success : true,
        message : 'User Registered Successfully'
    });
};

const loginUser = async(req,res)=> {
    const {userEmail, password} = req.body;

    const checkUser = await User.findOne({userEmail});

    if(!checkUser || !(await bcrypt.compare(password, checkUser.password))) {
        return res.status(401).json({
            success: false,
            message: "invalid credentials",
        });
    }

    const accessToken = jwt.sign({
        _id: checkUser._id,
        userName: checkUser.userName,
        userEmail: checkUser.userEmail,
        role: checkUser.role
    }, 
    'JWT_SECRET', 
    {expiresIn : '120m'}
    );

    res.status(200).json({
        success: true,
        message: 'SignIn Successfully',
        data : {
            accessToken,
            user : {
                _id: checkUser._id,
                userName: checkUser.userName,
                userEmail: checkUser.userEmail,
                role: checkUser.role,
            },
        },
    });
};

module.exports = {registerUser, loginUser};