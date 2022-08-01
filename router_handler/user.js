// 导入数据库操作模块
const db = require('../db/index')
// 导入 bcryptjs 这个包
const bcrypt = require('bcryptjs')

// 新用户注册处理函数
exports.regUser = (req, res) => {
    // 获取客户端提交到服务器的用户信息
    const userInfo = req.body

    // 对表单中的数据，进行合法性的校验
    if (!userInfo.username || !userInfo.password) {
        // return res.send({
        //     status: 1,
        //     message: '用户名或密码不合法！'
        // })
        return res.cc('用户名或密码不合法！')
    }

    // 定义 SQL 语句，查询用户名是否被占用
    const sqlStr = 'select * from ev_users where username=?'
    db.query(sqlStr, userInfo.username, (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
            // return res.send({
            //     status: 1,
            //     message: err.message
            // })
            return res.cc(err)
        }

        // 判断用户是否被占用
        if (results.length > 0) {
            // return res.send({
            //     status: 1,
            //     message: '用户名被占用， 请更换其他用户名！'
            // })
            return res.cc('用户名被占用， 请更换其他用户名！')
        }

        // 调用 bcrypt.hashSync() 对密码进行加密
        userInfo.password = bcrypt.hashSync(userInfo.password, 10)

        console.log(userInfo.user_pic);

        // 定义插入新用户的 SQL 语句
        const sql = 'insert into ev_users set ?'
        // 调用 db.query() 执行 SQL 语句
        db.query(sql, { username: userInfo.username, password: userInfo.password, nickname: userInfo.nickname, email: userInfo.email, user_pic: userInfo.user_pic }, (err, results) => {
            // 判断 SQL 语句是否执行成功
            if (err) {
                // return res.send({
                //     status: 1,
                //     message: err.message
                // })
                return res.cc(err)
            }

            // 判断影响行数是否为 1
            if (results.affectedRows !== 1) {
                // return res.send({
                //     status: 1,
                //     message: '注册用户失败，请稍后再试！'
                // })
                return res.cc('注册用户失败，请稍后再试！')
            }

            // 注册用户成功
            // res.send({ status: 0, message: '注册成功！' })
            res.cc('注册成功！', 0)
        })
    })
}

// 用户登录处理函数
exports.login = (req, res) => {
    console.log(req.body)
    res.send('login OK')
}