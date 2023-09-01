import { Link, useParams } from "react-router-dom";
import { useGetSingleLessonQuery } from "../app/features/lesson/lessonApi";
import { useGetQuizByLessonQuery } from "../app/features/quiz/quizApi";

export default function SingleLessonPage() {
  const params = useParams();
  const id = params.id;
  const { data: lessonData } = useGetSingleLessonQuery(id);
  const { data: lessonsQuizData } = useGetQuizByLessonQuery(id);
  const serverBaseUrl = "http://localhost:5000/";
  
  console.log(lessonData);
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-center text-3xl font-semibold mb-8">
        {lessonData?.lesson?.title || "Lesson Title"}
      </h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Render the lesson PDF instead of the cover image */}
        <iframe
          title="Lesson PDF"
          src={`${serverBaseUrl}${lessonData?.lesson?.pdfLink}`}
          className="w-full h-60 sm:h-96"
        ></iframe>
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <p className="text-xl font-semibold">
              Author:{" "}
              <a href="#" className="hover:underline">
                Leroy Jenkins
              </a>
            </p>
            <p className="text-xs text-gray-600">
              Published on {lessonData?.lesson?.createdAt}
            </p>
          </div>
          <div className="text-gray-800">
            <p>
              {lessonData?.lesson?.description ||
                "Lesson description goes here..."}
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-center text-2xl font-semibold mt-8 mb-4">
        Quizzes for this Lesson
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessonsQuizData?.quiz?.map((quiz, i) => (
          <div
            key={quiz?._id}
            className="max-w-md rounded-lg shadow-md bg-white overflow-hidden transition-transform transform hover:scale-105"
          >
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-semibold">
                {i + 1}: {quiz?.title || "Quiz Title"}
              </h3>
              <Link
                to={`/quiz/${quiz?._id}`}
                className="block mt-4 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-center"
              >
                Take Quiz
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
