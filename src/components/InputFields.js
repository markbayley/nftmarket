import React, { useEffect } from "react";
import MainImage from "./MainImage";
import CreateButton from "./CreateButton";

const colours = [
  {
    name: "Colours",
  },
  {
    name: "seagreen", color: "#2E8B57"
  },
 
  {
    name: "green", color: "#008000"
  },
  {
    name: "forestgreen", color: "#228B22"
  },
  {
    name: "limegreen", color: "#32CD32"
  },
 
  {
    name: "greenyellow", color: "#ADFF2F"
  },
 
  {
    name: "yellow", color: "#FFFF00"
  },
 
  {
    name: "gold", color: "#FFD700"
  },
  {
    name: "orange", color: "#FFA500"
  },
  {
    name: "tomato", color: "#FF6347"
  },
 
  {
    name: "red", color: "#FF0000"
  },
  {
    name: "crimson", color: "#DC143C"
  },


  {
    name: "hotpink", color: "#FF69B4"
  },
  {
    name: "orchid", color: "#DA70D6"
  },
 
  {
    name: "violet", color: "#EE82EE"
  },

  {
    name: "plum", color: "#DDA0DD"
  },
  {
    name: "lightpink", color: "#FFB6C1"
  },
  {
    name: "lightcoral", color: "#F08080"
  },
  // {
  //   name: "salmon", color: "#FA8072"
  // },
  {
    name: "coral", color: "#FF7F50"
  },
 
  {
    name: "darkorchid", color: "#9932CC"
  },
  {
    name: "mediumorchid", color: "#BA55D3"
  },



  {
    name: "slateblue", color: "#6A5ACD"
  },
  {
    name: "royalblue", color: "#4169E1"
  },
  {
    name: "dodgerblue", color: "#1E90FF"
  },
  {
    name: "steelblue", color: "#4682B4"
  },
 
  {
    name: "skyblue", color: "#87CEEB"
  },
  {
    name: "paleturquoise", color: "#AFEEEE"
  },
  {
    name: "aquamarine",  color: "#7FFFD4"
  },
  {
    name: "turquoise",  color: "#40E0D0"
  },
  {
    name: "cadetblue", color: "#5F9EA0"
  },

  {
    name: "teal", color: "#008080"
  },
  {
    name: "darkcyan", color: "#008B8B"
  },
 
 
  {
    name: "olivedrab", color: "#6B8E23"
  },
  {
    name: "olive", color: "#808000"
  },
  {
    name: "wheat", color: "#F5DEB3"
  },



  {
    name: "darkkhaki", color: "#BDB76B"
  },
  {
    name: "goldenrod", color: "#DAA520"
  },
  {
    name: "peru", color: "#CD853F"
  },
  {
    name: "chocolate", color: "#D2691E"
  },
  {
    name: "sienna", color: "#A0522D"
  },
  {
    name: "brown", color: "#A52A2A"
  },
 
 
];

const artists = [
  {
    name: "Artists",
  },
  {
    name: "Banksy",
  },
  {
    name: "Hasui Kawase",
  },
  {
    name: "Makoto Shinkai",
  },
  {
    name: "Greg Rutkowski",
  },
  {
    name: "Alphonse Mucha",
  },
  {
    name: "Pablo Picasso",
  },
  {
    name: "M.C. Escher",
  },
  {
    name: "Claude Monet",
  },
  {
    name: "Salvadore Dali",
  },
  {
    name: "Vincent Van Gogh",
  },
  {
    name: "Rembrandt",
  },
  {
    name: "Paul Cézanne",
  },
  {
    name: "Gustav Klimt",
  },
  {
    name: "Henry Matisse",
  },
  {
    name: "Jackson Pollock",
  },
  {
    name: "Mark Rothko",
  },
  {
    name: "Brett Whiteley",
  },
];

const styles = [
  {
    name: "Styles",
  },
  {
    name: "Hyper Realistic",
  },
  {
    name: "Cyberpunk",
  },
  {
    name: "Artstation",
  },
  {
    name: "Abstract",
  },
  {
    name: "Fantasy Art",
  },
  {
    name: "Anime",
  },
  {
    name: "Comic Book",
  },
  {
    name: "Graphic Novel",
  },
  {
    name: "Childrens Book",
  },
  {
    name: "Steampunk",
  },
  {
    name: "Pop Art",
  },
  {
    name: "Renaissance",
  },
  {
    name: "Expressionism",
  },
  {
    name: "Surrealism",
  },
  {
    name: "Realism",
  },
  {
    name: "Minimalism",
  },
  {
    name: "Impressionism",
  },
  {
    name: "Cubism",
  },
  {
    name: "Modernism",
  },
];

