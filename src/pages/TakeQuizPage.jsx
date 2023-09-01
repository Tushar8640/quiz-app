import { useParams } from "react-router-dom";
import { useGetQuizByLessonQuery } from "../app/features/quiz/quizApi";

export default function TakeQuizPage() {
  const params = useParams();
  const id = params.id;
  const { data } = useGetQuizByLessonQuery(id);
  console.log(data);
  return <div>TakeQuizPage</div>;
}
