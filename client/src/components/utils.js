export function login(setUser= null) {
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
              if (setUser) {
                setUser(localStorage.getItem("username"));
              }
              window.location.reload();
            }
          }
        );
      }
    }
  }