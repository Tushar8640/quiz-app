import { Link } from "react-router-dom";
import { useGetLessonsQuery } from "../app/features/lesson/lessonApi";

export default function LessonsPage() {
  const { data } = useGetLessonsQuery();
  console.log(data);
  return (
    <div>
      LessonsPage
      <div className="grid grid-cols-3">
        {data?.lesson?.map((lesson) => (
          <div
            key={lesson?._id}
            className="max-w-xs container mx-auto rounded-md shadow-md bg-gray-50 text-gray-800"
          >
            <img
              src="https://source.unsplash.com/random/300x300/?2"
              alt=""
              className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500"
            />
            <div className="flex flex-col justify-between p-6 space-y-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold tracki">
                  Donec lectus leo
                </h2>
                <p className="text-gray-800">
                  Curabitur luctus erat nunc, sed ullamcorper erat vestibulum
                  eget.
                </p>
              </div>
              <Link
                to={`/lesson/${lesson?._id}`}
                type="button"
                className="flex items-center justify-center w-full p-3 font-semibold tracki rounded-md bg-blue-600 text-gray-50"
              >
                Read more
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
