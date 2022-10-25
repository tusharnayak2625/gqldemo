import { users, quotes } from "./fakedb.js";
import User from "./models/User.js";
import Quote from "./models/Quote.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = "HelloWorld1515";

export const resolvers = {
    Query: {
        users:async (_,args,context)=> {
            const token = context.headers.auth_token;
            if(!token) {
                throw new Error("You need to be logged in to access this route!");
            }
            else {
                const data = jwt.verify(token,JWT_SECRET);
                if(!data) {
                    throw new Error("Authenticate with valid token!");
                }
                const user = await User.findById(data.user.id);
                if(!user) {
                    throw new Error("User not found!");
                }
                const users = await User.find();
                    // .populate("user","firstName lastName email");
                return users;
            }
        },
        quotes:async (_,args,context)=> {
            const token = context.headers.auth_token;
            if(!token) {
                throw new Error("You need to be logged in to access this route!");
            }
            else {
                const data = jwt.verify(token,JWT_SECRET);
                if(!data) {
                    throw new Error("Authenticate with valid token!");
                }
                const user = await User.findById(data.user.id);
                if(!user) {
                    throw new Error("User not found!");
                }
                let quotes = await Quote.find()
                    .populate("user","_id firstName email")
                    .sort("-createdAt");

                return quotes;
            }
        },
        quote: async (_,{id},context)=> {
            const token = context.headers.auth_token;
            if(!token) {
                throw new Error("You need to be logged in to access this route!");
            }
            else {
                const data = jwt.verify(token,JWT_SECRET);
                if(!data) {
                    throw new Error("Authenticate with valid token!");
                }
                const user = await User.findById(data.user.id);
                if(!user) {
                    throw new Error("User not found!");
                }
                const quote = await Quote.findById(id);
                return quote;
            }
        },
        profile: (async (_,args,context)=> {
            const token = context.headers.auth_token;
            if(!token) {
                throw new Error("You need to be logged in to access this route!");
            }
            else {
                const data = jwt.verify(token,JWT_SECRET);
                if(!data) {
                    throw new Error("Authenticate with valid token!");
                }
                let user = await User.findById(data.user.id);
                if(!user) {
                    throw new Error("User not found!");
                }
                const id = data.user.id;
                user = await User.findById(id)
                    .select("-password")
                    .select("-_id")
                    .populate("quotes");   
                return user;
            }
        }),
    },
    Mutation: {
        registerUser: (async (_,{newUser})=> {
            let user = await User.findOne({email:newUser.email});
            if(user) {
                throw new Error("This email is already linked to another account!");
            }
            else {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(newUser.password,salt);
                user = await User.create({...newUser,password:hashedPassword});
                const data = {
                    user: {
                        id: user.id
                    }
                }
                const token = jwt.sign(data,JWT_SECRET);
                return {token};
            }
        }),
        loginUser: (async (_,{userLogin})=> {
            let user = await User.findOne({email:userLogin.email});
            if(!user) {
                throw new Error("No account exists with this email!");
            }
            else {
                const match = await bcrypt.compare(userLogin.password,user.password);
                if(!match) {
                    throw new Error("Invalid credentials!");
                }
                const data = {
                    user: {
                        id: user.id
                    }
                }
                const token = jwt.sign(data,JWT_SECRET);
                return {token};
            }
        }),
        createQuote: (async (_,{quote},context)=> {
            const token = context.headers.auth_token;
            if(!token) {
                throw new Error("You need to be logged in to access this route!");
            }

            else {
                const data = jwt.verify(token,JWT_SECRET);
                if(!data) {
                    throw new Error("Authenticate with valid token!");
                }
                const user = await User.findById(data.user.id);
                if(!user) {
                    throw new Error("User not found!");
                }
                const newquote = await Quote.create({name: quote.name, user: data.user.id});
                await User.findByIdAndUpdate(data.user.id,{$push:{quotes: newquote}},{new: true});

                return newquote;
            }
        })
        
    }
}