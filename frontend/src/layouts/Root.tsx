import { Outlet } from 'react-router-dom'
// Components
import Main from '../components/Main.tsx'
import Nav from '../components/Nav.tsx'

const Root = () => {
    return (
        <>
            <Nav />
            <Main>
                <Outlet />
            </Main>
        </>
    )
}

export default Root
