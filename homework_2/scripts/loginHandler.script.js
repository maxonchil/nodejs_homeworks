const btn = document.querySelector(".login__button");

btn.addEventListener("click", loginHandler);
async function loginHandler() {
  const logUserName = document.getElementsByClassName("login__username")[0]
    .value;
  const logUserPass = document.getElementsByClassName("login__password")[0]
    .value;

  const resposnse = await fetch(loginPage, {
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
    location.href = userPage.concat(user.id);
  } else {
    location.href = failPage;
    throw new Error();
  }
}
