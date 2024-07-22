/*function f1() {
    console.log("hii tejas");
}

function f2(){
    console.log("hii sonali");
}
module.exports.f2=f2;
module.exports[f1]=f1;
console.log(module.exports)*/

/*let name=''
if (name==''){
    name='tejas'
}
console.log(name)

async function f1(){
    name='tejas vishnu'
}

f1()
console.log(name)*/

const fetchUserDetails = async (userId) => {
    // pretend we make an asynchronous call
   // and return the user details
   return {'name': 'Robin', 'likes': ['toys', 'pizzas']};
 }

/*console.log(fetchUserDetails(12345).then((ans)=>{
    console.log(ans)
}))*/

/*
async function f1(){
    const ans= fetchUserDetails()
console.log(ans, typeof ans)
}

f1()
*/

//about encript password and decript password...
/*
bcrypt=require('bcrypt');
let saltRound=10
bcrypt.genSalt(saltRound,(err,salt)=>{
    //  console.log('two',hashedPass)
     console.log(bcrypt.hash('tejas',salt,async (err,hash)=>{
              console.log(hash)
              }))
            })

*/

//about object destructuring...

let student={
    name:"tejas",
    class:"11th",
    sub:["english","marathi","science"],
    fav:{
        color:"red"
    }
}

const {color,...other }=student
console.log(color)
