const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})
const Post = sequelize.define('posts', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    content: {type: DataTypes.STRING},
    image: {type: DataTypes.STRING, allowNull: true},
    createdAt: {type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP')},
})
const Like = sequelize.define('likes', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});
const Tag = sequelize.define('tags', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING}
})
const PostTag = sequelize.define('post_tag', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
});
const History = sequelize.define('history', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

User.hasMany(Post);
Post.belongsTo(User);


User.hasMany(History);
Post.hasMany(History);
History.belongsTo(User);
History.belongsTo(Post);

History.belongsToMany(PostTag, {through: Post})
User.hasMany(History);
Post.hasMany(History);

User.hasMany(Like);
Post.hasMany(Like);
Like.belongsTo(User);
Like.belongsTo(Post);


Post.hasMany(PostTag);

Tag.hasMany(PostTag)


Post.belongsToMany(Tag, {through: PostTag});
Tag.belongsToMany(Post, {through: PostTag});

module.exports = {
    User, Post, Like, Tag, PostTag, History
}