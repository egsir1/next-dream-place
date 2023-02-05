import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // const password = process.env.password;

    const client = await MongoClient.connect(
      `mongodb+srv://Sam:dwxbEbnxmE2TXvgd@my-blog.nzaxqc0.mongodb.net/dplaces?retryWrites=true&w=majority`
    );
    const db = client.db();

    const meetupCollection = db.collection("cities");

    const result = await meetupCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Place inserted!" });
  }
}

export default handler;
