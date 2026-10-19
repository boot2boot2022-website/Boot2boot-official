export const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}

// This function automatically catches errors from async code so your app doesn’t crash.
// jab ham web req ko handle karte hai to asyncHandler use karte hai
