const add_btn = document.querySelector(".add-note__button");
add_btn.addEventListener("click", addNote);


async function addNote() {
  const title = document.querySelector(".add-note__title").value;
  const description = document.querySelector(".add-note__description").value;

  const response = await fetch(location.href, {
    method: "POST",
    body: JSON.stringify({
      title,
      description,
      status: false,
      add: true
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
