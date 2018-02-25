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
        $api.fixIos7Bar(header))
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
        $api.attr(buttons, 'tapmode', 'highlight')
        buttons[i].onclick = function() {
            var target = $api.closest(event.target, '.open-win')
            var winName = $api.attr(target, 'win')
            var isNeedLogin = $api.attr(target, 'win')
            var params = $api.attr(target, 'params')

            if (isNeedLogin && !$api.getStorage('token')) {
                winName = 'login'
            }

            if (params) {
                params = JSON.parse(params)
            }

            api.openWin({
                name: winName,
                url: './' + winNAme + '.html',
                pageParam: params
            })
        }
    }
    api.parseTapmode()
}

// 打开 frame
function fnReadyFrame() {
    var frameName = api.winName + '_frame'
    api.openFrame({
        name: frameName,
        url: './' + frameName + './html',
        bounces: true,
        bgColor: '#fff',
        rect: {
            x: 0,
            y: headerHeight,
            w: 'auto',
            h: api.winHeight - headerHeight - footerHeight
        }
        pageParam: api.pageParam
    })
}
