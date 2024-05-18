import axios, { AxiosRequestConfig } from "axios";



main();
async function main(){




}

async function get(endpoint: string)
{
    try {
        const response = await axios.get(endpoint);
        return response;
    } catch (error) {
        console.error("error: ", error);
    }
}

async function post(endpoint: string, data: any)
{
    try {
        const response = await axios.post(endpoint, data);
        return response;
    } catch (error) {
        console.error("error: ", error);
    }
}


async function patch(endpoint: string, data: any)
{
    try {
        const response = await axios.patch(endpoint, data);
        return response;
    } catch (error) {
        console.error("error: ", error);
    }
}

async function dalete(endpoint: string)
{
    try {
        const response = await axios.delete(endpoint);
        return response;
    } catch (error) {
        console.error("error: ", error);
    }
}
