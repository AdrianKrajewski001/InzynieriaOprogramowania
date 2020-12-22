import React, { useContext, useState } from "react";
import { Link } from "@reach/router";
import { auth, signInWithGoogle, generateUserDocument } from "../firebase";
import {database} from "../firebase";
const Search = () => {
  
  
var Objawy=[]
const [Objaw, ShowValues] = useState(Objawy);
const downloadFromDatabase= ()=>
{
  Objawy=[];
  var searchedValue=document.getElementById("textbox").value;
  var ref=database.ref("Objawy");
  console.log(searchedValue);
  try{ref.orderByChild("Objaw").equalTo(searchedValue).on("child_added",
   async(snapshot)=> {
    await Objawy.push(snapshot.child("lekarz").val()) 
    ShowValues(Objawy) 
  } )
}
catch{console.log("error connecting to database!")}}

return(
<div><input className="border border-blue-400" id="textbox"/>
<button className="border border-blue-500" onClick={()=>downloadFromDatabase()}>Szukaj</button>
<List users={Objaw}/>
</div>
)
  function List({ users }) {
 if (users.length > 0) {
   return (
   <ul>
  {users.map(user => <li key={user}>{user}</li>)}
   </ul>
   );
    }
    return (
         <p>Brak wyników</p> );};

}

export default Search;
