var express=require("express")
var app=express()
var formindable=require("formidable")
var path=require("path")
var fs=require("fs")
var url=require("url")
var gm=require("gm")

var mongoose=require("mongoose")

//******connect to development db******
//mongoose.connect("mongodb://localhost:27017/coolcars", { useNewUrlParser: true });

//******connect to production db******
mongoose.connect('mongodb+srv://developerlin:Long2021...@cluster0.r4ghm.mongodb.net/coolcars?retryWrites=true&w=majority', { 
	useNewUrlParser: true,
	useCreateIndex:true
}).then(()=>{
	console.log("Connect to db success");
}).catch(err=>{
	console.log("ERROR",err.message);
});


//import the model file
var Car=require("./models/Car")

//staticize www folder
app.use(express.static("www"))

//create a API that can check info of everycars,include imgs' info.
app.get("/carinfo/:id",(req,res)=>{
        var id=req.params.id;
        Car.find({"id":id}).exec((err,results)=>{
             res.json({"result":results[0]})
        })
})

//create a API that can get same brand or series cars info of a certain car
app.get("/carlike/:id",(req,res)=>{
        var id=req.params.id;
        Car.find({"id":id}).exec((err,results)=>{
                //get the current car brand and series
                var brand=results[0].brand 
                var series=results[0].series
                //get similar cars with current car's brand and series
                Car.find({brand,series}).exec((err,results)=>{
                res.json({results})
                })
        })
})

//get all brand and series
app.get("/brandAndSeries",(req,res)=>{
    //get this id 
    res.json({
        "A":[
            {"Audi":["A5","A6"]}
        ],
        "F":[
            {"Ferrari":["812","F430","488","V-power","SP","Challenge"]}
        ],
        "K":[
            {"KIA":["K1","K2"]}
        ],
        "L":[
            {"Lamborghini":["Aventador","IMSA"]},
            {"Lexus":["F5","LS"]}
        ],
        "M":[
            {"Mercedes":["MC1","MC3","CLA"]}
        ],
        "N":[
            {"Nissan":["S2018","S2019"]}
        ]
    })
})

/****************** create a API to get cars info*********************/
app.post("/cars",function(req,res){
        var form=new formindable.IncomingForm();
        form.parse(req,(err,{filters,pageInfo,sortInfo})=>{

            //get the obj that we want to check
            var targetObj={};
            //create this obj base info from front 
            //amend some conditions,convert "Yes/No" etc. keywords from front-end to boolean value
            if(filters.licenseplate!=""){
                filters.licenseplate=filters.licenseplate=="Yes"?true:false
            }
            if(filters.locality!=""){
                filters.locality=filters.locality=="Yes"?true:false
            }

            //array data(checkbox) 
            for(var k in filters){
                if(
                    k=="licenseplate"||
                    k=="locality"||
                    k=="brand"||
                    k=="series"||
                    k=="type"||
                    k=="color"||
                    k=="eco"||
                    k=="gearbox"||
                    k=="displacement"||
                    k=="fuel"){
                    //only put the  para.filters[k] within value into the targetobj
                    if(filters[k].length!=0){
                        targetObj[k]=filters[k];
                    }
                }
                //check scope match:
                if(
                    k=="price"||
                    k=="km"||
                    k=="buydate"
                ){
                    //only put the  para.filters[k] within value into the targetobj
                    if(filters[k].length!=0){
                        targetObj[k]={"$gte":filters[k][0],"$lte":filters[k][1]};
                    }
                }
            }
            //get pageInfo
            var page = pageInfo.page;
            var pagesize = pageInfo.pagesize;
            //get sortInfo
            var sortBy=sortInfo.sortBy;
            var sortDirection=sortInfo.sortDirection;

            console.log("******sort by********",sortBy,"**************",sortDirection)
            //count all the data first
            Car.count(targetObj,(err,count)=>{
                //check this obj that we got
                //Car.find({"color":["red","green"]}).exec((err,docs)=>{
                Car.find(targetObj).sort({[sortBy]:sortDirection}).skip(pagesize*(page-1)).limit(pagesize).exec((err,docs)=>{
                    //console.log(docs)
                    res.json({
                        "count":count,
                        "results":docs
                    })
                })
            })
        }) 
})

/****************** upload API(H5) for imgs*********************/

app.post("/uploadPic",function(req,res){
    var form=new formindable.IncomingForm();
    form.uploadDir=path.resolve(__dirname,"./www/uploads");
    form.keepExtensions=true;
    form.parse(req,function(err,content,files){
        if(!files) return;
        //when the pic is upload,name gonna be change randomly.then sent the changed name to the front-end
        //use path.parse to cut some part of the name,in case get attacked from hk,sent the rest info to the front
        // send path to the frontend  
        res.send(path.parse(files.file.path).base)
    })
})
/****************** upload API(H5) for infos*********************/

app.post("/uploadInfo",function(req,res){
    
    var form=new formindable.IncomingForm();
    //taget to the upload file folder
    form.uploadDir=path.resolve(__dirname,"./www/uploads");
    //keepExtensions
    form.keepExtensions=true;
    //res.writeHead(200, {'content-type': 'text/html'});
    form.parse(req,function(err,content,files){
        if(!files) return;
        //when the pic is upload,name gonna be change randomly.then sent the changed name to the front-end
        //use path.parse to cut some info,in case get attack from hk,sent the rest info to the front
        res.send(path.parse(files.file.path).base)
    })
})

