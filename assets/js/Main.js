let Main_container_book_row = document.querySelector(
  ".Main_container_book_row"
);

document.querySelector(".create-book-btn").addEventListener("click", () => {
  document
    .querySelector(".Main_container_book_modal")
    .classList.add("Main_container_book_modal_active");
  document
    .querySelector(".Main_container_book_modal_inside")
    .classList.add("Main_container_book_modal_inside_active");
});

document
  .querySelector(".Main_container_book_modal_header_close")
  .addEventListener("click", () => {
    document
      .querySelector(".Main_container_book_modal")
      .classList.remove("Main_container_book_modal_active");
    document
      .querySelector(".Main_container_book_modal_inside")
      .classList.remove("Main_container_book_modal_inside_active");
  });

document
  .querySelector(".Main_container_book_modal_btn_close")
  .addEventListener("click", () => {
    document
      .querySelector(".Main_container_book_modal")
      .classList.remove("Main_container_book_modal_active");
    document
      .querySelector(".Main_container_book_modal_inside")
      .classList.remove("Main_container_book_modal_inside_active");
  });

document
  .querySelector(".Main_container_book_modal_header_close_edit")
  .addEventListener("click", () => {
    document
      .querySelector(".Main_container_book_modal_edit")
      .classList.remove("Main_container_book_modal_active");
    document
      .querySelector(".Main_container_book_modal_inside_edit")
      .classList.remove("Main_container_book_modal_inside_active");
  });

document
  .querySelector(".Main_container_book_modal_btn_close_edit")
  .addEventListener("click", () => {
    document
      .querySelector(".Main_container_book_modal_edit")
      .classList.remove("Main_container_book_modal_active");
    document
      .querySelector(".Main_container_book_modal_inside_edit")
      .classList.remove("Main_container_book_modal_inside_active");
  });


