export const getPhotos = async (query: number) => {
  const response = 
    await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${query}`);

  return await response.json();
}