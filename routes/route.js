const express=require('express');
const router=express.Router();
var passport = require('passport');
var jwt =require('jsonwebtoken');
var Member = require('../modeles/member');
const config=require('../config/config')
const Contact = require('../modeles/contacts');

//register
router.get('/member/register',function(req,res){
	res.render('register');
});

//login
router.get('/member/login',function(req,res){
	res.send('login');
});

//List of  members
router.get('/member/Members', function(req, res,next){
		Member.find(function (err, members) {
		  if (err) return console.error(err);
		  res.json(members);
		})
});

//register User

router.post('/member/register', (req, res, next) => {


    //validation

    req.checkBody('username',{msg:'Name is required'}).notEmpty();
    req.checkBody('email','Email is required').notEmpty();
    req.checkBody('email','Email is not valid').isEmail().withMessage('Invalid email address');;
    req.checkBody('password','Password is required').notEmpty();
    req.assert('password', '6 to 20 characters required').len(6, 20);
    req.checkBody('password2','password do not match').equals(req.body.password);

        req.getValidationResult().then(function(result) {
    		  
    		  try {
    			  result.throw();
    			    let newMembre = new Member({
    			        username:req.body.username,
    			        email:req.body.email,
    			        password:req.body.password,
    			        
    			    });
    			    Member.createMember(newMembre,function(err,member){
    			    	if(err)throw err;
    			    	res.json({success:true,msg:'you are registerd and you can now login'});
                
    			    });
    			    
    			    


    			} catch (e) {
            res.json({success:false,msg:'failed'});
    			  console.log(e.array());
    			  
    			}
    });

 
});


//login
router.post('/member/login',(req,res,next)=>{
  const email=req.body.email;
  const password=req.body.password;
   Member.getMemberByEmail(email, function(err, user) {
    if(err) throw err;
    if(!user){
      
      return res.json({success:false,msg:'User not Found'});
    }
    Member.comparePassword(password, user.password, function(err, isMatch){
      if(err) throw err;
      if(isMatch){
        var token=jwt.sign(user,config.jwtSecret,{
          expiresIn:604800
        });
        res.json({
          success:true,
          token:'JWT '+token,
          user:{
            id:user._id,
            email:user.email,
            username:user.username,

          }
        });

      } 
      else {
        return res.json({success:false,msg:'wrong password'});
      }
    });
 });
});   


//gestion contact

//retrieving contacts
router.get('/contact/contacts', function(req, res,next){
    Contact.find(function (err, contacts) {
      if (err) return console.error(err);
      res.json(contacts);
    })
});

//Add contact
router.post('/contact/contact', (req, res, next) => {
    let newContact = new Contact({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        phone:req.body.phone
    });

    newContact.save((err,contact) => {
        if(err){
            res.json({msg : 'Failed to add contact' ,success:false});
        }
        else{
           res.json({msg : 'Contact added successfully' ,success:true}); 
        }
    });
});
//contacts number
router.get('/contact/contactsNumber',function(req,res,next){
    Contact.count(function(err, nb) {
        if(err)throw err;
        else{
            res.json(nb);
        }
    });
    
});
//delete contacts
router.delete('/contact/contact/:id', function(req,res,next){
   Contact.remove({_id:req.params.id},function(err,result){
    if (err) {
        res.json({msg:'fail to delete contact' ,success:false});
    }
    else{
        res.json({msg:'contact deleted susccefully',success:true});
    }
  });
});

//update contact
router.post('/contact/Updatecontact/:id', (req, res, next) => {
    Contact.findByIdAndUpdate({_id:req.params.id}, { first_name: req.body.first_name, last_name: req.body.last_name, phone: req.body.phone }, 
            function(err) {
             if (err) {
                res.json({msg:'fail to update contact' ,success:false});
             return;
             }  
                    
                res.json({msg:'contact update successfully' ,success:true});
             });
    

           
});


module.exports = router;
