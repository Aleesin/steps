import { useEffect } from "react";
import ScreensContainer from "../../ScreensContainer";

const FirstScreen = ({ onChange, position }) => {
  useEffect(() => {
    console.log("Rendering Second wizard - First screen");
  }, []);
  return (
    <ScreensContainer>
      <div>
        <div>Position:</div>
        <div>
          <input
            value={position}
            name="position"
            onChange={onChange}
            type="text"
          />
        </div>
      </div>
    </ScreensContainer>
  );
};

export default FirstScreen;
