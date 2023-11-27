import { ElLoading } from 'element-plus'
function requestHttp(data:any) {
    const loadingInstance  = ElLoading.service({
       background:'rgba(0, 0, 0, 0.3)',
       text:"加载中..."
    })
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
            loadingInstance.close()
        }, 500);
    });
}

export default requestHttp