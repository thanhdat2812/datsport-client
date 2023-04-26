import axios from 'axios';

const pathname = 'https://api.imgbb.com/1/upload?expiration=600';
// const YOUR_IMGBB_API_KEY = process.env.IMGBB_API_KEY;
const YOUR_IMGBB_API_KEY = "ded9725b150e244d3f200330df37dddb";


const image = {
    uploadImage: (img) => {
        const body = new FormData()
        // body.set('key', 'an_api_key')
        body.append('image', img)

        return axios({
            method: 'post',
            url: `${pathname}&key=${YOUR_IMGBB_API_KEY}`,
            data: body
        })
    }
};

export default image;

