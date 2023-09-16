const express = require('express');
const axios = require('axios');
const cors = require('cors');

const {
    deepClone,
    process2CD,
} = require('./utils');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.post('/query/', async (req, res) => {
    const { url } = req.body;

    console.log(`Query: ${url}`);

    if (!url) {
        return res.status(400).end();
    }

    const response = {
        original_response: null,
        processed_reponse: null,
    }

    try {
        let resp = await axios.get(url);
        const data = resp.data;
        console.log(data);        
        response.original_response = deepClone(data);
        console.log('--------------')
        if (typeof data === 'object') {
            // process it if it is object (array or json)
            let pdata = process2CD({...data});
            console.log(pdata);
            response.processed_reponse = pdata;
        }

        return res.json(response);
    } catch (error) {
        return res.json(response);
    }
});

app.listen(PORT, () => {
    console.log(`Server running at PORT: ${PORT}`);
});