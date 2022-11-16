import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { IEmployee } from "../../models/IEmployee";
import Employee from "../Employee/Employee";

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
    height: 210px;
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
            employeeAddress:Props.employee.employeeAddress,
            employeeName:Props.employee.employeeName,
            employeeSalary:Props.employee.employeeSalary,
            id:Props.employee.id
        }
    );

    const updateEmployeeName = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEditEmployee({
            employeeAddress:editEmployee.employeeAddress,
            employeeName:e.target.value,
            employeeSalary:editEmployee.employeeSalary,
            id:editEmployee.id
        })
    } 

    const updateEmployeeAddress = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEditEmployee({
            employeeAddress:e.target.value,
            employeeName:editEmployee.employeeName,
            employeeSalary:editEmployee.employeeSalary,
            id:editEmployee.id
        })
    }

    const updateEmployeeSalary = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEditEmployee({
            employeeAddress:editEmployee.employeeAddress,
            employeeName:editEmployee.employeeName,
            employeeSalary:+e.target.value,
            id:editEmployee.id
        })
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios.put('http://localhost:5000/employee/update', {
            id:editEmployee.id,
            employeeName:editEmployee.employeeName,
            employeeAddress:editEmployee.employeeAddress,
            employeeSalary:editEmployee.employeeSalary
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
                    <Title>Edit Employee</Title>
                    <Exit onClick={()=>{handleModalClick()}}>Back</Exit>
                </Header>
                <Label>Name</Label>
                <Input type="text" maxLength={100} value={editEmployee.employeeName.toString()} onChange={updateEmployeeName}/>
                <Label>Address</Label>
                <Input type="text" maxLength={300} value={editEmployee.employeeAddress.toString()} onChange={updateEmployeeAddress}/>
                <Label>Salary</Label>
                <Input type="number" min="0" max="10000000" value={editEmployee.employeeSalary.toString()} onChange={updateEmployeeSalary}/>
                <Submit className="btn" type="submit" value="Submit"/>
            </Form>
        </Wrapper>
            
    )
}

export default EditEmployee;