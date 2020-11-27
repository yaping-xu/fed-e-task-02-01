#!/usr/bin/env node

console.log('5555')
const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const ejs = require('ejs')

inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'Project name ?',
  }
]).then( answers => {
  const tmplDir = path.join(__dirname, 'templates')
  const destDir = path.join(process.cwd())
  
  fs.readdir(tmplDir,(error,files) => {
    if (error) throw error

    files.forEach(file => {
      const filedir = path.join(tmplDir,file)

      fs.stat(filedir,(error,stat)=>{
        if (error) throw error
        const isDir = stat.isDirectory()
   
          ejs.renderFile(path.join(tmplDir, file), answers, (err, result) => {
            if (err) throw err
            // 将模板写入目标路径
            fs.writeFileSync(path.join(destDir,file),result)
          })
      })
    })
  })
  

})
