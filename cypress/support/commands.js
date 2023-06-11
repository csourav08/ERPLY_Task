
Cypress.Commands.add('test_Firstlogin', () => {    /////// First Login where 'Open Day' will be popped out
  cy.clearCookies();
  cy.clearLocalStorage();

  cy.reload(true);


  cy.fixture('credentials.json').then((credentials) => {
    cy.visit('https://login.erply.com/');
    cy.get('[data-testid="client-code"]').type(credentials.clientCode);
    cy.get('[data-testid="username"]').type(credentials.username);
    cy.get('[data-testid="password"]').type(credentials.password);
    cy.get('[data-testid="login-button"]').click();
    cy.on('uncaught:exception', () => false);
    cy.get('[data-testid="pointofsale-link"]')
      .invoke('removeAttr', 'target')
      .click({ force: true })
      .then(($link) => {
        const redirectedUrl = $link.attr('href');
        cy.wait(3000);
        cy.get('div[data-testid="pos-item"][data-test-key="1"]').click({ force: true });
        cy.wait(3000);
        cy.get('button[data-testid="confirm-button"]').click();  //// click on Open Day
        

      });
  });
});
///////////////////// vowrking create cutomer ///////

Cypress.Commands.add('test_createTestCustomer', () => {    ///Create Cust + end day
  cy.clearCookies();
  cy.clearLocalStorage();

  cy.reload(true);

  cy.fixture('credentials.json').then((credentials) => {
    cy.visit('https://login.erply.com/');
    cy.get('[data-testid="client-code"]').type(credentials.clientCode);
    cy.get('[data-testid="username"]').type(credentials.username);
    cy.get('[data-testid="password"]').type(credentials.password);
    cy.get('[data-testid="login-button"]').click();
    cy.on('uncaught:exception', () => false);
    cy.get('[data-testid="pointofsale-link"]')
      .invoke('removeAttr', 'target')
      .click({ force: true })
      .then(($link) => {
        const redirectedUrl = $link.attr('href');
        cy.wait(2000);
        cy.get('span[data-testid="pos-name"][data-test-key="Default POS"]').click();
        
        // cy.get('button[data-testid="confirm-button"]').click();  ///// 

        cy.wait(3000);

        cy.get('button[data-testid="function-button"][data-test-key="addCustomer"]').click();
        cy.get('span.icon_plus').click({ force: true });
        cy.get('input[data-testid="firstName"]').type(credentials.firstName);
        cy.get('input[data-testid="lastName"]').type(credentials.lastName);
        cy.get('[data-testid="save-button"]').should('be.visible').click();
        cy.wait(2000);

        cy.get('div[style="display: flex; align-items: center; justify-content: flex-end;"]')
          .find('span.custom-close-btn[data-testid="custom-close-button"]')
          .click();

        cy.get('button[title="Close Day"][data-testid="function-button"]').click({ force: true });
        cy.wait(3000);

        cy.get('button[data-testid="submit-button"]').click();
        cy.wait(3000);

        cy.get('button[data-testid="confirm"]').click();
        cy.wait(3000);

        cy.get('span.custom-close-btn[data-testid="custom-close-button"]').click();
        cy.wait(3000);
      });
  });
});

//////////////////////////////////////////////////////////////////////////////





////////////



Cypress.Commands.add('verifyCustomer', () => {
  cy.clearCookies();
  cy.clearLocalStorage();

  cy.reload(true);
  cy.fixture('credentials.json').then((credentials) => {
    cy.visit('https://login.erply.com/');
    cy.get('[data-testid="client-code"]').type(credentials.clientCode);
    cy.get('[data-testid="username"]').type(credentials.username);
    cy.get('[data-testid="password"]').type(credentials.password);
    cy.get('[data-testid="login-button"]').click();
    cy.on('uncaught:exception', () => false);
    cy.get('[data-testid="pointofsale-link"]')
      .invoke('removeAttr', 'target')
      .click({ force: true })
      .then(($link) => {
        const redirectedUrl = $link.attr('href');
        cy.wait(3000);
        cy.get('span[data-testid="pos-name"][data-test-key="Default POS"]').click();

        // cy.get('div[data-testid="pos-item"][data-test-key="1"]').click({ force: true });//// jhaar khachi
        cy.wait(3000);
        cy.get('button[data-testid="confirm-button"]').click();  //// click on Open Day
        cy.wait(3000);
        // cy.get('input[placeholder="Customers"]').type('Barry', { force: true });  ////// working but can be used for edit
        cy.wait(3000);
        cy.fixture('credentials.json').then((credentials) => {
          const { firstName, lastName } = credentials;
          const fullName = `${firstName} ${lastName}`;

          cy.get('input[placeholder="Customers"]').click().type(`${firstName} ${lastName}{enter}`);
          cy.wait(3000);

          cy.get('div[data-testid="customer-name"]').should('contain', fullName);  //// ekhane naam match korche


          cy.get('button[title="Close Day"][data-testid="function-button"]').click({ force: true });  /// Day close
          cy.wait(3000);

          cy.get('button[data-testid="submit-button"]').click();
          cy.wait(3000);

          cy.get('button[data-testid="confirm"]').click();
          cy.wait(3000);

          cy.get('span.custom-close-btn[data-testid="custom-close-button"]').click();
          cy.wait(3000);
        });
      });
  });
});

