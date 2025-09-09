export const deleteData = async (endPoint, categoryId) => {

  const c = confirm("Are you sure to delete this data?");

  if (c) {
    try {
      const response = await fetch(endPoint, {
        method: "delete",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ category_id: categoryId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return true;

    } catch (error) {
      console.log(error);
      return false;
    }

  } else {
    return false;
  }
};
