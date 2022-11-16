import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { IEmployee } from "../../models/IEmployee";
import EmployeeTable from "../EmployeeTable/EmployeeTable";

const Wrapper = styled.div`
height: 100vh;
weight: 100%;
`
const Employee = () => {
    const[employees, setEmployees] = useState<IEmployee[]>([]);
    const[addEmployeeModal, setAddEmployeeModal] = useState<boolean>(false);
    const[editEmployeeModal, setEditEmployeeModal] = useState<boolean>(false);

  //calls for all employee when page is mounted
  useEffect(()=>{
    const getAllEmployee = async () => {
        let employeeList:IEmployee[] = [];
        const result = await axios.get<IEmployee[]>("http://localhost:5000/employee/all");
        console.log(result.data)
        for(const employee of result.data){
            employeeList.push(employee);
        }
        setEmployees(employeeList);
    } 
    getAllEmployee();
},[addEmployeeModal, editEmployeeModal])

  return (
    <Wrapper>
      <EmployeeTable 
        employees={employees} 
        setEmployees={setEmployees}
        addEmployeeModal={addEmployeeModal}
        setAddEmployeesModal={setAddEmployeeModal}
        editEmployeeModal={editEmployeeModal}
        setEditEmployeesModal={setEditEmployeeModal}
        />
    </Wrapper>  
  );
}

export default Employee;