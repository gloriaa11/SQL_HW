
import { shallowMount } from '@vue/test-utils'
import DishModal from '@/components/DishModal.vue'
import axios from 'axios'

jest.mock('axios')

describe('DishModal.vue', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(DishModal, {
            props: {
                dishId: 1,
                isVisible: true,
                isStaff: true
            }
        })

    })

    it('renders the component', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('fetches dish data when dishId is provided', async () => {
        const dish = { Name: 'Test Dish', Price: 10.00, Description: 'Test Description' }
        axios.get.mockResolvedValue({ data: dish })

        await wrapper.vm.fetchDishData()

        expect(axios.get).toHaveBeenCalledWith('/api/dishes/1')
        expect(wrapper.vm.dish).toEqual(dish)
    })

    it('handles error when fetching dish data fails', async () => {
        const error = new Error('Network Error')
        axios.get.mockRejectedValue(error)

        await wrapper.vm.fetchDishData()

        expect(axios.get).toHaveBeenCalledWith('/api/dishes/1')
        expect(wrapper.vm.dish).toBeNull()
    })

    it('starts editing when startEditing is called', () => {
        const dish = { Name: 'Test Dish', Price: 10.00, Description: 'Test Description' }
        wrapper.setData({ dish })

        wrapper.vm.startEditing()

        expect(wrapper.vm.isEditing).toBe(true)
        expect(wrapper.vm.editedDish).toEqual(dish)
    })

    it('saves dish when saveDish is called', async () => {
        const dish = { Name: 'Test Dish', Price: 10.00, Description: 'Test Description' }
        axios.put.mockResolvedValue({ data: dish })

        await wrapper.vm.saveDish()

        expect(axios.put).toHaveBeenCalledWith('/api/dishes/1', wrapper.vm.editedDish)
        expect(wrapper.vm.dish).toEqual(dish)
        expect(wrapper.vm.isEditing).toBe(false)
    })

    it('handles error when saving dish fails', async () => {
        const error = new Error('Network Error')
        axios.put.mockRejectedValue(error)

        await wrapper.vm.saveDish()

        expect(axios.put).toHaveBeenCalledWith('/api/dishes/1', wrapper.vm.editedDish)
        expect(wrapper.vm.isEditing).toBe(true)
    })

    it('cancels editing when cancelEdit is called', () => {
        wrapper.vm.cancelEdit()

        expect(wrapper.vm.isEditing).toBe(false)
    })

    it('emits close event when closeModal is called', () => {
        wrapper.vm.closeModal()

        expect(wrapper.emitted().close).toBeTruthy()
    })
})
