import { useEffect } from "react";
import ScreensContainer from "../../ScreensContainer";

const FirstScreen = ({ username, lastName, onChange }) => {
  useEffect(() => {
    console.log("Rendering First wizard - First screen");
  }, []);
  return (
    <ScreensContainer>
      <div>
        <div>name:</div>
        <div>
          <input
            onChange={onChange}
            name="username"
            value={username}
            type="text"
          />
        </div>
        <div>last name:</div>
        <div>
          <input
            onChange={onChange}
            name="lastName"
            value={lastName}
            type="text"
          />
        </div>
      </div>
    </ScreensContainer>
  );
};

export default FirstScreen;
