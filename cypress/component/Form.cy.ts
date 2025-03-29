// import { ZlForm } from '@zl-gp/components'
import { mount } from 'cypress/vue'
import FormTest from './FormTest.vue'

describe('Form.cy.ts', () => {
    it('renders form correctly', () => {
        mount(FormTest as never, {
            props: {
                name: 'test-form',
                url: '/submit',
                enctype: 'application/x-www-form-urlencoded',
                method: 'POST',
                novalidate: true,
                target: '_self',
                rules: [
                    {
                        name: 'username',
                        rule: [
                            {
                                reg: /^[a-zA-Z0-9]{3,}$/,
                                volidator: (value) => /^[a-zA-Z0-9]{3,}$/.test(value),
                                message: '用户名至少3个字符'
                            }
                        ]
                    }
                ]
            }
        })
        cy.get('form').should('exist')
        cy.get('input[name="username"]').should('exist')
    })

    it('validates form correctly', () => {
        mount(FormTest as never, {
            props: {
                name: 'test-form',
                url: 'https://20094aec-df8d-48be-bd9e-311211343ef8.mock.pstmn.io/tr',
                enctype: 'application/x-www-form-urlencoded',
                method: 'GET',
                novalidate: true,
                target: '_self',
                modelValue: { username: '1' },
                rules: [
                    {
                        name: 'username',
                        rule: [
                            {
                                reg: /^[a-zA-Z0-9]{3,}$/,
                                volidator: (value) => /^[a-zA-Z0-9]{3,}$/.test(value),
                                message: '用户名至少3个字符'
                            }
                        ]
                    }
                ]
            }
        })
        cy.get('input[name="username"]').type('ab')
        cy.get('button').click()
        cy.get('.error').should('contain', '用户名至少3个字符')
    })
})