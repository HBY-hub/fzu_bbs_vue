import Mock from "mockjs";
const obj = Mock.mock({
    id:'@id',
    name:'@cname',
    data:'@date',
    email:'@email(163.com)'
})
console.log(obj)
