import Layout from "@/components/layout/Layout";
import MeetupList from "@/components/meetups/MeetupList";
import { Fragment } from "react";
import { MongoClient } from "mongodb";

// const DUMMY_DATA = [
//   {
//     id: "m1",
//     title: " The first meetup",
//     image:
//       "https://cutewallpaper.org/cdn-cgi/mirage/2af0adefb1b7ebf6af3b94bf8b86378693ec8b55d34af727ac0cbb58dfd044f5/1280/23/khana-kaba-hd-wallpaper/1946715677.jpg",
//     address: "Mecca, UAE",
//     description: "Dream-place to go",
//   },
//   {
//     id: "m2",
//     title: "Closer View",
//     image:
//       "https://c4.wallpaperflare.com/wallpaper/640/409/86/religion-city-aerial-photography-metropolis-wallpaper-preview.jpg",
//     address: "Kaaba, Mecca",
//     description: "Dream-place to die",
//   },
// ];

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}
export async function getStaticProps() {
  //fetch data from API

  const client = await MongoClient.connect(
    "mongodb+srv://Sam:dwxbEbnxmE2TXvgd@my-blog.nzaxqc0.mongodb.net/dplaces?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupCollection = db.collection("cities");

  const meetups = await await meetupCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

// export async function getServerSideProps() {
//   return {
//     props: {
//       meetups: DUMMY_DATA,
//     },
//   };
// }

export default HomePage;
