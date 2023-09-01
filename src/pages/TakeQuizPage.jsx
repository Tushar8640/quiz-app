import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetQuizByQuizIdQuery,
  useSaveResultMutation,
} from "../app/features/quiz/quizApi";
import { useSelector } from "react-redux";

export default function TakeQuizPage() {
  const { id } = useParams();
  const userId = useSelector((state) => state.auth.user._id);
  const navigate = useNavigate();
  const [saveResult, { data, error }] = useSaveResultMutation();
  const { data: quizData, isLoading } = useGetQuizByQuizIdQuery(id);
  const quizQuestions = quizData?.quiz?.questions || [];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState([]);

  const handleNextQuestion = () => {
    const selectedOption = document.querySelector(
      'input[name="answer"]:checked'
    );
    if (selectedOption) {
      const selectedValue = selectedOption.value;
      const isCorrect =
        selectedValue === quizQuestions[currentQuestionIndex].answer;
      setUserResponses([
        ...userResponses,
        {
          questionNo: currentQuestionIndex + 1,
          selectedOption: selectedValue,
          correctAnswer: quizQuestions[currentQuestionIndex].answer,
          isCorrect,
        },
      ]);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      selectedOption.checked = false;
    } else {
      alert("Please select an option.");
    }
  };

  const handleSubmitQuiz = () => {
    // Handle submitting the quiz responses, e.g., send them to the server
    // You can make an API request here to save the responses
    const quizSubmission = {
      userId: userId,
      quizId: id,
      responses: userResponses,
    };
    saveResult(quizSubmission);
    console.log("Quiz Submission:", quizSubmission);
  };

  useEffect(() => {
    if (data?.status == "success" && !error) {
      navigate("/results");
    }
  }, [data?.status, error, navigate]);
  console.log(data);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (currentQuestionIndex < quizQuestions.length) {
    const currentQuestion = quizQuestions[currentQuestionIndex];

    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-4">{quizData.quiz.title}</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="font-semibold text-lg">
            Question {currentQuestionIndex + 1}:
          </p>
          <p className="mt-2 text-xl">{currentQuestion.title}</p>
          <div className="mt-4 space-y-4">
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  id={`option${index}`}
                  className="mr-2"
                />
                <label
                  htmlFor={`option${index}`}
                  className="text-lg cursor-pointer"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
          <button
            onClick={handleNextQuestion}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mt-4"
          >
            Next
          </button>
        </div>
      </div>
    );
  } else {
    // Render the results when all questions are answered
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-4">{quizData?.quiz?.title}</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="font-semibold text-xl mb-4">Results:</p>
          <ul className="list-disc pl-6">
            {userResponses.map((response, index) => (
              <li key={index} className="mb-2">
                Question {response.questionNo}:{" "}
                {response.isCorrect ? (
                  <span className="text-green-500">Correct</span>
                ) : (
                  <span className="text-red-500">Incorrect</span>
                )}{" "}
                (Selected: {response.selectedOption}, Correct:{" "}
                {response.correctAnswer})
              </li>
            ))}
          </ul>
          <button
            onClick={handleSubmitQuiz}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mt-4"
          >
            Submit Quiz
          </button>
        </div>
      </div>
    );
  }
}