/****************** submit api*********************/
app.post("/addCar",function(req,res){

    //addcar
    var form=new formindable.IncomingForm();
    form.parse(req,function(err,{step1,step2,step3},files){

        var brand=step1.brandAndSeries.value[1];
        var series=step1.brandAndSeries.value[2];
        var color=step1.color.value;
        var type=step1.type.value;
        var price=Number(step1.price.value);
        var km=Number(step1.km.value);
        var gearbox=step1.gearbox.value;
        var displacement=step1.displacement.value;
        var fuel=step1.fuel.value;
        var buydate=Date.parse(step1.buydate.value);
        var licenseplate=Boolean(step1.licenseplate.value);
        var locality=Boolean(step1.locality.value);
        var eco=step1.eco.value;

        var imgs=step2;

        var files=step3;

        //find max id
        Car.find({}).sort({"id":-1}).limit(1).exec((err,docs)=>{
            var id=docs[0].id+1; // here we use last id+1 as new car id

            console.log("new car id***",id)
            
            /*******************create file folder****************** */
            let path=require('path')
            // create image folders
            fs.mkdirSync(path.resolve(__dirname,"./www/carimgs/"+id))
            fs.mkdirSync(path.resolve(__dirname,"./www/carimgs_small/"+id))
            // create big imgs folder
            fs.mkdirSync(path.resolve(__dirname,"./www/carimgs/"+id+"/view"))
            fs.mkdirSync(path.resolve(__dirname,"./www/carimgs/"+id+"/inner"))
            fs.mkdirSync(path.resolve(__dirname,"./www/carimgs/"+id+"/engine"))
            fs.mkdirSync(path.resolve(__dirname,"./www/carimgs/"+id+"/more"))
            // create small imgs folder
            fs.mkdirSync(path.resolve(__dirname,"./www/carimgs_small/"+id+"/view"))
            fs.mkdirSync(path.resolve(__dirname,"./www/carimgs_small/"+id+"/inner"))
            fs.mkdirSync(path.resolve(__dirname,"./www/carimgs_small/"+id+"/engine"))
            fs.mkdirSync(path.resolve(__dirname,"./www/carimgs_small/"+id+"/more"))
            // move images to relavent folders
            for(let i=0;i<imgs.view.length;i++){
                fs.renameSync( // renameSync module moves files
                    path.resolve(__dirname,"./www/uploads/"+imgs.view[i]),
                    path.resolve(__dirname,"./www/carimgs/"+id+"/view/"+imgs.view[i])
                )
                gm(path.resolve(__dirname,"./www/carimgs/"+id+"/view/"+imgs.view[i]))
                .resize(150,100)
                .write(path.resolve(__dirname,"./www/carimgs_small/"+id+"/view/"+"tb"+imgs.view[i]),function(){})
            }
            for(let i=0;i<imgs.inner.length;i++){
                fs.renameSync(
                    path.resolve(__dirname,"./www/uploads/"+imgs.inner[i]),
                    path.resolve(__dirname,"./www/carimgs/"+id+"/inner/"+imgs.inner[i])
                )
                gm(path.resolve(__dirname,"./www/carimgs/"+id+"/inner/"+imgs.inner[i]))
                .resize(150,100)
                .write(path.resolve(__dirname,"./www/carimgs_small/"+id+"/inner/"+"tb"+imgs.inner[i]),function(){})
            }
            for(let i=0;i<imgs.engine.length;i++){
                fs.renameSync(
                    path.resolve(__dirname,"./www/uploads/"+imgs.engine[i]),
                    path.resolve(__dirname,"./www/carimgs/"+id+"/engine/"+imgs.engine[i])
                )
                gm(path.resolve(__dirname,"./www/carimgs/"+id+"/engine/"+imgs.engine[i]))
                .resize(150,100)
                .write(path.resolve(__dirname,"./www/carimgs_small/"+id+"/engine/"+"tb"+imgs.engine[i]),function(){})
            }
            for(let i=0;i<imgs.more.length;i++){
                fs.renameSync(
                    path.resolve(__dirname,"./www/uploads/"+imgs.more[i]),
                    path.resolve(__dirname,"./www/carimgs/"+id+"/more/"+imgs.more[i])
                )
                gm(path.resolve(__dirname,"./www/carimgs/"+id+"/more/"+imgs.more[i]))
                .resize(150,100)
                .write(path.resolve(__dirname,"./www/carimgs_small/"+id+"/more/"+"tb"+imgs.more[i]),function(){})
            }
            // create an car obj
            var obj={
                id,
                brand,
                series,
                color,
                type,
                price,
                km,
                gearbox,
                displacement,
                fuel,
                buydate,
                licenseplate,
                locality,
                eco,
                imgs,
                files
            }
            
            /*******create new car********* */
            Car.create(obj,function(){                
                res.json({
                    newCarId:id
                })
            })
        })
    })
})

//******test port******
// app.listen(3000,(err)=>{
//     console.log("service is running run at 3000 port")
// })

//******production port******

app.listen(process.env.PORT, '0.0.0.0');
console.log("The app is running on server!")
