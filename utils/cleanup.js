const axios = require('axios').default;
const url = 'https://magenicmovies-api.azurewebsites.net/';

class CleanUp {
    
    getUserID = async (emailAdd) => {
        try 
        {
            const response = await axios.get(`${url}users?email=${emailAdd}`);
            return response.data[0]["id"];
        } 
        catch (e) 
        {
            console.log("Email not existing" + e);
        }
    }
    getCinemaID = async (name) => {
        try 
        {
            const response = await axios.get(`${url}cinemas?name=${name}`);
            return response.data[0]["id"];
        } 
        catch (e) 
        {
            console.log("Cinema not existing" + e);
        }
    }
    getBranchID = async (branch) => {
        try 
        {
            const response = await axios.get(`${url}branches?name=${branch}`);
            return response.data[0]["id"];
        } 
        catch (e) 
        {
            console.log("Branch not existing" + e);
        }
    }
    deleteUser = async (emailAdd) => {
        let id = await this.getUserID(emailAdd);
        try 
        {
            await axios.delete(`${url}users/${id}`);
        } 
        catch (e) 
        {
            console.log("Cannot delete user " + emailAdd + + " " + e);
        }
    }
    deleteBranch = async (branch) => {
        let id = await this.getBranchID(branch);
        try 
        {
            await axios.delete(`${url}branches/${id}`);
        } 
        catch (e) 
        {
            console.log("Cannot delete branch " + id + + " " + e);
        }
    }
    deleteCinema = async (cinema) => {
        let id = await this.getCinemaID(cinema);
        try 
        {
            await axios.delete(`${url}cinemas/${id}`);
        } 
        catch (e) 
        {
            console.log("Cannot delete cinema " + id + + " " + e);
        }
    }
}
module.exports = CleanUp;