/*
*this file is used to create cars' data.Expand the data base on carbasedata.json.
*/

const path=require("path")
const fs=require("fs")
const _=require("lodash")

//get the carbasedata path
const carbasedataFilePath=path.resolve(__dirname,"./carbasedata.json")
//create the target cardata path
const writedataFilePath=path.resolve(__dirname,"./cardata.json")
//get the cars' imgs path
const carimgsFilePath=path.resolve(__dirname,"../www/carimgs/")


//use fs module to read carbasedata.json.
//for avoid of callback in callback,we need to use readFileSync
//var content=fs.readFileSync(carbasedataFilePath).toString()
var arr=JSON.parse(fs.readFileSync(carbasedataFilePath).toString())//now arr has become a real array

//console.log(arr)
//console.log(typeof content)

//loop this arr
for(var i=0;i<arr.length;i++){
    arr[i].price=_.random(0,1000)/10;
    arr[i].km=_.random(0,1000000);
    arr[i].gearbox=_.sample(["automatic","manual","AMT"]);
    arr[i].displacement=_.sample(["1.0L","1.2L","1.6L","1.6T","2.0L","2.0T","5.0L"]);
    arr[i].fuel=_.sample(["electric","Hybrid ","gasoline","diesel"]);
    arr[i].buydate=Date.parse(new Date(2019,0,1))-_.random(0,10*365*86400*1000);
    arr[i].licenseplate=_.sample([true,false]);
    arr[i].locality=_.sample([true,false]);
    arr[i].eco=_.sample(["E1","E2","E3","E4","E5"]);
    arr[i].imgs={
        //read the img arr from each folder
        "view":fs.readdirSync(carimgsFilePath+"/"+arr[i].id+"/view"),
        "inner":fs.readdirSync(carimgsFilePath+"/"+arr[i].id+"/inner"),
        "engine":fs.readdirSync(carimgsFilePath+"/"+arr[i].id+"/engine"),
        "more":fs.readdirSync(carimgsFilePath+"/"+arr[i].id+"/more")
    };
    
    //console.log(arr[i])
}

//write these data to a file
for(var i=0;i<arr.length;i++){
    fs.appendFileSync(writedataFilePath,JSON.stringify(arr[i]));//at this moment,require type string
}

console.log("Done")
