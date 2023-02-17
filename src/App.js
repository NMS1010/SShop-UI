import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import routes from './routes';
import Login from './pages/Admin/Login/';
function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {routes.map((page, index) => {
                        const loginRequire = page.private;
                        const roles = page.roles;
                        return (
                            <Route
                                key={index}
                                path={page.path}
                                element={
                                    page.layout ? (
                                        loginRequire ? (
                                            <PrivateRoute
                                                loginComponent={roles.includes('admin') && <Login />}
                                                roles={roles}
                                            >
                                                <page.layout>
                                                    <page.component />
                                                </page.layout>
                                            </PrivateRoute>
                                        ) : (
                                            <page.layout>
                                                <page.component />
                                            </page.layout>
                                        )
                                    ) : (
                                        <page.component />
                                    )
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
