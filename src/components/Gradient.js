import React, { useState } from "react";

const Gradient = () => {

    const [ gradient , setGradient] = useState(null);

    const cad = "Df7Yhg85";
    var a = cad.split(cad[1, 2]);
    console.log("a", a);

  const sealArr = [
    // "radial-gradient(at 88% 35%, hsla(222, 81%, 65%, 1) 0, transparent 50%)",
    // "radial-gradient(at 31% 91%, hsla(9, 61%, 61%, 1) 0, transparent 52%)",
    // "radial-gradient(at 83% 67%, rgb(152, 231, 156) 0, transparent 58%)",
    // gradient,
    "radial-gradient(at 74% 89%, hsla(30, 98%, 60%, 1) 0, transparent 51%)",
    "radial-gradient(at 53% 75%, hsla(174, 94%, 68%, 1) 0, transparent 45%)",
    // "radial-gradient(at 67% 20%, hsla(357, 94%, 71%, 1) 0, transparent 59%)",
    // "radial-gradient(at 74% 89%, hsla(30, 98%, 65%, 1) 0, transparent 51%)",
  ];

  console.log("sealArr", sealArr)
  const getRandomColor = () => {
    setGradient(sealArr[Math.floor(Math.random() * sealArr.length)]);
};
  

  return (
    <>
    <div  onClick={getRandomColor} className="h-96 w-96 text-white border  " style={{backgroundImage: gradient}}>
    
    </div>
      <div  onClick={getRandomColor} className="h-96 w-96 text-white border eth-card seal" style={{backgroundImage: gradient}}>
    
      </div>
      </>
  );
};

export default Gradient;
