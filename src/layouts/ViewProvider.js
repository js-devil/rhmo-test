import React, { useContext } from "react";
import NewProviderForm from "../components/forms/NewProviderForm";
import ApiService from "../utils/apiService";
import AppContext from "../utils/context";
import { Redirect } from "react-router-dom";
const ViewProvider = () => {
  const data = useContext(AppContext);

  const item = (data.state.items || []).find((key) => key.id === data.state.id);

  const editProvider = (payload) => {
    const id = payload.id;
    payload.id = undefined;
    payload = JSON.parse(JSON.stringify(payload));

    let formData = new FormData();
    for (let key in payload) formData.append([key], String(payload[key]));

    ApiService.put(`${ApiService.ENDPOINTS.providers}/${id}`, formData).then(
      (data) => {
        console.log(data);
      }
    );
  };

  return item ? (
    <section className="main__new-provider fixed">
      <div className="new-provider">
        <h2 className="text-header">Can't find a Provider?</h2>
        <p className="text-body">Feel free to recommend a new one.</p>
        <hr />
        <h1>
          View Provider
          <span>
            <i className="fa fa-edit"></i>
          </span>
        </h1>

        <NewProviderForm provider={item} submit={editProvider} />
      </div>
    </section>
  ) : (
    <Redirect to="/" />
  );
};
// TASK 6:
// Render Single Provider View Here
// Feel free to using existing styles,
// or add new ones if you want to :)
//
// For Bonus points, you can also add functionality to edit the provider
// Reusing the NewProviderForm component for this will make it a whole lot easier :D

export default ViewProvider;
