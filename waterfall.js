var srcs = [];
for (var i = 0; i <= 40; i++) {
    srcs.push("img/" + i + ".jpg");
}

//配置对象
var config = {
    container: document.getElementById("root"),//容器元素
    imgWidth: 220, //一张图片的宽度
    imgSrcs: srcs //表示所有图片的路径
}

/**
 * 根据配置创建图片元素
 */
function createImgs() {
    for (var i = 0; i < config.imgSrcs.length; i++) {
        //创建图片元素
        var img = document.createElement("img");
        img.src = config.imgSrcs[i]; //设置图片路径
        img.style.position = "absolute";
        img.style.width = config.imgWidth + "px"; //所有图片定宽
        img.onload = setImgPosition; //当图片加载完成后，重新设置所有图片坐标
        img.style.transition = ".5s";
        config.container.appendChild(img); //将图片加入到容器中
    }
}

/**
 * 设置所有的图片的横纵坐标
 */
function setImgPosition() {
    var info = getPositionInfo();
    //创建一个记录每一列下一个图片纵坐标的数组
    var arr = new Array(info.colNumber);
    arr.fill(0); //将数组每一项填充为0
    //循环所有图片（循环容器的所有子元素）
    for (var i = 0; i < config.container.children.length; i++) {
        var img = config.container.children[i];//获取当前图片
        //图片的横纵坐标
        //图片摆在哪一列
        var min = Math.min(...arr); //最小值就是图片的top值
        img.style.top = min + "px";
        //横坐标
        //计算图片在哪一列
        var col = arr.indexOf(min);
        var left = (col + 1) * info.gap + col * config.imgWidth;
        img.style.left = left + "px";
        //更新数组
        arr[col] += img.height + info.gap;
    }

    //设置容器高度
    config.container.style.height = Math.max(...arr) + "px";
}

/**
 * 该函数负责计算定位的一些相关信息
 */
function getPositionInfo() {
    var containerWidth = config.container.clientWidth;
    //计算列的数量 = 容器宽 / 图片宽
    var colNumber = Math.floor(containerWidth / config.imgWidth);
    //计算间隙
    var n = colNumber + 1; //间隙的数量
    var leftSpace = containerWidth - config.imgWidth * colNumber; //剩余空间
    var gap = leftSpace / n;
    return {
        gap,//空隙的尺寸（宽度）
        colNumber,//列数
        containerWidth//容器宽度
    }
}


createImgs();
// setImgPosition();


var timer; //计时器
window.onresize = function () {
    clearTimeout(timer); //之前正在等待的计时器不用再等了
    //窗口尺寸发生改变时
    timer = setTimeout(setImgPosition, 300);
}