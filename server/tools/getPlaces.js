import dotenv from 'dotenv';
dotenv.config();

export default async function getPlaces(parameters){
    const h = await fetch("https://places.googleapis.com/v1/places:searchNearby", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY,
      "X-Goog-FieldMask": "places.displayName,places.id,places.name,places.location"
    },
    body: JSON.stringify(parameters)
  }).then(res=>res.json());
  return h.places;
}