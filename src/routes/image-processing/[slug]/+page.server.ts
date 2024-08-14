import { fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async (event) => {
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
        try {
            const response = await event.fetch(`${import.meta.env.VITE_API_URL}/${event.params.slug}`,{
                method: 'POST',
                headers: {
                    'enctype': 'multipart/form-data',
                    'x-api-key': import.meta.env.VITE_API_KEY
                },
                body: data
            });
            if (response.status !== 200) return fail(response.status)
            const responseData = await response.json()
            return responseData;
        } catch(error) {
            console.error(error)
            return fail(500)
        }
	}
};