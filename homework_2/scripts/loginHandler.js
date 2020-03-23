const btn = document.querySelector(".login__button");

btn.addEventListener("click", loginHandler);
async function loginHandler() {
  const logUserName = document.getElementsByClassName("login__username")[0]
    .value;
  const logUserPass = document.getElementsByClassName("login__password")[0]
    .value;
    
  const resposnse = await fetch("http://localhost:3030/login", {
    method: "POST",
    body: JSON.stringify({
      logUserName,
      logUserPass
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const { user } = await resposnse.json();

  if (resposnse.ok) {
    location.href = `http://localhost:3030/user/${user.id}`;
  } else {
    location.href = "http://localhost:3030/login/failed";
    throw new Error();
  }
}
