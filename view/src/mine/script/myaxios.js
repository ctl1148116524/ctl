import axios form 'axios';

export function  post (url, method, data) {       
    axios({
        url: url,
        method: method, // 默认是 get
        data: data,
        //url: 'http://127.0.0.1:3000/post/list',
        //method: 'post', // 默认是 get
        //data: JSON.stringify(list),
    })
            .then(function (response) {
                // handle success
                return response.data
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })          
}