import { message } from 'antd'

let util = {

};
util.title = function (title) {
    title = title || 'vue.quasar.admin';
    window.document.title = title;
};

util.getMenuByName = function (name, menulist) {
    let menu = {};
    let forFn = function (name, menulist) {
        for (var item of menulist) {
            if (item.name === name) {
                menu = item;
            } else {
                if (item.children && item.children.length > 0) {
                    forFn(name, item.children)
                }
            }
            if (menu.name) {
                break;
            }
        }
    }
    forFn(name, menulist);
    return menu;
}

util.getTreeEleByPropertyValue = function (value, property, list) {
    let ele = {};
    let forFn = function (value, property, list) {
        for (var item of list) {
            if (item[property] === value) {
                ele = item;
            } else {
                if (item.children && item.children.length > 0) {
                    forFn(value, property, item.children)
                }
            }
            if (ele[property]) {
                break;
            }
        }
    }
    forFn(value, property, list);
    return ele;
}

util.oneOf = function (ele, targetArr) {
    if (targetArr.indexOf(ele) >= 0) {
        return true;
    } else {
        return false;
    }
};
util.getParentMenusByName = function (openAccesseMenu, name) {
    let temp = [];
    let forFn = function (openAccesseMenu, name) {
        for (var item of openAccesseMenu) {
            if (item.name === name && item.path !== "/") {
                temp.push(item);
                forFn(openAccesseMenu, item.parentName);
            }
        }
    };
    forFn(openAccesseMenu, name);
    temp.reverse()
    return temp;
};

util.getTreeEleWithParent = function (id, list) {
    let temp = [];
    let forFn = function (id, list) {
        for (var item of list) {
            if (item.id == id) {
                let newItem = { ...item }
                temp.push(newItem);
                forFn(item.parentId, list);
            }
        }
    };
    forFn(id, list);
    temp.reverse()
    return temp;
};

util.handleTitle = function (vm, item) {
    return item.title;
};


util.openAccesseMenu = function (accesseMenu) {
    let openAccesseMenu = [];
    let forFn = function (menulist, parentName) {
        for (var item of menulist) {
            item.parentName = parentName;
            openAccesseMenu.push(item)
            if (item.children && item.children.length > 0) {
                forFn(item.children, item.name)
            }
        }
    }
    forFn(accesseMenu, '');
    return openAccesseMenu;
}

util.openTreeData = (data) => {
    let openAccesseMenu = [];
    let forFn = function (data) {
        for (var item of data) {
            openAccesseMenu.push({ ...item })
            if (item.children && item.children.length > 0) {
                forFn(item.children)
            }
        }
    }
    forFn(data);
    return openAccesseMenu;
}

export default util;

export function formatDateTime(inputTime) {
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
};

export function getUrlQueryString(name, url) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(url);
    var encoded;

    if (results === null) {
        return null;
    } else {
        encoded = results[1].replace(/\+/g, " ");
        return decodeURIComponent(encoded);
    }
}

export function getUrlQueryObject(urlSearch) {
    let searchObj = {},
        searchStr = window.location.search;
    if (searchStr === "") return searchObj;
    searchStr = urlSearch || searchStr.slice(1);
    let searchList = searchStr.split("&");
    let searchItemSplit;
    searchList.forEach(item => {
        searchItemSplit = item.split("=");
        searchObj[searchItemSplit[0]] = searchItemSplit[1];
    });
    return searchObj;
}

const nativeToString = Object.prototype.toString;
export function getType(any) {
    return nativeToString.call(any).slice(8, -1);
}

export function isFun(fun) {
    return typeof fun === "function";
}

export function executeCB(cbfn, ...nextArgs) {
    return isFun(cbfn) ? cbfn.apply(null, nextArgs) : null;
}

export function responseCode(code) {
    switch (Number(code)) {
        case 400:
            message.error('非常抱歉，错误请求！')
            break
        case 401:
            message.error('非常抱歉，未经授权！')
            break
        case 403:
            message.error('非常抱歉，拒绝访问！')
            break
        case 404:
            message.error('非常抱歉，"Not Found"！')
            break
        case 500:
            message.error('非常抱歉，服务器出错了！')
            break
        case 502:
            message.error('非常抱歉，"Bad Gateway"！')
            break
        case 503:
            message.error('非常抱歉，"Service Unavailable"！')
            break
        case 504:
            message.error('非常抱歉，"Gateway Timeout"！')
            break
        case 505:
            message.error('非常抱歉，"HTTP Version Not Supported"！')
            break
        default:
            message.error('您遇到了一个未知错误，必要情况下请联系管理员！')
            console.error(code)
    }
}