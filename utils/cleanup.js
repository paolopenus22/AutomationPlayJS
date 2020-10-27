const axios = require('axios');
const url = process.env.BASE_API_URL || 'http://magenicmovies-api.azurewebsites.net/';

class CleanUp {
    
    deleteUser = async (id) => {
        try 
        {
            await axios.delete(`${url}users/${id}`);
        } 
        catch (e) 
        {
            console.log("Cannot delete user " + id + + " " + e);
        }
    }
    deleteBranch = async (id) => {
        try 
        {
            await axios.delete(`${url}branches/${id}`);
        } 
        catch (e) 
        {
            console.log("Cannot delete branch " + id + + " " + e);
        }
    }
    deleteCinema = async (id) => {
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