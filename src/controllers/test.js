module.exports.get = async function(arr){
    var data = [];
    arr.forEach(e=>{
        var result= await web3.eth.getTransaction(e.tx);
        var tx = result["hash"];
             var from = result["from"];
             var to = result["to"];
             var value = parseInt(result["value"])/1000000000000000000;
             data.push({tx:tx,from:from,to:to,value:value});
     });
     return data;
 }