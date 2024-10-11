// function wraPAsync(fn) {
//     return function(req,res,next){
//         fn(req,res,next).catch(next);
//     }
// }

module.exports = (fn)=>
     (req,res,next)=>
        fn(req,res,next).catch(next);
     

