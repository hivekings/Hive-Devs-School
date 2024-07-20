export function login(setUser) {
    if (localStorage.getItem("username")) {
      return;
    } else {
      const username = prompt("Please enter your hive username.");
      if (username) {
        window.hive_keychain.requestSignBuffer(
          username,
          "Login",
          "Posting",
          (res) => {
            if (res.success) {
              localStorage.setItem("username", res.data.username);
              setUser(localStorage.getItem("username"));
              window.location.reload();
            }
          }
        );
      }
    }
  }