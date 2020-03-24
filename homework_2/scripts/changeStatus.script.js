const status_checkbox = document.querySelectorAll(".note__status");
status_checkbox.forEach(elem => elem.addEventListener("click", changeStatus));

async function changeStatus(event) {
  const status = event.target.checked;
  const title = getTile(event.target);

  const response = await fetch(location.href, {
    method: "PUT",
    body: JSON.stringify({
      title,
      status
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (response.ok) {
    location.href = location.href;
  } else {
    console.log(response);
    throw new Error();
  }
}
