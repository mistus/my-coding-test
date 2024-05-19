import axios, { AxiosRequestConfig } from "axios";

main();
async function main(){
    //GetAll
    // const result = await get('http://localhost:3000/recipes');
    // console.log(result!.data);

    //GetOne
    // const result = await get('http://localhost:3000/recipes/1');
    // console.log(result!.data);
    
    //Post
    // const result = await post('http://localhost:3000/recipes', {
    //     title: `カレー`,
    //     making_time: `20分`,
    //     serves: "1人",
    //     ingredients: `カレーブロック、水、ライス`,
    //     cost: 300
    // });
    // console.log(result!.data);

    //Patch
    // const result = await patch('http://localhost:3000/recipes/11', {
    //     title: `カレー改`,
    //     making_time: `20分`,
    //     serves: "1人",
    //     ingredients: `カレーブロック２個、水、ライス`,
    //     cost: 300
    // });
    // console.log(result!.data);

    //Delete
    // const result = await deleteApi('http://localhost:3000/recipes/11');
    // console.log(result!.data);
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
