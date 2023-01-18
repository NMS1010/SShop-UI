import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((page, index) => {
                        const Layout = page.layout;
                        return (
                            <Route
                                key={index}
                                path={page.path}
                                element={
                                    <Layout>
                                        <page.component />
                                    </Layout>
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
