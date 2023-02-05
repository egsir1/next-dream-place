import MeetupForm from "@/components/meetups/MeetupForm";
import { useRouter } from "next/router";

function NewMeetupPage() {
  const router = useRouter();
  async function addMeetupHandler(enteredMeetupData) {
    // console.log(enteredMeetupData);

    const response = await fetch("/api/meetup-api", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "COntent-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);
    router.replace("/");
  }
  return <MeetupForm onAddMeetup={addMeetupHandler} />;
}

export default NewMeetupPage;
