import { render, h } from 'vue'
import MyMessageBox from './index.vue'
import { IProps } from './types'


function myMessageBox(props: IProps) {
    let div = document.createElement('div')
    div.setAttribute('messagebox', '')
    document.body.appendChild(div)
    return new Promise((resolve, reject) => {
        const confirmcb = () => {
            resolve('confirm')
            // document.body.removeChild(div)
        }
        const cancelcb = () => {
            reject('cancel')
            // document.body.removeChild(div)
        }
        const vnode = h(MyMessageBox, {
            ...props,
            confirmcb,
            cancelcb,
            el:div
        })
        render(vnode, div as Element)
        setTimeout(() => {
            let messagebox = (vnode.el as Element).querySelector('.message-box__body')
            messagebox?.classList.add('show-box')
        }, 0);
    })
}

export default myMessageBox