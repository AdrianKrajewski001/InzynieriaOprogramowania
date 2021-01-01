import React, { useContext, useState } from "react";
import { Link } from "@reach/router";
import { auth, signInWithGoogle, generateUserDocument } from "../firebase";
import {firestore} from "../firebase";
import testowaFunkcja from "../App.js"
const Search = () => {
  
  
var Specialization=[]
var Doctor=[];
const [Doctors,SetDoctors]=useState(Doctor);
const [filteredUsers, setUsers] = React.useState(Specialization);


const downloadSpecializationsFromDatabase=async()=>
{
  Specialization=[];
  const citiesRef = firestore.collection('Lekarze');
const snapshot = await citiesRef.where('Objawy', 'array-contains', document.getElementById("textbox").value).get();
if (snapshot.empty) {
  console.log('No matching documents.');
  return;
}  

snapshot.forEach(async doc => {
  console.log(doc.id, '=>', doc.data());
  await Specialization.push(doc.id);
  
  downloadDoctorsfromDatabase();
});





}

const listItems = Specialization.map((number) =>
    <li key={number.toString()}>      {number}
    </li>

)

const downloadDoctorsfromDatabase=async()=>
{


const citiesRef = firestore.collection('users');
const snapshot = await citiesRef.where('specjalizacja', 'array-contains', 'kardiolog').get();
if (snapshot.empty) {
  console.log('No matching documents.');
  return;
}  

snapshot.forEach(async doc => {
  console.log(doc.id, '=>', doc.data());
   var x=doc.data()
  
  await Doctor.push(x.displayName);
  
});
 setUsers(Specialization);
 SetDoctors(Doctor)
}








function UsersList({ users }) {
  if (users.length > 0) {
    return (
      <ul>
        {users.map(user => <li key={user}>{user}</li>)}
      </ul>
    );
  }

  return (
    <p>Brak danych</p>
  );
};





return(
<div><input className="border border-blue-400" id="textbox"/>


<button className="border border-blue-500" onClick={()=>downloadSpecializationsFromDatabase()}>Szukaj</button>



<UsersList users={filteredUsers} />

<div><b>Lista lekarzy:</b></div>
<UsersList users={Doctors}/>
</div>
)
  

}

export default Search;
