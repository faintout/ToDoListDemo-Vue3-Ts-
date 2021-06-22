
// interface localType{
//     key:string,
//     value:string
// }
//本地存储方法
class LocalFun {
    constructor(){
    }
    local(key:string,value:string):any{
       return value?localStorage.setItem(key,value):localStorage.getItem(key)
    }
    removeLocal(key:string):void{
        localStorage.removeItem(key)
    }
}

export {LocalFun}

