let AccountModal = React.createClass({
  createAccount: function () {
    let accName = document.getElementById("accPhone").value;
    let accPhone = document.getElementById("accName").value;

    let acc = { Name: accName, Phone: accPhone };
    Visualforce.remoting.Manager.invokeAction(
      "AccountListController.createAccount",
      acc,
      this.creationComplete,
      { escape: false }
    );
  },

  creationComplete: function () {
    this.props.onAccountSave();
  },

  render() {
    if (!this.props.showModal) {
      return null;
    }
    return (
      <div>
        <div>Test </div>
        <label for="accName">Name:</label>
        <input type="text" id="accName" name="accName" /> <br />
        <label for="accPhone">Phone:</label>
        <input type="text" id="accPhone" name="accPhone" />
        <br />
        <button
          onClick={() => {
            this.createAccount();
          }}
        >
          Save
        </button>
        <button
          onClick={() => {
            this.props.onClose();
          }}
        >
          {" "}
          Close{" "}
        </button>
      </div>
    );
  }
});
module.exports = AccountModal;
