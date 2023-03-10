const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
}) 
const Post = sequelize.define('post',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    content: {type: DataTypes.STRING},
    likes: {type:DataTypes.INTEGER},
    creator_id: {type: DataTypes.INTEGER}
})
const Tegs = sequelize.define('tegs', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING}
})
const Tegs_posts = sequelize.define('tegs_posts',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    teg_id: {type: DataTypes.INTEGER},
    post_id: {type: DataTypes.INTEGER}
})
