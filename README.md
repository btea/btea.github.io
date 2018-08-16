# btea.github.io
blog
## [在线预览](https://btea.github.io/)
## js位运算符（|、||、&、&&）
#### 例子
 `console.log(0.6|0) => 0`     
 `console.log(0.6&0) => 0`     
 `console.log(0.6||0) => 0.6`     
 `console.log(0.6&&0) => 0`
 
 `console.log(1.1|0) => 1`  
 `console.log(1.1&0) => 0`  
 `console.log(1.1||0) => 1.1`  
 `console.log(1.1&&0) => 0`
 
 `console.log(3.65555|0) => 3`  
 `console.log(3.65555&0) => 0`  
 `console.log(3.65555||0) => 3.65555`  
 `console.log(3.65555&&0) => 0`

 `console.log(5.99999|1) => 5`  
 `console.log(5.99999&1) => 1`  
 `console.log(5.99999||1) => 5.99999`  
 `console.log(5.99999&&1) => 1`
 
 `console.log(-7.777|0) => -7`  
 `console.log(-7.777&0) => 0`  
 `console.log(-7.777||0) => -7.777`  
 `console.log(-7.777&&0) => 0`
 
 *当按位或运算或者按位与运算符两侧有小数时，若数字大于0，调用Math.floor()向下取整，若数字小于0，则调用Math.ceil()向上取整。取整之后再将位运算符两侧的数字均转化为32位二进制数，首位为符号位(当数字为负时，符号位为1，反之则为0)。转换为二进制之后，进行相应的位运算，得到的结果转换为10进制之后便是相应的结果。*
 
