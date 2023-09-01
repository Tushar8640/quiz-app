import { useEffect, useState } from "react";
import { useGetLessonsQuery } from "../../app/features/lesson/lessonApi";
import { useAddQuizMutation } from "../../app/features/quiz/quizApi";

export default function AddQuizForm() {
  const { data: lessonsData } = useGetLessonsQuery();
  const [AddQuizForm, { data, error }] = useAddQuizMutation();
  const [quizData, setQuizData] = useState({
    title: "",
    lessonId: "",
    questions: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setQuizData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleQuestionChange = (event, index) => {
    const { name, value } = event.target;
    const updatedQuestions = [...quizData.questions];
    if (name === "options") {
      updatedQuestions[index][name] = value
        .split(",")
        .map((option) => option.trim());
    } else {
      updatedQuestions[index][name] = value;
    }
    setQuizData((prevData) => ({
      ...prevData,
      questions: updatedQuestions,
    }));
  };

  const handleAddQuestion = () => {
    setQuizData((prevData) => ({
      ...prevData,
      questions: [
        ...prevData.questions,
        { title: "", options: [], answer: "" },
      ],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send the quizData to your API for adding the quiz
    // You can make an API request here
    console.log(quizData);
    AddQuizForm(quizData);

    // Reset the form or handle any further actions
  };

  useEffect(() => {}, []);
  console.log(data);
  return (
    <div>
      <section className="p-6 text-gray-800">
        <form
          onSubmit={handleSubmit}
          className="container w-full max-w-xl p-8 mx-auto space-y-6 rounded-md shadow bg-gray-50"
        >
          <h2 className="w-full text-3xl font-bold leading">Add Quiz</h2>
          <div>
            <label htmlFor="title" className="block mb-1 ml-1">
              Quiz Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={quizData.title}
              onChange={handleInputChange}
              placeholder="Quiz title"
              required
              className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-blue-500 bg-gray-100"
            />
          </div>
          <div>
            <label htmlFor="lessonId" className="block mb-1 ml-1">
              Lesson
            </label>
            <select
              id="lessonId"
              name="lessonId"
              value={quizData.lessonId}
              onChange={handleInputChange}
              required
              className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-blue-500 bg-gray-100"
            >
              <option value="">Select a Lesson</option>
              {lessonsData?.lesson?.map((lesson) => (
                <option key={lesson._id} value={lesson._id}>
                  {lesson.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Questions</h3>
            {quizData.questions.map((question, index) => (
              <div key={index} className="my-4">
                <label htmlFor={`question${index}`} className="block mb-1 ml-1">
                  Question {index + 1}
                </label>
                <input
                  type="text"
                  id={`question${index}`}
                  name="title"
                  value={question.title}
                  onChange={(e) => handleQuestionChange(e, index)}
                  placeholder={`Question ${index + 1}`}
                  required
                  className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-blue-500 bg-gray-100"
                />
                <label
                  htmlFor={`options${index}`}
                  className="block mb-1 ml-1 mt-2"
                >
                  Options (comma-separated)
                </label>
                <input
                  type="text"
                  id={`options${index}`}
                  name="options"
                  value={question.options.join(", ")}
                  onChange={(e) => handleQuestionChange(e, index)}
                  placeholder="Option 1, Option 2, Option 3, Option 4"
                  required
                  className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-blue-500 bg-gray-100"
                />
                <label
                  htmlFor={`answer${index}`}
                  className="block mb-1 ml-1 mt-2"
                >
                  Correct Answer
                </label>
                <input
                  type="text"
                  id={`answer${index}`}
                  name="answer"
                  value={question.answer}
                  onChange={(e) => handleQuestionChange(e, index)}
                  placeholder="Correct Answer"
                  required
                  className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-blue-500 bg-gray-100"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddQuestion}
              className="mt-4 px-4 py-2 font-bold rounded shadow focus:outline-none focus:ring hover:ring focus:ring-blue-600 bg-blue-600 focus:ring-blue-600 text-white"
            >
              Add Question
            </button>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold rounded shadow focus:outline-none focus:ring hover:ring focus:ring-blue-600 bg-blue-600 text-white"
            >
              Add Quiz
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
