
import './style/laptop.css';
import './style/table.css';
import './style/mobile.css';
import './style/modal.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from './photos/PBBTS_LOGO.png';
import React, { useState } from 'react';

// Firebase
import { db } from './firebaseConfig';
import { setDoc, doc, getDocs, collection } from 'firebase/firestore'


function App() {
  const [fname, setFName] = useState('');
  const [mname, setMName] = useState('');
  const [lname, setLName] = useState('');
  const [bday, setBday] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [church, setChurch] = useState('');
  const [pastor, setPastor] = useState('');
  const [school, setSchool] = useState('');
  const [schoolYear, setSchoolYear] = useState('');
  const [show, setShow] = useState(false);

  const handleSubmit = async(event) =>{
    event.preventDefault();
    const studentsRef = collection(db, "students");
    const currentyear = new Date().getFullYear();
    const sec = new Date().getSeconds();
    
    const snapshot = await getDocs(studentsRef);
    const yearDoc = snapshot.docs.filter(doc => doc.id.startsWith(`${currentyear}-`));
    const nextID = yearDoc.length + 1;
    const paddedNumber = String(nextID).padStart(3, '0');
    const paddedSec = String(sec).padStart(2, '0');
    const studentID = `${currentyear}-${paddedNumber}${paddedSec}`;  

    const studentsDocRef = doc(studentsRef, studentID.toString());

    try{
      await setDoc(studentsDocRef, { fname, mname, lname, age, bday, gender, address, contact, email, church, pastor, school, schoolYear });
      alert("Data submitted successfully!");
      setFName("");
      setMName("");
      setLName("");
      setBday("");
      setAge("");
      setGender("");
      setAddress("");
      setContact("");
      setEmail("");
      setChurch("");
      setPastor("");
      setSchool("");
      setSchoolYear("");
    }
    catch (error) {
      alert("Error submitting data: " + error.message);
    }
  };
  return (
    <div className="App">
      <div className="header">
        <img src={logo} className="App-logo" alt="logo" />
        <label id='pbbts'>Pilgrim Bible Baptist Theological Seminary</label>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="datas">
          <div className='name'>
            <label>First Name:</label>
            <label>Middle Name:</label>
            <label>Last Name:</label>
            <input type="text" id='fname' value={fname} onChange={(event) => setFName(event.target.value)} />
            <input type="text" id='mname' value={mname} onChange={(event) => setMName(event.target.value)} />
            <input type="text" id='lname' value={lname} onChange={(event) => setLName(event.target.value)} />
          </div>

          <div className='info'>
            <label>Date of Birth:</label>
            <label>Age:</label>
            <label>Gender:</label>
            <input type="date" id='bday' value={bday} onChange={(event) => setBday(event.target.value)} />
            <input type="number" id='age' value={age} onChange={(event) => setAge(event.target.value)} />
            <select value={gender} id='gender' onChange={(event) => setGender(event.target.value)}>
              <option value="">Select Age</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className='contacts'>
            <label>Address:</label>
            <label>Contact Number:</label>
            <label>Email:</label>
            <input type="text" id='address' value={address} onChange={(event) => setAddress(event.target.value)} />
            <input type="text" id='contact' value={contact} onChange={(event) => setContact(event.target.value)} />
            <input type="email" id='email' value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>

          <div className='churchInfo'>
            <label>Church Name:</label>
            <label>Pastor Name:</label>
            <input type="text" id='church' value={church} onChange={(event) => setChurch(event.target.value)} />
            <input type="text" id='pastor' value={pastor} onChange={(event) => setPastor(event.target.value)} />
          </div>

          <div className='schoolInfo'>
            <label>School Name:</label>
            <label>School Year:</label>
            <input type="text" id='school' value={school} onChange={(event) => setSchool(event.target.value)} />
            <select value={schoolYear} id='schoolYear' onChange={(event) => setSchoolYear(event.target.value)}>
              <option value="">Select Your School Year</option>
              <option value="First Year">First Year</option>
            </select>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
      <i class="bi bi-info-circle" id='infoIcon' onClick={() => setShow(true)}></i>
      <div className='Modal' style={{ display: show ? 'block' : 'none' }}>
        <div className='modalContent'>
          <h1>PBBTS Enrollment</h1>
          <p>Welcome! newly Bible students please fill out the form to enroll in PBBTS.</p>
          <label>Student Information</label>
          <p>
            Make sure that you will fill out this form correctly. <br></br>
            And make sure that your selected school year is the next year you will attend
            not your current school year. <br></br>
            After you fill out the form and submit, you will receive a confirmation on your enrollment.
          </p>
        </div>
        <span class="close-btn" id="closeModalBtn" onClick={() => setShow(false)}>&times;</span>
      </div>
    </div>
  );
}

export default App;
