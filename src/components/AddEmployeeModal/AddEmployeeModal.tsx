import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { IEmployee } from "../../models/IEmployee";

const Wrapper = styled.div`
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: #8080808a;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Header = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: gray;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`

const Exit = styled.button`
    margin: 5px;
    cursor: pointer;
`
const Title = styled.p`
    margin: 5px;
`;

const Form = styled.form`
    height: 380px;
    width: 450px;
    background-color: #b7b0b0;
    border-radius: 10px;
    border: 2px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Label = styled.label`
    font-weight: 600;
`

const Input = styled.input`
    width: 80%;
`;

const Submit = styled(Input)`
    width: 20%;
    margin-top: 10px;
`

type ModalProps = {
    setAddEmployeesModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddEmployee = (Props:ModalProps) => {

    const[newEmployee, setNewEmployee] = useState<IEmployee>(
        {
            firstName:"",
            lastName:"",
            address: {
                street:"",
                city:"",
                state:"",
                zipcode:"",
                id:0
            },
            salary:0,
            id:0
        }
    );

    const updateEmployeeFirstName = (e:React.ChangeEvent<HTMLInputElement>) => {
        setNewEmployee({
            address:{
                street:newEmployee.address.street,
                city:newEmployee.address.city,
                state:newEmployee.address.state,
                zipcode:newEmployee.address.zipcode,
                id:0
            },
            firstName:e.target.value,
            lastName:newEmployee.lastName,
            salary:newEmployee.salary,
            id:0
        })
    }

    const updateEmployeeLastName = (e:React.ChangeEvent<HTMLInputElement>) => {
        setNewEmployee({
            address:{
                street:newEmployee.address.street,
                city:newEmployee.address.city,
                state:newEmployee.address.state,
                zipcode:newEmployee.address.zipcode,
                id:0
            },
            firstName:newEmployee.firstName,
            lastName:e.target.value,
            salary:newEmployee.salary,
            id:0
        })
    }

    const updateEmployeeStreet = (e:React.ChangeEvent<HTMLInputElement>) => {
        setNewEmployee({
            address:{
                street:e.target.value,
                city:newEmployee.address.city,
                state:newEmployee.address.state,
                zipcode:newEmployee.address.zipcode,
                id:0
            },
            firstName:newEmployee.firstName,
            lastName:newEmployee.lastName,
            salary:newEmployee.salary,
            id:0
        })
    }

    const updateEmployeeCity = (e:React.ChangeEvent<HTMLInputElement>) => {
        setNewEmployee({
            address:{
                street:newEmployee.address.street,
                city:e.target.value,
                state:newEmployee.address.state,
                zipcode:newEmployee.address.zipcode,
                id:0
            },
            firstName:newEmployee.firstName,
            lastName:newEmployee.lastName,
            salary:newEmployee.salary,
            id:0
        })
    }

    const updateEmployeeState = (e:React.ChangeEvent<HTMLInputElement>) => {
        setNewEmployee({
            address:{
                street:newEmployee.address.street,
                city:newEmployee.address.city,
                state:e.target.value,
                zipcode:newEmployee.address.zipcode,
                id:0
            },
            firstName:newEmployee.firstName,
            lastName:newEmployee.lastName,
            salary:newEmployee.salary,
            id:0
        })
    }

    const updateEmployeeZip = (e:React.ChangeEvent<HTMLInputElement>) => {
        setNewEmployee({
            address:{
                street:newEmployee.address.street,
                city:newEmployee.address.city,
                state:newEmployee.address.state,
                zipcode:e.target.value,
                id:0
            },
            firstName:newEmployee.firstName,
            lastName:newEmployee.lastName,
            salary:newEmployee.salary,
            id:0
        })
    }

    const updateEmployeeSalary = (e:React.ChangeEvent<HTMLInputElement>) => {
        setNewEmployee({
            address:{
                street:newEmployee.address.street,
                city:newEmployee.address.city,
                state:newEmployee.address.state,
                zipcode:newEmployee.address.zipcode,
                id:0
            },
            firstName:newEmployee.firstName,
            lastName:newEmployee.lastName,
            salary:+e.target.value,
            id:0
        })
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios.post('http://localhost:5000/employee/new', {
            address:{
                street:newEmployee.address.street,
                city:newEmployee.address.city,
                state:newEmployee.address.state,
                zipcode:newEmployee.address.zipcode,
                id:0
            },
            firstName:newEmployee.firstName,
            lastName:newEmployee.lastName,
            salary:newEmployee.salary,
            id:0
          })
          .then(function (response) {
            console.log(response);
            Props.setAddEmployeesModal(false);
          })
          .catch(function (error) {
            console.log(error);
            //if something goes wrong, you can do something here
          });
    }


    const handleModalClick = () =>{
        Props.setAddEmployeesModal(false);
    }

    return (
        <Wrapper>
            <Form onSubmit={onSubmit}>
                <Header>
                    <Title>Add New Employee</Title>
                    <Exit onClick={()=>{handleModalClick()}}>Back</Exit>
                </Header>
                <Label>First Name</Label>
                <Input type="text" maxLength={50} onChange={updateEmployeeFirstName}/>
                <Label>Last Name</Label>
                <Input type="text" maxLength={50} onChange={updateEmployeeLastName}/>
                <Label>Street</Label>
                <Input type="text" maxLength={100} onChange={updateEmployeeStreet}/>
                <Label>City</Label>
                <Input type="text" maxLength={100} onChange={updateEmployeeCity}/>
                <Label>State</Label>
                <Input type="text" maxLength={100} onChange={updateEmployeeState}/>
                <Label>Zip</Label>
                <Input type="text" maxLength={5} onChange={updateEmployeeZip}/>
                <Label>Salary</Label>
                <Input type="number" min="0" max="10000000" onChange={updateEmployeeSalary}/>
                <Submit className="btn" type="submit" value="Submit"/>
            </Form>
        </Wrapper>
        
    )
}

export default AddEmployee;