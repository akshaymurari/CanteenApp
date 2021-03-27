import React from 'react';
import axios from 'axios';
const New = () => {
    const fun = async () => {
        try{
            const data = await axios({
                method:"post",
                url:"http://localhost:8000/add",
                headers:{
                    "content-type": "application/json",
                    "accept":"application/json"
                },
                data:JSON.stringify({"msg":"sucess"})
            });
            console.log(data.data);
        }
        catch(error){
            console.log(error);
        }
    }
    return (
        <>
            <button
            onClick = {fun}
            >send request</button>
        </>
    )
}

export default New;
