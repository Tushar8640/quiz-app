import { useState } from "react";

export default function AddLessonForm() {
  const [lessonData, setLessonData] = useState({
    title: "",
    pdfFile: null,
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", lessonData.title);
    formData.append("description", lessonData.description);
    formData.append("pdfFile", lessonData.pdfFile);

    fetch("http://localhost:5000/api/v1/lesson", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "pdfFile") {
      setLessonData((prevData) => ({
        ...prevData,
        [name]: files[0], // Store the selected file
      }));
    } else {
      setLessonData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <div>
      <section className="p-6 text-gray-800">
        <form
          onSubmit={handleSubmit}
          className="container w-full max-w-xl p-8 mx-auto space-y-6 rounded-md shadow bg-gray-50"
        >
          <h2 className="w-full text-3xl font-bold leading">Add Lesson</h2>
          <div>
            <label htmlFor="title" className="block mb-1 ml-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={lessonData.title}
              onChange={handleChange}
              placeholder="Lesson title"
              required
              className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-blue-500 bg-gray-100"
            />
          </div>
          <div>
            <label htmlFor="pdfFile" className="block mb-1 ml-1">
              PDF File
            </label>
            <input
              id="pdfFile"
              type="file"
              name="pdfFile"
              accept=".pdf" // Restrict to PDF files
              onChange={handleChange}
              required
              className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-blue-500 bg-gray-100"
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-1 ml-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={lessonData.description}
              onChange={handleChange}
              placeholder="Lesson description..."
              className="block w-full p-2 rounded autoexpand focus:outline-none focus:ring focus:ring-blue-500 bg-gray-100"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold rounded shadow focus:outline-none focus:ring focus:ring-blue-600 hover:ring bg-blue-600 text-white"
            >
              Add Lesson
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
