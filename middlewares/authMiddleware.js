const jwt = require('jsonwebtoken');
const colors = require('colors')
module.exports = async (req, res, next) => {

    try {
        // console.log("In Auth Middleware".bgGreen.white);
        const token = req.headers['authorization'].split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(200).send({
                    message: 'Auth Failed',
                    success: false
                });
            } else {
                req.body.userId = decode.id;
                next();
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            messsage: "Internal Server Error",
            success: failed
        })
    }
}