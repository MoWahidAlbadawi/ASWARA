import { Link } from "react-router-dom";

const Home = () => {
    return <div>
        <p>Home page here</p>
        <Link to='/login'>Login page</Link>
        <Link to='/register'>Register page</Link>
        </div>
}
export default Home;