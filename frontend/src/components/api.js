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

    static UserLogin(setToken, setLoginError, user, email, password) {
      axios({
        method: "POST",
        url:"/token",
        data:{
          user: user,
          email: email,
          password: password
         }
      })
      .then((response) => {
        if (response.data.access_token){
          setToken(response.data.acdcess_token)
        } else {setLoginError(true)};
      }).catch((error) => { setLoginError(true) })
    }

    static Register(setIsRegistered, setRegistrationError, user, name, email, password) {
      axios({
        method: "POST",
        url:"/register",
        data:{
          user: user,
          name: name,
          email: email,
          password: password
         }
      })
      .then((response) => {
        if(response.data.registered==true){
          setIsRegistered(true);
        } else {setRegistrationError(true)};
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })
    }
  

}