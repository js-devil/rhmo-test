import React from "react";
import NavBar from "../components/common/NavBar";

import Gallery from "../components/ProviderGallery";
import List from "../components/ProviderList";
import Grid from "../components/ProviderGrid";

import NewProviderForm from "../components/forms/NewProviderForm";
import ApiService from "../utils/apiService";
import LoadingScreen from "../components/common/LoadingScreen";
import { pathGet } from "../utils/utils";

class ExplorePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      initialData: [],
      isLoading: false,
      viewType: "gallery",
    };
  }

  componentDidMount() {
    this.setLoading(true);
    ApiService.get(ApiService.ENDPOINTS.providers).then((data) => {
      console.log(data);
      this.setState({
        isLoading: false,
        data,
        initialData: data,
      });
    });
  }

  setLoading = (isLoading) => {
    this.setState({
      isLoading,
    });
  };

  filterProviders = (event) => {
    // TASK 2:
    // On input, filter Available Providers based on Name, Address and Type
    //
    // ============== CODE GOES BELOW THIS LINE :) ==============
    this.setState({
      data: this.state.initialData.filter(
        (key) =>
          key.name.toLowerCase().includes(event.target.value) ||
          key.address.toLowerCase().includes(event.target.value) ||
          key.provider_type.name.toLowerCase().includes(event.target.value)
      ),
    });
  };

  switchView = (type) => {
    // TASK 4:
    // onClick on a view preference, switch across the different view options (Gallery, List, Grid)
    // based on whatever the user selects.
    //
    // ============== CODE GOES BELOW THIS LINE :) ==============
    this.setState({
      viewType: type,
    });
  };

  addProvider = (payload) => {
    let formData = new FormData();
    for (let key in payload) formData.append([key], payload[key]);

    this.setLoading(true);
    ApiService.post(ApiService.ENDPOINTS.providers, formData).then((data) => {
      console.log(data);
      this.setState({
        isLoading: false,
        //   data,
        //   initialData: data,
      });
    });
  };

  render() {
    const { isLoading, data } = this.state;

    return (
      <div className="container">
        <NavBar />
        <div className="content__main">
          <section className="main__top-providers">
            <h2 className="text-header">Our Providers</h2>
            <div className="flex-row box-shadow" style={{ padding: "1rem" }}>
              <div>
                <input
                  type="text"
                  className="input__style_1 input__search"
                  placeholder="&#xf002; Search with Provider Name, Address, or Type"
                  onChange={this.filterProviders}
                  onInput={this.filterProviders}
                />
              </div>
              <div className="layout-switcher">
                <i
                  className={`fa fa-images ${
                    this.state.viewType === "gallery" && "active"
                  }`}
                  onClick={() => this.switchView("gallery")}
                ></i>
                <i
                  className={`fa fa-th-large ${
                    this.state.viewType === "grid" && "active"
                  }`}
                  onClick={() => this.switchView("grid")}
                ></i>
                <i
                  className={`fa fa-th-list ${
                    this.state.viewType === "list" && "active"
                  }`}
                  onClick={() => this.switchView("list")}
                ></i>
              </div>
            </div>
            {isLoading || !data ? (
              <LoadingScreen />
            ) : (
              <React.Fragment>
                {this.state.viewType === "gallery" && (
                  <Gallery
                    items={data
                      .filter((key) => key.name !== null)
                      .map((item) => ({
                        id: item.id,
                        imageUrl: item.images[0]?.url || "",
                        name: item.name,
                        description: item.description,
                        address: item.address,
                        provider_type: item.provider_type.name,
                        active_status: item.active_status,
                        rating: item.rating,
                        state: item.state?.name,
                      }))}
                  />
                )}

                {this.state.viewType === "list" && (
                  <List
                    items={data
                      .filter((key) => key.name !== null)
                      .map((item) => ({
                        id: item.id,
                        imageUrl: item.images[0]?.url || "",
                        address: item.address,
                        name: item.name,
                        rating: item.rating,
                        providerType: item.provider_type.name,
                      }))}
                  />
                )}

                {this.state.viewType === "grid" && (
                  <Grid
                    items={data
                      .filter((key) => key.name !== null)
                      .map((item) => ({
                        id: item.id,
                        imageUrl: item.images[0]?.url || "",
                        address: item.address,
                        name: item.name,
                        rating: item.rating,
                        type: item.provider_type.name,
                      }))}
                  />
                )}
              </React.Fragment>
            )}
          </section>
          <section className="main__new-provider fixed">
            <div className="new-provider">
              <h2 className="text-header">Can't find a Provider?</h2>
              <p className="text-body">Feel free to recommend a new one.</p>
              <hr />
              <NewProviderForm submit={this.addProvider} />
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default ExplorePage;