document
  .querySelector(".Main_container_book_modal_inside")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    let isbnCode = e.target.isbn.value.trim();
    let isDone = false;

    if (!isbnCode) {
      showNotification("Iltimos ISBN kodini kiriting!", "Xatolik!", "#FF0000");
      return;
    }

    try {
      let data = await fetch("http://localhost:3000/BookList")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          return data.filter((item) => item.isbn == isbnCode);
        });

      if (!data.length) {
        showNotification("Kitob topilmadi!", "Xatolik!", "#FF0000");
        return;
      }
      async function FetchData() {
        await fetch("http://localhost:3000/myBookList", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data[0]),
        }).then(() => {
          data.map((item) => {
            Main_container_book_row.innerHTML += `<div key="${item.id}" class="Main_container_book_row_col">
                          <div class="Main_container_book_row_col_main">
                            <h2>${item.bookTitle}</h2>
                            <p>
                              Cover:
                              <a href="${item.cover}">
                                 ${item.cover}
                              </a>
                            </p>
                            <p>Pages: ${item.pages}</p>
                            <p>Published: ${item.published}</p>
                            <p>Isbn: ${item.isbn}</p>
                            <div class="Main_container_book_row_col_main_position">
                              <p>${item.author} / ${item.published}</p>
                              <span>${item.position}</span>
                            </div>
                          </div>
                          <div class="Main_container_book_row_col_options">
                            <button onClick="Delete(${item.id})" class="Main_container_book_row_col_options_del">
                              <svg
                                width="15"
                                height="16"
                                viewBox="0 0 15 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.3334 3.99998V3.46665C10.3334 2.71991 10.3334 2.34654 10.1881 2.06133C10.0603 1.81044 9.85629 1.60647 9.6054 1.47864C9.32019 1.33331 8.94682 1.33331 8.20008 1.33331H7.13341C6.38668 1.33331 6.01331 1.33331 5.72809 1.47864C5.47721 1.60647 5.27324 1.81044 5.14541 2.06133C5.00008 2.34654 5.00008 2.71991 5.00008 3.46665V3.99998M6.33341 7.66665V11M9.00008 7.66665V11M1.66675 3.99998H13.6667M12.3334 3.99998V11.4666C12.3334 12.5868 12.3334 13.1468 12.1154 13.5746C11.9237 13.951 11.6177 14.2569 11.2414 14.4487C10.8136 14.6666 10.2535 14.6666 9.13341 14.6666H6.20008C5.07998 14.6666 4.51992 14.6666 4.0921 14.4487C3.71578 14.2569 3.40982 13.951 3.21807 13.5746C3.00008 13.1468 3.00008 12.5868 3.00008 11.4666V3.99998"
                                  stroke="#FEFEFE"
                                  stroke-width="1.6"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </button>
                            <button onClick="EditBook(${item.id})" class="Main_container_book_row_col_options_edit">
                              <svg
                                width="15"
                                height="14"
                                viewBox="0 0 15 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M13.6667 11L13 11.7294C12.6464 12.1161 12.1668 12.3333 11.6668 12.3333C11.1668 12.3333 10.6873 12.1161 10.3337 11.7294C9.97956 11.3434 9.50007 11.1267 9.0002 11.1267C8.50033 11.1267 8.02084 11.3434 7.66673 11.7294M1.66675 12.3333H2.78311C3.10923 12.3333 3.27229 12.3333 3.42574 12.2965C3.56179 12.2638 3.69185 12.21 3.81115 12.1369C3.9457 12.0544 4.061 11.9391 4.2916 11.7085L12.6668 3.33334C13.219 2.78106 13.219 1.88563 12.6668 1.33334C12.1145 0.781057 11.219 0.781058 10.6668 1.33334L2.29159 9.7085C2.06099 9.9391 1.94568 10.0544 1.86323 10.189C1.79012 10.3083 1.73625 10.4383 1.70359 10.5744C1.66675 10.7278 1.66675 10.8909 1.66675 11.217V12.3333Z"
                                  stroke="#FEFEFE"
                                  stroke-width="1.6"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>`;
          });
        });
      }
      if (!isDone) {
        showNotification("Kitob kutubxonangizga qo'shildi!", "Xabar!", "#52C41A");
        isDone = true;
        setTimeout(() => FetchData(), 2000)
      }

    } catch (error) {
      console.log(error);
    }
  });

