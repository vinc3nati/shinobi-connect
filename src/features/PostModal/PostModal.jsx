import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { BsImage, BsEmojiSunglasses } from "react-icons/bs";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { closePostModal } from "./postModalSlice";
import { handleAddPost, handleEditPost } from "../Feed";

export const PostModal = () => {
  const { isOpen, modalData } = useSelector((store) => store.postModal);
  const { user, token } = useSelector((store) => store.auth);
  const [postInput, setPostInput] = useState({
    content: "",
    pic: "",
  });

  const [showEmoji, setShowEmoji] = useState(false);

  const modalRef = useRef();
  const emojiRef = useRef();

  const dispatch = useDispatch();

  const reset = () => {
    setPostInput((prev) => ({
      content: "",
      pic: "",
    }));
    dispatch(closePostModal());
  };

  useEffect(() => {
    if (modalData) {
      setPostInput({
        content: modalData.content,
        pic: modalData.pic,
      });
    }
  }, [modalData]);

  useOnClickOutside(modalRef, () => {
    reset();
  });
  useOnClickOutside(emojiRef, () => setShowEmoji(false));

  const emojiList = [
    "🙂",
    "😊",
    "🤗",
    "😄",
    "😅",
    "😆",
    "😂",
    "🤣",
    "😘",
    "🥰",
    "😍",
    "🤩",
    "😇",
    "😎",
    "😋",
    "😜",
    "🙃",
    "😴",
    "🤯",
    "🥳",
  ];

  const handleEmojiOpen = (e) => {
    setShowEmoji(true);
    if (e.target.childNodes.length === 1 && e.target.innerText !== "Emojis") {
      setPostInput((prev) => ({
        ...prev,
        content: prev.content + e.target.innerText,
      }));
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    const base64Promise = (file) =>
      new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.onerror = (err) => reject(err);
      });
    let base64File = await base64Promise(file);
    setPostInput((prev) => ({ ...prev, pic: base64File }));
  };

  return (
    <div
      className={`fixed p-4 left-0 right-0 top-0 h-screen z-50 ${
        isOpen ? "flex" : "hidden"
      } justify-center items-center bg-background-faint-dark`}
    >
      <div
        ref={modalRef}
        className="w-2/5 md:w-3/5 sm:w-full flex flex-col bg-background dark:bg-dark-background dark:text-dark-txt-color rounded drop-shadow-2xl"
      >
        <div className="p-4">
          <div className="flex flex-col grow gap-4">
            <div className="flex flex-col items-start gap-4 border-y border-t-0 border-primary">
              <div className="flex items-start gap-4">
                <img
                  src={user?.pic}
                  alt="profile img"
                  className="h-16 w-20 rounded-full object-cover"
                />
                <textarea
                  cols="40"
                  row="5"
                  className="grow focus:outline-none border-none text-grey-dark-2 dark:text-dark-txt-color-secondary bg-background dark:bg-dark-background resize-none p-2"
                  placeholder="Write your thoughts here...."
                  value={postInput.content}
                  onChange={(e) =>
                    setPostInput((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                ></textarea>
              </div>
              {postInput.pic && (
                <div className="relative">
                  <img
                    className="h-20 w-20 object-cover"
                    src={postInput.pic}
                    alt="Post img"
                  />
                  <IoIosCloseCircleOutline
                    className="absolute top-1 right-1 text-4xl txt-color-hover cursor-pointer text-error"
                    onClick={() =>
                      setPostInput((prev) => ({ ...prev, pic: "" }))
                    }
                  />
                </div>
              )}
            </div>
            <footer className="flex justify-between items-center font-light">
              <div className="flex items-center gap-4">
                <div className="relative flex items-center gap-3 bg-secondary-background dark:bg-dark-background-secondary py-2 px-3 rounded cursor-pointer">
                  <BsImage className="h-6 w-6 dark:text-dark-txt-color-secondary" />
                  <p className="text-primary text-sm font-semibold">
                    Photo/GIF
                  </p>
                  <input
                    className="cursor-pointer absolute w-28 opacity-0"
                    type="file"
                    title={`${
                      postInput.pic !== "" ? postInput.pic : "No file chosen"
                    }`}
                    accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/jpg,image/webp"
                    onChange={handleFileChange}
                  />
                </div>
                <div
                  className="relative flex items-center gap-3 bg-secondary-background dark:bg-dark-background-secondary py-2 px-3 rounded cursor-pointer"
                  onClick={handleEmojiOpen}
                >
                  <BsEmojiSunglasses className="h-6 w-6 dark:text-dark-txt-color-secondary" />
                  <p className="text-primary text-sm font-semibold">Emojis</p>
                  {showEmoji && (
                    <div
                      ref={emojiRef}
                      className="absolute w-48 p-4 flex flex-wrap justify-center items-center gap-1 rounded  bg-secondary-background dark:bg-dark-background-secondary"
                    >
                      {emojiList.map((item) => (
                        <span key={item} className="cursor-pointer text-2xl">
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <button
                className={`px-4 py-2 bg-primary text-white rounded uppercase tracking-wide ${
                  postInput.content
                    ? ""
                    : "cursor-not-allowed pointer-events-none bg-secondary-background dark:bg-dark-background-secondary opacity-70"
                }`}
                onClick={() => {
                  if (modalData) {
                    dispatch(
                      handleEditPost({
                        postData: {
                          ...modalData,
                          ...postInput,
                          userId: user?._id,
                        },
                        token,
                      })
                    );
                  } else {
                    dispatch(
                      handleAddPost({
                        postData: { ...postInput, userId: user?._id },
                        token,
                      })
                    );
                  }
                  reset();
                }}
              >
                Post
              </button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};
