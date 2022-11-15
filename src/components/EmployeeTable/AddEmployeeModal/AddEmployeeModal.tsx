import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { IEmployee } from "../../../models/IEmployee";

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
    justify-content: right;
`

const Exit = styled.button`
    margin: 5px;
    cursor: pointer;
`

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
    setAddEmployeesModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddEmployee = (Props:ModalProps) => {

    const[newEmployee, setNewEmployee] = useState<IEmployee>(
        {
            employeeAddress:"",
            employeeName:"",
            employeeSalary:0,
            id:0
        }
    );

    const updateEmployeeName = (e:React.ChangeEvent<HTMLInputElement>) => {
        setNewEmployee({
            employeeAddress:newEmployee.employeeAddress,
            employeeName:e.target.value,
            employeeSalary:newEmployee.employeeSalary,
            id:0
        })
    }

    const updateEmployeeAddress = (e:React.ChangeEvent<HTMLInputElement>) => {
        setNewEmployee({
            employeeAddress:e.target.value,
            employeeName:newEmployee.employeeName,
            employeeSalary:newEmployee.employeeSalary,
            id:0
        })
    }

    const updateEmployeeSalary = (e:React.ChangeEvent<HTMLInputElement>) => {
        setNewEmployee({
            employeeAddress:newEmployee.employeeAddress,
            employeeName:newEmployee.employeeName,
            employeeSalary:+e.target.value,
            id:0
        })
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios.post('http://localhost:5000/employee/new', {
            employeeName:newEmployee.employeeName,
            employeeAddress:newEmployee.employeeAddress,
            employeeSalary:newEmployee.employeeSalary
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
                    <Exit onClick={()=>{handleModalClick()}}>Back</Exit>
                </Header>
                <Label>Name</Label>
                <Input type="text" onChange={updateEmployeeName}/>
                <Label>Address</Label>
                <Input type="text" onChange={updateEmployeeAddress}/>
                <Label>Salary</Label>
                <Input type="number" onChange={updateEmployeeSalary}/>
                <Submit className="btn" type="submit" value="Submit"/>
            </Form>
        </Wrapper>
        
    )
}

export default AddEmployee;