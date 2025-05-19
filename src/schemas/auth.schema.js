import {ParseStatus, z} from 'zod';

export const registerSchema = z.object({
    userid:  z.string({
        require_error: "Userid is required",
    }),

    name: z.string({
        required_error: "Name is required",
    }).min(3, {
        message: "Name must be at least 3 characters long",
    }),

    email: z.string({
        required_error: "Email is required",
    }).email({
        message: "Invalid email address",
    }),

    number_phone: z.string({
        required_error: "Phone number is required",
    }).min(10, {
        message: "Phone number must be at least 10 characters long",
    }),

    password: z.string({
        required_error: "Password is required",
    }).min(8, {
        message: "Password must be at least 8 characters long",
    }),

});

export const loginSchema = z.object({
    email: z.string({
        required_error: "Email is required",
    }).email({
        message: "Invalid email address",
    }),

    password: z.string({
        required_error: "Password is required",
    }).min(8, {
        message: "Password must be at least 8 characters long",
    }),
})