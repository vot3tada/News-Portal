module.exports = function (req, res, next) {
    if (req.user.role != 'ADMIN')
    {
        return res.status(403).json({message: 'Нет доступа'})
    }
    next()
}