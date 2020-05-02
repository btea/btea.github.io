# btea.github.io
blog  
[位运算符具体实现操作](https://www.cnblogs.com/heluo/p/3422357.html)
## [在线预览](https://btea.github.io/)
## [javascript技术](http://www.ruanyifeng.com/blog/javascript/)
## js位运算符（|、||、&、&&）
#### 例子
 ```js
 console.log(0.6|0) => 0     
 console.log(0.6&0) => 0     
 console.log(0.6||0) => 0.6     
 console.log(0.6&&0) => 0
 
 console.log(1.1|0) => 1 
 console.log(1.1&0) => 0  
 console.log(1.1||0) => 1.1  
 console.log(1.1&&0) => 0
 
 console.log(3.65555|0) => 3  
 console.log(3.65555&0) => 0  
 console.log(3.65555||0) => 3.65555  
 console.log(3.65555&&0) => 0

 console.log(5.99999|1) => 5  
 console.log(5.99999&1) => 1  
 console.log(5.99999||1) => 5.99999  
 console.log(5.99999&&1) => 1
 
 console.log(-7.777|0) => -7  
 console.log(-7.777&0) => 0  
 console.log(-7.777||0) => -7.777  
 console.log(-7.777&&0) => 0
 
 console.log(-8|-9) =>  -1  
 console.log(-8&-9) =>  -16  
 console.log(-8||-9) => -8  
 console.log(-8&&-9) => -9
 
 **当按位`或(|)运算`或者按位`与(&)运算`符两侧有小数时，若数字大于`0`，调用`Math.floor()`向下取整，若数字小于0，则调用Math.ceil()向上取整。取整之后再将位运算符两侧的数字均转化为32位二进制数，首位为符号位(当数字为负时，要先将负数转换为二进制补码)。转换为二进制之后，进行相应的位运算，得到的结果转换为10进制之后便是相应的结果。** 
 