window.addEventListener("DOMContentLoaded", async () => {
  await fetch("http://localhost:3000/myBookList")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data.map((item) => {
        Main_container_book_row.innerHTML += `<div key="${item.id
          }" class="Main_container_book_row_col">
                    <div class="Main_container_book_row_col_main">
                      <h2>${item.bookTitle}</h2>
                      <p>
                        Cover:
                        <a href="${item.cover}">
                           ${item.cover}
                        </a>
                      </p>
                      <p>Pages: ${item.pages}</p>
                      <p>Published: ${item.published}</p>
                      <p>Isbn: ${item.isbn}</p>
                      <div class="Main_container_book_row_col_main_position">
                        <p>${item.author} / ${item.published}</p>
                        <span style=background-color:${item.position == "Reading"
            ? "#FFEC43"
            : item.position == "Finished"
              ? "#00FF29"
              : item.position == "New"
                ? "#FF0000"
                : "gray"
          }>${item.position}</span>
                      </div>
                    </div>
                    <div class="Main_container_book_row_col_options">
                      <button onClick="Delete(${item.id
          })" class="Main_container_book_row_col_options_del">
                        <svg
                          width="15"
                          height="16"
                          viewBox="0 0 15 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.3334 3.99998V3.46665C10.3334 2.71991 10.3334 2.34654 10.1881 2.06133C10.0603 1.81044 9.85629 1.60647 9.6054 1.47864C9.32019 1.33331 8.94682 1.33331 8.20008 1.33331H7.13341C6.38668 1.33331 6.01331 1.33331 5.72809 1.47864C5.47721 1.60647 5.27324 1.81044 5.14541 2.06133C5.00008 2.34654 5.00008 2.71991 5.00008 3.46665V3.99998M6.33341 7.66665V11M9.00008 7.66665V11M1.66675 3.99998H13.6667M12.3334 3.99998V11.4666C12.3334 12.5868 12.3334 13.1468 12.1154 13.5746C11.9237 13.951 11.6177 14.2569 11.2414 14.4487C10.8136 14.6666 10.2535 14.6666 9.13341 14.6666H6.20008C5.07998 14.6666 4.51992 14.6666 4.0921 14.4487C3.71578 14.2569 3.40982 13.951 3.21807 13.5746C3.00008 13.1468 3.00008 12.5868 3.00008 11.4666V3.99998"
                            stroke="#FEFEFE"
                            stroke-width="1.6"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                      <button onClick="EditBook(${item.id
          })" class="Main_container_book_row_col_options_edit">
                        <svg
                          width="15"
                          height="14"
                          viewBox="0 0 15 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.6667 11L13 11.7294C12.6464 12.1161 12.1668 12.3333 11.6668 12.3333C11.1668 12.3333 10.6873 12.1161 10.3337 11.7294C9.97956 11.3434 9.50007 11.1267 9.0002 11.1267C8.50033 11.1267 8.02084 11.3434 7.66673 11.7294M1.66675 12.3333H2.78311C3.10923 12.3333 3.27229 12.3333 3.42574 12.2965C3.56179 12.2638 3.69185 12.21 3.81115 12.1369C3.9457 12.0544 4.061 11.9391 4.2916 11.7085L12.6668 3.33334C13.219 2.78106 13.219 1.88563 12.6668 1.33334C12.1145 0.781057 11.219 0.781058 10.6668 1.33334L2.29159 9.7085C2.06099 9.9391 1.94568 10.0544 1.86323 10.189C1.79012 10.3083 1.73625 10.4383 1.70359 10.5744C1.66675 10.7278 1.66675 10.8909 1.66675 11.217V12.3333Z"
                            stroke="#FEFEFE"
                            stroke-width="1.6"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>`;
      });
    });
});