const mediums = [
  {
    name: "Mediums",
  },
  {
    name: "Print",
  },
  {
    name: "Sketch",
  },
  {
    name: "Digital",
  },
  {
    name: "Illustration",
  },
  {
    name: "Cinematic",
  },
  {
    name: "Lithograph",
  },
  {
    name: "Drawing",
  },
  {
    name: "Pastels",
  },
  {
    name: "Film Shot",
  },
  {
    name: "Photograhy",
  },
  {
    name: "Watercolor",
  },
  {
    name: "Oil Canvas",
  },
  {
    name: "Charcoal",
  },
  {
    name: "Ink Paint",
  },
  // {
  //   name: "Gouche",
  // },
  {
    name: "Acrylic",
  },
  {
    name: "Pencil",
  },
  {
    name: "Crayon",
  },
];

const subjects = [
  {
    name: "Category",
  },
  {
    name: "Cute Animal",
  },
  {
    name: "Portrait",
  },
  {
    name: "Figure",
  },
  {
    name: "Face",
  },
  {
    name: "Girl",
  },
  {
    name: "Boy",
  },
  {
    name: "Warrior",
  },
  {
    name: "Fruit Bowl",
  },
  {
    name: "Streetscape",
  },
  {
    name: "Seascape",
  },
  {
    name: "Landscape",
  },
  {
    name: "Nature",
  },

  {
    name: "Building",
  },
  {
    name: "City",
  },
  {
    name: "Vehicle",
  },
];

const patterns = [
  {
    name: "Textures",
  },
  {
    name: "Highly Detailed",
  },
  {
    name: "Matte",
  },
  {
    name: "Glossy",
  },
  {
    name: "Octane Render",
  },
  {
    name: "Metalic",
  },
  {
    name: "Stripes",
  },
  {
    name: "Checkered",
  },
  {
    name: "Dots",
  },
  {
    name: "Zig Zags",
  },
  {
    name: "Curves",
  },
  {
    name: "Speckled",
  },
  {
    name: "Swirls",
  },
  {
    name: "Spiked",
  },
  {
    name: "Soft",
  },
  {
    name: "Angular",
  },
  {
    name: "Smooth",
  },
  {
    name: "Rough",
  },
  {
    name: "Golden Ratio",
  },
];

