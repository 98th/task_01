global with sharing class AccountListController {
    

    public List<Account> accs = new List<Account>();
    public Account acc {get;set;}
    
    public AccountListController() {       
        acc = new Account();
    }
    
    public PageReference cancel() {
        return null;
    }
    
    public PageReference save() {
        upsert acc;
        return null;
    }

    @RemoteAction 
    global static List<Account> getAccounts(){
        return [
            SELECT 
                Id, 
                Name, 
                Phone,
                Industry, 
                Type,
                BillingStreet 
            FROM 
                Account
            ORDER BY CreatedDate DESC
            ];
    }

    @RemoteAction
    public static void createAccount(Account a) {
        try {
            Database.SaveResult sr = Database.insert(a);
        } catch(Exception e) {
            System.debug(e.getmessage());
        }
 
    }
}