/////////////////////////////////////////


Cypress.Commands.add('cust_data_missing', () => {    ///incomplete info so cannot create customer
  cy.clearCookies();
  cy.clearLocalStorage();

  cy.reload(true);

  cy.fixture('credentials.json').then((credentials) => {
    cy.visit('https://login.erply.com/');
    cy.get('[data-testid="client-code"]').type(credentials.clientCode);
    cy.get('[data-testid="username"]').type(credentials.username);
    cy.get('[data-testid="password"]').type(credentials.password);
    cy.get('[data-testid="login-button"]').click();
    cy.on('uncaught:exception', () => false);
    cy.get('[data-testid="pointofsale-link"]')
      .invoke('removeAttr', 'target')
      .click({ force: true })
      .then(($link) => {
        const redirectedUrl = $link.attr('href');
        cy.wait(2000);
        cy.get('span[data-testid="pos-name"][data-test-key="Default POS"]').click();
        cy.get('button[data-testid="confirm-button"]').click();  //// click on Open Day ////
        cy.get('button[data-testid="function-button"][data-test-key="addCustomer"]').click();
        cy.get('span.icon_plus').click({ force: true });
        cy.get('input[data-testid="firstName"]').type(credentials.firstName);
        cy.get('[data-testid="save-button"]').should('be.disabled');

        cy.get('span.custom-close-btn[data-testid="custom-close-button"]').click(); /// click on x

        cy.get('button[title="Close Day"][data-testid="function-button"]').click({ force: true });  /// Day close
          cy.wait(3000);

          cy.get('button[data-testid="submit-button"]').click();
          cy.wait(3000);

          cy.get('button[data-testid="confirm"]').click();
          cy.wait(3000);

          cy.get('span.custom-close-btn[data-testid="custom-close-button"]').click();
          cy.wait(3000);


      });
    });
  });

  ////////////////////////////////

  Cypress.Commands.add('test_editTestCustomer', () => {
    cy.clearCookies();
    cy.clearLocalStorage();
  
    cy.reload(true);
    cy.fixture('credentials.json').then((credentials) => {
      cy.visit('https://login.erply.com/');
      cy.get('[data-testid="client-code"]').type(credentials.clientCode);
      cy.get('[data-testid="username"]').type(credentials.username);
      cy.get('[data-testid="password"]').type(credentials.password);
      cy.get('[data-testid="login-button"]').click();
      cy.on('uncaught:exception', () => false);
      cy.get('[data-testid="pointofsale-link"]')
        .invoke('removeAttr', 'target')
        .click({ force: true })
        .then(($link) => {
          const redirectedUrl = $link.attr('href');
          cy.wait(3000);
          cy.get('div[data-testid="pos-item"][data-test-key="1"]').click({ force: true });
          cy.wait(3000);
          cy.get('button[data-testid="confirm-button"]').click();  //// click on Open Day
          cy.wait(3000);
          cy.wait(3000);
          cy.fixture('credentials.json').then((credentials) => {
            const { firstName, lastName } = credentials;
            const fullName = `${firstName} ${lastName}`;
  
            cy.get('input[placeholder="Customers"]').click().type(`${firstName} ${lastName}{enter}`);
            cy.wait(3000);
  
            cy.get('button.client-details-button').click();
          
            cy.get('div.user-badge-name.row').should('contain', credentials.firstName).and('contain', credentials.lastName);
            cy.get('i[data-testid="edit-customer"].icon_pencil-edit.icon-button.hoverable').click();
            cy.get('input[data-testid="firstName"]').clear().type('Erply', { force: true });
            cy.get('input[data-testid="lastName"]').clear().type('Task', { force: true });
            cy.get('button[data-testid="save-button"]').click();
            cy.wait(3000);
            cy.get('div.MuiBox-root[data-testid="modal-title"]')
            .should('contain', 'Erply Task');
  
            cy.get('div[data-testid="customer-name"].user-badge-name.row')
            .should('contain', 'Erply Task');
  
          });
        });
    });
  });
  



