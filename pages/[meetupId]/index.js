import MeetupDetail from "@/components/meetups/MeetupDetail";
import { Fragment } from "react";

import { MongoClient, ObjectId } from "mongodb";

function MeetupDetails(props) {
  return (
    <Fragment>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://Sam:dwxbEbnxmE2TXvgd@my-blog.nzaxqc0.mongodb.net/dplaces?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupCollection = db.collection("cities");

  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://Sam:dwxbEbnxmE2TXvgd@my-blog.nzaxqc0.mongodb.net/dplaces?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupCollection = db.collection("cities");

  const selectedMeetup = await meetupCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();

  // console.log(meetupId);
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}
export default MeetupDetails;
