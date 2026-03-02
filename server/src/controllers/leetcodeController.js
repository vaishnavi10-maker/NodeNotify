const axios = require("axios");

exports.getLeetCodeStats = async (req,res)=>{

try{

const username = req.params.username;

const response = await axios.get(
`https://leetcode-stats-api.herokuapp.com/${username}`
);

res.json(response.data);

}catch(error){

res.status(500).json({error:"Failed to fetch stats"});

}

};