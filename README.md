# ERPLY_Task



This task automates:

1. Login to https://login.erply.com/
2. Route to POS
3. Create POS User
4. Validate POS User
5. Validates user is not created if mandatory parameters are missing
6. Edit , update and validate users created


To Run:

Pre-req: Valid login details, before starting the test 'Open day' should not be open for https://epos.erply.com/

1. Clone this repo.
2. Inside credentials.JSON provide valid details.
3. Run the tests sequentially:

Commands: 


npx cypress run --spec cypress/e2e/1_test_login_happyPath.cy.js

npx cypress run --spec cypress/e2e/2_test_Create_Cust.cy.js   

npx cypress run --spec cypress/e2e/3_test_Verify_Cust.cy.js   

npx cypress run --spec cypress/e2e/4_cust_lastname_missing.cy.js  

npx cypress run --spec cypress/e2e/5_edit_POS_Cust.cy.js
