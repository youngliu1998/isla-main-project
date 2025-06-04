export default async function getForum(){
  const forum = await fetch('http://localhost:3005/api/forum/posts/header-search',{
    method:'POST',
    headers:{
      
    }
  })
}