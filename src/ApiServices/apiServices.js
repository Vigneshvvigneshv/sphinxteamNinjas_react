
let URL = "https://localhost:8443/sphinx/api";

export async function apiPost(endpoint, data) {
  console.log("Post Method Data => ", data);

  try {
    const response = await fetch(URL + endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials:"include",
    });

    const result = await response.json();

    return result;
  } catch (err) {
    return err;
  }
}


export async function apiGet(endpoint) {
  try {
    const response = await fetch(URL + endpoint, {
      method: "GET",
    });

    const result = await response.json();

    return result;
  } catch (err) {
    console.error("Error while fetching data =>", err);
    return { data: null };
  }
}

export async function apiDelete(endpoint, data) {
  console.log("DELETE Request Data => ", data);

  try {
    const response = await fetch(URL + endpoint, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials:"include",
    });

    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}

export async function apiPut(endpoint, data) {
  console.log("PUT Request Data => ", data);

  try {
    const response = await fetch(URL + endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials:"include",
    });

    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}

export async function apiFilePost(endpoint, formData) {
  console.log("Request Data => ", formData);

  try {
    const response = await fetch(URL + endpoint, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}