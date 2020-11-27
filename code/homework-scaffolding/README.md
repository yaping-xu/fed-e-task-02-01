# 小型脚手架工具的简单说明

## 实现脚手架的工作过程 
- 通过命令行交互询问用户问题
- 根据用户回答生成文件

## 目标
这个脚手架工具主要是读取模板目录下的文件，把文件全部输出到目标目录

## 开发脚手架的准备工作 
`mkdir homework-scaffolding`
`cd homework-scaffolding`
`yarn init --yes`
`在package.json 中添加 bin/cli.js` 把这个文件作为cli的入口文件

## 开始写cli里面的内容 
  - 文件中写入 `#!/usr/bin/env node` 设置为node执行环境
  - 通过在命令行执行 `chmod 755 cli.js` 改变cli.js 的读写权限
  - 首先实现第一步，命令行问询，通过inquirer模块来实现的， `yarn add inquirer` 并且在cli引入
  - inquirer.prompt 设置了交互的问题后，then的回调我们可以拿到用户的回答，并写下接下来的操作
  - 下面的操作主要是通过fs.readdir 读取模板目录下的文件
  - 拿到文件的相对路径数组，遍历，然后通过ejs模板引擎渲染文件，fs.writeFileSync 写入到目标目录