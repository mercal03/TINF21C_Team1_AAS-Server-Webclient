import React from "react";

class AssetBody extends React.Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("Body update");
  }

  changeContent = (event) => {
    let children = document.getElementById("bodyContent").children;
    for (let child of children) {
      child.hidden = true;
    }
    document.getElementById(
      event.target.innerHTML.toString().toLowerCase()
    ).hidden = false;
  };

  render() {
    let shell = JSON.parse(window.sessionStorage.getItem("shellBody"));
    if (window.sessionStorage.getItem("shellBody") !== null) {
      return (
        <div className="m-2 p-2 overflow-auto w-100">
          <h3 className="">{shell.idShort}</h3>
          <hr></hr>
          <div className={"d-flex flex-column"}>
            <div className={"d-flex flex-row"}>
              <div className="image-container">
                <img src={(shell.image==null)? 'https://de.ingrammicro.com/_layouts/images/CSDefaultSite/common/no-image-lg.png': shell.image} alt={""} className="asset-image" />
              </div>

              <div>
                <table>
                  <tbody>
                    {Object.entries(shell).map(([key, value]) => {
                      if (typeof value !== "object") {
                        return (
                          <tr>
                            <td>
                              <p className="key">{key}</p>
                              <p className="value">{(value=='')? '-' : value}</p>
                              <hr></hr>
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <h5 className="my-3">Additional Information</h5>
            <hr></hr>
            <div className={"d-flex flex-row"}>
              <div className={"d-flex flex-column list-group navigation-buttons"}>
                {Object.entries(shell).map(([key, value]) => {
                  if (typeof value === "object" && shell[key] !== null) {
                    return (
                      <div onClick={this.changeContent} className="navigation-button shadow-sm rounded list-group-item-action list-group-item border-top my-2">
                        {key[0].toUpperCase()}
                        {key.substring(1, key.length)}
                      </div>
                    );
                  }
                })}
              </div>
              <div id={"bodyContent"} className="flex-grow-1">
                {Object.entries(shell).map(([key, value]) => {
                  if (typeof value === "object") {
                    return buildBody(shell[key], key);
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

const buildBody = (json, id = "") => {
  return (
    <table id={id} className="asset-table">
      <tbody>
        {json ? (
          Object.entries(json).map(([key, value]) => {
            if (typeof value === "object") {
              if (Object.keys(json[key]).length > 0) {
                return (
                  <tr>
                    <td colSpan={2}>
                      <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingOne">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#${key}`}
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                              {key}
                            </button>
                          </h2>
                          <div
                            id={`${key}`}
                            className="accordion-collapse collapse"
                            aria-labelledby="headingOne"
                          >
                            <div className="accordion-body">
                              {buildBody(json[key])}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              }
            } else {
              return (
                <tr>
                  <td>
                    <p className="key">{key}</p>
                    <p className="value">{(value=='')? '-' : value}</p>
                    <hr></hr>
                  </td>
                </tr>
              );
            }
          })
        ) : (
          <tr></tr>
        )}
      </tbody>
    </table>
  );
};

export default AssetBody;