async function Delete(id) {
  let isDone = false;

  try {
    async function FetchData() {
      const response = await fetch(`http://localhost:3000/myBookList/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete the book.");
      document.querySelector(`[key="${id}"]`).remove();
    }
    if (!isDone) {
      showNotification(
        "Kitob o'zingizni kutubxonangizdan o'chirildi!",
        "Xabar!",
        "#52C41A"
      );
      isDone = true;
      setTimeout(() => FetchData(), 2000)
    }

  } catch (error) {
    console.error("Error:", error);
    showNotification(
      "Kitob o'chirishda xatolik yuz berdi!",
      "Xabar!",
      "#FF4D4F"
    );
  }
}
let idBook;
async function EditBook(id) {
  document
    .querySelector(".Main_container_book_modal_edit")
    .classList.add("Main_container_book_modal_active");
  document
    .querySelector(".Main_container_book_modal_inside_edit")
    .classList.add("Main_container_book_modal_inside_active");
  idBook = id;
}

document
  .querySelector(".Main_container_book_modal_inside_edit")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    let isbn_edit = e.target.position_edit.value;
    let isDone = false;

    try {
      const response = await fetch(
        `http://localhost:3000/myBookList/${idBook}`
      );
      if (!response.ok)
        throw new Error("Failed to fetch the existing book data.");
      const existingData = await response.json();
      console.log(existingData);

      async function FetchData() {
        await fetch(`http://localhost:3000/myBookList/${idBook}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...existingData,
            position: isbn_edit,
          }),
        });
      }
      if (!isDone) {
        showNotification("Kitob holati o'zgartirildi.", "Xabar!", "#6200EE");
        isDone = true;
        setTimeout(() => FetchData(), 2000)
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

function showNotification(message, title, color) {
  let notif = document.querySelector(".Main_container_notification_inside");
  let notifContainer = document.querySelector(".Main_container_notification");
  notifContainer.style.display = "flex";
  document.querySelector(".Main_container_notification_title p").innerHTML =
    message;
  document.querySelector(".Main_container_notification_title h4").innerHTML =
    title;
  notif.style.backgroundColor = color;
  setTimeout(() => {
    notifContainer.style.display = "none";
  }, 2000);
}
let search = document.querySelector("#search").addEventListener("keyup", async (e) => {
  let inputValue = e.target.value.toLowerCase();
  try {
    await fetch("http://localhost:3000/myBookList").then((res) => {
      return res.json();
    }).then((data) => {
      let newData = data.filter((item) => item.bookTitle.toLowerCase().includes(inputValue));
      document.querySelector(".Main_container_book_row").innerHTML = "";
      newData.map((item) => {
        document.querySelector(".Main_container_book_row").innerHTML += `<div key="${item.id}" class="Main_container_book_row_col">
        <div class="Main_container_book_row_col_main">
          <h2>${item.bookTitle}</h2>
          <p>
            Cover:
            <a href="${item.cover}">
               ${item.cover}
            </a>
          </p>
          <p>Pages: ${item.pages}</p>
          <p>Published: ${item.published}</p>
          <p>Isbn: ${item.isbn}</p>
          <div class="Main_container_book_row_col_main_position">
            <p>${item.author} / ${item.published}</p>
            <span>${item.position}</span>
          </div>
        </div>
        <div class="Main_container_book_row_col_options">
          <button onClick="Delete(${item.id})" class="Main_container_book_row_col_options_del">
            <svg
              width="15"
              height="16"
              viewBox="0 0 15 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.3334 3.99998V3.46665C10.3334 2.71991 10.3334 2.34654 10.1881 2.06133C10.0603 1.81044 9.85629 1.60647 9.6054 1.47864C9.32019 1.33331 8.94682 1.33331 8.20008 1.33331H7.13341C6.38668 1.33331 6.01331 1.33331 5.72809 1.47864C5.47721 1.60647 5.27324 1.81044 5.14541 2.06133C5.00008 2.34654 5.00008 2.71991 5.00008 3.46665V3.99998M6.33341 7.66665V11M9.00008 7.66665V11M1.66675 3.99998H13.6667M12.3334 3.99998V11.4666C12.3334 12.5868 12.3334 13.1468 12.1154 13.5746C11.9237 13.951 11.6177 14.2569 11.2414 14.4487C10.8136 14.6666 10.2535 14.6666 9.13341 14.6666H6.20008C5.07998 14.6666 4.51992 14.6666 4.0921 14.4487C3.71578 14.2569 3.40982 13.951 3.21807 13.5746C3.00008 13.1468 3.00008 12.5868 3.00008 11.4666V3.99998"
                stroke="#FEFEFE"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button onClick="EditBook(${item.id})" class="Main_container_book_row_col_options_edit">
            <svg
              width="15"
              height="14"
              viewBox="0 0 15 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.6667 11L13 11.7294C12.6464 12.1161 12.1668 12.3333 11.6668 12.3333C11.1668 12.3333 10.6873 12.1161 10.3337 11.7294C9.97956 11.3434 9.50007 11.1267 9.0002 11.1267C8.50033 11.1267 8.02084 11.3434 7.66673 11.7294M1.66675 12.3333H2.78311C3.10923 12.3333 3.27229 12.3333 3.42574 12.2965C3.56179 12.2638 3.69185 12.21 3.81115 12.1369C3.9457 12.0544 4.061 11.9391 4.2916 11.7085L12.6668 3.33334C13.219 2.78106 13.219 1.88563 12.6668 1.33334C12.1145 0.781057 11.219 0.781058 10.6668 1.33334L2.29159 9.7085C2.06099 9.9391 1.94568 10.0544 1.86323 10.189C1.79012 10.3083 1.73625 10.4383 1.70359 10.5744C1.66675 10.7278 1.66675 10.8909 1.66675 11.217V12.3333Z"
                stroke="#FEFEFE"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>`;
      })
    })
  } catch (error) {
    console.log(error);
  }
})