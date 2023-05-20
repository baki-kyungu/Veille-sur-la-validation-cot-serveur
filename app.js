const express = require('express')
const app = express()
const {check,validationResult} = require('express-validator')



app.use(express.urlencoded({extended:false}))


app.post('/',
[
  check('name').notEmpty().withMessage("the field name can't be empty"),  
  check('email').notEmpty().withMessage("the field email can't be empty")
                .isEmail().withMessage('Invalid mail'), 
check('text').notEmpty().withMessage("the field massage can't be empty"),
check('text').custom(
    value => {
        if(value ==='+243828858300'){
            return true
        }else{
            throw new Error('Invalid number')
        }
    }
)
],(req,res)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        res.render('index',{errors:errors.mapped()})
    }else{
        console.log(req.body)
    }
})

app.listen(3000,()=>console.log('listen....'))