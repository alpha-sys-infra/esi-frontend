import axios from 'axios'

// create an axios instance
const request = axios.create({
  baseURL: 'http://wuhen.zhuluu.cn/mock/5dec748afaa7523071a45cb3/esi-api', // api-product的base_url
  timeout: 20000 // request timeout
});

export const getDashboardData = ()=>{
    return request({
    url: '/getDashboardData',
    method: 'get',
    loading: 'spin'
  });
}

export const getNodes = ()=>{
    return request({
    url: '/getNodes',
    method: 'get',
    loading: 'spin'
  });
}

export const getService =()=>{
    return request({
    url: '/services',
    method: 'get',
    loading: 'spin'
  });
}

export const getNetwork =()=>{
    return request({
    url: '/getNetwork',
    method: 'get',
    loading: 'spin'
  });
}

export const getUserInfo = ()=>{
    return request({
        url: '/getUserInfo',
        method: 'get',
        loading: 'spin'
    });
}

export const getMainServices = ()=>{
    return request({
        url: '/getMainServices',
        method: 'get',
        loading: 'spin'
    })
}

export const getManageServices = ()=>{
    return request({
        url: '/getManageServices',
        method: 'get',
        loading: 'spin'
    })
}

export const getEndPoint = ()=>{
    return request({
        url: '/getEndPoint',
        method: 'get',
        loading: 'spin'
    })
}

export const getImages = ()=>{
    return request({
        url: '/getImages',
        method: 'get',
        loading: 'spin'
    })
}

export const deleteImage=(id)=>{
  return request({
        url: '/deleteImage',
        method: 'post',
        data:{id,"op":"delete"},
        loading: 'spin'
  });
}

export const deleteService=(id)=>{
  return request({
        url: '/deleteService',
        method: 'post',
        data:{id,"op":"delete"},
        loading: 'spin'
  });
}

export const startService=(id)=>{
  return request({
        url: '/startService',
        method: 'post',
        data:{id,"op":"start"},
        loading: 'spin'
  });
}

export const stopService=(id)=>{
  return request({
        url: '/stopService',
        method: 'post',
        data:{id,"op":"stop"},
        loading: 'spin'
  });
}

export const getServiceDetail=(id)=>{
  return request({
        url: '/getServiceDetail',
        method: 'post',
        data:{id,"op":"details"},
        loading: 'spin'
  });
}