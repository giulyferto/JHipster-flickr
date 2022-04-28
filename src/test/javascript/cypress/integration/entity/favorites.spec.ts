import { entityItemSelector } from '../../support/commands';
import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('Favorites e2e test', () => {
  const favoritesPageUrl = '/favorites';
  const favoritesPageUrlPattern = new RegExp('/favorites(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const favoritesSample = {};

  let favorites: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/favorites+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/favorites').as('postEntityRequest');
    cy.intercept('DELETE', '/api/favorites/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (favorites) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/favorites/${favorites.id}`,
      }).then(() => {
        favorites = undefined;
      });
    }
  });

  it('Favorites menu should load Favorites page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('favorites');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Favorites').should('exist');
    cy.url().should('match', favoritesPageUrlPattern);
  });

  describe('Favorites page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(favoritesPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Favorites page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/favorites/new$'));
        cy.getEntityCreateUpdateHeading('Favorites');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', favoritesPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/favorites',
          body: favoritesSample,
        }).then(({ body }) => {
          favorites = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/favorites+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/favorites?page=0&size=20>; rel="last",<http://localhost/api/favorites?page=0&size=20>; rel="first"',
              },
              body: [favorites],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(favoritesPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Favorites page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('favorites');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', favoritesPageUrlPattern);
      });

      it('edit button click should load edit Favorites page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Favorites');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', favoritesPageUrlPattern);
      });

      it('last delete button click should delete instance of Favorites', () => {
        cy.intercept('GET', '/api/favorites/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('favorites').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', favoritesPageUrlPattern);

        favorites = undefined;
      });
    });
  });

  describe('new Favorites page', () => {
    beforeEach(() => {
      cy.visit(`${favoritesPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Favorites');
    });

    it('should create an instance of Favorites', () => {
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        favorites = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', favoritesPageUrlPattern);
    });
  });
});
