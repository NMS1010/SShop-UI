export const orderState = (name) => {
    let bg = '';
    switch (name) {
        case 'Pending':
            bg = 'primary';
            break;
        case 'On the way':
            bg = 'info';
            break;
        case 'Delivered':
            bg = 'success';
            break;
        case 'Cancelled':
            bg = 'danger';
            break;
        case 'Ready to ship':
            bg = 'secondary';
            break;
        default:
            bg = '';
            break;
    }
    return bg;
};
