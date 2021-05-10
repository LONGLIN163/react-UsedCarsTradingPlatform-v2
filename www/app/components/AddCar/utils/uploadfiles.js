//export default (file,callback1,callback2)=>{
export default (file,callback1,callback2,url)=>{
 
       //local variable,cant use var
       let xhr=new XMLHttpRequest();
    
       //move the files to the formdata
       var fd=new FormData();
       fd.append("file",file)
       //check the progress of uploading
       xhr.upload.onprogress=callback2;

       //callback function
       xhr.onload = function (e) {
        console.log("bbbbb",xhr.responseText)
        callback1(xhr.responseText)
       }
       //post request
       //xhr.open("POST","/upload",true);
       xhr.open("POST",url,true);
       //submit formdata file
       xhr.send(fd);

}