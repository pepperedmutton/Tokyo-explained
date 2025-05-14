import dotenv from 'dotenv';
dotenv.config();

export default async function detailedInfo(parameters,id){
  console.log(parameters);
    const h = await fetch(`https://places.googleapis.com/v1/places/${id}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY,
      "X-Goog-FieldMask": "*"
    },
  }).then(res=>res.json())
  console.log(h);
  return h;
}