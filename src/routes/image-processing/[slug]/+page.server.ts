import { fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async (event) => {
        console.log(event)
        const data = await event.request.formData();
        const image = data.get('image');
        if (!(image instanceof File)) {
            console.error('Provided image is not of type file')
            return fail(400, { incorrect: true});
        }
        if (image instanceof File && image.size === 0) {
            console.error('Provided image is empty');
            return fail(400, { missing: true});
        }
        console.log(data)
		const response = await event.fetch(`http://127.0.0.1:5000/${event.params.slug}`,{
            method: 'POST',
            headers: {
                'enctype': 'multipart/form-data',
            },
            body: data
        });
        const responseData = await response.json()
        
        return responseData;
	}
};