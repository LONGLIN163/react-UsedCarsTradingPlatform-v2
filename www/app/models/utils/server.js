export const fetchServer=function*(filters,pageInfo,sortInfo){
   
            //sent ajax request,every time sent all the current filters to the server
            const {results,count}=yield fetch("/cars",{
                "method":"POST",
                "headers":{
                    "Content-Type":"application/json"
                },
                //we need to collect all the info together and to covert them to string for post
                "body":JSON.stringify({
                    filters,
                    pageInfo,
                    sortInfo
                })
            //})
            }).then(data=>data.json());

            return {
                results,
                count
            }
}