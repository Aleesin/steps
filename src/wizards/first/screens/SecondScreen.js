import { useEffect } from "react";
import ScreensContainer from "../../ScreensContainer";

const SecondScreen = ({ onChange, address }) => {
  useEffect(() => {
    console.log("Rendering First wizard - Second screen");
  }, []);

  return (
    <ScreensContainer>
      <div>
        <div>Adresse:</div>
        <div>
          <input
            value={address}
            name="address"
            onChange={onChange}
            type="text"
          />
        </div>
      </div>
    </ScreensContainer>
  );
};

export default SecondScreen;
