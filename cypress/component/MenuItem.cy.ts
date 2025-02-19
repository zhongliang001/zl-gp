import { mount } from '@cypress/vue'
import { ZlMenuItem } from '@zl-gp/components/menu'
import { MenuInjectKey } from '@zl-gp/components/menu/src/Menu'
import { MenuSubInjectKey } from '@zl-gp/components/menu/src/MenuSub'
import { ref } from 'vue'

describe('MenuItem.cy.ts', () => {
  it('renders correctly', () => {
    mount(ZlMenuItem as never, {
      props: {
        prop: 'item1'
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
          },
          [MenuSubInjectKey as symbol]: {
            prop: 'sub1'
          }
        }
      }
    })
    cy.get('.zl-menu-item').should('exist')
  })

  it('handles click event', () => {
    const selectStub = cy.stub()
    mount(ZlMenuItem as never, {
      props: {
        prop: 'item1'
      },
      global: {
        provide: {
          [MenuInjectKey as symbol]: {
            selected: ref(''),
            select: selectStub,
            subSelected: 'sub1',
            subSelect: cy.stub(),
            unSubSelect: cy.stub(),
            flex: 'row'
          },
          [MenuSubInjectKey as symbol]: {
            prop: 'sub1'
          }
        }
      },
      slots: {
        default: () => 'Click Me'
      }
    })
    cy.get('.zl-menu-item').click().then(() => {
      expect(selectStub).to.have.been.calledWith('item1')
    })
  })
})
