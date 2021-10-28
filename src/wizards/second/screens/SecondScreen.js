import { useEffect } from "react";
import ScreensContainer from "../../ScreensContainer";

const SecondScreen = ({ onChange, salary }) => {
  useEffect(() => {
    console.log("Rendering Second wizard - Second screen");
  }, []);
  return (
    <ScreensContainer>
      <div>
        <div>Salary:</div>
        <div>
          <input value={salary} name="salary" onChange={onChange} type="text" />
        </div>
      </div>
    </ScreensContainer>
  );
};

export default SecondScreen;
