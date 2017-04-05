var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var mongoOp     =   require("./model/mongo");
var router      =   express.Router();
var multer  = require('multer')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

var storage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now()+".jpg");
  }
});

var upload = multer({ storage : storage}).single('userPhoto');

app.post('/api/photo',function(req,res){
	upload(req,res,function(err) {
		if(err) {	
		//	res.end({"error" : true,"message" : "Error uploading file."});
		res.end("Error uploading file.");
		}
	res.end("File is uploaded");
		// res.json({"error" : false,"message" : "File is uploaded"});
	});
});

router.post('/uploadPhoto',function(req,res){
	upload(req,res,function(err) {
		if(err) {	
			res.json({"error" : true,"message" : "Error uploading file."});
		//res.end("Error uploading file.");
		}
	//res.end("File is uploaded");
	 res.json({"error" : false,"message" : "File is uploaded"});
	});
});

router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});


router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});
router.route("/users")
    .get(function(req,res){
        var response = {};
        mongoOp.find({},function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })
	   .post(function(req,res){
        var response = {};
		var db = new mongoOp();
		if(req.body.email !== undefined && req.body.password !== undefined) {	
		   mongoOp.findOne({"userEmail": req.body.email },function(err,data){
            if(err) {
			 response = {"error" : true,"message" : "Please try again after some time"};
			 res.json(response);
             } else {
			if(data == null){
			   db.userEmail = req.body.email;
        db.userPassword = require('crypto').createHash('sha1').update(req.body.password).digest('base64');
		if(req.body.userProfileImage !== undefined){
		 db.userProfileImage = req.body.userProfileImage;
		}
        db.save(function(err){
            if(err) {
                response = {"error" : true,"message" : "Please try again after some time"};
            } else {
                response = {"error" : false,"message" : "User Added successfully"};
            }
	 res.json(response);
          
        });}else{
		   response = {"error" : true,"message" : "User Already exists"};
		    res.json(response);
		}
            }

        });
     
		}else{
		   response = {"error" : true,"message" : "Parameter missing please check you have added all these parameters -> email,password"};
		   res.json(response);
		}
   
    });
	
router.route("/users/:id")
    .get(function(req,res){
        var response = {};
        mongoOp.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })
    .put(function(req,res){
        var response = {};
        mongoOp.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                if(req.body.userEmail !== undefined) {
                    data.userEmail = req.body.userEmail;
                }
                if(req.body.userPassword !== undefined) {
                    data.userPassword = req.body.userPassword;
                }
                data.save(function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error updating data"};
                    } else {
                        response = {"error" : false,"message" : "Data is updated for "+req.params.id};
                    }
                    res.json(response);
                })
            }
        });
    })
		  .post(function(req,res){
        var response = {};
        mongoOp.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                mongoOp.update({_id : req.params.id}, { $set: { 'userProfileImage': req.body.userProfileImage } },function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error updating data"};
                    } else {
                        response = {"error" : true,"message" : "Data associated with "+req.params.id+"is updated"};
                    }
                    res.json(response);
                });
            }
        });
    })
    .delete(function(req,res){
        var response = {};
        mongoOp.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                mongoOp.remove({_id : req.params.id},function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error deleting data"};
                    } else {
                        response = {"error" : true,"message" : "Data associated with "+req.params.id+"is deleted"};
                    }
                    res.json(response);
                });
            }
        });
    })

app.use('/',router);

app.listen(3000);
console.log("Listening to PORT 3000");
