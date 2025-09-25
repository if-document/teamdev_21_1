import "./page.css";

function Page() {
  const initialValues = { signin: "", mailAddress: "", password: "" };
  const [formValues, setformValues] = useState(initialValues);

  const handleChange = (e) => {
    // console.log(e.target.valures);
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
  };
  return (
    <div className="sign in">
      <form>
        <h1>sig in</h1>
        <hr />
        <div className="uiForm">
          <div className="formField">
            <label>Email</label>
            <input
              type="text"
              placeholder="Email"
              name="mailAddress"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="forField">
            <label>password</label>
            <input
              type="password"
              placeholder="パスワード"
              name="password"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button className="submit">ログイン</button>
          <div>
            <h2>Don't have account ? Sign Up</h2>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Page;
