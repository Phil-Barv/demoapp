import mockAxios from "axios";
import APIService from '../api'

describe('test successful registration', () => {

    const userData = {user:"Donor",name:"pablo",email:"pablo@gmail.com",password:"Test@123"}

    beforeEach(() => {
        mockAxios.post.mockImplementationOnce(() =>
            Promise.resolve({
                data: { registered: true }
            })
        );
    })
    
    it('outputs correct data', async () => {
        const api_response = await APIService.Register(userData.user,userData.name,userData.email,userData.password);
        expect(api_response.registered).toEqual(true);
    });

    it('makes a post request once', async () => {
        await APIService.Register(userData.user,userData.name,userData.email,userData.password);
        expect(mockAxios.post).toHaveBeenCalledTimes(1);
    });

    it('makes a call to the correct url', async () => {
        await APIService.Register(userData.user,userData.name,userData.email,userData.password);
        expect(mockAxios.post).toHaveBeenCalledWith("/register", userData);
    });

})

describe('test unsuccessful login', () => {

    const userData = {user:"Donor", email:"pablo@gmail.com",password:"Test@123"}

    beforeEach(() => {

        mockAxios.post.mockImplementationOnce(() =>
            Promise.resolve({
                data: {
                    access_token: false
                }
            })
        );
    })

    it('outputs correct data', async () => {
        const api_response = await APIService.Login(userData.user,userData.email,userData.password);
        expect(api_response.access_token).toEqual(false);
    });

    it('makes a post request once', async () => {
        await APIService.Login(userData.user,userData.email,userData.password);
        expect(mockAxios.post).toHaveBeenCalledTimes(1);
    });

    it('makes a call to the correct url', async () => {
        await APIService.Login(userData.user,userData.email,userData.password);
        expect(mockAxios.post).toHaveBeenCalledWith("/token", userData);
    });
})