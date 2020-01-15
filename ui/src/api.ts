const baseUrl = 'http://localhost:1235'
// const defaultHeaders = { "Access-Control-Allow-Origin": "*", "Content-Type": "application/x-www-form-urlencoded"}

// {
//   type: "Feature",
//   geometry: {
//     type: "Point",
//     coordinates: [lat, lng]
//   },
//   "x-distance": radius
// }

export const Post = (url: string, data: any, options?: any) => {
  return fetch(baseUrl + url, {
    method: "POST",
    // headers: defaultHeaders,
    ...options,
    body: JSON.stringify(data),
  }).then(r => r.json())
}
