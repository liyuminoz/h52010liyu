 //对象转换成地址栏上数据部分字符串格式
 function objToString(obj) {
     //判断对象
     if (Object.prototype.toString.call(obj) === '[object Object]') {
         let arr = [];
         for (let attr in obj) {
             arr.push(attr + '=' + obj[attr]);
         }
         return arr.join('&')
     } else {
         //自定义错误，抛错
         throw new Error('你输入的不是一个对象');
     }
 }
 //封装小插件
 function $ajax(option) {
     let ajax = new XMLHttpRequest();
     //1.设置请求方式，默认为get
     option.type = option.type || 'get';
     //2.设置接口地址，如果为空，报错
     if (!option.url) {
         throw new Error('接口地址不能为空');
     }
     //3.设置发送数据，如果数据存在，先检测数据格式，如果是对象，利用objToString函数改变成字符串格式进行发送）
     if (option.data) {
         if (Object.prototype.toString.call(option.data) === '[object Object]') {
             option.data = objToString(option.data);
         } else {
             option.data = option.data;
         }
     }
     //如果数据存在，并且请求方式是get,通过地址栏进行拼接发送数据
     if (option.data && option.type === 'get') {
         option.url += '?' + option.data;
     }

     //判断是否异步
     if (option.async === 'false' || option.async === false) {
         option.async = false;
     } else {
         option.async = true;
     }
     ajax.open(option.type, option.url, option.async);

     //如果数据存在，并且请求方式是post,通过send和设置请求头发送数据
     if (option.data && option.type === 'post') {
         ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
         ajax.send(option.data);
     } else {
         ajax.send();
     }
     //如果是同步无需监听，直接执行
     if (option.async) { //异步
         ajax.onload = function() {
             if (ajax.readyState === 4) {
                 if (ajax.status === 200) {
                     // console.log(ajax.responseText);
                     //利用回调函数接收数据进行返回
                     option.success && typeof option.success == 'function' && option.success(ajax.responseText);
                 } else {
                     option.error && typeof option.error == 'function' && option.error('接口地址有误');
                 }
             }
         }

     } else { //同步

         if (ajax.status === 200) {
             // console.log(ajax.responseText);
             //利用回调函数接收数据进行返回
             option.success && typeof option.success == 'function' && option.success(ajax.responseText);
         } else {
             option.error && typeof option.error == 'function' && option.error('接口地址有误');
         }

     }

 }