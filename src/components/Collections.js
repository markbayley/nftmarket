import { Link } from "react-router-dom";
import { TransactionContext } from "../context/TransactionContext";
import { useContext } from "react";
import { collections } from "../data/collections";

const Collections = () => {
  const { handleCollection, topCollections } = useContext(TransactionContext);

   console.log("topCollections", topCollections)
  return (
    <div className="md:mt-12 md:mb-36 mb-8">
      {/* HEADING */}
      <div className="flex w-full justify-start items-center fade-in ">
        <div className="flex mf:flex-row flex-col items-center justify-between md:px-20 py-5 px-4 ">
          <div className="flex-1 flex flex-col justify-start items-start w-half">
            <h1 className="text-white text-3xl sm:text-5xl py-2  ">
              Top Collections
            </h1>
            <h2 className="text-left mb-3 text-gradient text-xl ">
              View what top artists have created
            </h2>
          </div>
        </div>
      </div>

      {/* LINKS */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 place-items-center px-4 gap-6  md:px-20 w-full ">
        {collections.map((collection, index) => {
          return (
            <Link
              to={{ pathname: `/Explore/${collection.name}` }}
              key={collection.id}
            >
              <button
                id="collection"
                value={collection.name}
                onClick={(id) => handleCollection(id)}
                className="flex items-end rounded-full h-[8.5em] w-[8.5em] sm:h-[12em] sm:w-[12em] bg-cover bg-center border-transparent hover:border-indigo-500 shadow-xl hover:border-2 hover:scale-[1.15] shadow-indigo-500/25 duration-200 hover:shadow-indigo-500/50"
                style={{
                  backgroundImage: `url(${collection.image})`,
                }}
              >
                <span className="pointer-events-none bg-yellow-600 py-1 px-2 rounded-full text-white text-xs md:text-sm">
                  {" "}
                  #{collection.id} {collection.name}
                </span>
              </button>{" "}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Collections;
