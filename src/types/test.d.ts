interface Worker {
    x:number
    salary: number
  }
  
  interface Student{
    x:string,
    st:string
  }
  
type x = 'string'|'number'|'boolean'
type y = keyof Student