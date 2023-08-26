import {
    GiAbstract013,
    GiAbstract039,
    GiAbstract066,
    GiAbstract069,
    GiAbstract083,
    GiAbstract103,
    GiBrain,
    GiChaingun,
    GiCloudRing,
    GiCrackedSaber,
    GiCrystalEye,
    GiCrystalWand,
    GiCurlyWing,
    GiDwennimmen,
    GiFigurehead,
    GiFist,
    GiFleshyMass,
    GiHeartPlus,
    GiLaserGun,
    GiMazeCornea,
    GiSewedShell,
    GiStoneAxe,
  } from "react-icons/gi";


  const availableIcons = [
    GiAbstract013,
    GiAbstract039,
    GiAbstract066,
    GiAbstract069,
    GiAbstract083,
    GiAbstract103,
    GiBrain,
    GiChaingun,
    GiCloudRing,
    GiCrackedSaber,
    GiCrystalEye,
    GiCrystalWand,
    GiCurlyWing,
    GiDwennimmen,
    GiFigurehead,
    GiFist,
    GiFleshyMass,
    GiHeartPlus,
    GiLaserGun,
    GiMazeCornea,
    GiSewedShell,
    GiStoneAxe,
  ];


export const RandomIcons = () => {
    const randomIndex = Math.floor(Math.random() * availableIcons.length);
    const RandomIcon = availableIcons[randomIndex];

    return (
      <RandomIcon fontSize="2.4em" color="orange" className="drop-shadow " />
    );
  }
