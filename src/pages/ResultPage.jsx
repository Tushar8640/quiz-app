
import { useSelector } from "react-redux";
import { useGetResultQuery } from "../app/features/quiz/quizApi";

export default function ResultPage() {
  // Fetch user ID from Redux store
  const userId = useSelector((state) => state.auth.user._id);

  // Fetch quiz results data using the API query
  const { data, isLoading } = useGetResultQuery(userId);

  if (isLoading) {
    // Display a loading message while fetching data
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Quiz Results</h1>
      {data && data.results.length > 0 ? (
        // If there are results, map through them and display each result
        <div className="space-y-4">
          {data.results.map((result) => (
            <div key={result._id} className="bg-white p-6 rounded-lg shadow-lg">
              <p className="font-semibold text-xl mb-4">Quiz Result:</p>
              <ul className="list-disc pl-6">
                {result.responses.map((response) => (
                  <li key={response._id} className="mb-2">
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
              <p className="text-xs text-gray-600">
                Quiz taken on: {result.createdAt}
              </p>
            </div>
          ))}
        </div>
      ) : (
        // If there are no results, display a message
        <div>No quiz results available.</div>
      )}
    </div>
  );
}
