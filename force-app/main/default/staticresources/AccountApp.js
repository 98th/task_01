//<----------------------------account list
var AccountTable = React.createClass({

    render: function () {
        return (
            <table>
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Industry</th>
                    <th>Type</th>
                </tr>
                {this.props.records.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.Name}</td>
                            <td>{val.Phone}</td>
                            <td>{val.Industry}</td>
                            <td>{val.Type}</td>
                        </tr>
                    )
                })}
            </table>
        );
    }
})

//<-------------------------- account modal
var AccountModal = React.createClass({


    createAccount: function () {
        let accName = document.getElementById("accPhone").value;
        let accPhone = document.getElementById("accName").value;

        let acc = { Name: accName, Phone: accPhone };
        Visualforce.remoting.Manager.invokeAction('AccountListController.createAccount', acc, this.creationComplete, { escape: false });
    },

    creationComplete:function(){
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
                <input type="text" id="accName" name="accName" /> <br/>

                <label for="accPhone">Phone:</label>
                <input type="text" id="accPhone" name="accPhone" /><br />
                <button onClick={() => {this.createAccount()}}>Save</button>
                <button onClick={() => { this.props.onClose()}}> Close </button> 
        </div>
        );
    }
})

//<----------------------------------account app
var AccountApp = React.createClass({

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
        Visualforce.remoting.Manager.invokeAction('AccountListController.getAccounts', this.getAccountsComplete, { escape: false });
    },

    getAccountsComplete: function (result, event) {
        this.setState({ records: result });
    },

    updateAccountList: function(result, event){
        this.getAccountList();
    },

    render: function () {
        return (
            <div>
                <button onClick={this.toggleModal}> New Account </button>
                <AccountModal onClose={this.toggleModal} onAccountSave={this.updateAccountList} showModal={this.state.showModal}></AccountModal>
                <AccountTable records={this.state.records}></AccountTable>
            </div>
        );
    }

})