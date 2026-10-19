import { Form } from "../models/form.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose"

// validate email
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const submitForm = asyncHandler(async (req, res) => {
    // todo
    // take fields input from req.body
    // create an error array to store array
    // check name
    // verify email with regex 
    // validate phone , organization , message 
    // verify services if sent
    // if error show 400 
    // save to DB 
    // return success response
    // handle mogoose validation eror 400
    // if other error with 500
    try {
        const { name, email, phone, organization, message, services } = req.body || {};

        if ([name, email].some(
            (field) => typeof field !== "string" || field.trim() === ""
        )) {
            throw new ApiError(400, "Name and email are required")
        }

        if (!EMAIL_REGEX.test(email.trim())) {
            throw new ApiError(400, "Email is not valid");
        }

        if (
            services !== undefined &&
            (!Array.isArray(services) ||
                !services.every((s) => typeof s === "string"))
        ) {
            throw new ApiError(400, "Services must be an array of strings");
        }

        // save to db
        const form = await Form.create({
            name,
            email,
            phone,
            organization,
            message,
            services,
        })

        return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    form,
                    "Form submitted successfully"
                )
            )
    } catch (error) {
        // Errors we threw ourselves: send the status and message we set
        if(error instanceof ApiError){
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                errors: error.errors
            })
        }

        if(error instanceof mongoose.Error.ValidationError){
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: Object.values(error.errors).map((e) => e.message),
            });
        }

        console.error("SubmitForm error:", error);
        return res.status(500)
        .json({
            success: false,
            message: "Server error"
        });
    }
})


