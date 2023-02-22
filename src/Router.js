import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <ul>
        <li>
          <Link to="/user">http://localhost:3002/user</Link>
        </li>
        <li>
          <Link to="/user/profile">http://localhost:3002/user/profile</Link>
        </li>
      </ul>
    </div>
  );
};

const Profile = () => {
  return <div>User / Profile</div>;
};

const User = () => {
  return <div>User</div>;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/user/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
