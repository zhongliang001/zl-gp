import { ZlInput } from '@zl-gp/components'
import { mount } from 'cypress/vue'

describe('Input.cy.ts', () => {
    it('renders input correctly', () => {
        mount(ZlInput as never, {
            props: {
                type: 'text',
                name: 'username',
                modelValue: '',
                placeholder: '请输入用户名',
                disabled: false,
                width: 100,
                height: 30,
                max: 100,
                maxlength: 100,
                min: 1,
                minlength: 3,
                pattern: /^[a-zA-Z0-9]{3,}$/,
                readonly: false,
                required: 'required',
                step: 1
            }
        })
        cy.get('input[name="username"]').should('exist')
        cy.get('input[name="username"]').should('have.attr', 'placeholder', '请输入用户名')
    })

    it('resets input correctly', () => {
        mount(ZlInput as never, {
            props: {
                type: 'text',
                name: 'username',
                modelValue: 'initial value',
                placeholder: '请输入用户名',
                disabled: false,
                width: 100,
                height: 30,
                max: 100,
                maxlength: 100,
                min: 1,
                minlength: 3,
                pattern: /^[a-zA-Z0-9]{3,}$/,
                readonly: false,
                required: 'required',
                step: 1
            }
        })
        cy.get('input[name="username"]').should('have.value', 'initial value')
        cy.get('input[name="username"]').clear().type('new value')
        cy.get('input[name="username"]').invoke('val', 'initial value')
        cy.get('input[name="username"]').should('have.value', 'initial value')
    })
})