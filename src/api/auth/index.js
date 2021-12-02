export function Headers(store){
   console.log(store)
       const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + store.state.auth.token,
      };
      
   return headers;
}