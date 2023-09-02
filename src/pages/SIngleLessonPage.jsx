import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetSingleLessonQuery } from "../app/features/lesson/lessonApi";
import { useGetQuizByLessonQuery } from "../app/features/quiz/quizApi";
import { Document, Page, pdfjs } from "react-pdf";

// Configure pdfjs worker to load PDFs properly
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function SingleLessonPage() {
  const params = useParams();
  const id = params.id;
  const { data: lessonData } = useGetSingleLessonQuery(id);
  const { data: lessonsQuizData } = useGetQuizByLessonQuery(id);
  const serverBaseUrl = "http://localhost:5000/";
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const handlePageChange = (newPageNumber) => {
    setPageNumber(newPageNumber);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  if (!lessonData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-center text-3xl font-semibold mb-8">
        {lessonData?.lesson?.title || "Lesson Title"}
      </h1>
      <div className="bg-white shadow-lg w-[700px] mx-auto rounded-lg overflow-hidden">
        {/* Render the lesson PDF */}
        <div className="pdf-container h-[500px]  overflow-y-scroll px-5">
          <Document
            file={`${serverBaseUrl}${lessonData?.lesson?.pdfLink}`}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-2">
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

      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(pageNumber - 1)}
          disabled={pageNumber <= 1}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-l"
        >
          Previous Page
        </button>
        <span className="bg-gray-200 py-2 px-4">{`Page ${pageNumber} of ${numPages}`}</span>
        <button
          onClick={() => handlePageChange(pageNumber + 1)}
          disabled={pageNumber >= numPages}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r"
        >
          Next Page
        </button>
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
                className="block mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-center"
              >
                Take Quiz
              </Link>
            </div>
          </div>
        ))}

        <h4 className="text-4xl"> {lessonsQuizData?.quiz?.length == 0 && <p>No Quiz found</p>}</h4>
      </div>
    </div>
  );
}
