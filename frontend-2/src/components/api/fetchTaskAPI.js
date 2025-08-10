async function fetchTaskAPI(handleResponse,handleError,options={}){
    try {
      const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
      const endpoint = "/api/v1/tasks";

      const url = new URL(endpoint, baseUrl);

      if (options.sortOptions) {
        //http://localhost:5000/api/v2/tasks?sort_by=date_added&sort_type=asc
        url.searchParams.append("sort_by", options.sortOptions);
        url.searchParams.append("sort_type", "asc");
      }

      //http://localhost:5000/api/v2/tasks?status=["open"]
      if (options.selectedStatus?.length) {
        const stringifiedArray = JSON.stringify(options.selectedStatus);
        url.searchParams.append("status", stringifiedArray);
      }

      //http://localhost:5000/api/v2/tasks?labels=["react","assignments"]
      if (options.selectedLabels?.length) {
        const stringifiedArray = JSON.stringify(options.selectedLabels);
        url.searchParams.append("labels", stringifiedArray);
      }

      const response = await fetch(url);
      if(!response.ok){
        const errorText = await response.text();
        console.error("error response" , errorText);
        throw new Error(`HTTP Error ${response.status}: ${errorText}`)
      }
      const jsonData = await response.json();
      console.log(jsonData);
      handleResponse(jsonData);
    } catch (error) {
      handleError(error.message);
      console.log(error);
    }
}

export default fetchTaskAPI;