export const deleteData = async (endPoint, id) => {

  const c = confirm("Are you sure to delete this data?");

  if (c) {
    try {
      let url = endPoint;
      let body = null;
      if (endPoint.includes('blog')) {
        url = `${endPoint}/${id}`;
      } else if (endPoint.includes('category')) {
        url = `${endPoint}/${id}`;
      } else if (endPoint.includes('comment')) {
        url = `${endPoint}/${id}`;
      } else {
        // fallback to old way
        const key = endPoint.includes('blog') ? 'blog_id' : 'category_id';
        body = JSON.stringify({ [key]: id });
      }

      const response = await fetch(url, {
        method: "delete",
        headers: body ? { "Content-Type": "application/json" } : {},
        credentials: "include",
        body: body,
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
