const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
}) 
const Post = sequelize.define('post',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    content: {type: DataTypes.STRING},
    image: {type: DataTypes.STRING, allowNull: true},
    likes: {type:DataTypes.INTEGER},
    createdAt: {type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP')},
})
const Like = sequelize.define('Like', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});
const Tag = sequelize.define('tags', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING}
})
const PostTag = sequelize.define('post_tag', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
});

User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(Like);
Like.belongsTo(User);

Post.belongsToMany(Tag, { through: PostTag });
Tag.belongsToMany(Post, { through: PostTag });