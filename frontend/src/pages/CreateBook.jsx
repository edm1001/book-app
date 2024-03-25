import { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  // const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post('http://localhost:3331/books', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Created successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
        enqueueSnackbar('Error check console', { variant: 'error' });
        console.log(error);
      });
  };
  // const handleSaveBook = () => {
  //   const data = {
  //     title,
  //     author,
  //     publishYear,
  //   };

  //   setLoading(true);
  //   // const formData = new FormData();
  //   // formData.append("title", title);
  //   // formData.append("author", author);
  //   // formData.append("publishYear", publishYear);
  //   // if (image) {
  //   //   formData.append("image", image);
  //   // }
  //   axios
  //     .post("http://localhost:3331/books", data)
  //     // , {
  //     // headers: {
  //     //   "Content-Type": "multipart/form-data",
  //     // },
  //     // }
  //     .then(() => {
  //       setLoading(false);
  //       enqueueSnackbar("Book created successfully", { variant: "success" });
  //       navigate("/");
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       enqueueSnackbar("check console for error", { variant: "error" });
  //       console.log(err);
  //     });
  // };
  
  // function sendImage(ev) {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(ev.target.files[0]);
  //   reader.onload = () => {
  //     handleSaveBook(null, {
  //       info: ev.target.files[0],
  //       data: reader.result,
  //     })
  //   }
  // }

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4 text-center mt-12 text-4xl">Create Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 bg-blue-100 rounded-xl w-[600px] p-4 mx-auto mt-12">
        <div className="my-4">
          <label htmlFor="title" className="text-xl mr-4">
            Title:
          </label>
          <input
            className="border border-2 rounded-md border-slate-300"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="my-4">
          <label htmlFor="author" className="text-xl mr-4">
            Author:
          </label>
          <input
            className="border border-2 rounded-md border-slate-300"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="my-4">
          <label htmlFor="publishYear" className="text-xl mr-4">
            Publish Year
          </label>
          <input
            className="border border-2 rounded-md border-slate-300"
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
          />
        </div>
        {/* <div className="my-4">
          <label htmlFor="image" className="text-xl mr-4">
            Image:
          </label>
          <input
            type="file"
            // onChange={sendImage}
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div> */}
        <button
          className="p-2 bg-sky-300 hover:bg-sky-200 m-8 rounded-md"
          onClick={handleSaveBook}
        >
          Save
        </button>
        {/* {image && (
          <div>
            <label>Preview:</label>
            <img
              src={URL.createObjectURL(image)}
              alt="Book preview"
              style={{ maxWidth: "200px" }}
            />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default CreateBook;
