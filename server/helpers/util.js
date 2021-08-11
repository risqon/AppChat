const jwt = require('jsonwebtoken')
const secretKey = 'rubicamp'

module.exports = {
    verifyToken: function (req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if(token){

            jwt.verify(token, secretKey, function (err, decoded){
                if(err) {
                    return res.json({ success: false, message: 'Failed to atuhenticate token.'})
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(403).json({
                success: false,
                message: 'No token provided'
            });
        }
    }
}