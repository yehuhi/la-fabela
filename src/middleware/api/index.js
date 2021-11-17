const axios = require('axios');


export default {
    get: options => {
        return axios.get(`http://localhost:5000/${options.entity}`)
            .then(response => {
                // handle success
                console.log(response);
                return response.data.result.items
            })
            .catch(error => {
                // handle error
                console.error(error);
            });
    },

    getById: options => {
        return axios.get(`http://localhost:5000/${options.entity}/${options.itemId}`)
            .then(response => {
                // handle success
                console.log(response);
                return response.data.result[0]
            })
            .catch(error => {
                // handle error
                console.error(error);
            });
    },

    create: options => {
        return axios.post(`http://localhost:5000/${options.entity}`, {item: options.item})
            .then(response => {
                // handle success
                console.log(response);
                return response.data.result
            })
    },

    update: (options) => {
        return axios.put(`http://localhost:5000/${options.entity}/${options.id}`, {id: options.id, item: options.item})
            .then(response => {
                // handle success
                console.log(response);
                return response.data.result.item
            })
    },

    remove: (options) => {
        return axios.delete(`http://localhost:5000/${options.entity}/${options.id}`)
            .then(response => {
                // handle success
                console.log(response,'im response in remove');
                return response.data.result.item
            })
    },

}