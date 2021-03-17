import {connect} from 'react-redux'

class AppPermissions{
    constructor(permissions){
        this.userPermissions = permissions;
    }

    hasPermission = () => {

    }

    hasAnyPermission = (values) => {
        return values.some( vt => this.userPermissions.some(item=> item.name === vt.name ) );
    }
}

export default AppPermissions;

// const mapProps = state => ({
//     user: state.user.user
// })

// const mapDispatch = {
    
// }

// export default connect(mapProps, mapDispatch)(AppPermissions);