function fnReady() {
    fnReadyKeyback()
    fnReadyOpenWin()
    fnReadyHeader()
    fnReadyFooter()
}

var footer, footerHeight = 0

// 顶部适配 ios
// 获取顶部的高度
function fnReadyHeader() {
    header = $api.byId('header')
    if (header) {
        $api.fixIos7Bar(header)
        headerHeight = $api.offset(header).h
    }
}

var header, headerHeight = 0

// 底部适配 iphoneX
// 获取底部的高度
function fnReadyFooter() {
    footer = $api.byId('footer')
    if (footer) {
        $api.fixTabBar(footer)
        footerHeight = $api.offset(footer).h
    }
}

// 初始化后退按钮
function fnReadyKeyback() {
    var keybacks = $api.domAll('.event-back')
    for (var i = 0; i < keybacks.length; i++) {
        $api.attr(keybacks[i], 'tapmode', 'highlight')
        keybacks[i].onclick = function() {
            api.closeWin()
        }
    }

    api.parseTapmode()
}

// 初始化子页面的入口
function fnReadyOpenWin() {
    var buttons = $api.domAll('.open-win')
    for (var i = 0; i < buttons.length; i++) {
        $api.attr(buttons[i], 'tapmode', 'highlight')
        buttons[i].onclick = function() {
            event.stopPropagation()
            var target = $api.closest(event.target, '.open-win')
            var winName = $api.attr(target, 'win')
            var isNeedLogin = $api.attr(target, 'login')
            var isCommon = $api.attr(target, 'common')
            var params = $api.attr(target, 'params')
            var url = ''

            if (isNeedLogin && !$api.getStorage('token')) {
                winName = 'login'
            }

            if (params) {
                params = JSON.parse(params)
            }

            // 判断是否是通用的子页面来确定 url
            url = isCommon ? '../' + winName + '.html' : './' + winName + '.html'

            api.openWin({
                name: winName,
                url: url,
                pageParam: {
                    name: 'test'
                },
                slidBackEnabled: true, // 是否支持滑动返回
            });

        }
    }
    api.parseTapmode()
}

// 打开 frame
function fnReadyFrame(params) {
    var frameName = api.winName + '_frame'
    if (params) {
        var bgColor = params.bgColor ? params.bgColor : '#fff';
    }
    api.openFrame({
        name: frameName,
        url: './' + frameName + '.html',
        bounces: true,
        bgColor: bgColor,
        rect: {
            x: 0,
            y: headerHeight,
            w: 'auto',
            h: api.winHeight - headerHeight - footerHeight
        },
        pageParam: api.pageParam
    })
}




var toast_timer

function fnBilikaToast(params) {
    if (params) {
        var text = params.text || '出错啦'
    }

    if (toast_timer) {
        return
    }

    var html = '<div class="toast-mask" id="toast">' +
                    '<div class="toast-content flex-wrap">' +
                        '<div class="icon"></div>' +
                        '<div class="text">' + text + '</div>' +
                    '</div>' +
                '</div>'
    $api.append($api.dom('body'), html);

    toast_timer = setTimeout(function() {
        $api.byId('toast').remove()
        clearTimeout(toast_timer)
        toast_timer = null
    }, 1500)
}
