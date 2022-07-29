// 导入 express
const express = require('express')
// 创建服务器的实例对象
const app = express()

// 导入 cors 中间件
const cors = require('cors')
// 将 cors 注册为全局中间件
app.use(cors())


// 配置解析表单数据的中间件
// 注意：这个中间件，只能解析 application/x-www-form-urlencoded 这种格式的表单数据
app.use(express.urlencoded({ extended: false }))

// 导入并注册用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

// 启动服务器
app.listen(3007, () => {
    console.log('api server running at http://127.0.0.1:3007')
})