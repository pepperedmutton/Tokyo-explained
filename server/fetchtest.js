import dotenv from 'dotenv';
dotenv.config();
console.log("Loaded API Key:", process.env.GOOGLE_MAPS_API_KEY);
console.log("Loaded JWT Secret:", process.env.JWT_SECRET);
async function waiy() {
  const h = await fetch("https://places.googleapis.com/v1/places:searchNearby", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY,
      "X-Goog-FieldMask": "places.displayName"
    },
    body: JSON.stringify({
      includedTypes: ["restaurant"],
      maxResultCount: 10,
      locationRestriction: {
        circle: {
          center: {
            latitude: 37.7937,
            longitude: -122.3965
          },
          radius: 500.0
        }
      }
    })
  }).then(res => res.json());

  console.log(h);
  console.log(process.env.JWT_SECRET);
}

waiy();
