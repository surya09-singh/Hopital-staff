import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm} from "react-hook-form";
import { useDispatch } from 'react-redux';
import { login } from './AuthSlice';
import { useNavigate } from 'react-router-dom';

function Register(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const{
        register,
        handleSubmit,
    }= useForm()
    const RegisterPage= (data) =>{
      let formdata ={
        name:data.name,
        email:data.email,
        password:data.password
       }
       fetch('  http://localhost:5000/register',{
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {'Content-Type': 'application/json'},
       })
       .then(res => res.json())
            .then(response=>{
              console.log(response);
              if(response.accessToken){
                dispatch(login({token:response.accessToken}))
                navigate('/dashboard')
              }
            })
       
    }
    
    return(
        <div>
            <Form onSubmit={handleSubmit(RegisterPage)}>
      <Form.Group className="mb-3" controlId="formGroupname">
        <Form.Label>Name</Form.Label>
        <Form.Control type="name" placeholder="Enter name" {...register('name')}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupemail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="email" {...register('email')} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupepassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="password" {...register('password')}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
        </div>
    )
}
export default Register;
