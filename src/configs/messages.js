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
    client: {
        register: {
            register_succ: 'Register successfully, please confirm account by your email',
        },
        cart: {
            retrieve_err: 'Cannot get your cart, please try again',
            add_success: 'Product has been added to your cart',
            remove_success: 'Product has been removed from your cart',
        },
        wish: {
            retrieve_err: 'Cannot get your wish, please try again',
            add_success: 'Product has been added to your wish',
            remove_success: 'Product has been removed from your wish',
            remove_all_success: 'Your wish has been cleared',
            remove_all_failed: 'Error while clearing your wish list',
        },
        profile: {
            address: {
                retrieve_err: 'Cannot get your addresses, please try again',
                add_success: 'Address has been created',
                update_success: 'Address has been updated',
            },
        },
    },
};

export default messages;
