import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import FirstWizard from "./first/FirstWizard";
import SecondWizard from "./second/SecondWizard";
import FifthPage from "./third/screens/FifthPage";
import FourthPage from "./third/screens/FourthPage";

const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 50px;
`;

const WizardsContainer = ({ children, activeWizard }) => {
  useEffect(() => {
    console.log("Rendering Wizards container...");
  }, []);

  const Wizards = useMemo(() => {
    return React.Children.toArray(children);
  }, [children]);

  const ActiveWizard = useMemo(() => {
    return React.cloneElement(Wizards[activeWizard], {});
  }, [activeWizard, Wizards]);

  return <>{ActiveWizard}</>;
};

const Screens = [FirstWizard, SecondWizard];

const ScreensPerWizared = Screens.reduce(
  (all, current, index) => {
    const totalScreens = all.totalScreens;
    return {
      map: {
        ...all.map,
        [index]: totalScreens,
      },
      totalScreens: all.totalScreens + current.length,
    };
  },
  { map: {}, totalScreens: 0 }
).map;

const Wizards = () => {
  const [activeScreen, setActiveScreen] = useState(0);
  const [nextWizard, setNextWizard] = useState(0);
  const [hasNext, setNext] = useState(true);
  const [hasPrevious, setPrevious] = useState(false);
  const [canSkip, setSkip] = useState(true);
  const [user, setUser] = useState({
    username: "",
    lastName: "",
    address: "",
    position: "",
    salary: "",
  });

  const totalScreens = useMemo(() => Screens.flat().length, []);

  const resolveNextScreenIndexOnSkip = useMemo(
    () =>
      Screens.map((wizard) => wizard.length).reduce(
        (acc, curr, index) => ({
          ...acc,
          ...new Array(curr).fill(0).reduce((all, occurence, idx) => {
            const lastWizardIndex = Object.keys(acc).length;
            const lastScreenIndex = acc[lastWizardIndex - 1] || 0;
            return {
              ...all,
              [lastWizardIndex + idx]: lastScreenIndex + 1,
            };
          }, {}),
        }),
        {}
      ),
    []
  );

  useEffect(() => {
    if (activeScreen > 0) {
      setPrevious(true);
    } else if (activeScreen === 0) {
      setPrevious(false);
    }
    if (activeScreen === totalScreens - 1) {
      setNext(false);
    } else {
      setNext(true);
    }
  }, [activeScreen, totalScreens]);

  useEffect(() => {
    setSkip(Object.hasOwnProperty.call(ScreensPerWizared, nextWizard + 1));
  }, [nextWizard]);

  const nextScreen = useCallback(() => {
    if (activeScreen < totalScreens - 1) {
      setActiveScreen((activeScreen) => {
        const nextScreen = activeScreen + 1;
        setNextWizard(resolveNextScreenIndexOnSkip[nextScreen] - 1);
        return nextScreen;
      });
    }
  }, [activeScreen, totalScreens]);

  const previousScreen = useCallback(() => {
    if (activeScreen > 0) {
      setActiveScreen((activeScreen) => {
        const nextScreen = activeScreen - 1;
        setNextWizard(resolveNextScreenIndexOnSkip[nextScreen] - 1);
        return nextScreen;
      });
    }
  }, [activeScreen]);

  const skip = useCallback(() => {
    const nextWizard = resolveNextScreenIndexOnSkip[activeScreen];
    setNextWizard(nextWizard);
    if (nextWizard < Screens.length) {
      setActiveScreen(ScreensPerWizared[nextWizard]);
    }
  }, [resolveNextScreenIndexOnSkip, activeScreen, totalScreens]);

  const updateUser = useCallback((event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser((user) => ({
      ...user,
      [name]: value,
    }));
  }, []);

  return (
    <div style={{ justifyContent: "center" }}>
      <WizardsContainer activeWizard={activeScreen}>
        {Screens.flat().map((Screen, index) => (
          <Screen key={index} onChange={updateUser} {...user} />
        ))}
      </WizardsContainer>
      <ButtonsContainer>
        <button onClick={previousScreen} disabled={!hasPrevious}>
          Previous
        </button>
        <button onClick={nextScreen} disabled={!hasNext}>
          Next
        </button>
        <button onClick={skip} disabled={!canSkip}>
          Skip
        </button>
      </ButtonsContainer>
    </div>
  );
};

export default Wizards;
