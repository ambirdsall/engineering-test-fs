const baseUrl = 'http://localhost:1235'

export const Post = async (url: string, data: any, options?: any) => {
  const response = await fetch(baseUrl + url, {
    method: "POST",
    ...options,
    body: JSON.stringify(data),
  })

  return response.json()
}

export const Get = (url: string, options?: any) => {
  return fetch(baseUrl + url, {...options})
}

export const GetJSON = (url: string, options?: any) => {
  return Get(url, options).then(r => r.json())
}

export const getPropertyImage = (propertyId: string) => {
  return Get("/display/" + propertyId).catch(console.error);
}
