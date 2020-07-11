import React, { useContext } from "react";
import NewProviderForm from "../components/forms/NewProviderForm";
import ApiService from "../utils/apiService";
import AppContext from "../utils/context";
import { Redirect } from "react-router-dom";
const ViewProvider = () => {
  const data = useContext(AppContext);

  const item = (data.state.items || []).find((key) => key.id === data.state.id);

  const editProvider = (payload) => {
    // payload.id = undefined;
    // payload = JSON.parse(JSON.stringify(payload));
    console.log(payload);
    // this.setLoading(true);
    // ApiService.put(
    //   `${ApiService.ENDPOINTS.providers}/${payload.id}`,
    //   payload
    // ).then((data) => {
    //   console.log(data);
    // });
  };

  return item ? (
    <>
      <h1>
        View Provider
        <span>
          <i className="fa fa-edit"></i>
        </span>
      </h1>

      <div className="edit-form">
        <NewProviderForm
          provider={item}
          submit={(e) => {
            editProvider(e);
          }}
        />
      </div>
    </>
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
