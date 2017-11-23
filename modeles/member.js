const mongoose=require('mongoose');
var bcrypt=require('bcryptjs');






const MemberSchema= mongoose.Schema({
	username:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true,
		index: { unique: true } 
	},
	password:{ 
		type:String,
		required:true
	}

});  



const Member= module.exports = mongoose.model('Member',MemberSchema);

module.exports.createMember=function(newMember,callback){
	bcrypt.genSalt(10, function(err, salt) {
		    bcrypt.hash(newMember.password, salt, function(err, hash) {
		        newMember.password=hash;
		        newMember.save(callback); 
		    });
	});
	

}
module.exports.getMemberByEmail=function(email,callback){
	Member.findOne({email:email},callback);
}
module.exports.getMemberById=function(id,callback){
	Member.findById(id,callback);
}
module.exports.comparePassword=function(candidatePassword,hash,callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
		if(err)throw err;
		callback(null,isMatch);
	});
}

