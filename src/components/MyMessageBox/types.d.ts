export interface IProps {
    content:string,
    title?:string,
}
export interface IComponentProps extends IProps{
    confirmcb:()=>void
    cancelcb:()=>void,
    el:Element
}   
