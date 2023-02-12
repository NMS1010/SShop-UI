const urlToObject = async (imgUrl, fileName = 'image.jpg') => {
    const response = await fetch(imgUrl, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Method': 'GET',
        },
    });
    const blob = await response.blob();
    const file = new File([blob], fileName, { type: blob.type });
    console.log(file);
    return file;
};
export default urlToObject;
