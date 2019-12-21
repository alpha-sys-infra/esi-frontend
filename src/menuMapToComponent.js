import Loadable from 'react-loadable';
import ContentLoader from '@/containers/MyContentLoader';

const Menu = Loadable({
    loader: () => import('@/pages/Menu'),
    loading: ContentLoader
});
const Home = Loadable({
    loader: () => import('@/pages/Home'),
    loading: ContentLoader
});
const Page404 = Loadable({
    loader: () => import('@/pages/Page404'),
    loading: ContentLoader
});
const Page403 = Loadable({
    loader: () => import('@/pages/Page403'),
    loading: ContentLoader
});
const RequestLog = Loadable({
    loader: () => import('@/pages/RequestLog'),
    loading: ContentLoader
});
const ComputeResource = Loadable({
    loader: () => import('@/pages/sysManagement/resourceManagement/computeResource/index'),
    loading: ContentLoader
});
const NodesMon = Loadable({
    loader: () => import('@/pages/sysManagement/resourceManagement/nodesMon/index'),
    loading: ContentLoader
});
const ServicesMon = Loadable({
    loader: () => import('@/pages/sysManagement/resourceManagement/servicesMon/index'),
    loading: ContentLoader
});
const NetworksMon = Loadable({
    loader: () => import('@/pages/sysManagement/resourceManagement/networksMon/index'),
    loading: ContentLoader
});
const UserInfo = Loadable({
    loader: () => import('@/pages/omniIdentity/UserInfo/index'),
    loading: ContentLoader
});
const ServiceIndex = Loadable({
    loader: () => import('@/pages/servManagement/index'),
    loading: ContentLoader
});
const ServiceManage = Loadable({
    loader: () => import('@/pages/servManagement/manage'),
    loading: ContentLoader
});
const ServiceImage = Loadable({
    loader: () => import('@/pages/servManagement/image'),
    loading: ContentLoader
});
const ServicePort = Loadable({
    loader: () => import('@/pages/servManagement/port'),
    loading: ContentLoader
});
//key为与后端返回菜单的name相对应
export default {
    "menu": Menu,
    "home": Home,
    "page404": Page404,
    "page403": Page403,
    "requestlog":RequestLog,
    "computeResource":ComputeResource,
    "servicesMon":ServicesMon,
    "nodesMon":NodesMon,
    "networksMon":NetworksMon,
    "profile":UserInfo,
    "serviceIndex":ServiceIndex,
    "serviceManage":ServiceManage,
    "serviceImage":ServiceImage,
    "servicePort":ServicePort
}