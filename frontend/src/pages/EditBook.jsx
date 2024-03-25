import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3331/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setTitle(response.data.title);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert("check console for error");
        console.log(err);
      });
  }, []);

  const handleEditBook = () => {
    const data = { title, author, publishYear };
    setLoading(true);
    axios
      .put(`http://localhost:3331/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book updated successfully", { variant: "success" });
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar("Please try again or refresh page", {variant: "error" });
        console.log(err);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-12 text-center">Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-blue-400 bg-sky-100 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label htmlFor="title" className="text-xl mr-4 text-gray-500">
            title
          </label>
          <input
            className="border border-2 rounded-sm border-slate-300"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="my-4">
          <label htmlFor="author" className="text-xl mr-4 text-gray-500">
            Author
          </label>
          <input
            className="border border-2 rounded-sm border-slate-300"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="my-4">
          <label htmlFor="publishYear" className="text-xl mr-4 text-gray-500">
            Publish Year
          </label>
          <input
            className="border border-2 rounded-sm border-slate-300"
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
          />
        </div>
        <button
          className="p-2 bg-sky-300 hover:bg-sky-200 m-8 rounded-md"
          onClick={handleEditBook}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
