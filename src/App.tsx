import EmployeeTable from './components/EmployeeTable/EmployeeTable';
import styled from "styled-components";
import { useEffect, useState } from 'react';
import { IEmployee } from './models/IEmployee';
import axios from 'axios';
import AddEmployeeModal from './components/EmployeeTable/AddEmployeeModal/AddEmployeeModal';

const Wrapper = styled.div`
  height: 100vh;
  weight: 100%;
`

function App() {

  const[employees, setEmployees] = useState<IEmployee[]>([]);
  const[addEmployeeModal, setAddEmployeeModal] = useState<boolean>(false);

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
},[addEmployeeModal])

  return (
    <Wrapper>
      <EmployeeTable 
        employees={employees} 
        setEmployees={setEmployees}
        addEmployeeModal={addEmployeeModal}
        setAddEmployeesModal={setAddEmployeeModal}/>
    </Wrapper>
    
  );
}

export default App;
