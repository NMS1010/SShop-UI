import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {routes.map((page, index) => {
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
