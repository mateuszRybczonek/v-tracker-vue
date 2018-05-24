import { shallow } from 'vue-test-utils'
import { LINES } from '@/../test/stubs/googleMap'
import GoogleMapLine from '@/components/GoogleMapLine'

describe('GoogleMapLine.vue', () => {
  const setup = () => {
    const wrapper = shallow(GoogleMapLine, {
      propsData: {
        google: {
          maps: {
            Polyline: function(props) {
              this.clickable = props.clickable,
              this.path = props.path,
              this.map = props.map
            }
          },
        },
        map: { map: true },
        path: LINES[0].path
      }
    })
    return { wrapper }
  }

  test('mounted sets line properly', () => {
    const { wrapper } = setup()

    const expectedResult = {
      clickable: false,
      map: {
        map: true
      },
      path: [
        {
          lat: 10,
          lng: 20
        }, {
          lat: 50,
          lng: 100
        }
      ]
    }

    expect(wrapper.vm.line).toEqual(expectedResult)
  })
})
