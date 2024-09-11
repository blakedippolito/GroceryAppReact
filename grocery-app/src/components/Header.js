import AddButton from "./Button"
import './Header.css'

const Header = ({ title, onAdd, showAdd }) => {
    return (
        <>
            <header>{title}</header>
            <AddButton onClick={onAdd} title={'Add Item'}></AddButton>
        </>


    )
}

export default Header