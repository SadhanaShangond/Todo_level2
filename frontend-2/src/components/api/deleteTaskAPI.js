async function deleteTaskAPI(taskId, handleResponse, handleError, setLoading) {
  setLoading(true);
  try {
    const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
    const endpoint = `/api/v1/task/`+taskId;
    const url = new URL(endpoint, baseUrl);

    const response = await fetch(url, {
      method: "DELETE",
    });

    const jsonData = await response.json();
    if (!response.ok) {
      const errorMessage = jsonData.message || "Unknown Error Occured";
      throw new Error(errorMessage);
    }
    handleResponse(jsonData);
  } catch (error) {
    console.error("Error object:", error); 
    const errorMessage =
      error.response?.data?.message || error.Message || "unknown error";
    handleError(new Error(errorMessage));
  } finally {
    setLoading(false);
  }
}
export default deleteTaskAPI;
