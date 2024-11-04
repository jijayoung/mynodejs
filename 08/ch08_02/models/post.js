module.exports = ( sequelize, DataTypes ) => {

    // create table Posts {
    //     id integer primary key increment,
    //     title TEXT not null,
    //     content text,
    //     author text
    // }

    const Post = sequelize.define("Post",{
        title : {
            type: DataTypes.STRING,
            allowNull :false
        },
        content : DataTypes.STRING,
        author: DataTypes.STRING,
        filename: {
            type : DataTypes.STRING,
            allowNull :true
        }
    });
    
    Post.associate = function(models){
        Post.hasMany(models.Comment)
    }

    return Post;
}