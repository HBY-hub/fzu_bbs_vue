const Mock = require('mockjs');
var obj = Mock.mock({
    id:'@id',
    name:'@cname',
    data:'@date',
    email:'@email(163.com)'
})


// console.log(obj)

Mock.mock(new RegExp('http://localhost:8010/getHotPassage.*'),'get',()=>{
    return obj;
})

Mock.mock('http://gettest123.com','get',()=>{
    return obj;
})
