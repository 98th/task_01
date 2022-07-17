let AccountApp = React.createClass({
  getInitialState: function () {
    return {
      showModal: false,
      records: []
    };
  },

  componentDidMount: function () {
    this.getAccountList();
  },

  toggleModal: function () {
    this.setState({
      showModal: !this.state.showModal
    });
  },

  getAccountList: function () {
    Visualforce.remoting.Manager.invokeAction(
      "AccountListController.getAccounts",
      this.getAccountsComplete,
      { escape: false }
    );
  },

  getAccountsComplete: function (result, event) {
    this.setState({ records: result });
  },

  updateAccountList: function (result, event) {
    this.getAccountList();
  },

  render: function () {
    return (
      <div>
        <button onClick={this.toggleModal}> New Account </button>
        <AccountModal
          onClose={this.toggleModal}
          onAccountSave={this.updateAccountList}
          showModal={this.state.showModal}
        ></AccountModal>
        <AccountTable records={this.state.records}></AccountTable>
      </div>
    );
  }
});
