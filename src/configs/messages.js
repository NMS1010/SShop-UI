const generateAdminMessage = (label) => {
    return {
        retrieve_err: `Error while retrieving ${label}`,
        delete_err: `Error while deleting this ${label}`,
        delete_suc: `Succeed in deleting this ${label}`,
        handling_err: `Error while handling this ${label}`,
        handling_suc: `Handling this ${label} successfully`,
    };
};
const messages = {
    admin: {
        brand: generateAdminMessage('brand'),
        category: generateAdminMessage('category'),
        role: generateAdminMessage('role'),
        product: generateAdminMessage('product'),
        product_images: generateAdminMessage('product image'),
        user: {
            ...generateAdminMessage('user'),
            update_profile_suc: 'Update your profile successfull',
            update_profile_err: 'Failed to update your profile',
        },
    },
};

export default messages;
