const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// SIGNUP
const signup = async (req,res)=>{

    try{

        const {name,email,password,role} = req.body

        const userExists = await User.findOne({email})

        if(userExists){
            return res.status(400).json({
                message:"User already exists"
            })
        }

        const user = await User.create({
            name,
            email,
            password,
            role
        })

        res.status(201).json({
            message:"User created successfully",
            user
        })

    }catch(error){

        res.status(500).json({
            message:error.message
        })

    }

}


// LOGIN
const login = async (req,res)=>{

    try{

        const {email,password} = req.body

        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(401).json({
                message:"Invalid credentials"
            })
        }

        const accessToken = jwt.sign(
            {id:user._id, role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"15m"}
        )

        const refreshToken = jwt.sign(
            {id:user._id},
            process.env.REFRESH_SECRET,
            {expiresIn:"7d"}
        )

        user.refreshToken = refreshToken
        await user.save()

        res.cookie("refreshToken",refreshToken,{
            httpOnly:true
        })

        res.json({
            accessToken
        })

    }catch(error){

        res.status(500).json({
            message:error.message
        })

    }

}


// LOGOUT
const logout = async (req,res)=>{

    res.clearCookie("refreshToken")

    res.json({
        message:"Logged out successfully"
    })

}
// REFRESH ACCESS TOKEN
const refreshAccessToken = async (req,res,next)=>{

    try{

        const refreshToken = req.cookies.refreshToken

        if(!refreshToken){
            res.status(401)
            throw new Error("Refresh token missing")
        }

        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_SECRET
        )

        const user = await User.findById(decoded.id)

        if(!user || user.refreshToken !== refreshToken){
            res.status(403)
            throw new Error("Invalid refresh token")
        }

        const newAccessToken = jwt.sign(
            {id:user._id, role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"15m"}
        )

        res.json({
            accessToken:newAccessToken
        })

    }catch(error){
        next(error)
    }

}

module.exports = {
    signup,
    login,
    logout,
    refreshAccessToken
}