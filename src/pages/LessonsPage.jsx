
import { Link } from "react-router-dom";
import { useGetLessonsQuery } from "../app/features/lesson/lessonApi";

export default function LessonsPage() {
  const { data } = useGetLessonsQuery();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Lessons Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data?.lesson?.map((lesson) => (
          <div
            key={lesson?._id}
            className="max-w-md rounded-lg shadow-md bg-white overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              src="https://source.unsplash.com/random/300x200/?lesson"
              alt=""
              className="object-cover w-full h-48"
            />
            <div className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">{lesson.title}</h2>
              <p className="text-gray-600">{lesson.description}</p>
              <a
                href={lesson.pdfLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-center"
              >
                View PDF
              </a>
              <Link
                to={`/lesson/${lesson?._id}`}
                className="block p-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md text-center"
              >
                Learn More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
