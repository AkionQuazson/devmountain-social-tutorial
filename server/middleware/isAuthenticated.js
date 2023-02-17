require('dotenv').config()
const jwt = require('jsonwebtoken')
const {SECRET} = process.env

module.exports = {
    isAuthenticated: (req, res, next) => {
        const headerToken = req.get('Authorization')

        //confirms that there is a header, which means 
        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let token

        try {
            //uses jwt to generate a valid token
            token = jwt.verify(headerToken, SECRET)
        } catch (err) {
            //if it fails to generate a valid token, throw this error
            err.statusCode = 500
            throw err
        }

        if (!token) {
            //if you don't have a token, throw an error saying inaccurate credentials
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }

        //runs the next function passed into this function.
        next()
    }
}