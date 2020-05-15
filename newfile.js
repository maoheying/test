/* 
            创建一个可以执行简单动画的函数 
            参数
                obj
                target 目标位置
                speed

        */
// var timer;
/* 
    目前我们的定时器都由timer保存，所有执行的定时器都在timer保存
        所以当box3的定时器开启时，box1的定时器会关闭，即box1和box3的定时器并不能一起开启
        这个timer本质是为了防止一个元素开启多个定时器

        可以在如下做法向执行动画的对象中一个timer属性，用来保存它自己的定时器标识
        obj.timer
        
 */

function move(obj, arry, target, speed, callback) {
    // 关闭上一个定时器
    clearInterval(obj.timer);

    var current = parseInt(getStyle(obj, arry));
    // 判断速度的正负值
    if (current > target) {
        speed = -speed;
    }
    // 这个速度判断必须放在定时器外面，如果放在里面的话会导致每一次执行都会使speed的正负号变化

    // 开启一个定时器
    obj.timer = setInterval(function () {

        // 获取原来left的值，用getStyle函数来实现
        var oldvalue = parseInt(getStyle(obj, arry));
        // 这里有个小缺陷，在ie中getStyle()返回的auto，这样无法计算，
        // 所以在样式中把left设置为0，不会影响样式，ie浏览器中也会返回0



        var newvalue = oldvalue + speed;

        if ((speed < 0 && newvalue < target) || (speed > 0 && newvalue > target)) {
            newvalue = target;
        }
        obj.style[arry] = newvalue + "px";

        /* 
            设置当div到800px时停止，做if判断
            但是如果newleft == 800这样设置的话，当speed为11，newleft的值永远不能等于800
            这样设置不行
            如果newleft >= 800这样设置，div又不能正好停在800px位置上
            所以综合考虑，要先将newleft作判断，如果>800，则将它的值赋值为800
    
         */
        if (newvalue == target) {
            clearInterval(obj.timer);
            callback && callback();
        }
    }, 30);
}

/* 
    定义一个函数来获取指定元素的样式
    参数 
        elem 要获取样式的元素
        name 要获取的样式
 */
function getStyle(elem, name) {

    if (window.getComputedStyle) {
        // 正常浏览器，具有getComputedStyle()方法
        return getComputedStyle(elem, null)[name] //name是特殊的样式名，不能用.
    } else {
        // IE8浏览器，没有getComputedStyle()方法 
        return elem.currentStyle[name];
    }
    // getComputedStyle()在正常浏览器中有，则转换为布尔值true
    // 在IE8及以下浏览器中没有，则会在if语句中报错
    // 但是在加上一个window.getComputedStyle，变成window的属性，
    // 没有的话会返回null，转换为布尔值false
}


// 定义一个函数向一个元素中指定的class属性值
/* 
    参数
        obj
        cn 添加的class
*/
function addClass(obj, cn) {

    // 先检查obj.className有没有cn
    if (!hasClass(obj, cn)) {

        obj.className += " " + cn;
        // class值是用空格分开的，记得加上一个空格字符
    }

}

/* 
    但是这样每点一次按钮都会增加一个box2
    判断一个元素中是否右class属性值
    有返回true，没有返回false
*/
function hasClass(obj, cn) {

    // 用正则表达式检查class的属性字符串中有么有cn独立的单词
    // var reg = /\bcn\b/;
    // 这样在函数中写正则表达式，表示obj.className中有没有cn这个class，而不是cn形参
    // 也该要用构造函数,记得加上\转义字符

    var reg = new RegExp("\\b" + cn + "\\b");


    return reg.test(obj.className);
}



/* 
    删除一个元素中的class属性
*/
function removeClass(obj, cn) {

    // 创建一个正则表达式
    var reg = new RegExp("\\b" + cn + "\\b");

    // 删除class，即将cn替换成一个空串
    obj.className = obj.className.replace(reg, "");
}



/* 
    toggleClass可以用来切换一个类
        如果元素中具有该类，则删除
        如果元素中没有该类，则添加
*/
function toggleClass(obj, cn) {

    if (hasClass(obj, cn)) {

        removeClass(obj, cn);
    } else {
        addClass(obj, cn);
    }
}
