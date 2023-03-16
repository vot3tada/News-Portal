const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") next()
    try
    {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) return res.status(401).json({message: 'Не авторизован'})
        const decoded = jwt.verify(token, 'SecretKey12345')
        req.user = decoded
        next()
    }
    catch(e)
    {
        return res.status(401).json({message: 'Не авторизован'})
    }
}