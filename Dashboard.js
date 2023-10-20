import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { useState,useEffect} from 'react';
import { useForm } from 'react-hook-form';
import {  RingLoader } from "react-spinners";

function Dashboard(){
    const [users,setUsers] = useState()
    const [refrash,setRefrash] = useState()
    const [loading,setLoading] = useState();
    const [search,setSearch] = useState();

    const navigate = useNavigate()

    function handleDelete(Name){
        fetch(`http://localhost:5000/patientdetail/${Name}`,{
            method: "DELETE",
        })
        .then((response) => response.json())
        .then((data)=>{
            setRefrash(!refrash);
        })
    }


    function handleEdit(Name){
        navigate('/updatepatient',{state:Name})
    }

    useEffect(()=>{
        setLoading(true); 
        fetch('http://localhost:5000/patientdetail')
        .then((response) => response.json())
        .then((data)=>{
            console.log(data)
            setLoading(false);
            setUsers(data)
            // setSearch(data);
        })
    },[])


    
   
    function Submit(){
        localStorage.clear()
        navigate('/adddoctor')
    }
    function handleSubmit(){
        localStorage.clear();
        navigate('/addbed')
    }
    function finalSubmit(){
        localStorage.clear();
        navigate('/patientdetail')
    }
    
    return(
        <div>

            {/* <div>
                {search &&
                search.map((item,index)=>{
                    return(
                        <input type='search'>{item.name}</input>
                    )
                })}
                
            </div> */}
            
            <Button type='submit' onClick={()=>handleSubmit()}>ADD Bed</Button>
            <Button type= 'submit' onClick={()=>Submit()}>ADD Doctor</Button>
            <Button type='submit' onClick={()=>finalSubmit()}>ADD Patien</Button>


            <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Guardian name</th>
            <th>Doctor name</th>
            <th>Bad Number</th>
            <th>Admit Date</th>
            <th>Admit time</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Realease Patient</th>
          </tr>
        </thead>
        <RingLoader color="#d65836" loading={loading} size={50} />
        <tbody>
            {users &&
            users.map((item,index)=>{
                return(
                    <tr key={index}>
                        <td>{item?.name}</td>
                        <td>{item?.address}</td>
                        <td>{item?.guardian}</td>
                        <td>{item?.doctorname}</td>
                        <td>{item?.badnumber}</td>
                        <td>{item?.admitdate}</td>
                        <td>{item?.time}</td>
                        <td>{item?.status}</td>
                        <td>
                    <Button onClick={() => handleEdit(item.id)}>
                      {" "}
                      Update{" "}
                    </Button>
                  </td>
                  <td>
                    <Button onClick={() => handleDelete(item.id)}>
                      {" "}
                      Realease
                    </Button>
                  </td>
                    </tr>
                )
            })}
        </tbody>
            
            </Table>
        </div>
    )
}
export default Dashboard;