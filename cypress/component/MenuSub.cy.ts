import { mount } from '@cypress/vue'
import { ZlMenuSub } from '@zl-gp/components/menu'
import { MenuInjectKey } from '@zl-gp/components/menu/src/Menu'
import { ref } from 'vue'

describe('MenuSub.cy.ts', () => {
  it('renders correctly', () => {
    mount(ZlMenuSub as never, {
      props: {
        prop: 'sub1',
        name: 'Sub Menu 1'
      },
      global: {
        provide: {
          [MenuInjectKey as symbol]: {
            selected: ref(''),
            select: cy.stub(),
            subSelected: ref(''),
            subSelect: cy.stub(),
            unSubSelect: cy.stub(),
            flex: 'row'
          }
        }
      }
    })
    cy.get('.zl-menu-sub').should('exist')
    cy.contains('Sub Menu 1').should('exist')
  })

  it('handles mouse events', () => {
    const subSelectStub = cy.stub()
    const unSubSelectStub = cy.stub()
    mount(ZlMenuSub as never, {
      props: {
        prop: 'sub1',
        name: 'Sub Menu 1'
      },
      global: {
        provide: {
          [MenuInjectKey as symbol]: {
            selected: ref(''),
            select: cy.stub(),
            subSelected: ref(''),
            subSelect: subSelectStub,
            unSubSelect: unSubSelectStub,
            flex: 'row'
          }
        }
      },
      slots: {
        default: () => 'Click Me'
      }
    })
    cy.get('.zl-menu-sub').click().then(() => {
      expect(subSelectStub).to.have.been.calledWith('sub1')
    })
    cy.get('.zl-menu-sub').trigger('mouseleave').then(() => {
      expect(unSubSelectStub).to.have.been.calledWith()
    })
  })
})
