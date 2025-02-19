import { ZlButton } from '@zl-gp/components/button/'

describe('<Button />', () => {
  it('nativeType', () => {
    cy.mount(ZlButton as never, {
      props: {
        nativeType: 'submit'
      }
    })
    cy.get('button').should('have.attr', 'type', 'submit')
  })

  it('type', () => {
    cy.mount(ZlButton as never, {
      props: {
        type: 'primary',
        nativeType: 'submit'
      }
    })
    cy.get('button').should('have.attr', 'class', 'zl-button primary')
  })

  it('disabled true', () => {
    cy.mount(ZlButton as never, {
      props: {
        disabled: true
      }
    })
    cy.get('button').should('have.attr', 'disabled', 'disabled')
  })

  it('disabled false', () => {
    cy.mount(ZlButton as never, {
      props: {
        disabled: false
      }
    })
    cy.get('button').should('not.have.disabled')
  })

  it('click', () => {
    cy.mount(ZlButton as never, {
      props: {
        onClick: cy.spy().as('onClick')
      },
      slots: {
        default: () => 'Click Me'
      }
    })
    cy.get('button').contains('Click Me').click()
    cy.get('@onClick').should('have.been.called')
  })
})
