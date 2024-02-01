import NavBar from "../../../components/NavBar";
import appState from "../../../data/AppState";
import "./pattern.css";
import male from "../../../assets/icons/male.svg";

import { FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Footer from "../../../components/Footer";
import UpdateModal from "./UpdateModal";
import { addFarmImage, getFarmerImages } from "../application/profile";
import ButtonLoader from "../../../components/ButtonLoader";

function Profile() {
  var user = appState.getUserData();
  const fileInputRef = useRef(null);
  var navigate = useNavigate();

  const [pattern, setPattern] = useState("pattern1");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const patterns = ["pattern1", "pattern2", "pattern3"];

  useEffect(() => {
    window.scrollTo(0, 0);
    getFarmerImages().then((e) => {
      setIsLoading(false);
      setImages(e);
    });
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log("Selected File:", selectedFile);

    addFarmImage(selectedFile).then((e) => {
      console.log(e);
      setImages([...images, e]);
    });
  };

  return (
    <>
      <NavBar />
      <div
        className={`mt-[8vh] h-[20vh] w-full ${user?.pattern ? user?.pattern : pattern
          }`}
      ></div>
      <div className="absolute top-[20vh] left-1/2 -translate-x-1/2 bg-white rounded-full p-3 shadow-md">
        <img className="h-[100px] w-[100px]" src={male} alt="" />
      </div>
      <UpdateModal user={user} />
      <div className="flex justify-end right-10">
        <div className="dropdown md:dropdown-left  ">
          <label tabIndex={0} className="btn btn-circle btn-ghost btn-md m-4">
            <FiSettings />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li
              onClick={() => {
                //show modal and then refresh page
                const modal = document.getElementById("my_modal_1");
                const handleClose = () => {
                  if (modal.returnValue === "1") {
                    console.log("refreshing");
                    location.reload();
                    modal.removeEventListener("close", handleClose);
                  }
                };
                modal.addEventListener("close", handleClose);
                modal.showModal();
              }}
            >
              <a>Edit Details</a>
            </li>
            <li>
              <a
                onClick={() => {
                  // Switch between patterns list items
                  let index = patterns.indexOf(pattern);
                  index = (index + 1) % patterns.length;
                  setPattern(patterns[index]);
                  user.pattern = patterns[index];
                  appState.setUserData(user);
                }}
              >
                Change Pattern
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  appState.logOutUser();
                  navigate("/");
                }}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>

      <section className="flex flex-col items-center">
        {user._id !== undefined ? (
          <>
            <div className="flex flex-row items-center gap-2">
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <div className="badge badge-accent text-white p-3">
                {user.userType == undefined ? "" : user.userType.toUpperCase()}
              </div>
            </div>
            <h6 className="text-slate-700">{user.email}</h6>
            {user.phone && <h6>{`+91 ${user.phone}`}</h6>}
          </>
        ) : (
          <>
            <h1>Currently not logged in</h1>
            <button
              onClick={async () => {
                navigate("/");
              }}
              className="bg-lightColor  rounded-lg text-white font-semibold text-md  py-2 px-10 mt-5"
            >
              Login
            </button>
          </>
        )}
      </section>

      {isLoading && (
        <section className="mt-[10vh] h-[40vh] mb-[8vh] flex flex-col items-center justify-center">
          <ButtonLoader />
        </section>
      )}
      {!isLoading && (
        <section className="min-h-[40vh] mt-[10vh] mb-[8vh] w-[100%]">
          <h1 className="mb-5 mx-20">Your Farm</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-[80vw] mx-auto ">
            {images.map((e, i) => {
              return (
                <img
                  className="w-full rounded-md hover:scale-[1.025] transition-all duration-500 h-[35vh] object-cover"
                  key={i + e}
                  src={e}
                />
              );
            })}
            <div
              onClick={() => {
                fileInputRef.current.click();
              }}
              className="w-full bg-slate-100 h-[35vh] rounded-md text-black flex flex-col items-center justify-center hover:scale-[1.025] transition-all duration-500 hover:bg-slate-300 "
            >
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <p>Add Image</p>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
}

export default Profile;