const InputFields = ({
  setTitle,
  setDescription,
  setFormData,
  formData,
  style,
  active,
  medium,
  subject,
  artist,
  pattern,
  colour,
  setActive,
  setKeyword,
  keyword,
  handleNftData,
  nftData,
  isCreating, mintHandler, isMinting, image, url, OnChangeFile, isUploading, fileURL, setChecked, checked 
}) => {
  const patternWords = active.filter((word) =>
    patterns.some((pattern) => pattern.name === word)
  );

  const colourWords = active.filter((word) =>
    colours.some((colour) => colour.name === word)
  );

  const mywords = colours.filter((colour) => 
       colours.some((colour) => colour.color === colour)
  );

  const subjectWords = active.filter((word) =>
    subjects.some((subject) => subject.name === word)
  );

  const mediumWords = active.filter((word) =>
    mediums.some((medium) => medium.name === word)
  );

  const styleWords = active.filter((word) =>
    styles.some((style) => style.name === word)
  );

  const artistWords = active.filter((word) =>
    artists.some((artist) => artist.name === word)
  );

  const handleFormChange = (e) => {
    let title = e.target.id
    setActive([...active, e.target.value]);
    setFormData({ ...formData,  [title]: e.target.value });
    // console.log(active);
  };

  const handleChecked = (e) => {
    e.preventDefault();

    if (active.includes(e.target.value)) {
      const newActive = active.filter((item) => item !== e.target.value);
      setActive(newActive);
    } else {
      setActive((prevArr) => [...prevArr, e.target.value]);
     
    }
  };

//  console.log("formDataIF", formData)

  return (
    <div className="p-5 my-8  w-full flex flex-col justify-start items-start blue-glassmorphism " >
      <div className="select ">
        <input className="my-2 w-half rounded-sm p-2 outline-none bg-transparent text-white border-none white-glassmorphism"
          required
          type="text"
          placeholder="NFT Title..."
          onChange={(e) => {
            setTitle(e.target.value);
            setFormData({ ...formData, title: e.target.value });
          }}
        ></input>
        <input className="my-2 w-half rounded-sm p-2 outline-none bg-transparent text-white border-none white-glassmorphism "
          required
          type="text"
          placeholder="NFT Description..."
          onChange={(e) => {
            setDescription(e.target.value);
            setFormData({ ...formData, description: e.target.value });
          }}
        ></input>
      </div>

      <div className="check">
        <select value={style} id="style" onChange={(id) => handleFormChange(id)} className="text-white outline-none blue-glassmorphism ">
          {styles.map((style, index) => (
            <option key={index} value={style.name} >
              {style.name}
            </option>
          ))}
        </select>
        <select value={artist} id="artist" onChange={(id) => handleFormChange(id)} className="text-white outline-none blue-glassmorphism">
          {artists.map((artist, index) => (
            <option key={index} value={artist.name}>
              {artist.name}
            </option>
          ))}
        </select>
      </div>

      <div className="check">
        <div className="tabs">
          {styleWords.slice(0, 4).map((item, index) => (
            <button
              key={index}
              onClick={handleChecked}
              value={item}
              className={`fade-in button ${
                active.includes(item) ? "activeButton" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className=" tabs">
          {artistWords.slice(0, 4).map((item, index) => (
            <button
              key={index}
              onClick={handleChecked}
              value={item}
              className={`fade-in button ${
                active.includes(item) ? "activeButton" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="check">
        <select value={pattern}id="pattern" onChange={(id) => handleFormChange(id)} className="text-white outline-none blue-glassmorphism">
          {patterns.map((pattern, index) => (
            <option key={index} value={pattern.name}>
              {pattern.name}
            </option>
          ))}
        </select>
        <select value={colour} id="colour" onChange={(id) => handleFormChange(id)} className="text-white outline-none blue-glassmorphism">
          {colours.map((colour, index) => (
              <option
              key={index}
              value={colour.name}
           
            >
              {colour.name}
            </option>
          ))}
        </select>
      </div>

      <div className="check">
        <div className="tabs">
          {patternWords.slice(0, 4).map((item, index) => (
            <button
              key={index}
              onClick={handleChecked}
              value={item}
              className={`fade-in button ${
                active.includes(item) ? "activeButton" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className=" tabs">
          {colourWords.slice(0, 5).map((item, index) => (
            <button style={{backgroundColor: item}} className="colourButton fade-in"
              key={index}
              onClick={handleChecked}
              value={item}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="check">
        <select value={subject.name} id="subject" onChange={(id) => handleFormChange(id)} className="text-white outline-none blue-glassmorphism">
          {subjects.map((subject, index) => (
            <option key={index} value={subject.name}>
              {subject.name}
            </option>
          ))}
        </select>

        {/* <select value={medium} id="medium"   name="medium" onChange={handleNftData}
          // handleFormChange(id)
          className="text-white outline-none blue-glassmorphism" >
          {mediums.map((medium, index) => (
            <option key={index} value={medium.name}>
              {medium.name}
            </option>
          ))}
        </select> */}
           <div className="">
                  <input
                    className="ml-3 p-3  md:w-96 w-40 rounded-lg outline-none shadow-2xl text-white border-none blue-glassmorphism"
                    type="number"
                    placeholder="Price 0.01 ETH"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                     setFormData({ ...formData, price: e.target.value })
                    }
                  ></input>
                </div>
             
      </div>

      <div className="check">
        {/* <div className="tabs">
          {subjectWords.slice(0, 4).map((item, index) => (
            <button
              key={index}
              onClick={handleChecked}
              value={item}
              className={`fade-in button ${
                active.includes(item) ? "activeButton" : ""
              }`}
            >
              {item}
           
            </button>
          ))}
        </div> */}

        <div className=" tabs">
          {mediumWords.slice(0, 4).map((item, index) => (
            <button
              key={index}
              onClick={handleChecked}
              value={item}
              className={`fade-in button ${
                active.includes(item) ? "activeButton" : ""
              }`}
            >
              {item}
              {/* <span className="icon">+</span>  */}
            </button>
          ))}
        </div>


     

      </div>
    <CreateButton
              isCreating={isCreating}
              isMinting={isMinting}
              image={image}
              mintHandler={mintHandler}
              url={url}
              nftData={nftData}
              OnChangeFile={OnChangeFile}
              isUploading={isUploading}
              fileURL={fileURL}
              setChecked={setChecked}
              checked={checked}
            />
     

      {/* <div className="check tabs">
        {active.slice(0, 16).map((item, index) => (
          <button
            key={index}
            onClick={handleChecked}
            value={item}
            className={`button ${active.includes(item) ? "activeButton" : ""}`}
          >
          {item} 
          <span className="icon">+</span> 
          </button>
        ))}
      </div> */}
    </div>
  );
};

export default InputFields;