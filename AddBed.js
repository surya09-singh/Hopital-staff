import { useForm } from "react-hook-form";
import { Button,Form} from "react-bootstrap";
import {  useNavigate } from "react-router-dom";


function Addbed(){
    const navigate =  useNavigate()
    const{
        register,
        handleSubmit,
    } = useForm();
    const badid =(data) =>{
         let baddata ={
            badnumber:data.badnumber,

         }
         fetch('  http://localhost:5000/badid',{
            method: 'POST',
          body: JSON.stringify(baddata),
          headers: {'Content-Type': 'application/json'},
         })
         .then(res => res.json())
         .then(response=>{
            console.log(response);
            navigate('/dashboard');

         })
    }

    return(
        <div>
            <Form onSubmit={handleSubmit(badid)}>
      <Form.Group className="mb-3" controlId="formGroupebad">
        <Form.Label>Bed Name</Form.Label>
        <Form.Control type="badnumber" placeholder="enter bed number" {...register('badnumber')} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      </Form>

        </div>
    )
}
export default Addbed;