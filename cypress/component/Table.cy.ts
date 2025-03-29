import { ZlTable, ZlTableBody, ZlTableHeader, ZlTableColumn } from '@zl-gp/components/table';
import { mount } from 'cypress/vue';
import { h } from 'vue'

describe('Table Component', () => {
    beforeEach(() => {
        mount(ZlTable as never, {
            components: { ZlTableHeader, ZlTableBody },
            props: {
                data: [
                    { id: 1, name: 'Alice' },
                    { id: 2, name: 'Bob' }
                ],
                isIndex: true,
                isShowChecked: true,
                selType: 'multiple'
            },
            slots: {
                default: [
                    h(ZlTableColumn, {
                        props: 'id',
                        name: 'id'
                    }),
                    h(ZlTableColumn, {
                        props: 'name',
                        name: 'name'
                    })

                ]
            }

        })
    })

    it('renders table with correct structure', () => {
        cy.wait(500)
        cy.get('table').should('exist')
        cy.get('.zl-table-header').should('exist')
        cy.get('.zl-table-body').should('exist')
    })

    it('renders index column when isIndex is true', () => {
        cy.wait(500)
        cy.get('.zl-table-header').should('contain.text', 'id')
        cy.get('.zl-table-body').find('tr').each(($row, index) => {
            cy.wrap($row).find('td').first().should('contain.text', index + 1)
        })
    })

    it('renders selection column when isShowChecked is true and allows row selection', () => {
        cy.wait(500)
        cy.get('.zl-table-body').find('input[type="checkbox"]').should('exist')
        cy.get('.zl-table-body').find('input[type="checkbox"]').should('have.length', 2)
        cy.get('.zl-table-body').find('input[type="checkbox"]').first().check()
        cy.get('.zl-table-body').find('input[type="checkbox"]').first().should('be.checked')
    })
})