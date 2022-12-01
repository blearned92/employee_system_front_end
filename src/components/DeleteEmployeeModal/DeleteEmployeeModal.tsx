import axios from "axios";
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
height: 210px;
width: 450px;
background-color: #b7b0b0;
border-radius: 10px;
border: 2px solid black;
display: flex;
flex-direction: column;
align-items: center;
`;

const ButtonContainer = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Submit = styled.button`
    width: 20%;
    height: 50px;
    margin: 10px;
    cursor: pointer;
`

type ModalProps = {
    employee:IEmployee,
    setDeleteEmployeesModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteEmployee = (Props:ModalProps) => {

    const handleModalClick = () =>{
        Props.setDeleteEmployeesModal(false);
    }

    const onSubmitYes = () => {
        axios.delete(`http://localhost:5000/employee/delete/${Props.employee.id}`)
          .then(function (response) {
            console.log(response);
            Props.setDeleteEmployeesModal(false);
          })
          .catch(function (error) {
            console.log(error);
            //if something goes wrong, you can do something here
          });
    }

    const onSubmitNo = () => {
        Props.setDeleteEmployeesModal(false);
    }

    return (
        <Wrapper>
            <Form>
                <Header>
                    <Title>Remove Employee</Title>
                    <Exit onClick={()=>{handleModalClick()}}>Back</Exit>
                </Header>
                <p>Delete Employee <b>(EmpID #{Props.employee.id}) - {Props.employee.firstName + " " + Props.employee.lastName}</b> ?</p>
                <ButtonContainer>
                    <Submit onClick={()=>{onSubmitYes()}}>Yes</Submit>
                    <Submit onClick={()=>{onSubmitNo()}}>No</Submit>
                </ButtonContainer> 
            </Form>
        </Wrapper>
    )
}

export default DeleteEmployee;