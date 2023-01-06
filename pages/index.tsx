import { toast } from "../components/Toast/core/toast";
import { fetchThenToast, fetchThenFail } from "../utils/fetchThenToast";
import { successToast } from "../utils/successToast";
import { Button, Container } from "./style";

export default function Home() {
  return (
    <Container>
      <Button onClick={(e) => {
        e.preventDefault();
        toast.success({title: "Called inside react function", autoClose: 3000});
      }}>Toast Inside React Components</Button>

      <Button onClick={(e) => {
        e.preventDefault();
        successToast();
      }}>Toast Using Native Function</Button>
      
      <Button onClick={(e) => {
        e.preventDefault();
        fetchThenToast();
      }}>Fetch then toast</Button>

      <Button onClick={(e) => {
        e.preventDefault();
        fetchThenFail();
      }}>Fetch then Fail</Button>
    </Container>
  )
}
