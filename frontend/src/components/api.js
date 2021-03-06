import axios from "axios";

export default class APIService{

    static AddProject(body,token){
        return fetch(`/project/create`,{
            'method':'POST',
             headers : {
            'Content-Type':'application/json',
             Authorization: 'Bearer ' + token
      },
      body:JSON.stringify(body)
    })
    .then(response => response.json())
    .catch(error => console.log(error))
    };

    static GetProjects(token){
        return axios({
            method: "GET",
            url:"/project",
            headers: {
              Authorization: 'Bearer ' + token
            }
          })
    };

    static UpdateProject(id, body, token){
      return fetch(`/project/${id}/update`, {
        'method': 'POST',
        headers : {
          'Content-Type':'application/json',
           Authorization: 'Bearer ' + token
      },
      body:JSON.stringify(body)
    })
    .then(response => response.json())
    .catch(error => console.log(error))
    };

    static DeleteProject(id, token){
      return fetch(`/project/${id}/delete`, {
        'method': 'POST',
        headers : {
          'Content-Type':'application/json',
           Authorization: 'Bearer ' + token
      },
    })
    .then(response => response.json())
    .catch(error => console.log(error))
    };

    static async Login(user, email, password) {

      const data = {  user: user,
                      email: email,
                      password: password }
  
      const response = await axios.post("/token", data); 
      return response.data
    }

    static async Register(user, name, email, password) {
      
      const data =  { user: user,
                      name: name,
                      email: email,
                      password: password }

      const response = await axios.post("/register", data);
      return response.data
    }
}