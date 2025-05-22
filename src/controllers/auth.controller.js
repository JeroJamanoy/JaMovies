import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const register= async (req, res) =>{
    const { userid, name, email, number_phone, password } = req.body;

    try{
        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            userid,
            name,
            email,
            number_phone,
            password: passwordHash,
        });

        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved._id });

        res.cookie("token", token);
        res.json({
            id: userSaved._id,
            name: userSaved.name,
            email: userSaved.email,
            number_phone: userSaved.number_phone,
        });

    }catch (e) {
        return res.status(500).json({message: e.message});
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({email})
        if(!userFound) return res.status(400).json({message: "User not found"});

        const isMatch = await bcrypt.compare(password, userFound.password);
        if(!isMatch) return res.status(400).json({message: "Incorrect password"});

        const token = await createAccessToken({ id: userFound._id });

        res.cookie("token", token);
        res.json({
            id: userFound._id,
            name: userFound.name,
            email: userFound.email,
            number_phone: userFound.number_phone,
        });

    }catch (error) {
        return res.status(500).json({message: error.message});
    };
};

export const logout = async (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0),
    })
    return res.sendStatus(200);
};

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)
    if (!userFound) return res.status(400).json({message: "User not found"});

    return res.json({
        id: userFound._id,
        name: userFound.name,
        email: userFound.email,
        number_phone: userFound.number_phone,
    });
};

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.sendStatus(401).json({ message: "Unhathorized" });
    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.sendStatus(401).json({ message: "Unhathorized" });

        const userFound = await User.findById(user.id);
        if (!userFound) return res.sendStatus(400).json({ message: "User not found" });

        return res.json({
            id: userFound._id,
            name: userFound.name,
            email: userFound.email,
            number_phone: userFound.number_phone,
        });
    });
}