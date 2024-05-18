import axios, { AxiosRequestConfig } from "axios";

main();
async function main(){

    // const result = await get('http://localhost:3000/animals');
    // console.log(result!.data);

    // const id = 2;
    // const result = await get(`http://localhost:3000/animals/${id}`);
    // console.log(result!.data);

    // const name = `Dog`;
    // const result = await post('http://localhost:3000/animals', {name: `${name}`});
    // console.log(result);

    // const id = 2;
    // const name = `Dog2`;
    // const result = await patch(`http://localhost:3000/animals/${id}`, {name: `${name}`});
    // console.log(result);

    // const id = 2;
    // const result = await deleteApi(`http://localhost:3000/animals/${id}`);
    // console.log(result);
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

async function deleteApi(endpoint: string)
{
    try {
        const response = await axios.delete(endpoint);
        return response;
    } catch (error) {
        console.error("error: ", error);
    }
}
