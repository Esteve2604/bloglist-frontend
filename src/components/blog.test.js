import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { getByRole, render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
describe('blog', () => {
    let container
    const blog = {
        title: 'buenas',
        author: "tardes",
        url: "jesucristo",
        likes: 5,
        user: {
            name:"yo"
        }
    }
    let setBlogs=jest.fn()

    test('renders content short', () => {
        render(<Blog blog={blog} blogs={[]} setBlogs={setBlogs}/>)
        screen.getByText('buenas tardes')
        const element = screen.queryByText('jesucristo 5')
        expect(element).toBeNull()

    })
    test('button work an info shows when clicked', async () => {
        render(<Blog blog={blog} blogs={[]} setBlogs={setBlogs}/>)
        const user = userEvent.setup()
        const button = screen.getByText('view')
        screen.getByText('buenas tardes')
        await user.click(button)
        screen.getByText('jesucristo 5 yo')
    })
    test('like button pressed twice', async () => {
        render(<Blog blog={blog} blogs={[]} setBlogs={setBlogs}/>)
        const user = userEvent.setup()
        const viewButton = screen.getByText('view')
        await user.click(viewButton)
        const likeButton = screen.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)
        expect(setBlogs.mock.calls).toHaveLength(2)
    })
})