const { Sequelize, Model, DataTypes } = require(`sequelize`);
const sequelize = new Sequelize({ //new Sequelize 객체생성
    dialect : 'sqlite', //sqlite3 use
    storage : 'post.db' //data file name
});
 `
    create table User {
        username varchar(100) not null,
        email varchar(100)
    }
`
const User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: true
    }
});

//즉시실행 비동기 함수
(async () => {
    // await를 사용하기 위해서 즉시 실행 함수를 정의합니다.
    // 실제 모델을 생성, 데이터를 가져오는 연습은 여기에서 합니다.
    await sequelize.sync({ force: false });

    // const user1 = await User.create({
    //     username : 'user01',
    //     email : 'user01@gmail.com'
    // });
    // console.log(`user created => ${JSON.stringify(user1)}`);

    // const users = await User.bulkCreate([
    //     {
    //         username : 'user02', email: 'user02@gmail.com'
    //     },
    //     {
    //         username : 'user03', email: 'user03@gmail.com'
    //     },
    //     {
    //         username : 'user04', email: 'user04@gmail.com'
    //     }
    // ]);

    // const users =  await User.findAll(); //select * from Users
    
    // users.forEach((user) =>{
    //     console.log(`username : ${user.username} , email:${user.email}`);
    // });

    await User.update({
        email:'user02@naver.com'
    },{
        where:{
            username:'user02'
        }
    });

    const user  = await User.findOne({
        where :{
            username : 'user02'
        }
    });
    console.log(`user02 => ${JSON.stringify(user)}`);

    //delete from Users where usename = 'user01'
    await User.destroy({
        where:{
            username : 'user01'
        }
    })
})();