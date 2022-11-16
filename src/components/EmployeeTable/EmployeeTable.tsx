import styled from "styled-components";
import { IEmployee } from "../../models/IEmployee";
import AddEmployeeModal from "../AddEmployeeModal/AddEmployeeModal";
import { RemoveRedEye, Create, Delete } from "@mui/icons-material";
import EditEmployeeModal from "../EditEmployeeModal/EditEmployeeModal";
import { useState } from "react";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: top;
    align-items: center;
    flex-direction: column;
`

const Header = styled.div`
    width: 700px;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Title = styled.h1`
    font-weight: 600;
`

const Button = styled.button`
    background-color: #38b338;
    border: none;
    border-radius: 5px;
    height: 30px;
    color: white;
    cursor: pointer;
    margin-bottom: -10px;
    padding: 0 10px;
`

const Table = styled.table`
    width: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TableHead = styled.thead`
    width: 100%;
`;

const TableBody = styled.tbody`
    width: 100%;
    height: 30%;
`;

const TableRow = styled.tr`
    display: flex;
    justify-contents: stretch;
    align-items: center;
    // background-color: gray;
`;

const TableData = styled.td`
    font-size: .8rem;
    font-weight: 600;
    width: 20%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: left;
    padding-left: 2%;
    border: 1px solid gray;
`;

const ID = styled(TableData)`
    width: 3%; 
`;

const Name = styled(TableData)`
    width: 25%; 
`;

const Address = styled(TableData)`
    width: 30%; 
`;

const Salary = styled(TableData)`
    width: 15%; 
`;

const Action = styled(TableData)`
    width: 17%; 
`;

const ViewIcon = styled(RemoveRedEye)`
    color: #0dbcff;
    padding-right: 5px;
    cursor: pointer;
`;

const PencilIcon = styled(Create)`
    color: #0dbcff;
    padding-right: 5px;
    cursor: pointer;
`;

const TrashIcon = styled(Delete)`
    color: #0dbcff;
    cursor: pointer;
`;

type EmployeeTableProps = {
    employees: IEmployee[],
    setEmployees: React.Dispatch<React.SetStateAction<IEmployee[]>>,
    addEmployeeModal: boolean,
    setAddEmployeesModal: React.Dispatch<React.SetStateAction<boolean>>,
    editEmployeeModal: boolean,
    setEditEmployeesModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmployeeTable = (Props:EmployeeTableProps) => {

    const[editEmployee, setEditEmployee] = useState<IEmployee>(
        {
            employeeAddress:"",
            employeeName:"",
            employeeSalary:0,
            id:0
        }
    );
    //sets an empty array of employees to begin with    
    const handleAddModalClick = () =>{
        Props.setAddEmployeesModal(true);
    }

    const handleEditModalClick = (employee:IEmployee) =>{
        setEditEmployee({
            employeeAddress:employee.employeeAddress,
            employeeName:employee.employeeName,
            employeeSalary:employee.employeeSalary,
            id:employee.id
        })
        Props.setEditEmployeesModal(true);
    }


    return (
        <Wrapper>
            <Header>
               <Title>Employees Details</Title> 
               <Button onClick={()=>handleAddModalClick()}><b>+</b> Add New Employee</Button>
            </Header>
            <Table>
             <TableHead>
                     <TableRow>
                        <ID><b>#</b></ID>
                        <Name><b>Name</b></Name>
                        <Address><b>Address</b></Address>
                        <Salary><b>Salary</b></Salary>
                        <Action><b>Action</b></Action>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        Props.employees.map((employee)=>{
                            return (
                                <TableRow key={employee.id}>
                                    <ID>{employee.id}</ID>
                                    <Name>{employee.employeeName}</Name>
                                    <Address>{employee.employeeAddress}</Address>
                                    <Salary>{employee.employeeSalary}</Salary>
                                    <Action>
                                        <ViewIcon/>
                                        <PencilIcon onClick={()=>handleEditModalClick(employee)}/>
                                        <TrashIcon/>
                                    </Action>
                                </TableRow>
                            )
                            // return <p key={employee.id}>{employee.employeeName}</p>
                        })
                    }
                </TableBody>
            </Table>
            {
                Props.addEmployeeModal ? <AddEmployeeModal setAddEmployeesModal={Props.setAddEmployeesModal}/> : <div></div>
            }
            {
                Props.editEmployeeModal ? <EditEmployeeModal employee={editEmployee} setEditEmployeesModal={Props.setEditEmployeesModal}/> : <div></div>
            }
        </Wrapper>
    )
}

export default EmployeeTable;