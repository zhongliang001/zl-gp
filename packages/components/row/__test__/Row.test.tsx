import { mount } from '@vue/test-utils'
import { describe } from 'node:test'
import { expect, it } from 'vitest'
import ZlRow from '..'
import ZlCol from '../../col'

describe('Row', () => {
  it('渲染', () => {
    const wrapper = mount(ZlRow, {
      slots: {
        default: () => <ZlCol>tt</ZlCol>
      }
    })
    expect(wrapper.getComponent(ZlCol).text()).equals('tt')
  })
})
