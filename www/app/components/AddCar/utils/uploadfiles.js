
// **********************************************************
export default (file,cb_pathname,callback2,url)=>{
 
       //local variable,cant use var
       let xhr=new XMLHttpRequest();
    
       //move the files to the formdata
       var fd=new FormData();
       fd.append("file",file)

       //check the progress while uploading
       xhr.upload.onprogress=callback2;

       //post request,and upload
       xhr.open(
              "POST",
              url,
              true //async
              );
       //submit formdata file
       xhr.send(fd);
              
       //do sth after upload
       xhr.onload = function(e){
         cb_pathname(xhr.responseText)// get image path after upload
       }
}