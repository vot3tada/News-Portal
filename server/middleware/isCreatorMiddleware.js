module.exports = function (req, res, next) {
    if (req.user.role != 'ADMIN' && req.user.role != 'CREATOR')
    {
        return res.status(401).json({message: 'Нет доступа'})
    }
    next()
}