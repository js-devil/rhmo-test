import React from "react";

class NewProviderForm extends React.Component {
  // TASK 5: Add New Provider
  // Add Functionality to the form below
  // On submission it should make a POST request to
  // the server to create a new provider.
  // Refer to the API documentation for details.

  constructor(props) {
    super(props);

    this.state = {
      provider: this.props.provider || {
        name: "",
        description: "",
        rating: 0,
        address: "",
        provider_type: "",
        state: "",
        imageUrl: "https://via.placeholder.com/1500x840",
      },
      error: false,
      fileUrl: null,
    };
  }

  handleChange = ({ id, value }) => {
    this.setState({
      provider: {
        ...this.state.provider,
        [id]: value,
      },
    });
  };

  handleImage = (event) => {
    if (event && event.target && event.target.files && event.target.files[0])
      this.setState({
        provider: {
          ...this.state.provider,
          imageUrl: URL.createObjectURL(event.target.files[0]),
        },
        file: event.target.files[0],
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const payload = this.state.provider;
    console.log(payload);
    let count = 0;

    for (let i in payload)
      if (i !== "id" && (!payload[i] || !payload[i].length)) count++;

    if (
      !payload.imageUrl ||
      payload.imageUrl === "https://via.placeholder.com/1500x840"
    )
      count++;

    if (payload.rating > 0) count--;

    if (count > 0) return this.setState({ error: true });
    this.setState({ error: false });
    this.props.submit({
      ...payload,
      active_status: payload.id ? payload.active_status : "Pending",
      rating: Number(payload.rating),
      imageUrl: this.state.fileUrl ? this.state.fileUrl : payload.imageUrl,
    });
  };

  render() {
    const data = this.state.provider;

    return (
      <form
        className="form"
        onSubmit={(e) => {
          this.handleSubmit(e);
        }}
      >
        {this.state.error && (
          <p id="error" style={{ color: "red" }}>
            Fill in all the fields
          </p>
        )}
        <div className="form-group">
          <label htmlFor="name">Provider Name:</label>
          <input
            className="input__style_1"
            onChange={(e) => {
              this.handleChange(e.target);
            }}
            defaultValue={data.name || ""}
            type="text"
            id="name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Provider Address:</label>
          <input
            className="input__style_1"
            type="text"
            onChange={(e) => {
              this.handleChange(e.target);
            }}
            defaultValue={data.address || ""}
            id="address"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Provider Description:</label>
          <input
            className="input__style_1"
            type="text"
            onChange={(e) => {
              this.handleChange(e.target);
            }}
            defaultValue={data.description || ""}
            id="description"
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">Provider State:</label>
          <input
            className="input__style_1"
            type="text"
            onChange={(e) => {
              this.handleChange(e.target);
            }}
            defaultValue={data.state || ""}
            id="state"
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Provider Rating:</label>
          <select
            className="select input__style_1"
            onChange={(e) => {
              this.handleChange(e.target);
            }}
            type="number"
            id="rating"
            defaultValue={data.rating || 0}
          >
            <option selected disabled value={0}>
              Select
            </option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="type">Provider type:</label>
          <select
            className="select input__style_1"
            type="text"
            onChange={(e) => {
              this.handleChange(e.target);
            }}
            id="provider_type"
            defaultValue={data.provider_type || ""}
          >
            <option selected disabled value={""}>
              Select
            </option>
            <option value="hospital">Hospital</option>
            <option value="pharmacy">Pharmacy</option>
            <option value="clinic">Clinic</option>
          </select>
        </div>
        {data.active_status && (
          <div className="form-group">
            <label htmlFor="type">Status:</label>
            <select
              className="select input__style_1"
              type="text"
              onChange={(e) => {
                this.handleChange(e.target);
              }}
              id="active_status"
              defaultValue={data.provider_type || ""}
            >
              <option selected disabled value={""}>
                Select
              </option>
              <option>Active</option>
              <option>Pending</option>
            </select>
          </div>
        )}
        <div className="form-group">
          <label htmlFor="image">Provider Image</label>
          <img
            className="img-responsive"
            src={data.imageUrl}
            alt="new provider"
          />
          <input
            id="imageUrl"
            type="file"
            onChange={(e) => {
              this.handleImage(e);
            }}
          />
        </div>
        <div className="form-group button-row">
          <button
            type="submit"
            className="btn btn-primary no-margin"
            onClick={(e) => {
              this.handleSubmit(e);
            }}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default NewProviderForm;
