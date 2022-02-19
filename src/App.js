import React,{ useState,useEffect } from 'react';
import Amplify,{API,graphqlOperation} from 'aws-amplify';
import awsExports from './aws-exports';
import {updateDoge} from './graphql/mutations';
import {getDoge} from './graphql/queries';


import './App.css';
Amplify.configure(awsExports);

function App() {
   const [dogePrice,setDogePrice]=useState(0);
   async function fetchDogePrice(){
     try{
       const dogeData=await API.graphql(graphqlOperation(getDoge));
       const dogePrice=dogeData.data.getDoge.price;
       setDogePrice(dogePrice);
      }
      catch(err){
        console.log('error fetching data:');
        console.log(err);
      }
    }
    useEffect(()=>{
      fetchDogePrice();
    },[]);
     async function updateDogePrice(){
       try{
      const dogeData=await API.graphql(graphqlOperation(getDoge))
      const dogePrice=dogeData.data.getDoge.price+0.1
      console.log(dogePrice) 
      const updatedDogePrice=await API.graphql(graphqlOperation(updateDoge,{input : dogePrice}))
      setDogePrice(updatedDogePrice.data.updateDoge.price)
       }
       catch(err){
         console.log("in updateprice err");
         console.log(err);
       }
     } 
    return(
    <div className="App">
      <h1 className="bg-dark text-white"> Doge coin price predictor</h1>

      <div className="container card"> 
      <div class="card-body">
                  <h5 class="card-title">Increase by 10 cents everytime</h5>
       </div>
      </div>
      
      <h2 className="">${dogePrice.toFixed(2)  }</h2>
      <br></br>
       <button onClick={updateDogePrice} className="btn btn-info">Doge </button> 
       <br></br>
       <br></br>
       <img src="https://i.gadgets360cdn.com/large/Dogecoin_Elon_tweet_1618652979675.jpg?downsize=950:*&output-quality=80&output-format=webp" width={800} height={400}></img>
    </div>
  );
}
export default App;
