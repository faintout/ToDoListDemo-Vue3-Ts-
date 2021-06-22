interface UserInfo  {
    userName:string|number,
    passWord:string|number,
    nickName:string|number,
}

class getUserInfo implements UserInfo{
    constructor(userName:string ,passWold,nickName){
        this.userName  = userName 
    }
}