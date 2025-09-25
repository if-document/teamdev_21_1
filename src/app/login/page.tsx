import React from "react";
import React, { useState } from "react";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    //ログイン処理
    console.log("ユーザー名:", username);
    console.log("パスワード:", password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">ユーザー名:</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">パスワード:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">ログイン</button>
    </form>
  );
}

export default "LoginPage";
