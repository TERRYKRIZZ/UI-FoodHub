import "./StaffLogin.css";

function StaffLogin({ onLogin, onBackToHome }) {
  return (
    <div className="staff-login-page">
      <div className="staff-login-card">

        <div className="staff-login-logo">
          🍴
        </div>

        <p className="staff-login-label">
          UI FOODHUB
        </p>

        <h1>Staff Portal</h1>

        <p className="staff-login-description">
          Sign in to manage orders and inventory.
        </p>

        <form onSubmit={onLogin}>

          <div className="staff-form-group">
            <label htmlFor="staff-email">
              Staff Email
            </label>

            <input
              id="staff-email"
              type="email"
              placeholder="Enter staff email"
              required
            />
          </div>

          <div className="staff-form-group">
            <label htmlFor="staff-password">
              Password
            </label>

            <input
              id="staff-password"
              type="password"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="staff-login-button"
          >
            Sign In
          </button>

        </form>

        <button
          className="staff-back-button"
          onClick={onBackToHome}
        >
          ← Back to Home
        </button>

        <p className="staff-demo-text">
          Demo login: staff@uifoodhub.com / 123456
        </p>

      </div>
    </div>
  );
}

export default StaffLogin;