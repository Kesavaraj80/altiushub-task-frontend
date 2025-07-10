import { useEffect, useState } from "react";
import {
  createApartment,
  deleteApartment,
  getApartmentList,
} from "./api/apartment";

export interface IApartment {
  name: string;
  city: string;
  rent: string;
  bedrooms: string;
}

export interface IApartmentResponse extends IApartment {
  _id: string;
  postedOn: string;
}

function App() {
  const [apartment, setApartment] = useState<IApartment>({
    name: "",
    city: "",
    rent: "",
    bedrooms: "",
  });

  const [apartmentList, setApartmentList] = useState<IApartmentResponse[]>([]);

  const fetchApartmentList = async () => {
    const data = await getApartmentList();
    setApartmentList(data);
  };

  const handleDeleteApartment = (id: string) => {
    deleteApartment(id)
      .then(() => fetchApartmentList())
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    async function fetch() {
      await fetchApartmentList();
    }
    fetch();
  }, []);

  return (
    <div className="h-screen w-screen">
      <div className="h-[45%] w-full border border-red-400">
        <div className="flex flex-col  h-full">
          <h1 className="text-3xl font-bold text-center">Create Apartment</h1>
          <div className="flex flex-col items-center mt-4">
            <input
              type="text"
              className="h-10 w-100 border border-gray-300 rounded-md p-2 mt-4"
              placeholder="Enter apartment name"
              value={apartment.name}
              onChange={(e) =>
                setApartment({ ...apartment, name: e.target.value })
              }
            ></input>
            <input
              type="text"
              className="h-10 w-100 border border-gray-300 rounded-md p-2 mt-4"
              placeholder="Enter apartment city"
              value={apartment.city}
              onChange={(e) =>
                setApartment({ ...apartment, city: e.target.value })
              }
            ></input>
            <input
              type="text"
              className="h-10 w-100 border border-gray-300 rounded-md p-2 mt-4"
              placeholder="Enter bedrooms"
              value={apartment.bedrooms}
              onChange={(e) =>
                setApartment({ ...apartment, bedrooms: e.target.value })
              }
            ></input>

            <input
              type="text"
              className="h-10 w-100 border border-gray-300 rounded-md p-2 mt-4"
              placeholder="Enter Rent"
              value={apartment.rent}
              onChange={(e) =>
                setApartment({
                  ...apartment,
                  rent: e.target.value,
                })
              }
            ></input>
            <button
              className="h-10 w-100 bg-blue-500 text-white rounded-md mt-4 disabled:opacity-35 cursor-pointer"
              onClick={() => {
                createApartment(apartment);
                setApartment({
                  name: "",
                  city: "",
                  bedrooms: "",
                  rent: "",
                });
                fetchApartmentList();
              }}
              disabled={
                apartment.name === "" ||
                apartment.city === "" ||
                apartment.bedrooms === "" ||
                apartment.rent === ""
              }
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="h-[55%] w-full  flex flex-col">
        <h1 className="text-3xl font-bold text-center">Apartments in India</h1>
        <div className="h-full w-full grid grid-cols-3">
          {apartmentList.map((item) => {
            return (
              <div className="h-56 w-[575px] p-2 flex border border-gray-400 rounded-sm shadow-sm">
                <div className="h-full w-[35%]">
                  <img
                    className="h-full w-full"
                    src="http://www.listercarterhomes.com/wp-content/uploads/2013/11/dummy-image-square.jpg"
                  />
                </div>
                <div className="h-full w-[35%]">
                  <p>{item.name}</p>
                  <p>{item.city}</p>
                  <div className="flex">
                    <span>Rent:</span>
                    <p>{item.rent || "dummy"}</p>
                  </div>
                  <div className="flex ">
                    <span>Bedrooms:</span>
                    <p>{item.bedrooms}</p>
                  </div>
                  <div className="flex ">
                    <span>PostedOn:</span>
                    <p>{new Date(item.postedOn).toDateString()}</p>
                  </div>
                </div>
                <div className="h-full w-[25%] ">
                  <button className="h-10 w-full bg-blue-500 text-white rounded-md mt-4 disabled:opacity-35 cursor-pointer">
                    Update
                  </button>
                  <button
                    className="h-10 w-full bg-blue-500 text-white rounded-md mt-4 disabled:opacity-35 cursor-pointer"
                    onClick={() => handleDeleteApartment(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
