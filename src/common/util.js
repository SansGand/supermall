//防抖函数
//func频繁执行的函数,delay间隔时间
export function debounce(func, delay) {
    //利用闭包
    //避免全局污染，保存timer变量
    //因为timer被下面调用，所以不会被销毁,也不会创建新的
    //多次调用时，使用的是同一个timer
    let timer = null
    return function(...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}

// 时间格式化
export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    let o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds()
    };

    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + "";
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
        }
    }

    return fmt;
}

function padLeftZero(str) {
    return ("00" + str).substr(str.length);
}