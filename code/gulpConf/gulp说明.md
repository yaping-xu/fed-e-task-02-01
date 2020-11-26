## gulp实现的简要说明

- 编写对于代码的编译方法，script,page,style
  - 这里需要说明的的一些配置，`{ base: 'src'}` 编译后生成的文件在当前目录下
  - 这几个函数中，都利用的gulp 导出的方法src 和 dest 来进行文件流的导出和写入
  - 其中文件流的编译，我们使用了gulp-load-plugins包来进行对我们依赖的编译包进行导入
  - 因为html中我们利用了数据标记，所以在编译html的时候，通过plugins.swig对于html进行编译，通过swig的data参数，把设定的data传入到模板中
  - 通过 plugins.babel唤起@babel/core的转换过程,设置preset-env参数帮助转换所有的es6模块，他是可以转换所有新特性的集合
  - 通过 plugins.sass, 对scss 文件进行编译，outputStyle: 'expanded' 是指定转换后结束括号的位置
  - 最后pipe中 bs.reload({stream: true}) 代码 以流的方式推送到浏览器，这个部分在devServer的模块有用到

- 编写对于图片，字体和 pubulic 目录的编译
  - plugins.imagemin() 对图片进行压缩
  - imagemin并没有改变图片的质量，只是对图片的一些描述信息进行了删除，对svg进行了压缩
  - 所以在编译font 的时候，我们也使用 plugins.imagemin() 对svg 进行压缩
- useref方法
  - 这个方法是对我们一些引入的node_module 包进行处理，在编译html过后我们会看到文件上有对应的注释，useref 会自动处理构建注释
  - 读取文件过后希望对生成的文件进行压缩,因为读取流中有三个不同的文件，希望对不同文件进行不同操作
  - 通过plugins.if 的方式来区分三个不同的文件，对他们执行不同的压缩方法，最后直接输出到dest目录
- 处理完所有需要压缩文件后我们需要去导出方法，对文件进行压缩操作
  - 使用parallel把page,script,style通过并行的方式导出为 compile
  - useref 是需要 compile 执行后，再去执行，所以我们会在build中把这两个作为串行任务执行
- 在我们每次项目构建之前，希望先清除掉 dist 和 temp 文件夹，所以我们定义了一个clean 任务去给文件夹做清除
  - 之后通过我们的执行顺序，去构建了build任务
- 在gulpfile 中去引入browser-sync，依赖这个模块去创建开发服务器
  - 这里面我们创建了几个watch任务去监听src下面的目录文件
  - 然后初始化服务器，在服务器中去做一些配置
  - 最后去构建start任务
- 最后我们通过module.exports 导出需要向外界提供的方法，之后再package.json 中配置script，这样可以通过yarn start 等方式直接去执行我们的任务