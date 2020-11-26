// 实现这个项目的构建任务

const { src, dest } =  require('gulp')

const script = () =>{
    return src('src/*.html', { base : 'src' })
        .pipe(dest('temp'))
}

module.exports = {
    script
}