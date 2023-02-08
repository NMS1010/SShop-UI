import { connect } from 'react-redux';
import { redirect } from 'react-router-dom';

const PrivateRoute = ({ children, roles, loginComponent, currentUser }) => {
    if (!currentUser) {
        return loginComponent;
    }

    return children;
};
function mapStateToProps(state) {
    const { currentUser } = state.authReducer;
    return {
        currentUser: currentUser,
    };
}
export default connect(mapStateToProps)(PrivateRoute);
