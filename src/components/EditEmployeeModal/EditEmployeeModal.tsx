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
    employee:IEmployee,
    setEditEmployeesModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditEmployee = (Props:ModalProps) => {

    const handleModalClick = () =>{
        Props.setEditEmployeesModal(false);
    }

    const[editEmployee, setEditEmployee] = useState<IEmployee>(
        {
            firstName:Props.employee.firstName,
            lastName:Props.employee.lastName,
            address: {
                street:Props.employee.address.street,
                city:Props.employee.address.city,
                state:Props.employee.address.state,
                zipcode:Props.employee.address.zipcode,
                id:Props.employee.address.id
            },
            salary:Props.employee.salary,
            id:Props.employee.id
        }
    );

    const updateEmployeeFirstName = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEditEmployee({
            firstName:e.target.value,
            lastName:editEmployee.lastName,
            address: {
                street:editEmployee.address.street,
                city:editEmployee.address.city,
                state:editEmployee.address.state,
                zipcode:editEmployee.address.zipcode,
                id:editEmployee.address.id
            },
            salary:editEmployee.salary,
            id:editEmployee.id
        })
    } 

    const updateEmployeeLastName = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEditEmployee({
            firstName:editEmployee.firstName,
            lastName:e.target.value,
            address: {
                street:editEmployee.address.street,
                city:editEmployee.address.city,
                state:editEmployee.address.state,
                zipcode:editEmployee.address.zipcode,
                id:editEmployee.address.id
            },
            salary:editEmployee.salary,
            id:editEmployee.id
        })
    } 

    const updateEmployeeStreet = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEditEmployee({
            firstName:editEmployee.firstName,
            lastName:editEmployee.lastName,
            address: {
                street:e.target.value,
                city:editEmployee.address.city,
                state:editEmployee.address.state,
                zipcode:editEmployee.address.zipcode,
                id:editEmployee.address.id
            },
            salary:editEmployee.salary,
            id:editEmployee.id
        })
    }

    const updateEmployeeCity = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEditEmployee({
            firstName:editEmployee.firstName,
            lastName:editEmployee.lastName,
            address: {
                street:editEmployee.address.street,
                city:e.target.value,
                state:editEmployee.address.state,
                zipcode:editEmployee.address.zipcode,
                id:editEmployee.address.id
            },
            salary:editEmployee.salary,
            id:editEmployee.id
        })
    }

    const updateEmployeeState = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEditEmployee({
            firstName:editEmployee.firstName,
            lastName:editEmployee.lastName,
            address: {
                street:editEmployee.address.street,
                city:editEmployee.address.city,
                state:e.target.value,
                zipcode:editEmployee.address.zipcode,
                id:editEmployee.address.id
            },
            salary:editEmployee.salary,
            id:editEmployee.id
        })
    }

    const updateEmployeeZip = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEditEmployee({
            firstName:editEmployee.firstName,
            lastName:editEmployee.lastName,
            address: {
                street:editEmployee.address.street,
                city:editEmployee.address.city,
                state:editEmployee.address.state,
                zipcode:e.target.value,
                id:editEmployee.address.id
            },
            salary:editEmployee.salary,
            id:editEmployee.id
        })
    }
    
    const updateEmployeeSalary = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEditEmployee({
            firstName:editEmployee.firstName,
            lastName:editEmployee.lastName,
            address: {
                street:editEmployee.address.street,
                city:editEmployee.address.city,
                state:editEmployee.address.state,
                zipcode:editEmployee.address.zipcode,
                id:editEmployee.address.id
            },
            salary:+e.target.value,
            id:editEmployee.id
        })
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios.put('http://localhost:5000/employee/update', {
            firstName:editEmployee.firstName,
            lastName:editEmployee.lastName,
            address: {
                street:editEmployee.address.street,
                city:editEmployee.address.city,
                state:editEmployee.address.state,
                zipcode:editEmployee.address.zipcode,
                id:editEmployee.address.id
            },
            salary:editEmployee.salary,
            id:editEmployee.id
          })
          .then(function (response) {
            console.log(response);
            Props.setEditEmployeesModal(false);
          })
          .catch(function (error) {
            console.log(error);
            //if something goes wrong, you can do something here
          });
    }

    return (
        <Wrapper>
            <Form onSubmit={onSubmit}>
                <Header>
                    <Title>Edit Employee <b>(EmpID #{editEmployee.id}) - {editEmployee.firstName + " " + editEmployee.lastName}</b></Title>
                    <Exit onClick={()=>{handleModalClick()}}>Back</Exit>
                </Header>
                <Label>First Name</Label>
                <Input type="text" maxLength={50} value={editEmployee.firstName.toString()} onChange={updateEmployeeFirstName}/>
                <Label>Last Name</Label>
                <Input type="text" maxLength={50} value={editEmployee.lastName.toString()} onChange={updateEmployeeLastName}/>
                <Label>Street</Label>
                <Input type="text" maxLength={100} value={editEmployee.address.street.toString()} onChange={updateEmployeeStreet}/>
                <Label>City</Label>
                <Input type="text" maxLength={100} value={editEmployee.address.city.toString()} onChange={updateEmployeeCity}/>
                <Label>State</Label>
                <Input type="text" maxLength={100} value={editEmployee.address.state.toString()} onChange={updateEmployeeState}/>
                <Label>Zip</Label>
                <Input type="text" maxLength={5} value={editEmployee.address.zipcode.toString()} onChange={updateEmployeeZip}/>
                
                <Label>Salary</Label>
                <Input type="number" min="0" max="10000000" value={editEmployee.salary.toString()} onChange={updateEmployeeSalary}/>
                <Submit className="btn" type="submit" value="Submit"/>
            </Form>
        </Wrapper>
            
    )
}

export default EditEmployee;