1. ZlButton  
   button高度需要修改
2. ZlSelect  
   disabled属性设置后，还是能够进行选择  
   select右侧箭头不展示
3. ZlMain  
   样式修改,让内部元素居中
   width需要设置默认值
   ```css
   text-align: center;
   ```
4. ZlTable  
   tablecolumn的slot的参数类型需要进行定义  
   table data数据类型修改，目前value只支持string类型
5. ZlCol  
   span属性失效
6. ZlHeader  
   hwidth属性名需要修改，并且需要设置默认值

### feature/v0.0.11 需要处理的问题

1. ZlMenu ZlTable  
   menu,table相关props需要重新配置

2. ZlTable选中后页面没有样式变化  
   table增加行选中没有背景颜色变化，无法确认选中那一条，需要给tr增加在选中后增加背景颜色变化  
   处理选中一条记录翻页后，仍然存在一条被选择的记录  
   将类型Store从TableBody.ts转移到Table.ts

3. 打包时需要删除 console.log和debug

4. ZlPagination 调整分页字符间距

5. ZlSelect  
   5.1 下拉选选项展开页面变形  
   5.2 输入时页面自动提示导致录入数据，但是实际数据并未被修改

6. ZlInput  
   修改默认自动提示

### feature/v0.0.15 需要处理的问题

1. ZlMenu
   点击选择菜单后，下拉菜单无法自动隐藏

2. ZlSelect
   修改下拉选对不齐的问题
3. 新增ZlFileInput
4. 新增ZlDatePicker

### feature/v0.0.16 需要处理的问题

1. ZlPagination 调整分页字符间距, pageSize需要设置为可以修改
2. 表单输入需要增加清空输入
3. 修改FileInput
4. ZlInput增加clearable属性
5. 将单元测试由cypress改为vitest
6. 给组件增加vitest单元测试
7. 新增commitlint + husky相关的依赖和配置，对代码提交进行规范
8. 给publish增加auth，避免每次发布都需要登录

### feature/v0.0.17 需要处理的问题

1. 修改ZlDatePicker样式
2. 代码结构重构，
3. ZlSelect组件通过绑定options属性配置下拉选项，解决手动输入时无法正确筛选选项
4. 新增switch组件

### feature/v0.0.18 需要处理的问题

1. 新增radio组件
2. datePicker增加reset方法，可以一键清空按钮
