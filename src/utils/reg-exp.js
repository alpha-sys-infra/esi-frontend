export const NUM_LETTER = {pattern:/^\w+$/,message:'只能由数字字母下划线构成！'}

export const NUM_LETTER_CHINE = {pattern:/^[a-zA-Z0-9\u4e00-\u9fa5]+$/,message:'只能由中文数字字母下划线构成！'}

export const NUMBER ={pattern:/^[1-9]\d*$/　,message:'只能填写纯数字'}

export const EMAIL = {pattern:/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,message:'请输入正确的邮箱格式！'}

export const MOBILE_NO = {pattern:/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57]|19[189])[0-9]{8}$/,message:'请输入您正确的手机号码！'}

export const OFFICE_NO = {pattern:/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/,message:'请输入您正确的办公号码（移动、固定号码都可）！'}

export const FAX_NO = {pattern: /^(\d{3,4}-)?\d{7,8}$/,message:'请输入正确的传真号码！'}

export const INT_FLOAT = {pattern: /^(?:[1-9][0-9]*(?:\.[0-9]*[1-9])?|0(?:\.[0-9]*[1-9])?)$/,message:'请输入正整数或者小数！'}

export const BANK_CARD_NO = {pattern: /^([1-9]{1})(\d{15}|\d{16}|\d{18})$/,message:'请输入正确的银行卡号！'}

export const NET_LG = {pattern: /^(E|W)(?:[1-9][0-9]*(?:\.[0-9]*[1-9])?|0(?:\.[0-9]*[1-9])?)°?$/,message:'请输入正确的标称轨道经度！'}

export const POST = {pattern: /^[0-9]{6}$/,message:'请输入正确的邮政编码'}

export const CARD_ID = {pattern:/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/,message:'请输入正确的身份证号码'}

export const WEB_URL = {pattern:/^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/,message:'请输入正确的网址'}