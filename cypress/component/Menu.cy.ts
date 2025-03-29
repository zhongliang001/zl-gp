import { mount } from 'cypress/vue'
import { ZlMenu } from 'zl-gp'

describe('Menu.cy.ts', () => {
  it('renders correctly', () => {
    mount(
      ZlMenu as never, {
      props: {
        is: 'div',
        flex: 'row',
        ch: '1'
      }
    })
    cy.get('.zl-menu').should("exist")
  })

})
