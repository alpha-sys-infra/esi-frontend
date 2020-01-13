/* eslint-disable no-unused-vars */
import axios from 'axios'
import { message } from 'antd'
import Qs from 'qs'
import Loading from '@/utils/loading'
import { responseCode } from '@/utils/util'
import { getToken, removeToken } from '@/utils/token'
import history from '@/utils/history'

const baseURL = 'http://wuhen.zhuluu.cn/mock/5e1c19bdfaa7523071a45cf2/web/'

const Axios = axios.create({
    baseURL,
    timeout: 300000,
    responseType: 'json',
    withCredentials: false
})



//添加请求拦截器
Axios.interceptors.request.use(config => {
    let token = getToken()
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
    } else {
        message.error('登陆信息已过期,请重新登陆!');
        history.push('/login')
    }
    const {
        method,
        data,
        url,
        params: { isShowLoading, formData, params, isMessage },
    } = config

    if (isShowLoading) Loading.show()


    const METHOD = method.toUpperCase()

    if (METHOD === 'POST' || METHOD === 'PUT' || METHOD === 'PATCH') {

        if (formData) {
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
            config.data = Qs.stringify(data)
        } else {
            config.headers['Content-Type'] = 'application/json;charset=UTF-8'
            config.data = JSON.stringify(data)
        }
    }

    if (METHOD === 'GET' || METHOD === 'DELETE' || METHOD === 'HEAD') {
        config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    }

    config.params = params
    config.isShowLoading = isShowLoading
    config.isMessage = isMessage

    return config
}, error => {
    const { config: { isMessage, isShowLoading } } = error
    if (isShowLoading) Loading.hide()

    if (!isMessage) {
        console.error(error)
        return Promise.reject(error)
    }

    message.error('非常抱歉，请求出错咯！')
    console.log('请求错误！', error)

    return Promise.reject(error)
})

// 响应拦截
Axios.interceptors.response.use(response => {
    const { config: { isMessage, isShowLoading } } = response
    if (isShowLoading) Loading.hide()

    if (!isMessage) {
        return response
    }

    return response
}, error => {
    const { response, config: { isShowLoading, isMessage } } = error

    if (isShowLoading) Loading.hide()

    if (!isMessage) {
        console.error('response.error>>>响应错误！')
        return Promise.reject(error)
    }

    //拦截错误响应状态码
    if (response) {
        const { status } = response
        if (status) responseCode(status)

        if (status === 401) {
            removeToken()
            history.push('/login')
        }
    } else {
        //拦截断网
        let netWork = (error + '').search('Network Error') !== -1
        if (netWork) {
            message.error('哎哟，网络出错咯。请检查您的网络！')
        }

        //拦截超时
        let timeout = (error + '').search('timeout') !== -1
        if (timeout) {
            message.error('哎哟，网络请求超时咯。请稍后再重试！')
        }
    }

    console.log('响应错误！', error)
    return Promise.reject(error)
})
/**
 * options:{
 *  url           // 接口地址
 *  method        // 请求方式
 *  params        // url参数
 *  data          // post方式的数据
 *  formData      // 设置Content-Type，默认为false，及对应'application/json;charset=UTF-8'
 *  isShowLoading // 是否设置全局loading，默认为false
 *  isMessage     // 是否弹出提示框，默认为true
 * }
 */

const Ajax = options => {
    const {
        formData = false,
        isShowLoading = false,
        isMessage = true,
        params = {}
    } = options

    options.params = { formData, isShowLoading, isMessage, params }

    return new Promise((resolve, reject) => {
        Axios({ ...options }).then(response => {
            const { status, data } = response
            if (status === 200) {
                resolve(data)
                return
            }
            reject(response)
        }).catch(err => {
            reject(err)
        })
    })
}
export default Ajax