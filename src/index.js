/**
 * 
 * @param {} option 配置对象
 */
function _message (option) {
  // 提供默认值，
  var baseOption = {
    content : "", // 显示内容
    type: "info", // info, success, warn , error
    duration : 1, // 弹窗延时关闭关闭
    onClose: null //关闭弹窗后回调
  };
  var opt = Object.assign({}, baseOption, option);
  var flag = false;

  var contentDiv, oDiv;
 
  renderDom()

  function renderDom () {
    if (flag) {
     return ;
    }
    flag = true; // 防止多次点击

    // 生成dom结构
    oDiv = document.createElement("div")
    oDiv.className = "mask";
    var str = `<div class="content ${opt.type}">
                <span class="icon"></span>
                <p>${opt.content}</p>
              </div>`;
    oDiv.innerHTML = str;

    document.body.appendChild(oDiv);

    contentDiv = document.getElementsByClassName("content")[0];

    // 强行浏览器渲染
    getComputedStyle(contentDiv, null).top;

    contentDiv.style.transform = "translate(-50%, -50%) scale(1,1)";

   
  }

  // 关闭定时器
    setTimeout(close, opt.duration * 1000);

  /**关闭弹窗 */
  function close () {
    contentDiv.style.transform = "translate(-50%, -50%) scale(0,0)";
    setTimeout(function() {
      oDiv.remove();
      flag = false;
      if (typeof(opt.onClose) === 'function') {
        opt.onClose()
      }
    },200)
  }
}

/**
 * 根据参数的情况构造合适的对象调用_message;
 */
function message () {
  if (arguments.length === 0) {
    // 没有参数
    _message({});
  }
  else if (arguments.length === 1) {
      // 有一个参数
      if (typeof arguments[0] === "object") {  // 参数为对象
        _message(arguments[0]);
      } 
      else {
        _message({    // 参数不是对象
          content: arguments[0],
        })
      }
  }
  else {
    // 参数数量大于1
    _message({
      content: arguments[0],
      type:arguments[1]
    })
  }
}