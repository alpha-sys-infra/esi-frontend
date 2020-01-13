import Ajax from '@/services/ajax'

export function TodoProcModle(data) {
    return new Promise(resolve => {
        Ajax({
            url: '/procManagement/todos',
            method: 'post',
            data
        }).then(result => {
            const { success, data, total } = result
            if (success) {
                resolve({ total, data })
            } else {
                resolve({ total: 0, data: null })
            }
        }, () => resolve({ total: 0, data: null }))
    })
}