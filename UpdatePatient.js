import {useForm} from 'react-hook-form';
import {Form,Button} from 'react-bootstrap';
import {useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

function UpdatePatient(){
    const [date,setDate] = useState()
    const [databad,setDatabad] = useState();
    const [datadoctor,setDatadoctor] = useState();
    const [formdata,setFormdata] = useState([]);
    const location = useLocation()
    const navigate = useNavigate();
    const{
        register,handleSubmit,setValue
    }= useForm();

    const UpdateForm=(data)=>{
        let formdata ={
            name:data.name,
            address:data.address,
            guardian:data.guardian,
            doctorname:data.doctorname,
            badnumber:data.badnumber,
            admitdate:data.admitdate,
            time:data.time,
            status:data.status
        }
        fetch(`http://localhost:5000/patientdetail/${location.state}`,{
            method: 'PUT',
            body: JSON.stringify(formdata),
            headers: {'Content-Type': 'application/json'},
        })
        .then(res => res.json())
    .then(data => {
        console.log(data)
        navigate('/dashboard')

    })
    }

    useEffect(()=>{
        fetch(`http://localhost:5000/patientdetail/${location.state}`)
        .then((response) => response.json()) 
        .then((data)=>{
        console.log(data);
        setFormdata(data);
        setValue('name',data.name)
        setValue('address',data.address)
        setValue('guardian',data.guardian)
        setValue('doctorname',data.doctorname)
        setValue('badnumber',data.badnumber)
        setValue('admitdate',data.admitdate)
        setValue('time',data.time)
        setValue('status',data.status)
        })
    },[location])


    useEffect(()=>{
        fetch(" http://localhost:5000/badid")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDatabad(data);
      });
    },[])
    useEffect(()=>{
        fetch(" http://localhost:5000/doctorid")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDatadoctor(data);
      });
    },[])

    return(
        <div>
            <Form onSubmit={handleSubmit(UpdateForm)}>
      <Form.Group className="mb-3" controlId="formGroupename">
        <Form.Label>Name</Form.Label>
        <Form.Control type="name" placeholder="name" {...register('name')} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupepassword">
        <Form.Label>Address</Form.Label>
        <Form.Control type="address" placeholder="Enter address" {...register('address')}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupeguardian">
        <Form.Label>Guardian</Form.Label>
        <Form.Control type="guardian" placeholder="guardian name" {...register('guardian')}/>
      </Form.Group>
      <Form.Select {...register('doctorname')} aria-label="Default select example">
      <option> Seleact Doctor Name</option>
      {datadoctor &&
      datadoctor.map((item,index)=>{
        return(
            <option >{item.doctorname}</option>
        )
      })}
      
    </Form.Select>
    <Form.Select {...register('badnumber')} aria-label="Default select example">
      <option> Seleact Bad Number</option>
      {databad &&
      databad.map((item,index)=>{
        return(
            <option >{item.badnumber}</option>
        )
      })}
     
    </Form.Select>
    <Form.Group className="mb-3" controlId="formGroupedate">
        <Form.Label>Admit date</Form.Label>
        <Form.Control type="admitdate" value={date}   {...register('admitdate')}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupetime">
        <Form.Label>Admit time</Form.Label>
        <Form.Control type="time"  {...register('time')}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupestatus">
        <Form.Label>Status</Form.Label>
        <Form.Control type="status"  {...register('status')}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      </Form>
        </div>
    )
}
export default UpdatePatient;