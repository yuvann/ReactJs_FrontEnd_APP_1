var express = require('express');
var router = express.Router();

const { Pool }= require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://hovyhhivbrdrii:fcd66b27281e3b988191182971a9799330774d56dfae461ee76ef3dc0084a8d4@ec2-184-73-174-171.compute-1.amazonaws.com:5432/d9ivpkdnc1lg54';


router.post('/', function(req, res) {

  var {limit , offset }= req.body;
  if(limit == undefined ){
     limit  = 5  ;   // default values
  }
  if(offset == undefined ){
     offset = 0 ;   // default values 
  }
  const pool = new Pool({
    connectionString: connectionString,
  })
  var respObj = {} ;
  pool.query('SELECT * from categories limit $1 offset $2',[limit,offset], (err, result) => {
      if( err ) 
	    handleErr(res,pool);
      else 
      {
	       respObj.data = result.rows ;
	       pool.query('SELECT count(*) from categories', (err, result) => {
		  if( err ) 
	   	       handleErr(res,pool);
      		  else 
      		  {
               	    respObj.count = result.rows[0].count ;
       	            res.status(200).send(respObj);
                    pool.end();
                  } 
               });
      }
  });

});

function handleErr(res,pool){
   console.log("DB ERR");
   res.status(503).send({"error":"Server Error"});
   pool.end();
}

module.exports = router;
