import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsCamera } from "react-icons/bs";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { handleUserUpdate } from "../../features/Auth";

export const ProfileModal = ({ setShowProfileModal }) => {
  const { user, token } = useSelector((store) => store.auth);
  const [userData, setUserData] = useState({
    bio: user?.bio,
    pic: user?.pic,
    link: user?.link,
    file: user?.file,
  });

  const ref = useRef();

  const dispatch = useDispatch();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.onerror = (error) => reject(error);
      });

    let base64File = await toBase64(file);
    setUserData((prev) => ({ ...prev, pic: base64File }));
  };

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useOnClickOutside(ref, () => setShowProfileModal(false));

  return (
    <div className="h-screen w-screen fixed inset-0 flex justify-center items-center z-50 bg-background-faint-dark">
      <div
        ref={ref}
        className="flex flex-col gap-4 p-5 rounded sm:w-10/12 md:9/12 lg:w-9/12 w-1/3 bg-background dark:bg-dark-background-secondary"
      >
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <p className="w-16 text-xl font-semibold text-dark-txt-color-secondary">
              Photo
            </p>
            <div className="w-12 relative">
              <img
                src={
                  userData?.pic ||
                  "https://res.cloudinary.com/randomwave45/image/upload/v1650009612/naruto-g6c7a1d375_1920_wqr1rh.png"
                }
                className="rounded-full object-cover w-12 h-12"
                alt="user pic"
              />
              <div className="cursor-pointer">
                <BsCamera className="text-grey-dark-3 dark:text-tertiary absolute left-0 top-8" />
                <input
                  className="absolute left-0 right-8 w-5 h-5 top-8 opacity-0"
                  accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/jpg,image/webp"
                  type="file"
                  onChange={handleFileChange}
                ></input>
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-4">
            <p className="text-xl text-dark-txt-color-secondary font-semibold">
              Bio
            </p>
            <textarea
              name="bio"
              cols="40"
              row="5"
              className="px-2 focus:outline-none resize-none dark:bg-dark-background-secondary dark:text-dark-txt-color"
              value={userData.bio}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-4">
            <p className="text-lg text-dark-txt-color-secondary font-semibold">
              Link
            </p>
            <input
              name="link"
              className="flex-1 border border-solid border-dark-txt-color-secondary dark:bg-dark-background-secondary dark:text-dark-txt-color rounded px-2 focus:outline-none"
              value={userData.link}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="rounded px-2 py-1 bg-primary text-white hover:bg-blue-400"
            onClick={() => {
              dispatch(
                handleUserUpdate({ userData: { ...user, ...userData }, token })
              );
              setShowProfileModal(false);
            }}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};
