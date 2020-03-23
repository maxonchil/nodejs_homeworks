const delete_btn = document.querySelectorAll(".note__delete-button");
delete_btn.forEach(elem => elem.addEventListener("click", deleteNote));

async function deleteNote(event) {
  const title = getTile(event.target);

  const response = await fetch(location.href, {
    method: "DELETE",
    body: JSON.stringify({
      title
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (response.ok) {
    window.location.href = window.location.href;
  } else {
    console.log(response);
    throw new Error();
  }
}
