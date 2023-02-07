import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import routes from './routes';
function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {routes.map((page, index) => {
                        const Layout = page.layout;
                        const isLogin = page.private;
                        return (
                            <Route
                                key={index}
                                path={page.path}
                                element={
                                    isLogin ? (
                                        <PrivateRoute>
                                            <Layout>
                                                <page.component />
                                            </Layout>
                                        </PrivateRoute>
                                    ) : (
                                        <Layout>
                                            <page.component />
                                        </Layout>
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
