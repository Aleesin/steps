import "./App.css";
import Wizards from "./wizards/Wizards";
import styled from "styled-components";

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
`;

function App() {
  return (
    <div className="App">
      <Container>
        <Wizards />
      </Container>
    </div>
  );
}

export default App;
