import AddButton from "./Button"
import './Header.css'

const Header = ({ title, onAdd }) => {
    return (
        <>
            <header className="fixed top-0 left-0 w-full h-[100px] bg-white shadow-md z-10 p-4">{title}</header>
            <AddButton onClick={onAdd} title={'Add Item'} className="overflow-y-auto fixed top-[150px] left-1/2 transform -translate-x-1/2"></AddButton>
        </>


    )
}

export default Header