import Identicon from "identicon.js";

function Navbar({ account }) {
  return (
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <div className="container-fluid">
        <a
          className="navbar-brand col-sm-3 col-md-2 me-0"
          href="http://www.dappuniversity.com/bootcamp"
          target="_blank"
          rel="noopener noreferrer"
        >
          Social Network
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-block">
            <small className="text-secondary">
              <small id="account">{account}</small>
            </small>
            { account
              ? <img
                  className="ms-2"
                  width="30"
                  height="30"
                  src={`data:image/png;base64,${new Identicon(account, 30).toString()}`}
                />
              : <span></span>
            }
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;